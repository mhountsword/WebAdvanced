<script>
    import Modal from './ItemModal.svelte'; // Import the Modal component

    let showModal = false;
    let selectedItem = { title: "Sample Item" }; // Example item data

    export function openModal(item) {
        selectedItem = item;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }
</script>

<!-- Buttons for Edit and Delete -->
<button on:click={openModal}>Edit</button>
<button on:click={() => console.log("Delete action")}>Delete</button>
<!-- Render the modal, passing the show state and item data -->
<Modal show={showModal} item={selectedItem} onClose={closeModal} />

<style>
    button {
        margin-top: auto;
    }
</style>
