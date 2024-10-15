<script>
    export let show = false; // To control visibility of the modal
    export let item = {}; // The item being edited
    export let onClose; // Function to close the modal

    function closeModal() {
        onClose();
    }
</script>

{#if show}
    <div class="modal-backdrop">
        <div class="modal-content">
            <h2>Edit Item</h2>
            <input type="text" bind:value={item.title}/> <!-- Editable title -->
            <br/>
            <!-- You can add more fields for other properties like artist, genre, etc. -->
            <button on:click={closeModal}>Close</button>
        </div>
    </div>
{/if}

<style>
    /* Basic styles for the modal */
    .modal-backdrop {
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
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        min-width: 300px;
    }
</style>
