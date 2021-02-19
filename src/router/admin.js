import Vue from "vue";
import AdminLayout from "@/layouts/Admin";
import TermsConditions from "@/views/terms-conditions";
import Dashboard from "@/views/Dashboard";
import Error from "@/views/Error";
import i18n from "@/i18n";

/**
 * Error component
 */
Vue.component("Error", Error);

export default {
  path: "",
  component: AdminLayout,
  meta: {
    title: i18n.t("routes.home")
  },
  children: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: i18n.t("routes.dashboard")
      }
    },
    {
      path: "/terms-conditions",
      name: "terms-conditions",
      component: TermsConditions,
      meta: {
        title: i18n.t("routes.terms_conditions")
      }
    },
    {
      path: "*",
      component: Error,
      meta: {
        title: i18n.t("routes.not_found")
      }
    }
  ]
};
