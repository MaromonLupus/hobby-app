<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainHead from './components/MainHead.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <RouterLink to="/" class="col-md-4 mb-4">
          <div class="header-content d-flex flex-column justify-content-center align-items-center">
            <img alt="Vue logo" class="logo mb-4" src="@/assets/logo.svg" width="125" height="125" />
            <div class="wrapper">
              <MainHead msg="Hobby App"/>
            </div>
          </div>
        </RouterLink>
      </div>
      <div class="col-md-8 d-flex justify-content-center align-items-center">
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
</style>