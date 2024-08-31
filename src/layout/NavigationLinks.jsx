import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
const navigationLinks = [
  {
    href: "/",
    iconClass: <DashboardIcon />,
    text: "Dashboard",
    isActive: true,
  },
  {
    href: "/organizaciones",
    iconClass: <CorporateFareIcon />,
    text: "Organizaciones",
  },
  {
    href: "/empresarios",
    iconClass: <WorkIcon />,
    text: "Empresarios",
  },
  {
    href: "/formularios",
    iconClass: <FeedIcon />,
    text: "Formulario",
  },
];

export default navigationLinks;
