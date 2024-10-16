<!-- src/components/FilterMenu.svelte -->
<script>
    export let selectedArtist = '';
    export let selectedTitle = '';
    export let selectedGenre = '';
    export let selectedMinYear;
    export let selectedMaxYear;
    export let genres = [];
    export let minYear;
    export let maxYear;

    // Dispatch event when a filter value changes
    function updateFilters() {
        const filters = {
            selectedArtist,
            selectedTitle,
            selectedGenre,
            selectedMinYear,
            selectedMaxYear,
        };
        const event = new CustomEvent('filterChange', {
            detail: filters,
        });
        dispatchEvent(event);
    }
</script>

<div class="filter-menu">
    <header class="filter-header">
        <p>Filter by:</p>
    </header>
    <ul>
        <li>
            <label for="artist">Artist:</label>
            <input type="text" id="artist" bind:value={selectedArtist} on:input={updateFilters} />
            <label for="title">Title:</label>
            <input type="text" id="title" bind:value={selectedTitle} on:input={updateFilters} />
        </li>
        <li>
            <label for="genre">Genre:</label>
            <select id="genre" bind:value={selectedGenre} on:change={updateFilters}>
                <option value="">All Genres</option>
                {#each genres as genre}
                    <option value={genre}>{genre}</option>
                {/each}
            </select>
        </li>
        <li>
            <label for="yearRange">Release Year:</label>
            <input type="range" min={minYear} max={maxYear} bind:value={selectedMinYear} on:input={updateFilters} />
            <input type="range" min={minYear} max={maxYear} bind:value={selectedMaxYear} on:input={updateFilters} />
            <p>Years: {selectedMinYear} - {selectedMaxYear}</p>
        </li>
    </ul>
</div>

<style>
    .filter-menu ul {
        list-style: none;
        padding: 20px;
    }

    input, select {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        box-sizing: border-box;
        border-radius: 4px;
    }
</style>
