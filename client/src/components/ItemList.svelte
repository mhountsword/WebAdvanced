<script>
    //placeholder for filter data (fetch from API later)
    let genres = ['Hip-Hop', 'Rock', 'Pop']; // Example genre options
    let selectedArtist = '';
    let selectedGenre = '';

    //placeholder for item data (fetch from API later)
    let items = [
        { title: 'Songs For The Deaf', artist: 'Queens Of the Stone Age', image: '...', genre: 'Rock'},
        { title: 'Nevermind', artist: 'Nirvana', image: '...', genre: 'Rock'},
        { title: 'Blonde', artist: 'Frank Ocean', image: '...', genre: 'R&B'}
        // ... more item data later
    ];

    //reactive declaration for filtered items
    $: filtereditems = items.filter(item => {
        const matchesArtist = selectedArtist === '' || item.artist.toLowerCase().includes(selectedArtist.toLowerCase());
        const matchesGenre = selectedGenre === '' || item.genre === selectedGenre;
        return matchesArtist && matchesGenre;
    });

    //function to handle filter changes
    function handleFilterChange() {
        console.log('Artist:', selectedArtist);
        console.log('Genre:', selectedGenre);
        // Filtering logic is now handled by the reactive statement
    }

    function handleItemClick(item) {
        sessionStorage.setItem('selectedAuction', JSON.stringify(item)); //save item details in session to forward to item page
        window.location.href = '/item-details'; //redirect to item-details page
    }
</script>

<div class="filter-menu">
    <header class="filter-header">
        <p>Filter by:</p>
    </header>
    <ul>
        <li>
            <label for="artist">Artist:</label>
            <input type="text" id="artist" bind:value={selectedArtist} on:input={handleFilterChange} />
        </li>
        <li>
            <label for="genre">Genre:</label>
            <select id="genre" bind:value={selectedGenre} on:change={handleFilterChange}>
                <option value="">All Genres</option> {#each genres as genre}
                <option value={genre}>{genre}</option>
            {/each}
            </select>
        </li>
    </ul>
</div>


<ul>
    <div class="item-container">
        {#each filtereditems as item}
            <li class="item-card">
                <a href="/item-details" on:click|preventDefault={() => handleItemClick(item)}>
                    <h3>{item.title}</h3>
                    <img src={item.image} alt="Album cover"/>
                    <p>{item.artist}</p>
                </a>
            </li>
        {/each}
    </div>
</ul>

<style>
    .item-container {
        display: flex;
        overflow-x: auto;
    }

    .item-card {
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

    .item-card a {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: black;
    }

    .item-card:hover {
        transform: scale(1.05);
    }

    .filter-menu ul {
        list-style: none;
        padding: 20px;
    }

</style>