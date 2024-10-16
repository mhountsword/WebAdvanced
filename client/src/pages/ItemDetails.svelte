<script>
    import BidComponent from "../components/BidComponent.svelte";

    let selectedAuction = JSON.parse(sessionStorage.getItem('selectedAuction'));
</script>

<div class="container">
    <div class="item-details">
        <h1>{selectedAuction.title}</h1>
        <p>{selectedAuction.artist}</p>
        <p>{selectedAuction.release_year}</p>
    </div>
    <div class="bids">
        <h2>Bids</h2>
        <div>
            <BidComponent itemId={selectedAuction.id} />
        </div>
    </div>
</div>


<style>
    .container {
        font-size: 22px;
        display: grid;
        grid-template-columns: 1fr 1fr; /* Two equal-width columns */
        grid-template-rows: auto 1fr auto; /* Header, content, and footer rows */
        gap: 20px; /* Spacing between grid items */
        padding: 20px;
    }

    .item-details {
        grid-column: 1; /* Place the description in the second column */
        grid-row: 2;
    }

    .bids {
        grid-column: 2; /* Place the bids in the second column */
        grid-row: 2;
    }

    ul {
        list-style:none;
    }
</style>