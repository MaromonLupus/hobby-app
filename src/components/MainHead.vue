<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings text-center text-md-start">
    <h1 class="green display-4">{{ msg }}</h1>
    <h3 class="fs-4">
      Your hobby is here
    </h3>
  </div>
</template>


<style scoped>

.greetings h1.green {
  color: green; /* or any shade of green you prefer */
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
