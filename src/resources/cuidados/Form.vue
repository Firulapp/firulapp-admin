<template>
  <v-row justify="center">
    <v-col sm="4">
      <v-card class="elevation-12">
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="especieSeleccionada"
              :items="especies"
              item-text="name"
              item-value="id"
              label="Especies"
              v-on:change="obtenerRazas"
            ></v-select>
            <v-select
              v-model="razaSeleccionada"
              multiple
              :items="razas"
              item-text="name"
              item-value="id"
              label="Razas"
            ></v-select>
            <v-text-field v-model="title" label="Titulo" type="text" />
            <v-textarea
              name="input-7-1"
              label="Descripción"
              v-model="description"
              filled
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="guardarCuidado()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      description: "asdadasdasd  fdsaasdfdf fsafdasd",
      title: "",
      razaSeleccionada: null,
      especieSeleccionada: "",
      razas: [],
      especies: []
    };
  },
  methods: {
    obtenerRazas() {
      axios
        .get(
          `http://localhost:8081/api/razas?especieId=${this.especieSeleccionada}`
        )
        .then(response => {
          this.razas = response.data;
        })
        .catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
        });
    },
    guardarCuidado() {}
  },
  mounted() {
    axios
      .get("http://localhost:8081/api/especies")
      .then(response => {
        this.especies = response.data;
      })
      .catch(errorResponse => {
        alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
      });
  }
};
</script>
