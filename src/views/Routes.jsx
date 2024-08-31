import { Dashboard } from "./Dashboard";
import { UserList } from "./UserList";
import { UserProfile } from "./UserProfile";
import { Cuestionario } from "./Cuestionario";
import { CuestionarioForm } from "./CuestionarioForm";
<<<<<<< HEAD
import { CuestionarioAplicar } from "./CuestionarioAplicar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import EditNoteIcon from "@mui/icons-material/EditNote";
=======
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
<<<<<<< HEAD
    icon: <DashboardIcon fontSize="large" />,
=======
    icon: "nc-icon nc-chart-pie-35",
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
<<<<<<< HEAD
    icon: <AccountCircleIcon fontSize="large" />,
=======
    icon: "nc-icon nc-circle-09",
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users List",
<<<<<<< HEAD
    icon: <GroupIcon fontSize="large" />,
=======
    icon: "nc-icon nc-circle-09",
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
    component: <UserList />,
    layout: "/admin",
  },
  {
    path: "/form",
    name: "Form",
<<<<<<< HEAD
    icon: <EditNoteIcon fontSize="large" />,
=======
    icon: "nc-icon nc-circle-09",
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
    component: <Cuestionario />,
    layout: "/admin",
  },
  {
<<<<<<< HEAD
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
=======
    path: "/form-request",
    name: "Form-request",
    icon: "nc-icon nc-circle-09",
    component: <CuestionarioForm />,
    layout: "/admin",
  },
>>>>>>> d6d56fe1939f6c4e07e66eed45b1529e098901e3
];
