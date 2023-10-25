<template>
  <div class="row">
    <h2 class="mb-4">Dodaj nową książkę</h2>
    <form @submit.prevent="submitForm" class="d-flex">
      <div class="col-5">
        <div class="mb-3">
        <label for="title" class="form-label">Tytuł</label>
        <input type="text" class="form-control" id="title" v-model="book.title" required>
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Autor</label>
        <input type="text" class="form-control" id="author" v-model="book.author" required>
      </div>

      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="text" class="form-control" id="isbn" v-model="book.isbn" required>
      </div>

      <div class="mb-3">
        <label for="type" class="form-label">Typ</label>
        <select id="type" class="form-select" v-model="book.type">
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
    </div>
    <div class="col-7 d-flex justify-content-center align-items-center">
      <div>
        <img v-if="book.image" :src="book.image" class="mb-3" alt="book cover preview" style="width: 300px;" />
        <input type="file" class="form-control mb-3" id="bookImage" ref="bookImage" @change="handleImageUpload" aria-label="Book Image">
      </div>
    </div>
  </form>
  <button type="submit" class="btn btn-primary mt-3">Zapisz</button>
</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        isbn: "",
        image: null,
        type: ""
      },
      types: ["Book", "Coin", "Stamp", "Toy"],
    };
  },
  methods: {
    handleImageUpload() {
      const imageFile = this.$refs.bookImage.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.book.image = reader.result;
      }, false);

      if (imageFile) {
        reader.readAsDataURL(imageFile);
      }
    },
    submitForm() {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    books.push(this.book);
    localStorage.setItem('books', JSON.stringify(books));
    this.resetForm();
  },

  resetForm() {
    this.book = {
      title: "",
      author: "",
      isbn: "",
      type: "",
      image: null
    };
  }

  }
};
</script>