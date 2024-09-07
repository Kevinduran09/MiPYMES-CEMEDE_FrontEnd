import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { IndicadoresTable } from './components/IndicadoresTable';
import { IndicadorModal, CreateIndicadorModal, EditIndicadorModal } from './components/Modals';
import { getIndicadores } from '../../services/IndicadorService';
import { useQuery } from 'react-query';
import { useIndicadorActions } from './handlers/useIndicadorActions';
import { useIndicadorStore } from '../../hooks/useIndicadorStore';

export const Indicador = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const { selectedIndicador, currentIndicador } = useIndicadorStore();
    const {
        createIndicadorFunc,
        editIndicadorFunc,
        handleDeleteClick,
        handleChangeCurrent,
        handleChange,
        handleRowClick,
        handleCloseModal,
        handleEditClick
    } = useIndicadorActions(setShowCreateModal, setShowEditModal, setShowModal);

    const { data: dataRows } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });

    return (
        <Container>
            <h2 className="mb-5 mt-5">Indicadores</h2>
            <div className='d-flex justify-content-end gap-1'>
                <Button onClick={() => setShowCreateModal(true)} variant="primary" className="mb-3">
                    Crear Nuevo Indicador
                </Button>
            </div>

            {dataRows && dataRows.length > 0 ? (
                <IndicadoresTable
                    indicadores={dataRows}
                    onRowClick={handleRowClick}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            ) : (
                <p>No hay indicadores disponibles.</p>
            )}

            <IndicadorModal
                show={showModal}
                onHide={handleCloseModal}
                indicador={selectedIndicador}
            />

            <CreateIndicadorModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                indicador={currentIndicador}
                onSave={createIndicadorFunc}
                handleChange={handleChangeCurrent}
            />

            {(selectedIndicador && showEditModal) && (
                <EditIndicadorModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    indicador={selectedIndicador}
                    onSave={editIndicadorFunc}
                    handleChange={handleChange}
                />
            )}
        </Container>
    );
};
