import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useIndicadorStore } from '../../../hooks/useIndicadorStore';
import { useIndicadorMutations } from '../mutations/useIndicadorMutations';

export const useIndicadorActions = (setShowCreateModal, setShowEditModal, setShowModal) => {
    const {
        selectedIndicador,
        currentIndicador,
        setSelectedIndicador,
        clearSelectedIndicador,
        updateCurrentIndicador
    } = useIndicadorStore();

    const { deleteMutation, createMutation, editMutation } = useIndicadorMutations(setShowCreateModal);

    const createIndicadorFunc = () => {
        const indicadorSinId = { ...currentIndicador };
        delete indicadorSinId["id"];

        ConfirmarDialogo(createMutation, indicadorSinId);
    };

    const editIndicadorFunc = () => {
        ConfirmarDialogo(editMutation, selectedIndicador);
    };

    const handleDeleteClick = (indicador) => {
        EliminarDialogo(deleteMutation, indicador.id);
    };

    const handleChangeCurrent = (e) => {
        const { name, value } = e.target;
        updateCurrentIndicador({ [name]: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedIndicador({
            ...selectedIndicador,
            [name]: value,
        });
    };

    const handleRowClick = (indicador) => {
        setSelectedIndicador(indicador);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        clearSelectedIndicador();
        setShowModal(false);
    };

    const handleEditClick = (indicador) => {
        setSelectedIndicador(indicador);
        setShowEditModal(true);
    };

    return {
        createIndicadorFunc,
        editIndicadorFunc,
        handleDeleteClick,
        handleChangeCurrent,
        handleChange,
        handleRowClick,
        handleCloseModal,
        handleEditClick
    };
};
