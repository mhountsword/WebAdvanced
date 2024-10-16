<script>
    import AccountForm from '../components/AccountForm.svelte';
</script>
<h1>
    Register
</h1>
<p>
    Already a user? <a href="/login">click here to login!</a>
</p>
<AccountForm registering={true} /> <!--include email-->


