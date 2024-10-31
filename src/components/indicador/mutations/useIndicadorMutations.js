import { useMutation, useQueryClient } from 'react-query';
import { createIndicador, deleteIndicador, updateIndicador } from '../services/IndicadorService';
import { SuccessDialogo, ErrorDialogo } from '../../dialogos/Dialogos';
import { useIndicadorStore } from '../store/useIndicadorStore';

export const useIndicadorMutations = () => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteIndicador,
        onSuccess: () => {
            queryClient.invalidateQueries("indicadores");
            SuccessDialogo('Eliminado', 'Indicador', 'eliminado');
        },
        onError: (error) => {
            ErrorDialogo("Error", "Ha ocurrido un error al eliminar");
        },
    });

    const createMutation = useMutation({
        mutationFn: createIndicador,
        onSuccess: () => {
            queryClient.invalidateQueries("indicadores");
            SuccessDialogo('Creado', 'Indicador', 'creado');
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
        mutationFn: updateIndicador,
        onSuccess: () => {
            queryClient.invalidateQueries("indicadores");
            SuccessDialogo('Editado', 'Indicador', 'editado');
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
