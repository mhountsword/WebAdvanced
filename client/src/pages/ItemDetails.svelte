<script>
    // Retrieve the selected auction data from sessionStorage
    let selectedAuction = JSON.parse(sessionStorage.getItem('selectedAuction'));

    // Placeholder for bids data (fetch from API later)
    let bids = [
        //TODO: make dynamic
        { username: 'user1', amount: 15 },
        { username: 'user2', amount: 20 },
        // ... more bid data
    ];

    // Calculate the highest bid (you might fetch this from the API instead)
    let highestBid = Math.max(...bids.map(bid => bid.amount));
</script>
<div class="container">
    <div class="item-details">
        <h1>{selectedAuction.title}</h1>
        <p>{selectedAuction.artist}</p>
        <!-- <p>{selectedAuction.description}</p> --> <!-- TODO: add later -->
    </div>
    <div class="bids">
        <h2>Bids</h2>
        <ul>
            {#each bids as bid}
                <li>{bid.username}: ${bid.amount}</li>
            {/each}
        </ul>
        <h3>Highest Bid: ${highestBid}</h3>
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