import { useMutation, useQueryClient } from 'react-query';
import { createRubrica, updateRubrica, deleteRubrica } from '../services/RubricaService';
import { ErrorDialogo, SuccessDialogo } from '../../dialogos/Dialogos';
import { useRubricaStore } from '../store/useRubricaStore';

export const useRubricaMutations = () => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteRubrica,
        onSuccess: () => {
            queryClient.invalidateQueries("rubricas");
            SuccessDialogo('Eliminado', 'Rúbrica', 'eliminada');
        },
        onError: (error) => {
            ErrorDialogo("Error", "Ha ocurrido un error al eliminar");
        },
    });

    const createMutation = useMutation({
        mutationFn: createRubrica,
        onSuccess: () => {
            queryClient.invalidateQueries("rubricas");
            SuccessDialogo('Creado', 'Rúbrica', 'creada');
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
        mutationFn: updateRubrica,
        onSuccess: () => {
            queryClient.invalidateQueries("rubricas");
            SuccessDialogo('Editado', 'Rúbrica', 'editada');
        },
        onError: (error) => {
            if (error.response.status == 400) {
                ErrorDialogo("Error", error.response.data.message);
            } else {
                ErrorDialogo("Error", error.response.data.message.join(". "));
            }
        },
    });

    return { deleteMutation, createMutation, editMutation };
};
