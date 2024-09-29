import { useMutation, useQueryClient } from 'react-query';
import { createIndicador, deleteIndicador, updateIndicador } from '../../../services/IndicadorService';
import { SuccessDialogo } from '../../dialogos/Dialogos';
import { useIndicadorStore } from '../../../hooks/useIndicadorStore';

export const useIndicadorMutations = (setShowCreateModal) => {
    const queryClient = useQueryClient();
    const { resetCurrentIndicador, clearSelectedIndicador } = useIndicadorStore();

    const deleteMutation = useMutation({
        mutationFn: deleteIndicador,
        onSuccess: () => {
            queryClient.invalidateQueries("indicadores");
            SuccessDialogo('Eliminado', 'Indicador', 'eliminado');
        },
        onError: (error) => {
            console.error("Error deleting indicador:", error);
        },
    });

    const createMutation = useMutation({
        mutationFn: createIndicador,
        onSuccess: () => {
            queryClient.invalidateQueries("indicadores");
            SuccessDialogo('Creado', 'Indicador', 'creado');
        },
        onError: (error) => {
            console.error("Error creating indicador:", error);
        },
    });

    const editMutation = useMutation({
        mutationFn: updateIndicador,
        onSuccess: () => {
            queryClient.invalidateQueries("indicadores");
            clearSelectedIndicador();
            SuccessDialogo('Editado', 'Indicador', 'editado');
        },
        onError: (error) => {
            console.error("Error updating indicador:", error);
        },
    });

    return { deleteMutation, createMutation, editMutation };
};
