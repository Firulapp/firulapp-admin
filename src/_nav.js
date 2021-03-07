/* eslint-disable no-unused-vars */

export default (i18n, admin) => [
  {
    text: i18n.t("menu.param_globales"),
    children: [
      {
        icon: "mdi-dog",
        text: "Especies",
        link: "/species"
      },
      {
        icon: "mdi-cat",
        text: "Razas",
        link: "/species/breeds"
      },
      admin.getResourceLink("servicios")
    ],
    expanded: false
  },
  { divider: true },
  admin.getResourceLink("cuidados"),
  admin.getResourceLink("organizaciones"),
  admin.getResourceLink("ayudas"),
  {
    icon: "mdi-book-open-page-variant",
    text: i18n.t("menu.terms_conditions"),
    link: "/terms-conditions"
  }
];
