<script setup lang="ts">
import BookList from '@/components/BookList.vue';
import BookFilter from '@/components/BookFilter.vue';
import AddButton from '@/components/AddButton.vue';
import { ref, onMounted, computed } from 'vue';
import { type Book } from '../models/book';
import BookDetails from '@/components/BookDetails.vue';
const books = ref([] as Book[]);
const searchQuery = ref('');
const selectedType = ref('Book');
const types = ref(["Book", "Coin", "Stamp", "Toy"]);
const selectedBook = ref(null);

const showBookDetails = (book) => {
  selectedBook.value = book;
};

const closeBookDetails = () => {
  selectedBook.value = null;
};

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
const exportData = () => {
  const dataStr = JSON.stringify(books.value, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Function to import data from a JSON file
const importData = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const data = await file.text();
    const parsedData = JSON.parse(data);
    books.value = parsedData;
  } catch (error) {
    alert('Failed to import data: ' + error.message);
  }
}
</script>

<template>
  <div v-if="!selectedBook" class="row">
    <div class="row mb-4 p-0">
      <div class="col-md-6 ">
        <button @click="exportData" class="btn btn-success">Export Data</button>
      </div>
      <div class="col-md-6">
        <input type="file" @change="importData" class="btn btn-info" accept=".json" />
      </div>
    </div>
    <div class="col-8">
      <BookFilter v-model="searchQuery" :types="types" :initialType="selectedType" @update:type="updateType" />
    </div>
    <div class="col-4">
      <AddButton></AddButton>
    </div>
    <BookList :books="filteredBooks" @book-click="showBookDetails" />
  </div>
  <div v-if="selectedBook" class="row">
    <BookDetails :book="selectedBook" @close="closeBookDetails" />
  </div>
</template>