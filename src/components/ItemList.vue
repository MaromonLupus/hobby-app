<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import { type Item } from '../models/item';
import HobbyCard from '../components/HobbyCard.vue';

const props = defineProps({
  items: {
    type: Array as () => Item[],
    default: () => []
  }
});

const emit = defineEmits(['item-click']);

const showItemDetails = (item: Item) => {
  emit('item-click', item);
};


const currentPage = ref(1);
const itemsPerPage = 3;


const totalPages = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.items.slice(start, start + itemsPerPage);
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<template>
  <div v-if="paginatedItems.length > 0" class="col-12 col-md-12">
    <HobbyCard class="hobby-card" v-for="item in paginatedItems" @click="showItemDetails(item)" :item="item" :key="item.id" />
  </div>
  <div v-else>
    <p>No items available.</p>
  </div>
  <div class="pagination" v-if="totalPages > 1">
    <button class="btn btn-primary btn-rounded m-1" @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="btn btn-primary btn-rounded m-1" @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages">Next</button>
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

.hobby-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  height: 16rem;
}

.hobby-card:hover {
  transform: scale(1.05);
}
</style>