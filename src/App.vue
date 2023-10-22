<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainHead from './components/MainHead.vue'
</script>

<template>
  <div class="container">
    <div class="row">
    <div class="col-4">
      <RouterLink to="/">
      <header class="row justify-content-center align-content-center">
        <img alt="Vue logo" class="logo mb-4" src="@/assets/logo.svg" width="125" height="125" />
        <div class="wrapper">
          <MainHead msg="Hobby App"/>
        </div>
      </header>
      </RouterLink>
    </div>
    <div class="col-8 d-flex justify-content-center align-items-center align-content-center">
      <RouterView />
    </div>
  </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 100vh;
}
.dark{
  background-color: black;
  color: aliceblue;
}
.gray{
  background-color: gray;
  color: aliceblue;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
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
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
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
