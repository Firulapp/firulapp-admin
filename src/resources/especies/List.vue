<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list>
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        { source: "id", sortable: true },
        { source: "nombreEspecie", sortable: true },
        { source: "descripcionEspecie", sortable: true }
      ]
    };
  }
};
</script>
