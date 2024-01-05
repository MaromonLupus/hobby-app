<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type Item } from '../models/item';
import ItemList from '@/components/ItemList.vue';
import ItemFilter from '@/components/ItemFilter.vue';
import AddButton from '@/components/AddButton.vue';
import ItemDetails from '@/components/ItemDetails.vue';

// Your JSON server endpoint
const apiEndpoint = 'http://localhost:3000/things';

const items = ref([] as Item[]);
const searchQuery = ref('');
const selectedType = ref('Book');
const types = ref(["Book", "Coin", "Stamp", "Toy"]);
const selectedItem = ref(null);

const showItemDetails = (item: null) => {
  selectedItem.value = item;
};

const closeItemDetails = () => {
  selectedItem.value = null;
};

const deleteItem = async (itemToDelete: Item) => {
  closeItemDetails();
  await fetch(`${apiEndpoint}/${itemToDelete.id}`, {
    method: 'DELETE',
  });
  fetchItems(); // Refresh the list
};

onMounted(() => {
  fetchItems();
});

function updateType(newType: string) {
  selectedType.value = newType;
}

async function fetchItems() {
  const response = await fetch(apiEndpoint);
  items.value = await response.json();
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

const addItem = async (newItem: Item) => {
  await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  fetchItems(); // Refresh the list
};

const exportData = () => {
  const dataStr = JSON.stringify(items.value, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = 'data.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

const importData = async (event: { target: { files: any[]; }; }) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const data = await file.text();
    const parsedData = JSON.parse(data);
    items.value = parsedData;
    localStorage.setItem('items',JSON.stringify(parsedData));
  } catch (error:any) {
    alert('Failed to import data: ' + error.message);
  }
}
</script>

<template>
  <div v-if="!selectedItem" class="w-100">
    <div class="row align-content-center">
      <div class="col-6 mb-4 ">
        <button @click="exportData" class="btn btn-success" style="width: 100%;">Export Data</button>
      </div>
      <div class="col-6 mb-4">
        <input type="file" @change="importData" class="btn btn-info" accept=".json" style="width: 100%;" />
      </div>
    </div>
    <div class="row align-content-center">
      <div class="col-12 col-md-8 mb-4">
        <ItemFilter v-model="searchQuery" :types="types" :initialType="selectedType" @update:type="updateType" />
      </div>
      <div class="col-12 col-md-4 mb-4">
        <AddButton @add-item="addItem"></AddButton>
      </div>
    </div>
    <div class="row">
      <ItemList :items="filteredItems" @item-click="showItemDetails" />
    </div>
  </div>
  <div v-if="selectedItem" class="row">
    <ItemDetails :item="selectedItem" @close="closeItemDetails" @delete-item="deleteItem" />
  </div>
</template>