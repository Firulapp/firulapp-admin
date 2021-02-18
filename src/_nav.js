/* eslint-disable no-unused-vars */

export default (i18n, admin) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard")
  },
  { divider: true },
  {
    text: i18n.t("menu.param_globales"),
    children: [admin.getResourceLink("servicios")],
    expanded: false,
    link: "/"
  },
  { divider: true },
  admin.getResourceLink({ name: "reglasConducta", action: "show" })
];
