<script>
    import {onMount} from "svelte";
    import { isLoggedIn } from "../js/logout.js";
    import MessageComponent from "./MessageComponent.svelte";

    export let itemId; // Pass the item's ID from itemdetails.svelte

    let bids = [];
    let highestBid = 0;
    let newBid = { username: '', amount: 0, highestBid };
    let user = null;

    async function fetchBids() {
        const res = await fetch(`http://localhost:3000/api/items/${itemId}/bids`);
        bids = await res.json();
        bids.sort((a,b) => b-a).slice(0,5); //display top 5 bids
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
        {#if newBid.amount <= highestBid}
            <button type="submit" disabled>Add Bid</button>
            <MessageComponent
            message="Bid must be higher than highest bid!"
            messageType="error"
            />
        {:else}
            <button type="submit">Add Bid</button>
        {/if}
    </form>
    {:else}
    <h4>
        Please <a href="/login">login</a> to add bids!
    </h4>
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
