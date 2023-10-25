<script setup lang="ts">
import { type Book } from '../models/book'
const props = defineProps<{ book: Book }>()
</script>

<template>
  <div v-if="book" class="d-flex card mb-3">
    <div class="row g-0">
      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <img :src="book.image || 'path/to/default/image.jpg'" class="img-fluid rounded-start" alt="Cover of book">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <p class="card-text">{{ book.author }}</p>
          <p class="card-text"><small class="text-muted">{{ book.isbn }}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}

.card-title {
  font-size: 1.25rem; /* Adjust as necessary */
}

.card-text {
  margin-bottom: 0.5rem;
}
</style>
