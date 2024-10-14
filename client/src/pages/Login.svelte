<script>
    import LoginForm from '../components/AccountForm.svelte';
</script>
<h1>
    Login
</h1>
<p>
    No account yet? <a href="/register">click here to register!</a>
</p>
<LoginForm registering={false}/> <!--omit email, only username & password required-->