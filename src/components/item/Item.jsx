import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { ItemsTable } from './components/ItemsTable';  // Asume que tienes una tabla de items similar a RubricasTable
import { ItemModal, CreateItemModal } from './components/Modals'; // Modales adaptados para Items
import { createItem, getItems } from '../../services/ItemService'; // Servicios adaptados para Items
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const Item = () => {
    const queryClient = useQueryClient();
    const { isLoading, data: dataRows, isError } = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    });

    const [currentItem, setCurrentItem] = useState({
        id: Date.now(),
        nombre: '',
        peso: 0,
        rubricaId: '',
        indicadorId: '', // Agregamos el campo indicadorId al estado
    });

    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const createMutation = useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries("items");
            setShowCreateModal(false);
        },
        onError: (error) => {
            console.error("Error creating item:", error);
        },
    });

    const createItemFunc = () => {
        const itemSinId = { ...currentItem };
        delete itemSinId["id"];

        createMutation.mutate(itemSinId);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem((item) => ({
            ...item,
            [name]: value,
        }));
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };


    return (
        <Container>
            <h2 className="mb-5 mt-5">Items</h2>
            <div className='d-flex justify-content-end'>
                <Button onClick={() => setShowCreateModal(true)} variant="primary" className="mb-3">
                    Crear Nuevo Item
                </Button>
            </div>

            {dataRows && dataRows.length > 0 ? (
                <ItemsTable items={dataRows} onRowClick={handleRowClick} />
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
                handleChange={handleChange}
            />
        </Container>
    );
};
