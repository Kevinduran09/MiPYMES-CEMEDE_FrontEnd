import React from 'react';
import { Table, Button } from 'react-bootstrap';

export const IndicadoresTable = ({ indicadores, onRowClick, onEditClick, onDeleteClick }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {indicadores.map((indicador) => (
                    <tr key={indicador.id} onClick={() => onRowClick(indicador)}>
                        <td>{indicador.nombre}</td>
                        <td>{indicador.descripcion}</td>
                        <td>
                            <Button
                                variant="primary"
                                size='sm'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditClick(indicador);
                                }}
                            >
                                Editar
                            </Button>
                            {' '}
                            <Button
                                variant="danger"
                                size='sm'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteClick(indicador);
                                }}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
