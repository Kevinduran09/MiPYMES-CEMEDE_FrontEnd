const navigationLinks = [
  {
    href: "/",
    iconClass: <ion-icon name="grid-outline"></ion-icon>,
    text: "Dashboard",
    isActive: true,
    allowedRoles: ["Administrador", "Aplicador", "Gestor"],
  },
  {
    href: "/usuarios",
    iconClass: <ion-icon name="person-outline"></ion-icon>,
    text: "Usuarios",
    allowedRoles: ["Administrador"],
  },
  {
    href: "/organizaciones",
    iconClass: <ion-icon name="business-outline"></ion-icon>,
    text: "Organizaciones",
    allowedRoles: ["Administrador", "Aplicador", "Gestor"],
  },
  {
    href: "/empresarios",
    iconClass: <ion-icon name="people-outline"></ion-icon>,
    text: "Empresarios",
    allowedRoles: ["Administrador", "Gestor"],
  },
  {
    href: "/cuestionarios",
    iconClass: <ion-icon name="document-text-outline"></ion-icon>,
    text: "Cuestionarios",
    allowedRoles: ["Administrador", "Aplicador", "Gestor"],
  },
  {
    href: "/indicadores",
    iconClass: <ion-icon name="bar-chart-outline"></ion-icon>,
    text: "Indicadores",
    allowedRoles: ["Administrador", "Gestor"],
  },
  {
    href: "/items",
    iconClass: <ion-icon name="list-outline"></ion-icon>,
    text: "Items",
    allowedRoles: ["Administrador", "Gestor"],
  },
  {
    href: "/rubricas",
    iconClass: <ion-icon name="checkbox-outline"></ion-icon>,
    text: "Rubricas",
    allowedRoles: ["Administrador", "Gestor"],
  },
];

export default navigationLinks;
