import { Table, Button } from 'react-bootstrap';

export const ItemsTable = ({ items, onRowClick, onEditClick, onDeleteClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre del item</th>
          <th>Peso</th>
          <th>Indicador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} onClick={() => onRowClick(item)}>
            <td>{item.nombre}</td>
            <td>{item.peso}</td>
            <td>{item.indicador.nombre}</td>
            <td>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(item);
                }}
              >
                Editar
              </Button>{' '}
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(item);
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
