<script>
    import { isLoggedIn } from '../../js/logout.js';
    import { isAdmin } from '../../js/adminCheck.js';
    import { items } from '../../js/itemStore.js';
    import ItemModal from './ItemModal.svelte';

    let showModal = false;
    let formData = { title: '', artist: '', genre: '', release_year: '' }; // Update to formData
    let displayMessage = '';
    let messageType = '';

    function openAddModal() {
        showModal = true;
        formData = { title: '', artist: '', genre: '', release_year: '' }; // Reset the formData object
    }

    async function handleAddItem() {
        try {
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(formData) // Send formData instead of item
            });

            if (response.ok) {
                showModal = false;
                const responseData = await response.json();
                console.log(responseData);
                items.update(existingItems => [...existingItems, responseData.item]); // Update store with new item
            } else {
                const errorData = await response.json();
                displayMessage = errorData.message;
                messageType = 'error';
            }
        } catch (error) {
            displayMessage = 'Failed to add item';
            messageType = 'error';
        }
    }

    function closeModal() {
        showModal = false;
    }
</script>

{#if isLoggedIn()}
    {#if isAdmin()}
        <button on:click={openAddModal}>Add Item</button>
    {/if}
{/if}

{#if showModal}
    <ItemModal
    {formData}
    title="Add New Item"
    saveItem={handleAddItem}
    onClose={closeModal}
    message={displayMessage}
    messageType={messageType}
    />
{/if}
