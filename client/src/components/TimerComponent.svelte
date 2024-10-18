<script>
    import { createEventDispatcher, onDestroy } from "svelte";

    export let endTime; // Auction end time
    let remainingTime;
    let interval;

    const dispatch = createEventDispatcher();

    // Calculate remaining time immediately when the component loads
    function calculateRemainingTime() {
        const now = new Date().getTime();
        remainingTime = endTime - now;
    }

    // Start the timer calculation
    function startTimer() {
        interval = setInterval(() => {
            calculateRemainingTime();

            // If time runs out, dispatch auctionEnd event
            if (remainingTime <= 0) {
                remainingTime = 0;
                clearInterval(interval);
                dispatch('auctionEnd');
            }
        }, 100); // Update timer every second
    }

    // Reactively re-start the timer if endTime changes
    $: if (endTime) {
        calculateRemainingTime(); // Calculate time as soon as component is loaded
        startTimer(); // Then start the interval
    }

    // Cleanup on destroy
    onDestroy(() => {
        clearInterval(interval);
    });

    // Convert milliseconds to readable time format
    function formatTime(ms) {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        let days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
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
