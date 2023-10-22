<script setup lang="ts">
import { type Book } from '../models/book'
defineProps<{
    book:Book
}>()
</script>

<template>
    <div class="card mb-3" style="width: 100%;">
        <div class="row g-0">
          <div class="col-md-6 d-flex">
            <img :src=book.image class="img-fluid rounded-start" alt="Cover of book">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">{{book.title}}</h5>
              <p class="card-text">{{book.author}}</p>
              <p class="card-text"><small class="text-body-secondary">{{book.isbn}}</small></p>
            </div>
          </div>
        </div>
      </div>
</template>