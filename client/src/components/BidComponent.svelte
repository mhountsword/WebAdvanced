<script>
    import {onMount} from "svelte";
    import { isLoggedIn } from "../js/logout.js";

    export let itemId; // Pass the item's ID from itemdetails.svelte

    let bids = [];
    let newBid = { username: '', amount: 0 }; // Form for new bid
    let highestBid = 0;
    let user = null;

    async function fetchBids() {
        const res = await fetch(`http://localhost:3000/api/items/${itemId}/bids`);
        bids = await res.json();
        bids.sort((a, b) => b.amount - a.amount);
        updateHighestBid();
    }

    function updateHighestBid() {
        if (bids.length > 0) {
            highestBid = Math.max(...bids.map(bid => bid.amount));
        } else {
            highestBid = 0;
        }
    }

    async function addBid() {
        newBid.username = user.username;
        console.log(user.username);
        const res = await fetch(`http://localhost:3000/api/items/${itemId}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(newBid),
        });

        if (res.ok) {
            const addedBid = await res.json();
            bids = [...bids, addedBid];
            bids.sort((a, b) => b.amount - a.amount);
            updateHighestBid();
            newBid.amount = 0;
        } else {
            console.error('Failed to add bid');
        }
    }

    //fetch bids when the component loads
    onMount(() => {
        user = isLoggedIn();
        console.log(user);
        fetchBids();
    })
</script>

<div class="bids-container">
    <ul>
        {#each bids as bid}
            <li>{bid.username}: ${bid.amount}</li>
        {/each}
    </ul>
    <h3>Highest Bid: ${highestBid}</h3>

    {#if isLoggedIn()}
    <h3>Add New Bid</h3>
    <form on:submit|preventDefault={addBid}>
        <input type="number" bind:value={newBid.amount} placeholder="Bid Amount" required />
        <button type="submit">Add Bid</button>
    </form>
    {/if}
</div>

<style>
    .bids-container {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-top: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 5px;
    }
</style>
