<script>
    // Placeholder for auction data (fetch from API later)
    const auctions = [
        { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', image: '...', currentBid: '$50' },
        { title: 'Nevermind', artist: 'Nirvana', image: '...', currentBid: '$100' },
        // ... more auction data later
    ];
</script>

<ul>
    <div class="auction-container">
        {#each auctions as auction}
            <li class="auction-card">
                <h3>{auction.title}</h3>
                <img src={auction.image} alt="Image goes here" />
                <p>{auction.artist}</p>
                <p>Current Bid: {auction.currentBid}</p>
                <button>Bid Now</button>
            </li>
        {/each}
    </div>
</ul>

<style>
    .auction-container {
        display: flex;
        overflow-x: auto;
    }

    .auction-card {
        list-style: none;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 10px;
        padding: 20px;
        width: 300px;
        text-align: center;
        transition: transform 0.2s;
    }

    .auction-card:hover {
        transform: scale(1.05);
    }

</style>