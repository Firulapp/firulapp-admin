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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <tr>
          <td>
            <v-btn icon @click="approve(item)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <v-btn icon @click="reject(item)">
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Nombre", value: "organizationName", sortable: false },
        { text: "RUC", value: "ruc", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Estado", value: "status", sortable: false },
        { text: "Fecha de Pedido", value: "createdAt", sortable: false },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      items: [],
      organization: {},
      loadingTable: true,
      search: ""
    };
  },
  methods: {
    approve(item) {
      axios
        .post(
          "https://firulapp.sodep.com.py/api/param/organization/request/approve/" +
            item.id +
            "/modifiedBy/6",
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          alert("Solicitud de organización aprobada");
          console.log(response);
        })
        .catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
        });
    },
    reject(item) {
      axios
        .post(
          "https://firulapp.sodep.com.py/api/param/organization/request/reject/" +
            item.id +
            "/modifiedBy/6",
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          alert("Solicitud de organización rechazada");
          console.log(response);
        })
        .catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
        });
    }
  },
  mounted() {
    axios
      .get("https://firulapp.sodep.com.py/api/param/organization/request")
      .then(response => {
        this.items = response.data.list;
      });
    this.loadingTable = false;
  }
};
</script>
