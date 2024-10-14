<script>
    import ItemList from '../components/ItemList.svelte';
    import AddItem from '../components/AddItem.svelte';
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