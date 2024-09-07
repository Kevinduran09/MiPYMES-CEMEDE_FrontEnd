import { Dashboard } from "./Dashboard";
import { UserList } from "./UserList";
import { UserProfile } from "./UserProfile";
import { CuestionarioForm } from "./CuestionarioForm";
import { CuestionarioAplicar } from "./CuestionarioAplicar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import EditNoteIcon from "@mui/icons-material/EditNote";
export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon fontSize="large" />,
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: <AccountCircleIcon fontSize="large" />,
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users List",
    icon: <GroupIcon fontSize="large" />,
    component: <UserList />,
    layout: "/admin",
  },
  {
    path: "/request",
    name: "Request",
    icon: <EditNoteIcon fontSize="large" />,
    component: <CuestionarioForm />,
    layout: "/admin",
  },
  {
    path: "/aplicate",
    name: "Aplicar",
    icon: <EditNoteIcon fontSize="large" />,
    component: <CuestionarioAplicar />,
    layout: "/admin",
  },
];
