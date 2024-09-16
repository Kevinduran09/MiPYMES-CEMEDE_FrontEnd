import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import FormatListNumberedSharpIcon from '@mui/icons-material/FormatListNumberedSharp';
const navigationLinks = [
  {
    href: "/",
    iconClass: <ion-icon name="grid-outline"></ion-icon>,
    text: "Dashboard",
    isActive: true,
  },
  {
    href: "/organizaciones",
    iconClass: <ion-icon name="business-outline"></ion-icon>,
    text: "Organizaciones",
  },
  {
    href: "/empresarios",
    iconClass: <ion-icon name="bag-outline"></ion-icon>,
    text: "Empresarios",
  },
  {
    href: "/cuestionarios",
    iconClass: <ion-icon name="document-text-outline"></ion-icon>,
    text: "Cuestionario",
  },
  ,
];

export default navigationLinks;
