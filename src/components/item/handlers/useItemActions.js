// src/components/ItemActions.js
import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useItemStore } from '../../../hooks/useItemStore';
import { useItemMutations } from '../mutations/ItemMutations';
import { useNavigate } from 'react-router-dom';

export const useItemActions = () => {
    
    const navigate = useNavigate();
    
    const {
        setSelectedItem,
        clearSelectedItem,
        updateCurrentItem,
        resetCurrentItem
    } = useItemStore();

    const { deleteMutation, createMutation, editMutation } = useItemMutations();

    const createItemFunc = (data) => {
        const itemSinId = data;
        const OnSucces = () => {
            clearSelectedItem();
            resetCurrentItem();
            navigate(-1);
        };

        delete itemSinId["id"];

        ConfirmarDialogo(createMutation, itemSinId, OnSucces);
    };

    const editItemFunc = (data) => {
        const current = data;
        const success = () => {
            clearSelectedItem();
            resetCurrentItem();
            navigate(-1);
        }

        ConfirmarDialogo(editMutation, current, success);
    };

    const handleDeleteClick = (id) => {
        EliminarDialogo(deleteMutation, id);
    };

    const handleEditClick = (item) => {
        updateCurrentItem(item);
        setSelectedItem(item);
        navigate(`/items/editar/${item.id}`);
    };

    return {
        createItemFunc,
        editItemFunc,
        handleDeleteClick,
        handleEditClick
    };
};
