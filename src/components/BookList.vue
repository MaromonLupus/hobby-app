<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import { type Book } from '../models/book';
import HobbyCard from '../components/HobbyCard.vue';

const props = defineProps({
  books: {
    type: Array as () => Book[],
    default: () => []
  }
});

const emit = defineEmits(['book-click']);

const showBookDetails = (book: Book) => {
  emit('book-click', book);
};


const currentPage = ref(1);
const itemsPerPage = 1;


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
    <div v-if="paginatedBooks.length > 0" class="col-12">
          <HobbyCard v-for="book in paginatedBooks" @click="showBookDetails(book)" :book="book" :key="book.isbn"/>
      </div>
      <div v-else>
        <p>No books available.</p>
      </div>
    <div class="pagination" v-if="totalPages > 1">
      <button class="btn btn-primary btn-rounded m-1" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-primary btn-rounded m-1" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

button:disabled {
  cursor: not-allowed;
}

HobbyCard {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

HobbyCard:hover {
  transform: scale(1.05);
}
</style>