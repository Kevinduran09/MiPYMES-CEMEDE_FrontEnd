// src/components/handlers/useRubricaActions.js
import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useRubricaStore } from '../../../hooks/useRubricaStore';
import { useRubricaMutations } from '../mutations/useRubricaMutations';
import { useNavigate } from 'react-router-dom';

export const useRubricaActions = (setShowCreateModal, setShowEditModal, setShowModal) => {
  const navigate = useNavigate();
  
  const {
    setSelectedRubrica,
    updateCurrentRubrica,
    clearSelectedRubrica,
    resetCurrentRubrica
  } = useRubricaStore();

  const { deleteMutation, createMutation, editMutation } = useRubricaMutations();

  const createRubricaFunc = (data) => {

    const rubricaSinIds = {
      ...data,
      opciones: data.opciones.map(({ id, ...resto }) => resto),
    };

    const success = () => {
      clearSelectedRubrica();
      resetCurrentRubrica();
      navigate(-1);
    };


    delete rubricaSinIds["id"];
    ConfirmarDialogo(createMutation, rubricaSinIds, success);
  };

  const editRubricaFunc = (data) => {

    const success = () => {
      clearSelectedRubrica();
      resetCurrentRubrica();
      navigate(-1);
    };
    ConfirmarDialogo(editMutation, data, success);
  };

  const handleEditClick = (rubrica) => {
    setSelectedRubrica(rubrica);
    updateCurrentRubrica(rubrica);
    navigate(`/rubricas/editar/${rubrica.id}`);
  };

  const handleDeleteClick = (id) => {
    EliminarDialogo(deleteMutation, id);
  };

  return {
    createRubricaFunc,
    editRubricaFunc,
    handleEditClick,
    handleDeleteClick
  };
};
