<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  initialType: String,
  types: Array
});

const emit = defineEmits(['update:modelValue', 'update:type']);

const searchQuery = ref(props.modelValue || '');
const selectedType = ref(props.initialType || '');

watch(() => props.modelValue, (newValue) => {
  if (newValue !== searchQuery.value) {
    searchQuery.value = newValue || '';
  }
});

watch(() => props.initialType, (newValue) => {
  if (newValue !== selectedType.value) {
    selectedType.value = newValue || '';
  }
});

function onInput() {
  emit('update:modelValue', searchQuery.value);
}

function onSelectType() {
  emit('update:type', selectedType.value);
}
</script>

<template>
  <div class="d-flex">
    <div class="col-6">
    <input
      v-model="searchQuery"
      @input="onInput"
      placeholder="Search by title or author"
    />
</div>
<div class="col-6">
    <select v-model="selectedType" @change="onSelectType">
      <option v-for="type in types" :value="type">{{ type }}</option>

    </select>
</div>
  </div>
</template>
