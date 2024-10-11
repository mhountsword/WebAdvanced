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

<h1>{selectedAuction.title}</h1>
<p>{selectedAuction.artist}</p>
<!-- <p>{selectedAuction.description}</p> --> <!-- TODO: add later -->

<h2>Bids</h2>
<ul>
    {#each bids as bid}
        <li>{bid.username}: ${bid.amount}</li>
    {/each}
</ul>

<h3>Highest Bid: ${highestBid}</h3>

<style>
    ul {
        list-style:none;
    }
</style>