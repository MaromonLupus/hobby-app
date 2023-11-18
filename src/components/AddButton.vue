<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
</script>
<template>
  <div class="btn btn-primary btn-rounded" style="width: 100%;">
    <RouterLink to="/form">
      <div class="d-flex align-items-center justify-content-center">
        <IconPlus style="max-width: 3rem"></IconPlus>
        <h5 class="card-title" style="color: white">Add new Item</h5>
      </div>
    </RouterLink>
  </div>
</template>