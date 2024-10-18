<script>
    import { onMount } from 'svelte';
    import { isLoggedIn } from '../js/logout.js'; // Assuming this function returns the user object if logged in

    let user = null;
    let wonAuctions = [];

    onMount(() => {
        user = isLoggedIn();
        if (user) {
            fetchWonAuctions();
        }
    });

    async function fetchWonAuctions() {
        // Fetch won auctions for the user (replace with your actual API endpoint)
        try{
            const response = await fetch(`http://localhost:3000/api/auth/${user.username}/won-auctions`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                },
            });
            if (response.ok) {
                wonAuctions = await response.json();
                console.log(wonAuctions);
            } else {
                console.error('Error fetching won auctions:', response.status);
            }
        } catch (error) {
            console.error("Auction fetch failed:", error);
        }
    }
</script>

{#if user}
    <h1>Welcome, {user.username}!</h1>

    <h2>Won Auctions</h2>
    {#if wonAuctions.length > 0}
        <div class="won-auctions">
            <ul>
                {#each wonAuctions as auction}
                    <li>{auction.title} - {auction.artist}</li>
                {/each}
            </ul>
        </div>
    {:else}
        <p>You haven't won any auctions yet.</p>
    {/if}
{:else}
    <p>Please log in to view your profile.</p>
{/if}

<style>
    .won-auctions ul {
        list-style: none;
    }
</style>