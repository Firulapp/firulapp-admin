<template>
  <v-dialog v-model="showDialog" persistent="persistent" :max-width="800">
    <v-card class="elevation-1">
      <v-card-title>Cuidados</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-select
            v-model="item.speciesId"
            :items="species"
            item-text="name"
            item-value="id"
            label="Especies"
            v-on:change="getBreeds"
          ></v-select>
          <v-select
            v-model="item.breedId"
            :items="breeds"
            item-text="name"
            item-value="id"
            label="Razas"
          ></v-select>
          <v-text-field v-model="item.link" label="URL" type="text" />
          <v-text-field v-model="item.name" label="Titulo" type="text" />
          <v-textarea
            name="input-7-1"
            label="Descripción"
            v-model="item.description"
            filled
          ></v-textarea>
          <v-file-input
            v-model="file"
            accept="image/*"
            label="Imágenes"
            v-on:change="onFileChange"
          ></v-file-input>
          <v-switch v-model="item.status" label="Estado"></v-switch>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="save">
          Guardar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const axios = require("axios");
export default {
  props: ["item", "showDialog"],
  data() {
    return {
      breeds: [],
      species: [],
      file: null
    };
  },
  methods: {
    onFileChange() {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.item.picture = e.target.result;
      };
    },
    getBreeds() {
      axios
        .get(`http://localhost:9000/api/param/breed/${this.item.speciesId}`)
        .then(response => {
          this.breeds = response.data.list;
        });
      this.loadingTable = false;
    },
    save() {
      axios
        .post("http://localhost:9000/api/param/petcare", this.petcare, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          this.petcare = response.data.dto;
          alert("Guardado!");
        })
        .catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
        });
    },
    cancel() {
      this.showDialog = false;
      this.$emit("setShowDialog", this.showDialog);
    }
  },
  mounted() {
    axios
      .get("http://localhost:9000/api/param/species?_start=0&_end=100")
      .then(response => {
        this.species = response.data.list;
      });
  }
};
</script>
