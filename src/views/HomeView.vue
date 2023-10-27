<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import ItemFilter from '@/components/ItemFilter.vue';
import AddButton from '@/components/AddButton.vue';
import { ref, onMounted, computed } from 'vue';
import { type Item } from '../models/item';
import ItemDetails from '@/components/ItemDetails.vue';
const items = ref([] as Item[]);
const searchQuery = ref('');
const selectedType = ref('Item');
const types = ref(["Item", "Coin", "Stamp", "Toy"]);
const selectedItem = ref(null);

const showItemDetails = (item) => {
  selectedItem.value = item;
};

const closeItemDetails = () => {
  selectedItem.value = null;
};

onMounted(() => {
  fetchItems();
});

function updateType(newType: string) {
  selectedType.value = newType;
}

function fetchItems() {
  items.value = JSON.parse(localStorage.getItem('items') || '[]');
}

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let type = selectedType.value.toLowerCase();
  return items.value.filter((item: Item) => {
    return (
      (item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)) &&
      item.type.toLowerCase().match(type)
    );
  });
});
const exportData = () => {
  const dataStr = JSON.stringify(items.value, null, 2);
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
    items.value = parsedData;
  } catch (error) {
    alert('Failed to import data: ' + error.message);
  }
}
</script>

<template>
  <div v-if="!selectedItem" class="w-100">
    <div class="row">
      <div class="col-12 col-md-6 mb-4 ">
        <button @click="exportData" class="btn btn-success">Export Data</button>
      </div>
      <div class="col-12 col-md-6 mb-4">
        <input type="file" @change="importData" class="btn btn-info" accept=".json" style="width: 100%;" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 mb-4">
        <ItemFilter v-model="searchQuery" :types="types" :initialType="selectedType" @update:type="updateType" />
      </div>
      <div class="col-12 col-md-4 mb-4">
        <AddButton></AddButton>
      </div>
    </div>
    <div class="row">
      <ItemList :items="filteredItems" @item-click="showItemDetails" />
    </div>
  </div>
  <div v-if="selectedItem" class="row">
    <ItemDetails :item="selectedItem" @close="closeItemDetails" />
  </div>
</template>