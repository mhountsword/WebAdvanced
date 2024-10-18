<script>
    import BidComponent from "../components/BidComponent.svelte";
    import TimerComponent from "../components/TimerComponent.svelte";
    import { onMount, onDestroy } from "svelte";

    let selectedAuction = JSON.parse(sessionStorage.getItem('selectedAuction'));
    let auctionEnded = false;
    let pollInterval;
    let bidsComponent; // To hold the BidComponent instance

    async function fetchAuctionData(id) {
        const res = await fetch(`http://localhost:3000/api/items/${id}`);
        return res.json();
    }

    async function handleAuctionEnd() {
        if (!auctionEnded) {
            auctionEnded = true;
            selectedAuction = await fetchAuctionData(selectedAuction.id);
            bidsComponent.fetchNewBidsOnAuctionEnd(); // Refresh BidComponent
            auctionEnded = false;
        }
    }

    function startPolling() {
        pollInterval = setInterval(async () => {
            selectedAuction = await fetchAuctionData(selectedAuction.id);
            const now = new Date().getTime();
            if (now >= new Date(selectedAuction.endTime).getTime() && !auctionEnded) {
                await handleAuctionEnd();
            }
        }, 5000);
    }

    onMount(async () => {
        selectedAuction = await fetchAuctionData(selectedAuction.id);
        startPolling();
    });

    onDestroy(() => {
        if (pollInterval) {
            clearInterval(pollInterval);
        }
    });
</script>

<div class="container">
    <div class="item-details">
        <h1>{selectedAuction.title}</h1>
        <p>{selectedAuction.artist}</p>
        <p>{selectedAuction.release_year}</p>
        <TimerComponent endTime={new Date(selectedAuction.endTime).getTime()} on:auctionEnd={handleAuctionEnd} />
    </div>
    <div class="bids">
        <h2>Bids</h2>
        <div>
            <p>{selectedAuction.id}</p>
            <BidComponent bind:this={bidsComponent} itemId={selectedAuction.id} />
        </div>
    </div>
</div>

<style>
    .container {
        font-size: 22px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        gap: 20px;
        padding: 20px;
    }

    .item-details {
        grid-column: 1;
        grid-row: 2;
    }

    .bids {
        grid-column: 2;
        grid-row: 2;
    }

    ul {
        list-style: none;
    }
</style>
