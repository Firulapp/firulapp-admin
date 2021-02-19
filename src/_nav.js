/* eslint-disable no-unused-vars */

export default (i18n, admin) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/"
  },
  { divider: true },
  {
    text: i18n.t("menu.param_globales"),
    children: [admin.getResourceLink("servicios")],
    expanded: false
  },
  { divider: true },
  {
    icon: "mdi-book-open-page-variant",
    text: i18n.t("menu.terms_conditions"),
    link: "/terms-conditions"
  }
];
