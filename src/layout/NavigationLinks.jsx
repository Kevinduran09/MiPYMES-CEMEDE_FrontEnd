import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import FormatListNumberedSharpIcon from "@mui/icons-material/FormatListNumberedSharp";
const navigationLinks = [
  {
    href: "/",
    iconClass: <ion-icon name="grid-outline"></ion-icon>,
    text: "Dashboard",
    isActive: true,
  },
  {
    href: "/usuarios",
    iconClass: <ion-icon name="person-outline"></ion-icon>,
    text: "Usuarios",
  },
  {
    href: "/organizaciones",
    iconClass: <ion-icon name="business-outline"></ion-icon>,
    text: "Organizaciones",
  },
  {
    href: "/empresarios",
    iconClass: <ion-icon name="people-outline"></ion-icon>,
    text: "Empresarios",
  },
  {
    href: "/cuestionarios",
    iconClass: <ion-icon name="document-text-outline"></ion-icon>,
    text: "Cuestionarios",
  },
  {
    href: "/indicadores",
    iconClass: <ion-icon name="bar-chart-outline"></ion-icon>,
    text: "Indicadores",
  },
  {
    href: "/items",
    iconClass: <ion-icon name="list-outline"></ion-icon>,
    text: "Items",
  },
  {
    href: "/rubricas",
    iconClass: <ion-icon name="checkbox-outline"></ion-icon>,
    text: "Rubricas",
  },
];

export default navigationLinks;
