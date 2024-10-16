<script>
    import MessageComponent from "./MessageComponent.svelte";

    let email = '';
    let username = '';
    let password = '';
    let passwordConfirm = '';
    let buttonPrompt = '';
    let displayMessage = '';
    let messageType = '';
    export let registering = true; // Whether to include email submission

    if (registering) {
        buttonPrompt = "Register";
    } else {
        buttonPrompt = "Login";
    }

    async function registerUser() {
        if (registering) {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, passwordConfirm }),
            });

            if (response.ok) {
                document.body.style.cursor = 'wait';

                messageType = 'success';
                displayMessage = 'User registered!';

                setTimeout(() => {
                    displayMessage = 'Logging in user...';
                    loginUser();
                }, 1000); //small delay (2s) to have visual confirmation for user

            } else {
                const data = await response.json();
                displayMessage = data.message || 'Registration failed';
                messageType = 'error';
            }
        } else {
            await loginUser();
        }
    }

    async function loginUser() {
        console.log(password);
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            document.body.style.cursor = 'wait';

            displayMessage = 'User logged in!';
            messageType = 'success';

            response.json().then(data => {
                sessionStorage.setItem('token', data.token); //if user closes browser or window, token is gone
                sessionStorage.setItem("username", username);
            });

            setTimeout(() => {
                window.location.href = '/'; //redirect user to homepage after succesful login
            }, 2000);

        } else {
            console.log("response NOT ok");
            const data = await response.json();

            messageType = 'error';
            displayMessage = data.message || 'Login failed';
        }
    }
</script>

<form on:submit|preventDefault={registerUser}>
    {#if registering}
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
    {#if registering}
        <div>
            <label for="email">Confirm Password:</label>
            <input type="password" id="password-confirm" bind:value={passwordConfirm} required>
        </div>
    {/if}
    <div class="message-container">
        {#if displayMessage}
            <MessageComponent
            message = {displayMessage}
            messageType = {messageType}
            />
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
</style>