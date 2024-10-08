import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { ItemsTable } from './components/ItemsTable';
import { ItemModal, CreateItemModal, EditItemModal } from './components/Modals';
import { getItems } from '../../services/ItemService';
import { useQuery } from 'react-query';
import { useItemActions } from './handlers/useItemActions'; // Importa el hook de acciones
import { useItemStore } from '../../hooks/useItemStore';
export const Item = () => {


    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


    const { selectedItem, currentItem } = useItemStore();
    const {
        createItemFunc,
        editItemFunc,
        handleDeleteClick,
        handleChangeCurrent,
        handleChange,
        handleRowClick,
        handleCloseModal,
        handleEditClick
    } = useItemActions(setShowCreateModal, setShowEditModal, setShowModal);

    const { data: dataRows } = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    });

    return (
        <Container>
            <h2 className="mb-5 mt-5">Items</h2>
            <div className='d-flex justify-content-end gap-1'>
                <Button onClick={() => setShowCreateModal(true)} variant="primary" className="mb-3">
                    Crear Nuevo Item
                </Button>
            </div>

            {dataRows && dataRows.length > 0 ? (
                <ItemsTable
                    items={dataRows}
                    onRowClick={handleRowClick}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            ) : (
                <p>No hay items disponibles.</p>
            )}

            <ItemModal
                show={showModal}
                onHide={handleCloseModal}
                item={selectedItem}
            />

            <CreateItemModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                item={currentItem}
                onSave={createItemFunc}
                handleChange={handleChangeCurrent}
            />

            {(selectedItem && showEditModal) && (
                <EditItemModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    item={selectedItem}
                    onSave={editItemFunc}
                    handleChange={handleChange}
                />
            )}
        </Container>
    );
};
