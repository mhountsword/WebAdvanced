<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Register from "./pages/Register.svelte";
  import Login from "./pages/Login.svelte";
  import Header from "./components/Header.svelte";
  import ItemDetails from "./pages/ItemDetails.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/about', (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
    params = ctx;
  });
  router('/register', (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
    params = ctx;
  });
  router('/item-details', (ctx) => {
    page = ItemDetails;
    currentRoute = ctx.pathname;
    params = ctx;
  });
  router('/login', (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
    params = ctx;
  })
  router.start();
</script>

<main>
  <Header active={currentRoute} />
  <svelte:component this={page} {params} />
</main>

<style>

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
  }
</style>
