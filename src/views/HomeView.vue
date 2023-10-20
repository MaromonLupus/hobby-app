<script setup lang="ts">
import HobbyCard from '../components/HobbyCard.vue';
import { type Book } from '../models/book.ts'
</script>

<template>
  <div class="row justify-content-center align-items-center align-content-center">
    <HobbyCard v-for="book in books"  :book=book></HobbyCard>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      books:[] as Book[]
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      this.books = JSON.parse(localStorage.getItem('books') || '[]');
    }
  }
};
</script>