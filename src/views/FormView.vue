<template>
<div class="row">
  <h2>Dodaj nową książkę</h2>
  <div class="col-5 justify-content-center align-items-center">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">Tytuł</label>
        <input type="text" class="form-control" id="title" v-model="book.title">
      </div>

      <div class="mb-3">
        <label for="author" class="form-label">Autor</label>
        <input type="text" class="form-control" id="author" v-model="book.author">
      </div>

      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="text" class="form-control" id="isbn" v-model="book.isbn">
      </div>

      <div class="mb-3">
        <label for="type" class="form-label">Typ</label>
        <select id="type" class="form-select" v-model="book.type">
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Zapisz</button>
    </form>
  </div>
  <div class="col-7 justify-content-center align-items-center">
    <form @submit.prevent="submitForm">
      <div>
        <div class="d-flex justify-content-center">
            <div class="btn btn-rounded">
              <img v-if="book.image" :src="book.image" class="mb-3" alt="example placeholder" style="width: 300px;" />
              <input type="file" class="form-control mb-3" id="bookImage" ref="bookImage" @change="handleImageUpload">
            </div>
        </div>
    </div>
    </form>
  </div>
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
      types: ["Book", "Coin", "Stamp", "Toy"]  
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