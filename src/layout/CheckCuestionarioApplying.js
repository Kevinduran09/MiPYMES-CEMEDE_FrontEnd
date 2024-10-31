import { useLocation, useNavigate } from "react-router-dom";
import { useCuestionarioStore } from "../components/cuestionario/store/useCuestionarioStore";
import Swal from "sweetalert2";

export const checkIsApplying = () => {
    const { applyingCuestionario } = useCuestionarioStore();
    const navigate = useNavigate();
    const location = useLocation();
    const isApplyingCuestionarioRoute = location.pathname.startsWith("/cuestionarios/aplicar/organizacion");

    const check = (event) => {
        if (isApplyingCuestionarioRoute && applyingCuestionario) {
            // Prevenir la navegación
            event.preventDefault();

            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "No puede navegar si está aplicando un cuestionario"
            });
        }
    };

    return { check };
}
