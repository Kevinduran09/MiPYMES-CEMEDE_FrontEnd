import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "../../layout/Sidebar";
import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthState";
import { currentActive } from "../../services/AuthService";
import { Dashboard } from "../../views/Dashboard";
import { CuestionarioForm } from "../../views/CuestionarioForm";
import { CuestionarioAplicar } from "../../views/CuestionarioAplicar";
import { useQuery } from "react-query";
import { ProtectedRoute } from "./ProtectedRoute";
import { Empresario } from "../../views/Empresario";
import { Rubrica } from "../rubrica/Rubrica";
import { Item } from "../item/Item";
import { TabMenuCuestionario } from "../cuestionario_tab/TabMenuCuestionario";
export const AppRouter = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const { isAuth, token, currentUser } = useAuthStore();

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // const { data: response } = useQuery({
  //   queryKey: ["response"],
  //   queryFn: currentActive,
  //   onSuccess: (response) => {
  //     if (response.status === 401) {
  //       clearAuth();
  //     } else {
  //       setCurrentUser(response, true);
  //     }
  //   },
  //   onError: () => {
  //     clearAuth();
  //   },
  // });

  return (
    <>
      <BrowserRouter>
        {/* {isAuth && !!token ? ( */}
        <div className="main-app">
          <div className="column-sidebar">
            <Sidebar onToggle={toggleSidebar} isActive={isSidebarActive} />
          </div>

          <div
            className={`main-content ${isSidebarActive ? "with-sidebar" : ""}`}
          >
            <Routes>
              <Route element={<ProtectedRoute isAuth={true} />}>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/organizaciones"
                  element={<CuestionarioAplicar />}
                />
                <Route path="/empresarios" element={<Empresario />} />
                <Route path="/cuestionarios" element={<TabMenuCuestionario />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </div>
        </div>
        {/* ) : (
        <div className="main-app">
          <div className="main-content-login">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<Login />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
        )} */}
      </BrowserRouter>
    </>
  );
};
