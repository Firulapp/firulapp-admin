<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    :search="search"
    class="elevation-1"
    :loading="loadingTable"
    loading-text="Loading... Please wait"
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
          <v-btn icon @click="createSpecie()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <tr>
        <td>
          <v-btn icon @click="view(item)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
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
</template>

<script>
const axios = require("axios");
export default {
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
      loadingTable: true,
      search: ""
    };
  },
  methods: {
    createSpecie() {
      alert("creating...");
    },
    view() {
      alert("viewing...");
    },
    edit() {
      alert("editing...");
    },
    remove() {
      alert("removing...");
    }
  },
  mounted() {
    axios
      .get("http://localhost:9000/api/param/species?_start=0&_end=15")
      .then(response => {
        this.items = response.data.list;
      });
    this.loadingTable = false;
  }
};
</script>
