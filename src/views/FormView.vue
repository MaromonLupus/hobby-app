<template>
  <form @submit.prevent="submitForm">
    <h2 class="mb-4">Dodaj nową rzecz hobby</h2>
    <div class="row">
      <div class="col-12 col-md-5">
        <div class="mb-3">
          <label for="title" class="form-label">Tytuł</label>
          <input type="text" class="form-control" id="title" v-model="item.title" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Opis</label>
          <textarea class="form-control" id="description" v-model="item.description" required></textarea>
        </div>

        <div class="mb-3">
          <label for="id" class="form-label">ID</label>
          <input type="text" class="form-control" id="id" v-model="item.id" required>
        </div>

        <div class="mb-3">
          <label for="type" class="form-label">Typ</label>
          <select id="type" class="form-select" v-model="item.type">
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-7">
        <div>
          <img v-if="item.image" :src="item.image" class="mb-3" alt="item cover preview" style="width: 100%;" />
          <input type="file" class="form-control mb-3" id="itemImage" ref="itemImage" @change="handleImageUpload"
            aria-label="Item Image">
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3">Zapisz</button>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      item: {
        title: "",
        description: "",
        id: "",
        image: null,
        type: ""
      },
      types: ["Book", "Coin", "Stamp", "Toy"],
    };
  },
  methods: {
    handleImageUpload() {
      const imageFile = this.$refs.itemImage.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.item.image = reader.result;
      }, false);

      if (imageFile) reader.readAsDataURL(imageFile);

    },

    async submitForm() {
      const apiEndpoint = 'http://localhost:3000/things'; // change to your JSON server endpoint
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.item),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        alert("Item added successfully!");
        this.resetForm();
      } catch (error) {
        alert(`Failed to add item: ${error}`);
      }
    },


    resetForm() {
      this.item = {
        title: "",
        description: "",
        id: "",
        type: "",
        image: null
      };
    }
  }
};
</script>