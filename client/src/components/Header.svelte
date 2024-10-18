<script>
    import { isLoggedIn, handleLogout } from '../js/logout.js'; // Import the functions
    export let active;
</script>

<header>
    <nav>
        <div class="navigation">
            <a href="/" class:active={active === '/'}>Home</a>
            <a href="/about" class:active={active === '/about'}>About Us</a>
        </div>
        <div class="register">
            {#if isLoggedIn()}
                <a href="/profile">Profile</a>
                <a href="/logout" on:click|preventDefault={handleLogout}>Logout</a>
            {:else}
                <a href="/register" class:active={active === '/register'}>Register / Login</a>
            {/if}
        </div>
    </nav>
</header>

<style>
    header {
        background-color: #f0f0f0;
        padding: 10px;
        width: 100%;
    }

    nav {
        display: flex;
    }

    nav a {
        margin: 0 10px;
        text-decoration: none;
        color: #333;
    }

    nav a:hover {
        color: #5e5d5d;
    }
</style>