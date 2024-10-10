<script>
    let email = '';
    let username = '';
    let password = '';
    let buttonPrompt = '';
    let message = '';
    let messageType = ''; // 'success' or 'error'
    export let includeEmail = true; // Whether to include email submission

    if (includeEmail) {
        buttonPrompt = "Register";
    } else {
        buttonPrompt = "Login";
    }

    function displayMessage(updatedMessage, type) {
        messageType = type;
        message = updatedMessage;
    }

    async function handleSubmit() {
        if (includeEmail) {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                document.body.style.cursor = 'wait';

                displayMessage('User registered!', 'success');
                setTimeout(() => {
                    window.location.href = '/login'; //redirect user to login after succesful login
                }, 2000); //small delay (2s) to have visual confirmation for user
            } else {
                const data = await response.json();
                displayMessage(data.message || 'Registration failed', 'error');
            }
        } else {
            console.log(password);
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                document.body.style.cursor = 'wait';

                console.log("response ok");
                displayMessage('User logged in!', 'success');
                setTimeout(() => {
                    window.location.href = '/'; //redirect user to homepage after succesful login
                }, 2000);

            } else {
                console.log("response NOT ok");
                const data = await response.json();
                displayMessage(data.message || 'Login failed', 'error');
            }
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}> {#if includeEmail}
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required>
    </div>
{/if}

    <div>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} required>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required>
    </div>
    <div>
        {#if message}
            <p class:success={messageType === 'success'} class:error={messageType === 'error'}>
                {message}
            </p>
        {/if}
    </div>
    <button type="submit">{buttonPrompt}</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto;
    }

    div {
        margin-bottom: 10px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    .success {
        color: green;
    }

    .error {
        color: red;
    }
</style>