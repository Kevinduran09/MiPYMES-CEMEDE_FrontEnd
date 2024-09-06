import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { RubricasTable } from './components/RubricasTable';
import { RubricaModal, CreateRubricaModal, EditRubricaModal } from './components/Modals';
import { getRubricas } from '../../services/RubricaService';
import { useQuery } from 'react-query';
import { Loading } from '../../util/loading';
import { NoFiles } from './../../util/NoFiles';
import { useRubricaStore } from '../../hooks/useRubricaStore';
import { useRubricaActions } from './handlers/useRubricaActions'; // Importa el hook de acciones

export const Rubrica = () => {


  const { isLoading, data: dataRows, isError } = useQuery({
    queryKey: ["rubricas"],
    queryFn: getRubricas,
  });

  const [showModal, setShowModal] = React.useState(false);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const {
    selectedRubrica,
    currentRubrica
  } = useRubricaStore();
  const {
    addOpcion,
    updateOpcion,
    createRub,
    editRubricaFunc,
    handleChange,
    handleChangeCurrent,
    handleEditClick,
    handleDeleteClick,
    handleRowClick,
    handleCloseModal
  } = useRubricaActions(setShowCreateModal, setShowEditModal, setShowModal);

  if (isLoading) return <Loading />;
  if (isError) return <NoFiles />;

  return (
    <Container>
      <h2 className="mb-5 mt-5">Rúbricas</h2>
      <div className="d-flex justify-content-end gap-1">
        <Button onClick={() => setShowCreateModal(true)} variant="primary" className="mb-3">
          Crear Nueva Rúbrica
        </Button>
      </div>

      <RubricasTable
        rubricas={dataRows}
        onRowClick={handleRowClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <RubricaModal
        show={showModal}
        onHide={handleCloseModal}
        rubrica={selectedRubrica}
      />

      <CreateRubricaModal
        show={showCreateModal}
        onHide={() => {
          setShowCreateModal(false);
        }}
        rubrica={currentRubrica}
        onSave={createRub}
        handleChange={handleChangeCurrent}
        onAddOpcion={addOpcion}
        onUpdateOpcion={updateOpcion}
      />

      {(selectedRubrica && showEditModal) && (
        <EditRubricaModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          rubrica={selectedRubrica}
          onSave={editRubricaFunc}
          handleChange={handleChange}
        />
      )}
    </Container>
  );
};
