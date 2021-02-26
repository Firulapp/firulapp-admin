<template>
  <v-row justify="center">
    <v-col sm="4">
      <v-card class="elevation-12">
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="cuidado.idEspecie"
              :items="especies"
              item-text="name"
              item-value="id"
              label="Especies"
              v-on:change="obtenerRazas"
            ></v-select>
            <v-select
              v-model="cuidado.idRaza"
              multiple
              :items="razas"
              item-text="name"
              item-value="id"
              label="Razas"
            ></v-select>
            <v-text-field v-model="cuidado.url" label="URL" type="text" />
            <v-text-field v-model="cuidado.title" label="Titulo" type="text" />
            <v-textarea
              name="input-7-1"
              label="Descripción"
              v-model="cuidado.description"
              filled
            ></v-textarea>
            <v-file-input
              v-model="file"
              accept="image/*"
              label="Imágenes"
              v-on:change="onFileChange"
            ></v-file-input>
            <v-switch v-model="cuidado.state" label="Estado"></v-switch>
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
  props: ["id", "title", "item"],
  data() {
    return {
      cuidado: {
        description: "",
        title: "",
        url: "",
        idRaza: null,
        idEspecie: "",
        imagen: null,
        state: false
      },
      file: null,
      razas: [],
      especies: []
    };
  },
  methods: {
    onFileChange() {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.cuidado.imagen = e.target.result;
        //console.log(this.cuidado.imagen);
      };
    },
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
    guardarCuidado() {
      /*console.log("cuidado");
      console.log(this.cuidado);
      console.log("cuidado.imagen");
      console.log(this.cuidado.imagen);*/
      axios
        .post(`http://localhost:8081/api/cuidados`, this.cuidado)
        .then(response => {
          console.log(response);
        })
        .catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`);
        });
    }
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
