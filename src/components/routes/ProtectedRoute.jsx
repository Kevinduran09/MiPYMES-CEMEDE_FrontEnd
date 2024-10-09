import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAuth, children}) => {
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }
    return children ? children : <Outlet />;
};