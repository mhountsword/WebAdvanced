<script>
    import ItemList from '../components/items/ItemList.svelte';
    import AddItem from '../components/items/AddItem.svelte';
</script>

<div class="container">
    <ItemList />
    <AddItem />
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 20px;
        padding: 20px;
    }
</style>