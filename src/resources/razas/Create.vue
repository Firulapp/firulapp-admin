<template>
  <va-create-layout :title="title">
    <razas-form :item="item"></razas-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"]
};
</script>
