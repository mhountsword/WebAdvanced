<script>
    import MessageComponent from "../MessageComponent.svelte";
    export let formData;
    export let onClose;
    export let title;
    export let saveItem;
    export let message = '';
    export let messageType = ''; // 'success' or 'error'

    function closeModal() {
        message = '';
        onClose();
    }

    function handleSave() {
        saveItem(formData); // Pass formData to saveItem
    }
</script>

<div class="modal-backdrop">
    <div class="modal-content">
        <h2>{title}</h2>

        <div class="message-container">
            {#if message}
                <MessageComponent
                message={message}
                messageType={messageType}
                />
            {/if}
        </div>

        <div class="input-group">
            <label for="title">Title:</label>
            <input type="text" id="title" bind:value={formData.title} required/>
        </div>

        <div class="input-group">
            <label for="artist">Artist:</label>
            <input type="text" id="artist" bind:value={formData.artist} required/>
        </div>

        <div class="input-group">
            <label for="genre">Genre:</label>
            <input type="text" id="genre" bind:value={formData.genre} required/>
        </div>

        <div class="input-group">
            <label for="release-year">Release year:</label>
            <input type="number" id="release-year" bind:value={formData.release_year} required/>
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
        display: flex;
        flex-direction: column;
        align-items: center;
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
</style>
