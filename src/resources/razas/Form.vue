<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="4">
        <v-card>
          <v-card-text>
            <va-select-input
              source="idEspecie"
              reference="especies"
            ></va-select-input>
            <va-text-input source="name"></va-text-input>
            <va-text-input source="description" multiline></va-text-input>
            <va-boolean-input source="state"></va-boolean-input>
            <va-save-button></va-save-button>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"]
};
</script>
