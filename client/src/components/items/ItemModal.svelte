<script>
    export let item;
    export let onClose;
    export let title; // Prop for the modal title
    export let saveItem; // Prop for the save function
    let message = '';
    let messageType = '';

    function closeModal() {
        onClose();
    }

    function handleSave() {
        saveItem(item);
    }

    function showMessage(text, type) {
        message = text;
        messageType = type;
    }
</script>

<div class="modal-backdrop">
    <div class="modal-content">
        <h2>{title}</h2>

        {#if message} <!-- Displaying error messages -->
            <p class:success={messageType === 'success'} class:error={messageType === 'error'}>
                {message}
            </p>
        {/if}

        <div class="input-group">
            <label for="title">Title:</label>
            <input type="text" id="title" bind:value={item.title} />
        </div>

        <div class="input-group">
            <label for="artist">Artist:</label>
            <input type="text" id="artist" bind:value={item.artist} />
        </div>

        <div class="input-group">
            <label for="genre">Genre:</label>
            <input type="text" id="genre" bind:value={item.genre} />
        </div>

        <div class="button-group">
            <button on:click={closeModal}>Cancel</button>
            <button on:click={handleSave}>Save</button>
        </div>
    </div>
</div>

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
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        min-width: 300px;
        width: 15%;
        display: flex; /* Enable flexbox for the modal content */
        flex-direction: column; /* Align items vertically */
        align-items: center; /* Center horizontally */
    }

    .input-group {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .modal-content button {
        margin-top: 10%;
    }

    .message {
        margin-top: 10px;
        padding: 8px 12px;
        border-radius: 4px;
    }

    .message.success {
        background-color: #d4edda;
        border-color: #c3e6cb;
        color: #155724;
    }

    .message.error {
        background-color: #f8d7da;
        border-color: #f5c6cb;
        color: #721c24;
    }
</style>
