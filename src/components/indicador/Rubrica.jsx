import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { RubricasTable } from './components/RubricasTable';
import { RubricaModal, CreateRubricaModal } from './components/Modals';
import { createRubrica, getRubricas } from '../../services/RubricaService';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Loading } from '../../util/loading';
import { NoFiles } from '../../util/NoFiles';

export const Rubrica = () => {
  const queryClient = useQueryClient();
  const { isLoading, data: dataRows, isError } = useQuery({
    queryKey: ["rubricas"],
    queryFn: getRubricas,
  });

  const [rubricas, setRubricas] = useState(() => {
    const savedRubricas = JSON.parse(localStorage.getItem('rubricas')) || [];
    return savedRubricas;
  });
  const [currentRubrica, setCurrentRubrica] = useState({
    id: Date.now(),
    nombre: '',
    tipo: 'radio',
    opciones: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRubrica, setSelectedRubrica] = useState(null);

  const addOpcion = () => {
    const nuevaOpcion = {
      id: Date.now(),
      nombre: '',
      valor_alfa: 0.0,
    };
    setCurrentRubrica({
      ...currentRubrica,
      opciones: [...currentRubrica.opciones, nuevaOpcion],
    });
  };

  const updateOpcion = (id, newData) => {
    const updatedOpciones = currentRubrica.opciones.map((opcion) =>
      opcion.id === id ? { ...opcion, ...newData } : opcion
    );
    setCurrentRubrica({ ...currentRubrica, opciones: updatedOpciones });
  };

  const createMutation = useMutation({
    mutationFn: createRubrica,
    onSuccess: () => {
      queryClient.invalidateQueries("rubricas")
      setShowCreateModal(false);
    },
    onError: (error) => {
    }
  })

  const createRub = () => {
    // Crear una copia de currentRubrica sin el id y sin el id de cada opción
    const rubricaSinIds = {
      ...currentRubrica,
      opciones: currentRubrica.opciones.map(({ id, ...resto }) => resto),
    };

    // Eliminar el id de la currentRubrica
    delete rubricaSinIds["id"];

    // Llamar a la mutación con la rúbrica sin los ids
    createMutation.mutate(rubricaSinIds);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRubrica((rubrica) => ({
      ...rubrica,
      [name]: value
    }));
  };

  const handleRowClick = (rubrica) => {
    setSelectedRubrica(rubrica);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRubrica(null);
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div>
        <NoFiles />
      </div>
    );


  return (
    <Container>
      <h2 className="mb-5 mt-5">Rúbricas</h2>
      <div className='d-flex justify-content-end'>
        <Button onClick={() => setShowCreateModal(true)} variant="primary" className="mb-3">
          Crear Nueva Rúbrica
        </Button>
      </div>

      <RubricasTable rubricas={dataRows} onRowClick={handleRowClick} />

      <RubricaModal
        show={showModal}
        onHide={handleCloseModal}
        rubrica={selectedRubrica}
      />

      <CreateRubricaModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        rubrica={currentRubrica}
        onSave={createRub}
        handleChange={handleChange}
        onAddOpcion={addOpcion}
        onUpdateOpcion={updateOpcion}
      />
    </Container>
  );
};

