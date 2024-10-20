import { Navigate } from "react-router-dom";
import { ErrorDialogo } from "../dialogos/Dialogos";
import { useAuthStore } from "../auth/store/useAuthStore";
const UnAuthorized = () => {
  ErrorDialogo(
    "Sin Autorización",
    "No tiene permisos para acceder a este recursos"
  );
  return <Navigate to="/" />;
};

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const { currentUser } = useAuthStore();

  const userRole = currentUser?.rol;

  return allowedRoles.includes(userRole) ? element : <UnAuthorized />;
};
