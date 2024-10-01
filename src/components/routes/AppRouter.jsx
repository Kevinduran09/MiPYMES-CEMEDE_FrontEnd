import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "../../layout/Sidebar";
import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthState";
import { Dashboard } from "../../views/Dashboard";
import { Organizacion } from "../../views/Organizacion";
import { ProtectedRoute } from "./ProtectedRoute";
import { Empresario } from "../../views/Empresario";
import { DashboardLayout } from "../../layout/DashboardLayout";
import { FormOrganizacion } from "../organizacion/FormOrganizacion";
import { FormEmpresario } from "../empresario/FormEmpresario";
import { FormCuestionario } from "../cuestionario/components/FormCuestionario";
import { Item } from "../item/Item";
import { FormItem } from "../item/components/FormItem";
import { FormIndicador } from "../indicador/components/FormIndicador";
import { Indicador } from "../indicador/Indicador";
import { Rubrica } from "../rubrica/Rubrica";
import { FormRubrica } from "../rubrica/components/FormRubrica";
import { Cuestionario } from "../cuestionario/Cuestionario";
import { FormCuestionarioAplicar } from "../cuestionario/components/FormCuestionarioAplicar";
import { Form } from "react-bootstrap";
import { FormCuestionarioItemsRespuesta } from "../cuestionario/components/FormCuestionarioItemsRespueta";
import { CuestionariosAplicados } from "../cuestionario/components/CuestionariosAplicados";
import { CuestionariosAplicadoItems } from "../cuestionario/components/CuestionariosAplicadoItems";

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
            <img src="/assets/img/user.jpg" alt="" />
          </div>
        </div>
        <div>
          <Routes>
            <Route element={<ProtectedRoute isAuth={true} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/organizaciones" element={<Organizacion />} />
              <Route
                path="/organizaciones/crear"
                element={
                  <DashboardLayout
                    title={"Registrar nueva Organizacion"}
                    component={<FormOrganizacion />}
                  />
                }
              />
              <Route
                path="/organizaciones/editar/:id"
                element={
                  <DashboardLayout
                    title={"Editar Organizacion"}
                    component={<FormOrganizacion />}
                  />
                }
              />
              <Route path="/empresarios" element={<Empresario />} />
              <Route
                path="/empresarios/crear"
                element={
                  <DashboardLayout
                    title={"Registro Empresario"}
                    component={<FormEmpresario />}
                  />
                }
              />
              <Route
                path="/empresarios/editar/:id"
                element={
                  <DashboardLayout
                    title={"Editar Empresario"}
                    component={<FormEmpresario />}
                  />
                }
              />
              <Route
                path="/cuestionarios"
                element={<DashboardLayout
                  title={"Cuestionarios"} 
                  component={<Cuestionario/>} 
                />}
              />

              <Route
                path="/cuestionarios/crear"
                element={<DashboardLayout
                  title={"Crear nuevo cuestionario"} 
                  component={<FormCuestionario/>} 
                />}
              />
              <Route
                path="/cuestionarios/editar/:id"
                element={<DashboardLayout
                  title={"Eidtar cuestionario"} 
                  component={<FormCuestionario/>} 
                />}
              />
              <Route
                path="/cuestionarios/aplicar/:id"
                element={<DashboardLayout
                  title={"Aplicar Cuestionario a Organizacion"}
                  component={<FormCuestionarioAplicar />}
                />}
              />
              <Route
                path="/cuestionarios/aplicar/organizacion/:id"
                element={<DashboardLayout
                  title={"Cuestionario a Organizacion"}
                  component={<FormCuestionarioItemsRespuesta />}
                />}
              />
              <Route
                path="/cuestionarios/aplicados"
                element={<DashboardLayout
                  title={"Cuestionario aplicados"}
                  component={<CuestionariosAplicados />}
                />}
              />
              <Route
                path="/cuestionarios/aplicados/:id"
                element={<DashboardLayout
                  title={"Cuestionario aplicado"}
                  component={<CuestionariosAplicadoItems />}
                />}
              />
              <Route
                path="/items"
                element={<DashboardLayout
                  title={"Items de indicadores"}
                  component={<Item />}
                />}
              />
              <Route
                path="/items/crear"
                element={
                  <DashboardLayout
                    title={"Crear nuevo Item"}
                    component={<FormItem />}
                  />
                }
              />
              <Route
                path="/items/editar/:id"
                element={
                  <DashboardLayout
                    title={"Editar Item"}
                    component={<FormItem />}
                  />
                }
              />

              <Route
                path="/indicadores"
                element={<DashboardLayout
                  title={"Indicadores"}
                  component={<Indicador />}
                />}
              />

              <Route
                path="/indicadores/crear"
                element={
                  <DashboardLayout
                    title={"Crear nuevo Indicador"}
                    component={<FormIndicador />}
                  />
                }
              />
              <Route
                path="/indicadores/editar/:id"
                element={
                  <DashboardLayout
                    title={"Editar Indicador"}
                    component={<FormIndicador />}
                  />
                }
              />


              <Route
                path="/rubricas"
                element={<DashboardLayout
                  title={"Rubricas"}
                  component={<Rubrica />}
                />}
              />

              <Route
                path="/rubricas/crear"
                element={
                  <DashboardLayout
                    title={"Crear nueva Rubrica"}
                    component={<FormRubrica />}
                  />
                }
              />
              <Route
                path="/rubricas/editar/:id"
                element={
                  <DashboardLayout
                    title={"Editar Rubrica"}
                    component={<FormRubrica />}
                  />
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
