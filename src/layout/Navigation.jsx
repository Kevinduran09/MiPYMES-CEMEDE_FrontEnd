import { NavLink } from "react-router-dom";
import navigationLinks from "./NavigationLinks.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../components/auth/store/useAuthStore.jsx";
export const Navigation = ({ onToggle, isActive }) => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logout = (e) => {
    Swal.fire({
      title: "¿Desea cerrar su sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#015dfc",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuth();
        navigate("/");
      }
    });
  };
  return (
    <>
      <div className="navigation">
        <ul>
          {navigationLinks.map((link, index) => (
            // Renderizar el enlace si es público y currentUser no es admin, o si currentUser es admin

            <li id={link.text} key={index}>
              <NavLink
                title={link.text}
                to={link.href}
                activeClassName="active"
              >
                <span className="icon">{link.iconClass}</span>
                <span className="item">{link.text}</span>
              </NavLink>
            </li>
          ))}

        

          <li>
            <a
              title="Cerrar sesión"
              onClick={logout}
              style={{
                color: "white",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <span className="icon">
                <i className="fas fa-sign-out-alt" style={{ color: "white" }} />
              </span>
              <span className="item">Cerrar sesión</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
