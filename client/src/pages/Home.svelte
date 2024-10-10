<script>
    import ItemList from '../components/ItemList.svelte';
</script>

<div class="container">
    <ItemList />
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 250px 1fr; /* Adjust widths as needed */
        gap: 20px;
        padding: 20px;
    }
</style>