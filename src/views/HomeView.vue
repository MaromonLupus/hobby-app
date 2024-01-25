<script setup lang="ts">
import { onMounted } from 'vue';
import ItemList from '@/components/ItemList.vue';
import ItemFilter from '@/components/ItemFilter.vue';
import AddButton from '@/components/AddButton.vue';
import ItemDetails from '@/components/ItemDetails.vue';
import useItemStore from '@/stores/items';

const itemStore = useItemStore();

onMounted(() => {
  itemStore.fetchItems();
});

const exportData = () => {
  const dataStr = JSON.stringify(itemStore.items, null, 2);
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
    itemStore.items = parsedData;
    localStorage.setItem('items',JSON.stringify(parsedData));
  } catch (error:any) {
    alert('Failed to import data: ' + error.message);
  }
}
</script>

<template>
  <div v-if="!itemStore.selectedItem" class="w-100">
    <div class="row align-content-center">
      <div class="col-6 mb-4 ">
        <button @click="exportData" class="btn btn-success" style="width: 100%;">Export Data</button>
      </div>
      <div class="col-6 mb-4">
        <input type="file" change="importData" class="btn btn-info" accept=".json" style="width: 100%;" />
      </div>
    </div>
    <div class="row align-content-center">
      <div class="col-12 col-md-8 mb-4">
        <ItemFilter v-model="itemStore.searchQuery" :types="itemStore.types" :initialType="itemStore.selectedType" @update:type="itemStore.updateType" />
      </div>
      <div class="col-12 col-md-4 mb-4">
        <AddButton @add-item="itemStore.addItem"></AddButton>
      </div>
    </div>
    <div class="row">
      <ItemList :items="itemStore.filteredItems" @item-click="itemStore.showItemDetails" />
    </div>
  </div>
  
  <div v-if="itemStore.selectedItem" class="row">
    <ItemDetails :item="itemStore.selectedItem" @item-close="itemStore.closeItemDetails" @delete-item="itemStore.deleteItem" />
  </div>
</template>