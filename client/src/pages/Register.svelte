<script>
    import LoginForm from '../components/LoginForm.svelte';
</script>
<h1>
    Register
</h1>
<p>
    Already a user? <a href="/login">click here to login!</a>
</p>
<LoginForm includeEmail={true} /> <!--include email-->


