<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
</script>
<template>
<div class="btn btn-primary btn-rounded mb-3" style="max-width: 540px; max-height: 100px;">
    <RouterLink class="p-0" to="/form">
      <div class="row p-0">
        <div class="col-md-2 d-flex">
          <IconPlus style="width: 40px; max-height: 100px;"></IconPlus>
        </div>
        <div class="col-md-10 d-flex justify-content-center align-items-center align-content-center">
          <div class="card-body ">
            <h3 class="card-title" style="color: white">Add new Item</h3>
          </div>
        </div>
      </div>
    </RouterLink>
</div>
</template>