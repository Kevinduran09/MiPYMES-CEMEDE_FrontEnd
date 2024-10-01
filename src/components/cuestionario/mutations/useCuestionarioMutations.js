import { useMutation, useQueryClient } from 'react-query';
import { createCuestionario, createCuestionarioItem, createCuestionarioOrganizacion, deleteCuestionario, updateCuestionario } from "../services/CuestionarioService";
import { SuccessDialogo } from '../../dialogos/Dialogos';
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
            console.error("Error creating cuestionario:", error);
        },
    });

    const createCuestionarioOrganizacionMutation = useMutation({
        mutationFn: createCuestionarioOrganizacion,
        onSuccess: (response) => {
            console.log(response.data)
            queryClient.invalidateQueries("cuestionarios");
            navigate(`/cuestionarios/aplicar/organizacion/${response.data.id}`);
            SuccessDialogo('Creado', 'Cuestionario', 'creado');
        },
        onError: (error) => {
            console.error("Error creating cuestionario:", error);
        },
    });

    const createCuestionarioItemMutation = useMutation({
        mutationFn: createCuestionarioItem,
        onSuccess: (response) => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Finalizada', 'Evaluacion', 'finalizada');
        },
        onError: (error) => {
            console.error("Error creating cuestionario:", error);
        },
    });

    const editMutation = useMutation({
        mutationFn: updateCuestionario,
        onSuccess: () => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Editado', 'Cuestionario', 'editado');
        },
        onError: (error) => {
            console.error("Error updating Cuestionario:", error);
        },
    });

    return { deleteMutation, createMutation, editMutation, createCuestionarioOrganizacionMutation, createCuestionarioItemMutation };
};
