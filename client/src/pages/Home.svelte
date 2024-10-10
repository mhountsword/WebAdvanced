<script>
    import FilterMenu from '../components/FilterMenu.svelte';
    import AuctionList from '../components/AuctionList.svelte';
</script>

<div class="container">
    <FilterMenu />
    <AuctionList />
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 250px 1fr; /* Adjust widths as needed */
        gap: 20px;
        padding: 20px;
    }
</style>