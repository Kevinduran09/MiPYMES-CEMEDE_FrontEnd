import { useMutation, useQueryClient } from 'react-query';
import { createCuestionario, createCuestionarioItem, createCuestionarioOrganizacion, deleteCuestionario, updateCuestionario } from "../services/CuestionarioService";
import { SuccessDialogo, ErrorDialogo } from '../../dialogos/Dialogos';
import { useNavigate } from 'react-router-dom';

export const useCuestionarioMutations = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const deleteMutation = useMutation({
        mutationFn: deleteCuestionario,
        onSuccess: () => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Eliminado', 'Cuestionario', 'eliminado');
        },
        onError: (error) => {
            console.error("Error deleting Cuestionario:", error);
        },
    });

    const createMutation = useMutation({
        mutationFn: createCuestionario,
        onSuccess: () => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Creado', 'Cuestionario', 'creado');
        },
        onError: (error) => {
            if (error.response.status == 400) {
                ErrorDialogo("Error", error.response.data.message);
            } else {
                ErrorDialogo("Error", error.response.data.message.join(". "));
            }
        },
    });

    const createCuestionarioOrganizacionMutation = useMutation({
        mutationFn: createCuestionarioOrganizacion,
        onSuccess: (response) => {
            queryClient.invalidateQueries("cuestionarios");
            navigate("/cuestionarios");
            SuccessDialogo('Asignado', 'Cuestionario', 'asignado');
        },
        onError: (error) => {
            if (error.response.status == 400) {
                ErrorDialogo("Error", error.response.data.message);
            } else {
                ErrorDialogo("Error", error.response.data.message.join(". "));
            }
        },
    });

    const createCuestionarioItemMutation = useMutation({
        mutationFn: createCuestionarioItem,
        onSuccess: (response) => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Finalizada', 'Evaluacion', 'finalizada');
        },
        onError: (error) => {
            if (error.response.status == 400) {
                ErrorDialogo("Error", error.response.data.message);
            } else {
                ErrorDialogo("Error", error.response.data.message.join(". "));
            }
        },
    });

    const editMutation = useMutation({
        mutationFn: updateCuestionario,
        onSuccess: () => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Editado', 'Cuestionario', 'editado');
        },
        onError: (error) => {
            if (error.response.status == 400) {
                ErrorDialogo("Error", error.response.data.message);
            } else {
                ErrorDialogo("Error", error.response.data.message.join(". "));
            }
        },
    });

    return { deleteMutation, createMutation, editMutation, createCuestionarioOrganizacionMutation, createCuestionarioItemMutation };
};
