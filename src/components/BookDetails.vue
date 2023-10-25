<template>
    <div v-if="book" class="book-details">
      <div class="row">
        <div class="col-12 text-right">
          <button @click="closeDetails" class="btn btn-secondary">X</button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <h2>{{ book.title }}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <p><strong>Author:</strong> {{ book.author }}</p>
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Type:</strong> {{ book.type }}</p>
        </div>
        <div class="col-8">
          <img v-if="book.image" :src="book.image" alt="Book Cover" class="img-fluid"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    book: Object
  });
  
  const emit = defineEmits(['close']);
  
  const closeDetails = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .book-details {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  