import { useMutation, useQueryClient } from 'react-query';
import { createItem, deleteItem, updateItem } from '../../../services/ItemService';
import { SuccessDialogo } from '../../dialogos/Dialogos';
import { useItemStore } from '../../../hooks/useItemStore';

export const useItemMutations = (setShowCreateModal) => {
    const queryClient = useQueryClient();
    const { resetCurrentItem, clearSelectedItem } = useItemStore();

    const deleteMutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries("items");
            SuccessDialogo('Eliminado', 'Item', 'eliminado');
        },
        onError: (error) => {
            console.error("Error deleting item:", error);
        },
    });

    const createMutation = useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries("items");
            resetCurrentItem();
            setShowCreateModal(false);
            SuccessDialogo('Creado', 'Item', 'creado');
        },
        onError: (error) => {
            console.error("Error creating item:", error);
        },
    });

    const editMutation = useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries("items");
            clearSelectedItem();
            SuccessDialogo('Editado', 'Item', 'editado');
        },
        onError: (error) => {
            console.error("Error updating item:", error);
        },
    });

    return { deleteMutation, createMutation, editMutation };
};
