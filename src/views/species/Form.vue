<template>
  <v-dialog v-model="showDialog" persistent="persistent" :max-width="800">
    <v-card class="elevation-1">
      <v-card-title>Especies</v-card-title>
      <v-card-text>
        <v-form v-model="validForm" ref="form">
          <v-text-field
            v-model="item.id"
            name="id"
            label="Id de Especie"
            readonly
          />
          <v-text-field
            v-model="item.name"
            label="Nombre de especie"
            name="name"
            type="text"
          />
          <v-text-field
            v-model="item.description"
            label="Descripción"
            name="name"
            type="text"
          />
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
  props: ["item", "showDialog", "isNew"],
  data() {
    return {
      validForm: true,
      user: {}
    };
  },
  methods: {
    save() {
      if (this.isNew) {
        this.item.createdBy = this.user["userId"];
      } else {
        this.item.modifiedBy = this.user["userId"];
      }
      axios
        .post("https://firulapp.sodep.com.py/api/param/species", this.item, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          this.item = response.data.dto;
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
    let loggedUser = localStorage.getItem("loggedUser");
    this.user = JSON.parse(loggedUser);
  }
};
</script>
