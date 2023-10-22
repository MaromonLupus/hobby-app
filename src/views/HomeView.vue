<script setup lang="ts">
import BookList from '@/components/BookList.vue';
import BookFilter from '@/components/BookFilter.vue';
import AddButton from '@/components/AddButton.vue';
import { ref, onMounted, computed } from 'vue';
import { type Book } from '../models/book';

const books = ref([] as Book[]);
const searchQuery = ref('');
const selectedType = ref('Book');
const types = ref(["Book", "Coin", "Stamp", "Toy"]);

onMounted(() => {
  fetchBooks();
});

function updateType(newType: string) {
  selectedType.value = newType;
}

function fetchBooks() {
  books.value = JSON.parse(localStorage.getItem('books') || '[]');
}

const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let type = selectedType.value.toLowerCase();
  return books.value.filter((book: Book) => {
    return (
      (book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)) &&
      book.type.toLowerCase().match(type)
    );
  });
});
</script>

<template>
  <div class="row">
    <div class="col-8">
      <BookFilter v-model="searchQuery" :types="types" :initialType="selectedType" @update:type="updateType" />
    </div>
    <div class="col-4">
      <AddButton></AddButton>
    </div>
    <BookList :books="filteredBooks" />
  </div>
</template>
