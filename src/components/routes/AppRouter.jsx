import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from "react-router-dom";
import { Sidebar } from "../../layout/Sidebar";
import { useState } from "react";
import { useAuthStore } from "../auth/store/useAuthStore";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { useQuery } from "react-query";
import { currentActive } from "../auth/services/AuthService";
import ProfileDropdown from "../auth/ProfileDropdown";
import { routes } from "./routes";

export const AppRouter = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const { setCurrentUser, clearAuth, isAuth, token } = useAuthStore();

  const { data: user } = useQuery({
    retry: false,
    queryKey: ["current"],
    queryFn: currentActive,
    onSuccess: (response) => {
      setCurrentUser(response, true);
    },
    onError: (error) => {
      clearAuth();
    },
  });

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  const AdminRoutes = () => (
    <>
      <Sidebar isActive={isSidebarActive} setActive={toggleSidebar} />
      <div className={`main ${isSidebarActive ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <ProfileDropdown />
        </div>
        <div>
          {/* Uso del hook useRoutes para la estructuracion de las rutas
              Recibe como parametro el arreglo de rutas y genera todas las rutas a partir de eso.
          */}
          {useRoutes(routes())}
        </div>
      </div>
    </>
  );

  return (
    <BrowserRouter>
      {isAuth && !!token ? (
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};
