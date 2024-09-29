import { useMutation, useQueryClient } from 'react-query';
import { createRubrica, updateRubrica, deleteRubrica } from '../../../services/RubricaService';
import { SuccessDialogo } from '../../dialogos/Dialogos';
import { useRubricaStore } from '../../../hooks/useRubricaStore';

export const useRubricaMutations = () => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteRubrica,
        onSuccess: () => {
            queryClient.invalidateQueries("rubricas");
            SuccessDialogo('Eliminado', 'Rúbrica', 'eliminada');
        },
        onError: (error) => {
            console.error("Error deleting rubrica:", error);
        },
    });

    const createMutation = useMutation({
        mutationFn: createRubrica,
        onSuccess: () => {
            queryClient.invalidateQueries("rubricas");
            SuccessDialogo('Creado', 'Rúbrica', 'creada');
        },
        onError: (error) => {
            console.error("Error creating rubrica:", error);
        },
    });

    const editMutation = useMutation({
        mutationFn: updateRubrica,
        onSuccess: () => {
            queryClient.invalidateQueries("rubricas");
            SuccessDialogo('Editado', 'Rúbrica', 'editada');
        },
        onError: (error) => {
            console.error("Error updating rubrica:", error);
        },
    });

    return { deleteMutation, createMutation, editMutation };
};
