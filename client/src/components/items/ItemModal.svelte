<script>
    import { createEventDispatcher } from 'svelte';
    import { items } from '../../js/stores.js';

    export let showModal = false;
    export let itemId = null;
    export let itemTitle = '';
    export let itemArtist = '';
    export let itemGenre = '';

    const dispatch = createEventDispatcher();

    async function handleSave() {
        if (!itemId) {
            console.error("Cannot save changes: itemId is missing");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({ title: itemTitle, artist: itemArtist, genre: itemGenre })
            });

            if (response.ok) {
                const updatedItem = await response.json();
                items.update(currentItems => {
                    return currentItems.map(item =>
                        item.item_id === itemId ? updatedItem : item
                    );
                });
                dispatch('cancel');
            } else {
                console.error('Error saving changes:', response.status);
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }

    function handleCancel() {
        dispatch('cancel');
    }
</script>

{#if showModal}
    <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-content">
            <h2>Edit Item</h2>
            <form>
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" bind:value={itemTitle} required />
                </div>
                <div>
                    <label for="artist">Artist:</label>
                    <input type="text" id="artist" bind:value={itemArtist} required />
                </div>
                <div>
                    <label for="genre">Genre:</label>
                    <input type="text" id="genre" bind:value={itemGenre} required />
                </div>
                <button type="button" on:click={handleSave}>Save Changes</button>
                <button type="button" on:click={handleCancel}>Cancel</button>
            </form>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 30%;
    }
</style>