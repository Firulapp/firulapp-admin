<template>
  <va-create-layout :title="title">
    <cuidados-form :item="item"></cuidados-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"]
};
</script>
