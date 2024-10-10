<script>
    // Placeholder for filter data (fetch from API later)
    let genres = ['Hip-Hop', 'Rock', 'Pop']; // Example genre options
    let selectedArtist = '';
    let selectedGenre = '';

    // Function to handle filter changes (to be implemented later)
    function handleFilterChange() {
        console.log('Artist:', selectedArtist);
        console.log('Genre:', selectedGenre);
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
                {#each genres as genre}
                    <option value={genre}>{genre}</option>
                {/each}
            </select>
        </li>
    </ul>
</div>

<style>
    .filter-header {
        padding: 0;
    }

    .filter-menu ul {
        list-style: none;
    }

    .filter-menu li {
    }

    .filter-menu label {
        display: block;
        margin: 10px 5px;
    }
</style>