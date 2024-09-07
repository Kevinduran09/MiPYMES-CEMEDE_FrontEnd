// src/components/handlers/useRubricaActions.js
import { ConfirmarDialogo, EliminarDialogo } from '../../dialogos/Dialogos';
import { useRubricaStore } from '../../../hooks/useRubricaStore';
import { useRubricaMutations } from '../mutations/useRubricaMutations';

export const useRubricaActions = (setShowCreateModal, setShowEditModal, setShowModal) => {
  const {
    selectedRubrica,
    currentRubrica,
    setSelectedRubrica,
    updateCurrentRubrica,
    clearSelectedRubrica
  } = useRubricaStore();

  const { deleteMutation, createMutation, editMutation } = useRubricaMutations(setShowCreateModal, setShowEditModal);

  const addOpcion = () => {
    const nuevaOpcion = {
      id: Date.now(),
      nombre: '',
      valor_alfa: 0.0,
    };
    updateCurrentRubrica({
      opciones: [...currentRubrica.opciones, nuevaOpcion],
    });
  };

  const updateOpcion = (id, newData) => {
    const updatedOpciones = currentRubrica.opciones.map((opcion) =>
      opcion.id === id ? { ...opcion, ...newData } : opcion
    );
    updateCurrentRubrica({ opciones: updatedOpciones });
  };

  const createRub = () => {
    const rubricaSinIds = {
      ...currentRubrica,
      opciones: currentRubrica.opciones.map(({ id, ...resto }) => resto),
    };

    delete rubricaSinIds["id"];
    createMutation.mutate(rubricaSinIds);
  };

  const editRubricaFunc = () => {
    ConfirmarDialogo(editMutation, selectedRubrica);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRubrica({
      ...selectedRubrica,
      [name]: value,
    });
  };

  const handleChangeCurrent = (e) => {
    const { name, value } = e.target;
    updateCurrentRubrica({ [name]: value });
  };

  const handleEditClick = (rubrica) => {
    setSelectedRubrica(rubrica);
    setShowModal(false);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    EliminarDialogo(deleteMutation, id);
  };

  const handleRowClick = (rubrica) => {
    setSelectedRubrica(rubrica);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    clearSelectedRubrica();
    setShowModal(false);
  };

  return {
    addOpcion,
    updateOpcion,
    createRub,
    editRubricaFunc,
    handleChange,
    handleChangeCurrent, 
    handleCloseModal,
    handleEditClick,
    handleDeleteClick,
    handleRowClick
  };
};
