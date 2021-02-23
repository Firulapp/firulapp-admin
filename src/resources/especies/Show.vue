<template>
  <va-show-layout>
    <va-show :item="item">
      <!-- VaFields -->
    </va-show>
    <base-material-card
      :icon="$admin.getResource('razas').icon"
      :title="$admin.getResource('razas').pluralName"
    >
      <va-list
        resource="razas"
        disable-pagination
        disable-query-string
        :filter="{
          especieId: id
        }"
      >
        <va-data-table :fields="fields" disable-select></va-data-table>
      </va-list>
    </base-material-card>
  </va-show-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      fields: [
        /*{
          source: "especie",
          type: "select",
          attributes: { reference: "especies", link: "edit", chip: true }
        },*/
        { source: "id", sortable: true },
        { source: "nombre_raza", sortable: true },
        { source: "descripcion", sortable: true }
      ]
    };
  }
};
</script>
