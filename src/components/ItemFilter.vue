<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

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
  <div class="row align-items-center">
    <div class="col-12 col-md-6 mb-4">
      <input v-model="searchQuery" @input="onInput" placeholder="Search by title or description" class="form-control" />
    </div>
    <div class="col-12 col-md-6 mb-4">
      <select v-model="selectedType" @change="onSelectType" class="form-select">
        <option v-for="type, i in types" :key="i" :value="type">{{ type }}</option>
      </select>
    </div>
  </div>
</template>

