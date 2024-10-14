<script>
    import { createEventDispatcher } from 'svelte';
    import { items } from '../..//js/stores.js';

    export let itemId;
    const dispatch = createEventDispatcher();

    function handleEdit() {
        // Fetch the item data from the store
        const itemToEdit = $items.find(item => item.item_id === itemId);

        // If the item exists, dispatch the 'edit' event with its data
        if (itemToEdit) {
            dispatch('edit', {
                itemId: itemToEdit.item_id,
                itemTitle: itemToEdit.title,
                itemArtist: itemToEdit.artist,
                itemGenre: itemToEdit.genre
            });
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            });

            if (response.ok) {
                items.update(currentItems => {
                    return currentItems.filter(item => item.item_id !== itemId);
                });
            } else {
                console.error('Error deleting item:', response.status);
            }
        } catch (error) {
            console.error('Error deleting item:', error);

        }
    }
</script>

<div class="actions">
    <button on:click={handleEdit}>Edit</button>
    <button on:click={handleDelete}>Delete</button>
</div>

<style>
    .actions {
        margin-top: 10px;
    }

    button {
        margin-right: 5px;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #eee;
        cursor: pointer;
        transition: transform 0.1s;
    }

    button:hover {
        transform: scale(1.15);
    }
</style>