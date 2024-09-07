import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import FormatListNumberedSharpIcon from '@mui/icons-material/FormatListNumberedSharp';
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
    href: "/cuestionarios",
    iconClass: <FeedIcon />,
    text: "Cuestionario",
  },
  ,
];

export default navigationLinks;
