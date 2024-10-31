import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useCuestionarioMutations } from '../mutations/useCuestionarioMutations';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { useNavigate } from 'react-router-dom';

export const useCuestionarioActions = () => {
    const navigate = useNavigate();

    const {
        setSelectedCuestionario,
        clearSelectedCuestionario,
        updateCurrentCuestionario,
        resetCurrentCuestionario,
        resetRespuestas
    } = useCuestionarioStore();

    const { deleteMutation, createMutation, editMutation, createCuestionarioOrganizacionMutation, createCuestionarioItemMutation } = useCuestionarioMutations();

    const createCuestionarioFunc = (data) => {
        const cuestionarioSinId = data;
        const success = () => {
            clearSelectedCuestionario();
            resetCurrentCuestionario();
            navigate(-1);
        };

        delete cuestionarioSinId["id"];

        ConfirmarDialogo(createMutation, cuestionarioSinId, success);
    };

    const createCuestionarioOrganizacionFunc = (data) => {
        const cuestionarioOrganizacion = data;
        const success = () => {
            clearSelectedCuestionario();
            resetCurrentCuestionario();
        };


        ConfirmarDialogo(createCuestionarioOrganizacionMutation, cuestionarioOrganizacion, success);
        
    };
    const createCuestionarioItemFunc = (data) => {
        const cuestionarioItem = data;
        cuestionarioItem["idCuestionarioOrganizacion"] = parseInt(cuestionarioItem["idCuestionarioOrganizacion"]);
        const success = () => {
            resetRespuestas();
            navigate("/cuestionarios");
        };

        ConfirmarDialogo(createCuestionarioItemMutation, cuestionarioItem, success);
    };

    const editCuestionarioFunc = (data) => {
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

    const handleEditClick = (cuestionario) => {
        setSelectedCuestionario(cuestionario);
        updateCurrentCuestionario(cuestionario);
        navigate(`/cuestionarios/editar/${cuestionario.id}`);
    };

    const handleAssignClick = (cuestionario) => {
        setSelectedCuestionario(cuestionario);
        updateCurrentCuestionario(cuestionario);
        navigate(`/cuestionarios/asignar/${cuestionario.id}`);
    };
    const handleDetailsClick = (id) => {
        navigate(`/cuestionarios/aplicados/${id}`);
    };

    const handleApplyClick = (id) => {
        navigate(`/cuestionarios/aplicar/organizacion/${id}`);
    }

    return {
        createCuestionarioFunc,
        editCuestionarioFunc,
        createCuestionarioOrganizacionFunc,
        createCuestionarioItemFunc,
        handleDeleteClick,
        handleEditClick,
        handleAssignClick,
        handleDetailsClick,
        handleApplyClick
    };
};
