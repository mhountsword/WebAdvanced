<!-- For displaying success or error messages -->
<script>
    export let messageType = '';
    export let message = '';
</script>

<div class="message-{messageType}">
    {#if message}
        <p>{message}</p>
    {/if}
</div>

<style>
    .message-success {
        color:green;
    }

    .message-error {
        color: red;
    }
</style>
