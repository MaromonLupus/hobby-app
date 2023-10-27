<template>
  <form @submit.prevent="submitForm">
    <h2 class="mb-4">Dodaj nową książkę</h2>
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
          <label for="isbn" class="form-label">ISBN</label>
          <input type="text" class="form-control" id="isbn" v-model="item.isbn" required>
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
        isbn: "",
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

    submitForm() {
      const items = JSON.parse(localStorage.getItem('items') || '[]');
      items.push(this.item);
      localStorage.setItem('items', JSON.stringify(items));
      this.resetForm();
    },

    resetForm() {
      this.item = {
        title: "",
        description: "",
        isbn: "",
        type: "",
        image: null
      };
    }
  }
};
</script>