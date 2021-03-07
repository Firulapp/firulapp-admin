<template>
  <div id="app">
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
    <serviceForm
      :showDialog="showDialog"
      :item="service"
      @setShowDialog="setShowDialog"
    ></serviceForm>
  </div>
</template>

<script>
const axios = require("axios");
import serviceForm from "@/views/services/Form";
export default {
  components: {
    serviceForm
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
      service: {},
      loadingTable: true,
      search: "",
      showDialog: false
    };
  },
  methods: {
    create() {
      this.service = {};
      this.setShowDialog();
    },
    edit(item) {
      this.service = item;
      this.setShowDialog();
    },
    remove(item) {
      axios
        .delete("http://localhost:9000/api/param/service/type", item, {
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
    }
  },
  mounted() {
    axios.get("http://localhost:9000/api/param/service/type").then(response => {
      this.items = response.data.list;
    });
    this.loadingTable = false;
  }
};
</script>
