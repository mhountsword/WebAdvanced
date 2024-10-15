<script>
    import { isLoggedIn } from '../../js/logout.js';
    import { isAdmin } from '../../js/adminCheck.js';
    import ItemModal from './ItemModal.svelte'; // Import the ItemModal component
    import { items } from '../../js/stores.js';

    let showModal = false;
    let item = { title: '', artist: '', genre: '' };

    function openAddModal() {
        showModal = true;
        item = { title: '', artist: '', genre: '' }; // Reset the item object
    }

    async function handleAddItem() {
        try {
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify(item) // Send the item object directly
            });

            if (response.ok) {
                showModal = false;
                const responseData = await response.json();
                items.update(existingItems => [...existingItems, responseData.item]);
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Show an alert for the error
            }
        } catch (error) {
            alert('Failed to add item'); // Show an alert for the error
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
            {item}
            title="Add New Item"
            saveItem={handleAddItem}
            onClose={closeModal}
    />
{/if}