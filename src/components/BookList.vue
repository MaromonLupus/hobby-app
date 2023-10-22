<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { type Book } from '../models/book';
import HobbyCard from '../components/HobbyCard.vue';

const props = defineProps({
  books: Array as () => Book[]
});

const currentPage = ref(1);
const itemsPerPage = 5; // Adjust as needed

const totalPages = computed(() => {
  return Math.ceil(props.books.length / itemsPerPage);
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.books.slice(start, start + itemsPerPage);
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<template>
  <div>
    <div v-for="book in paginatedBooks" :key="book.isbn">
      <HobbyCard :book="book" />
    </div>
    <div class="pagination">
      <button class="btn btn-primary btn-rounded m-1" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-primary btn-rounded m-1" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
    align-content: center;
    align-items: center;
}
button:disabled {
  cursor: not-allowed;
}
</style>
