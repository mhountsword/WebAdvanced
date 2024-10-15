<script>
    import { isLoggedIn } from '../../js/logout.js';
    import { items } from '../../js/stores.js';
    import { isAdmin } from '../../js/adminCheck.js';

    let showModal = false;
    let errorMessage = '';
    let itemTitle = '';
    let itemArtist = '';
    let itemGenre = '';

    async function handleAddItem() {
        try {
            // Send POST request to add the new item
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({ title: itemTitle, artist: itemArtist, genre: itemGenre })
            });

            // Wait for the response and process the new item
            if (response.ok) {
                showModal = false;
                const responseData = await response.json();
                const newItem = responseData.item;

                // Update the items store after getting the new item data
                items.update(existingItems => [...existingItems, newItem]);
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message;
            }
        } catch (error) {
            errorMessage = 'Failed to add item';
        }
    }
</script>

{#if isLoggedIn()}
    {#if isAdmin()}
        <button on:click={() => showModal = true}>Add Item</button>
    {/if}
{/if}

{#if showModal}
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-content">
            <h2>Add New Item</h2>
            <form on:submit|preventDefault={handleAddItem}>
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
                <div class="error">{errorMessage}</div>
                <button type="submit">Add Item</button>
                <button type="button" on:click={() => showModal = false}>Cancel</button>
            </form>
        </div>
    </div>
{/if}

<style>
    /* Modal styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    .error {
        color: red;
        margin-top: 10px;
    }
</style>