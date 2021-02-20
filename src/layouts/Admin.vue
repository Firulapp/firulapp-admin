<template>
  <va-layout>
    <va-app-bar
      slot="app-bar"
      :header-menu="headerMenu"
      :profile-menu="profileMenu"
      dense
      dark
      @toggle="
        $vuetify.breakpoint.lgAndUp ? (mini = !mini) : (drawer = !drawer)
      "
    ></va-app-bar>
    <va-sidebar
      slot="sidebar"
      :menu="sidebarMenu"
      v-model="drawer"
      :mini-variant="mini"
    ></va-sidebar>
    <va-breadcrumbs slot="header"></va-breadcrumbs>
    <va-aside slot="aside"></va-aside>
  </va-layout>
</template>

<script>
import nav from "../_nav";

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      mini: false,
      headerMenu: [
        {
          link: "/"
        }
      ],
      profileMenu: [],
      sidebarMenu: nav(this.$i18n, this.$admin)
    };
  }
};
</script>
