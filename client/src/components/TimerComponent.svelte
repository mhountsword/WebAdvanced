<script>
    import { onMount, createEventDispatcher } from "svelte";

    export let endTime; // Time when the auction ends
    let remainingTime = 0;
    let interval;

    const dispatch = createEventDispatcher();

    function calculateTimeLeft() {
        const now = new Date().getTime();
        remainingTime = Math.max(0, endTime - now);

        // If the auction has ended, notify the parent
        if (remainingTime === 0) {
            clearInterval(interval); // Stop the timer
            dispatch('auctionEnd'); // Notify the parent that the auction has ended
        }
    }

    // Convert milliseconds to readable time
    function formatTime(ms) {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        let days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Start timer when component mounts
    onMount(() => {
        calculateTimeLeft();
        interval = setInterval(calculateTimeLeft, 1000);

        // Clean up when component is destroyed
        return () => clearInterval(interval);
    });

    console.log(remainingTime);
</script>

{#if remainingTime > 0}
    <p>Time left: {formatTime(remainingTime)}</p>
{:else}
    <p>Auction Ended!</p>
{/if}

<style>
    p {
        font-size: 18px;
        color: red;
    }
</style>
