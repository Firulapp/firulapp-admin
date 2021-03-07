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
      {
        icon: "mdi-briefcase",
        text: "Servicios",
        link: "/services"
      }
    ],
    expanded: false
  },
  { divider: true },
  {
    link: "/pet-care",
    icon: "mdi-doctor",
    text: "Cuidados"
  },
  admin.getResourceLink("organizaciones"),
  {
    link: "/help",
    icon: "mdi-message-video",
    text: "Ayudas"
  },
  {
    icon: "mdi-book-open-page-variant",
    text: i18n.t("menu.terms_conditions"),
    link: "/terms-conditions"
  }
];
