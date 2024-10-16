<script>
    import FilterMenu from './FilterMenu.svelte';
    import { items } from '../../js/itemStore.js';
    import { isAdmin } from "../../js/adminCheck.js";
    import { openEditModal, deleteItem} from "../../js/itemActions.js";
    import AddItem from "./AddItem.svelte";

    let selectedArtist = '';
    let selectedTitle = '';
    let selectedGenre = '';
    let selectedMinYear = 1970
    let selectedMaxYear = new Date().getFullYear(); //get current year

    let genres = [];
    let filteredItems = [];

    $: genres = [...new Set($items.map(item => item.genre))];

    $: filteredItems = $items.filter(item => {
        const matchesArtist = selectedArtist === '' || item.artist.toLowerCase().includes(selectedArtist.toLowerCase());
        const matchesTitle = selectedTitle === '' || item.title.toLowerCase().includes(selectedTitle.toLowerCase());
        const matchesGenre = selectedGenre === '' || item.genre === selectedGenre;
        const matchesYear = item.release_year >= selectedMinYear && item.release_year <= selectedMaxYear;
        return matchesArtist && matchesTitle && matchesGenre && matchesYear;
    });

    function handleFilterChange(event) {
        const filters = event.detail;
        selectedArtist = filters.selectedArtist;
        selectedTitle = filters.selectedTitle;
        selectedGenre = filters.selectedGenre;
        selectedMinYear = filters.selectedMinYear;
        selectedMaxYear = filters.selectedMaxYear;
    }

    function handleItemClick(item) {
        sessionStorage.setItem('selectedAuction', JSON.stringify(item));
        window.location.href = '/item-details';
    }
</script>

<main class="main-container">
    <aside class="filter-menu">
        <FilterMenu
                bind:selectedArtist={selectedArtist}
                bind:selectedTitle={selectedTitle}
                bind:selectedGenre={selectedGenre}
                bind:selectedMinYear={selectedMinYear}
                bind:selectedMaxYear={selectedMaxYear}
                {genres}
                minYear={1980}
                maxYear={2024}
                on:filterChange={handleFilterChange}
        />
        <AddItem />
    </aside>

    <ul class="item-container">
        {#each filteredItems as item }
            <li class="item-card">
                <div>
                    <a href="/item-details" on:click|preventDefault={() => handleItemClick(item)}>
                        <h3>{item.title}</h3>
                        <p>{item.artist}</p>
                        <p>Release year: {item.release_year}</p>
                    </a>
                </div>
                {#if isAdmin()}
                    <button on:click={() => openEditModal(item)}>Edit</button>
                    <button on:click={() => deleteItem(item)}>Delete</button>
                {/if}
            </li>
        {/each}
    </ul>
</main>


<style>
    .main-container {
        display: grid;
        grid-template-columns: 250px 1fr; /* Filter menu will take 250px, the rest goes to the items */
        gap: 20px; /* Adjust gap as needed */
        padding: 20px;
        align-items: start; /* Aligns both components at the top */
    }

    .filter-menu {
        width: 100%;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .item-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
        padding: 20px;
    }

    .item-card {
        list-style: none;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 10px;
        padding: 20px;
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
</style>
