<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainHead from './components/MainHead.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-4">
        <RouterLink to="/" class="col-12 col-md-4 mb-4">
          <div class="header-content d-flex flex-column justify-content-center align-items-center">
            <div class="wrapper">
              <MainHead>
                <img alt="Vue logo" class="logo mb-4" src="@/assets/logo.svg" width="125" height="125" />
                <template v-slot:title>
                  <h1 class="green display-4">Hobby App</h1>
                </template>
                <template v-slot:extraTitle>
                  <h3 class="fs-4">Your Hobby is here</h3>
                </template>
              </MainHead>
            </div>
          </div>
        </RouterLink>
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-center align-items-center">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
a{
  text-decoration: none;
}
.header-content {
  padding-right: 0;
  text-align: center;

  @media (min-width: 768px) {
    min-height: 100vh;
  }
}

.logo {
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .header-content {
    padding-right: 0;
  }
}
.greetings h1.green {
  color: green;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>