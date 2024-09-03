// src/components/ItemActions.js
import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useItemStore } from '../../../hooks/useItemStore';
import { useItemMutations } from '../mutations/ItemMutations';

export const useItemActions = (setShowCreateModal, setShowEditModal, setShowModal) => {
    const {
        selectedItem,
        currentItem,
        setSelectedItem,
        clearSelectedItem,
        updateCurrentItem
    } = useItemStore();

    const { deleteMutation, createMutation, editMutation } = useItemMutations(setShowCreateModal);

    const createItemFunc = () => {
        const itemSinId = { ...currentItem };
        delete itemSinId["id"];

        ConfirmarDialogo(createMutation, itemSinId);
    };

    const editItemFunc = () => {
        ConfirmarDialogo(editMutation, selectedItem);
    };

    const handleDeleteClick = (item) => {
        EliminarDialogo(deleteMutation, item.id);
    };

    const handleChangeCurrent = (e) => {
        const { name, value } = e.target;
        updateCurrentItem({ [name]: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem({
            ...selectedItem,
            [name]: value,
        });
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        clearSelectedItem();
        setShowModal(false);
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    return {
        createItemFunc,
        editItemFunc,
        handleDeleteClick,
        handleChangeCurrent,
        handleChange,
        handleRowClick,
        handleCloseModal,
        handleEditClick
    };
};
