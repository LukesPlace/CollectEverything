<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import router from './router';


  function onHomeButtonClick() {
    router.push('/');
  }
</script>

<template>
  <header>
    <button @click="onHomeButtonClick">
      <img alt="CE logo" class="logo" src="@/assets/CELogo.png" width="55" height="75"/>
    </button>
    <h1>Collect Everything!</h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/collections">Collections</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>

body {
  font-family: 'Rubik', sans-serif;
}

button {
  background-color: var(--color-background);
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

header {
  display: flex;
  z-index: 100;
  position: sticky;
  background-color: var(--color-background);
  top: 0px;
  line-height: 1.5;
  width: 100vw;
  max-height: 100vh;
  padding: 1rem;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    z-index: 100;
    position: sticky;
    background-color: var(--color-background);
    top: 0px;
    line-height: 1.5;
    max-height: 100vh;
    width: 100vw;
    align-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin-left: 2rem;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
