import { Navigate } from "react-router-dom";
import { Dashboard } from "../../views/Dashboard";
import { Organizacion } from "../../views/Organizacion";
import { Empresario } from "../../views/Empresario";
import { Usuario } from "../../views/Usuario";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { FormOrganizacion } from "../organizacion/FormOrganizacion";
import { FormEmpresario } from "../empresario/FormEmpresario";
import { FormUsuario } from "../usuario/FormUsuario";
import { Cuestionario } from "../cuestionario/Cuestionario";
import { FormCuestionario } from "../cuestionario/components/FormCuestionario";
import { FormCuestionarioAplicar } from "../cuestionario/components/FormCuestionarioAplicar";
import { FormCuestionarioItemsRespuesta } from "../cuestionario/components/FormCuestionarioItemsRespueta";
import { CuestionariosAplicados } from "../cuestionario/components/CuestionariosAplicados";
import { CuestionariosAplicadoItems } from "../cuestionario/components/CuestionariosAplicadoItems";
import { Item } from "../item/Item";
import { FormItem } from "../item/components/FormItem";
import { Indicador } from "../indicador/Indicador";
import { FormIndicador } from "../indicador/components/FormIndicador";
import { Rubrica } from "../rubrica/Rubrica";
import { FormRubrica } from "../rubrica/components/FormRubrica";
import { ProtectedRoute } from "./ProtectedRoute";

export const routes = () => [
  {
    path: "/",
    element: <Dashboard />,
    protected: true,
  },
  {
    path: "/organizaciones",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador", "Aplicador"]}
        element={<DashboardLayout title={"Organizaciones"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Organizacion />,
      },
      {
        path: "crear",
        element: (
          <ProtectedRoute
            allowedRoles={["Administrador", "Gestor"]}
            element={<FormOrganizacion />}
          />
        ),
      },
      {
        path: "editar/:id",
        element: (
          <ProtectedRoute
            allowedRoles={["Administrador", "Gestor", "Aplicador"]}
            element={<FormOrganizacion />}
          />
        ),
      },
    ],
  },
  {
    path: "/empresarios",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador", "Gestor"]}
        element={<DashboardLayout title={"Empresarios"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Empresario />,
      },
      {
        path: "crear",
        element: <FormEmpresario />,
      },
      {
        path: "editar/:id",
        element: <FormEmpresario />,
      },
    ],
  },
  {
    path: "/usuarios",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador"]}
        element={<DashboardLayout title={"Usuarios"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Usuario />,
      },
      {
        path: "crear",
        element: <FormUsuario />,
      },
      {
        path: "editar/:id",
        element: <FormUsuario />,
      },
    ],
  },
  {
    path: "/cuestionarios",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador", "Gestor", "Aplicador"]}
        element={<DashboardLayout title={"Cuestionarios"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Cuestionario />,
      },
      {
        path: "crear",
        element: (
          <ProtectedRoute
            allowedRoles={["Administrador", "Gestor"]}
            element={<FormCuestionario />}
          />
        ),
      },
      {
        path: "editar/:id",
        element: (
          <ProtectedRoute
            allowedRoles={["Administrador", "Gestor"]}
            element={<FormCuestionario />}
          />
        ),
      },
      {
        path: "aplicar/:id",
        element: <FormCuestionarioAplicar />,
      },
      {
        path: "aplicar/organizacion/:id",
        element: <FormCuestionarioItemsRespuesta />,
      },
      {
        path: "aplicados",
        element: <CuestionariosAplicados />,
      },
      {
        path: "aplicados/:id",
        element: <CuestionariosAplicadoItems />,
      },
    ],
  },
  {
    path: "/items",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador"]}
        element={<DashboardLayout title={"Items de indicadores"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Item />,
      },
      {
        path: "crear",
        element: <FormItem />,
      },
      {
        path: "editar/:id",
        element: <FormItem />,
      },
    ],
  },
  {
    path: "/indicadores",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador"]}
        element={<DashboardLayout title={"Indicadores"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Indicador />,
      },
      {
        path: "crear",
        element: <FormIndicador />,
      },
      {
        path: "editar/:id",
        element: <FormIndicador />,
      },
    ],
  },
  {
    path: "/rubricas",
    element: (
      <ProtectedRoute
        allowedRoles={["Administrador"]}
        element={<DashboardLayout title={"Rubricas"} />}
      />
    ),
    protected: true,
    children: [
      {
        index: true,
        element: <Rubrica />,
      },
      {
        path: "crear",
        element: <FormRubrica />,
      },
      {
        path: "editar/:id",
        element: <FormRubrica />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
