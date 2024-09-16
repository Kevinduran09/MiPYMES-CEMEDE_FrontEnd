import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "../../layout/Sidebar";
import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthState";
import { Dashboard } from "../../views/Dashboard";
import { Organizacion } from "../../views/Organizacion";
import { ProtectedRoute } from "./ProtectedRoute";
import { Empresario } from "../../views/Empresario";
import { TabMenuCuestionario } from "../cuestionario_tab/TabMenuCuestionario";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { FormOrganizacion } from "../organizacion/FormOrganizacion";
import { FormEmpresario } from "../empresario/FormEmpresario";

export const AppRouter = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  return (
    <BrowserRouter>
      <Sidebar isActive={isSidebarActive} />

      <div className={`main ${isSidebarActive ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="user">
            <img src="assets/imgs/customer01.jpg" alt="" />
          </div>
        </div>
        <div>
          <Routes>
              <Route element={<ProtectedRoute isAuth={true} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/organizaciones" element={<Organizacion />} />
                <Route
                  path="/Organization-Form"
                  element={
                    <DashboardLayout
                      title={"Registro Organizaciones"}
                      component={<FormOrganizacion />}
                    />
                  }
                />
                <Route path="/empresarios" element={<Empresario />} />
                <Route
                  path="Empresario-form"
                  element={
                    <DashboardLayout
                      title={"Registro Empresario"}
                      component={<FormEmpresario />}
                    />
                  }
                />
                <Route
                  path="/cuestionarios"
                  element={<TabMenuCuestionario />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
