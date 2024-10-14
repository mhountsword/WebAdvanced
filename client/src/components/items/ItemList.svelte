<script>
    import { items } from '../../js/stores.js';

    let genres = ['Hip-Hop', 'Rock', 'Pop'];
    let selectedArtist = '';
    let selectedTitle = '';
    let selectedGenre = '';

    // We will now use $items directly, removing tempItems
    let filteredItems = [];

    // Use $items directly to filter
    $: filteredItems = $items.filter(item => {
        console.log($items);
        const matchesArtist = selectedArtist === '' || item.artist.toLowerCase().includes(selectedArtist.toLowerCase());
        const matchesTitle = selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase());
        const matchesGenre = selectedGenre === '' || item.genre === selectedGenre;
        items.update(existingItems => [...existingItems])
        return matchesArtist && matchesTitle && matchesGenre;
    });

    function handleItemClick(item) {
        sessionStorage.setItem('selectedAuction', JSON.stringify(item));
        window.location.href = '/item-details';
    }
</script>

<div class="filter-menu">
    <header class="filter-header">
        <p>Filter by:</p>
    </header>
    <ul>
        <li>
            <label for="artist">Artist:</label>
            <input type="text" id="artist" bind:value={selectedArtist} />
            <label for="title">Title:</label>
            <input type="text" id="title" bind:value={selectedTitle} />
        </li>
        <li>
            <label for="genre">Genre:</label>
            <select id="genre" bind:value={selectedGenre}>
                <option value="">All Genres</option>
                {#each genres as genre}
                    <option value={genre}>{genre}</option>
                {/each}
            </select>
        </li>
    </ul>
</div>

<ul class="item-container">
    {#each filteredItems as item}
        <li class="item-card">
            <a href="/item-details" on:click|preventDefault={() => handleItemClick(item)}>
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
            </a>
        </li>
    {/each}
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
