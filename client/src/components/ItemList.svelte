<script>
    import {onMount} from "svelte";
    let items = [];
    let genres = ['Hip-Hop', 'Rock', 'Pop']; // Example genre options
    let selectedArtist = '';
    let selectedTitle = '';
    let selectedGenre = '';

    //retrieve list of items
    onMount(async () => {
        const response = await fetch('http://localhost:3000/api/items');
        try {
            if (response.ok) {
                items = await response.json();
            } else {
                console.error('Error fetching items:', response.status);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    });

    //reactive declaration for filtered items
    $: filtereditems = items.filter(item => {
        const matchesArtist = selectedArtist === '' || item.artist.toLowerCase().includes(selectedArtist.toLowerCase());
        const matchesTitle = selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase());
        const matchesGenre = selectedGenre === '' || item.genre === selectedGenre;
        return matchesArtist &&  matchesTitle && matchesGenre;
    });

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
            <input type="text" id="artist" bind:value={selectedArtist} />
            <label for="artist">Title:</label>
            <input type="text" id="name" bind:value={selectedTitle} />
        </li>
        <li>
            <label for="genre">Genre:</label>
            <select id="genre" bind:value={selectedGenre}>
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