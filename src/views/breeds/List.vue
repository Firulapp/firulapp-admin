<template>
  <div id="app">
    <v-select
      v-model="speciesId"
      :items="species"
      item-text="name"
      item-value="id"
      label="Especies"
      solo
      v-on:change="obtenerRazas"
    ></v-select>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
      :loading="loadingTable"
      loading-text="Loading..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <div class="text-right pt-2">
            <v-btn icon @click="create()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <tr>
          <td>
            <v-btn icon @click="edit(item)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="remove(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <breedForm
      :showDialog="showDialog"
      :speciesId="speciesId"
      :item="breed"
      @setShowDialog="setShowDialog"
      @setSpeciesId="setSpeciesId"
    ></breedForm>
  </div>
</template>

<script>
const axios = require("axios");
import breedForm from "@/views/breeds/Form";
export default {
  components: {
    breedForm
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Nombre", value: "name", sortable: false },
        { text: "Descripción", value: "description", sortable: false },
        { text: "Estado", value: "status", sortable: false },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      items: [],
      species: [],
      breed: {},
      speciesId: null,
      loadingTable: true,
      search: "",
      showDialog: false
    };
  },
  methods: {
    create() {
      this.breed.id = null;
      this.breed.name = "";
      this.breed.description = "";
      this.breed.status = false;
      this.breed.speciesId = this.speciesId;
      this.setShowDialog();
    },
    edit(item) {
      this.breed = item;
      this.setShowDialog();
    },
    remove(item) {
      axios
        .delete("http://localhost:9000/api/param/breed", item, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
        });
    },
    setShowDialog() {
      this.showDialog = !this.showDialog;
    },
    obtenerRazas() {
      axios
        .get("http://localhost:9000/api/param/breed?_start=0&_end=1000")
        .then(response => {
          this.items = response.data.list;
        });
      this.loadingTable = false;
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
