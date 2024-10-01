import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useIndicadorStore } from '../store/useIndicadorStore';
import { useIndicadorMutations } from '../mutations/useIndicadorMutations';
import { useNavigate } from 'react-router-dom';

export const useIndicadorActions = (setShowCreateModal, setShowEditModal, setShowModal) => {
    const navigate = useNavigate();

    const {
        setSelectedIndicador,
        clearSelectedIndicador,
        updateCurrentIndicador,
        resetCurrentIndicador
    } = useIndicadorStore();

    const { deleteMutation, createMutation, editMutation } = useIndicadorMutations(setShowCreateModal);

    const createIndicadorFunc = (data) => {
        const indicadorSinId = data;
        const success = () => {
            clearSelectedIndicador();
            resetCurrentIndicador();
            navigate(-1);
        };

        delete indicadorSinId["id"];

        ConfirmarDialogo(createMutation, indicadorSinId, success);
    };

    const editIndicadorFunc = (data) => {
        const current = data;
        const success = () => {
            clearSelectedIndicador();
            resetCurrentIndicador();
            navigate(-1);
        }
        ConfirmarDialogo(editMutation, current, success);
    };

    const handleDeleteClick = (id) => {
        EliminarDialogo(deleteMutation, id);
    };

    const handleEditClick = (indicador) => {
        setSelectedIndicador(indicador);
        updateCurrentIndicador(indicador);
        navigate(`/indicadores/editar/${indicador.id}`);
    };

    return {
        createIndicadorFunc,
        editIndicadorFunc,
        handleDeleteClick,
        handleEditClick
    };
};
