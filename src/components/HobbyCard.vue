<script setup lang="ts">
import { type Item } from '../models/item'
const props = defineProps<{ item: Item }>()
</script>

<template>
  <div v-if="item" class="d-flex card w-100 mb-3">
    <div class="row g-0">
      <div class="col-12 col-md-4 d-flex align-items-center justify-content-center">
        <img :src="item.image || 'path/to/default/image.jpg'" class="img-fluid rounded-start" alt="Cover of item">
      </div>
      <div class="col-12 col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text mb-1">{{ item.description }}</p>
          <p class="card-text mb-1"><small class="text-muted">{{ item.isbn }}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-size: 1.25rem;
}
</style>
