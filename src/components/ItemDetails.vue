<template>
  <div v-if="item" class="item-details p-3 mt-4">
    <div class="row">
      <div class="col-6 col-md-6">
        <button @click="itemStore.closeItemDetails" class="btn btn-secondary">Close</button>
      </div>
      <div class="col-6 col-md-6 d-flex justify-content-end">
        <button @click="itemStore.deleteItem(item.id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 col-md-12">
        <h2>{{ item.title }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 " :class="[item.image != null ? 'col-md-4' : '']">
        <p><strong>Opis:</strong> {{ item.description }}</p>
        <p><strong>ID:</strong> {{ item.id }}</p>
        <p><strong>Type:</strong> {{ item.type }}</p>
      </div>
      <div v-if="item.image != null" class="col-12 col-md-8">
        <img :src="item.image" alt="Item Cover" class="img-fluid" />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import useItemStore from '@/stores/items';
import { defineProps } from 'vue';

const itemStore = useItemStore();
const props = defineProps({
  item: Object
});

</script>
  
<style scoped>
.item-details {
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
  