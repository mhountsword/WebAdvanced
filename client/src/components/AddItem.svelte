<script>
    import { isLoggedIn} from '../js/logout.js';
    let showModal = false;
    let errorMessage = '';
    let itemTitle = '';
    let itemArtist = '';
    let itemGenre = '';

    // Function to check if the user is an admin
    function isAdmin() {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token); // Function to decode the JWT (see below)
            console.log(token);
            console.log(decodedToken.userRole === 'admin');
            return decodedToken.userRole === 'admin';
        }
        return false;
    }

    // Helper function to decode the JWT
    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    async function handleAddItem() {

        try {
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token') // Include JWT for authorization
                },
                body: JSON.stringify({
                    title: itemTitle,
                    artist: itemArtist,
                    genre: itemGenre
                })
            });

            if (response.ok) {
                // Item added successfully
                showModal = false; // Close the modal
                // Optionally, you can refresh the item list or display a success message
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message; // Display the error message from the backend
            }
        } catch (error) {
            errorMessage = 'Failed to add item'; // Handle network or other errors
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
            <h2 id="modal-title">Add New Item</h2>
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
                <div class="error">{errorMessage}
                    <button type="submit">Add Item</button>
                    <button type="button" on:click={() => showModal = false}>Cancel</button>
                </div>
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
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background overlay */
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

    /* Error message styles */
    .error {
        color: red;
        margin-top: 10px;
    }
</style>
