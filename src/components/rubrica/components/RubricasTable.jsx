import { Table, Button } from 'react-bootstrap';

export const RubricasTable = ({ rubricas, onRowClick, onEditClick, onDeleteClick }) => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre de la Rúbrica</th>
          <th>Opciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rubricas.map((rubrica) => (
          <tr key={rubrica.id} onClick={() => onRowClick(rubrica)}>
            <td>{rubrica.nombre}</td>
            <td>
              <ul>
                {rubrica.opciones.map((opcion) => (
                  <li key={opcion.id}>
                    {opcion.nombre} ({rubrica.tipo}) - Valor Alfa: {opcion.valor_alfa}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(rubrica);
                }}
              >
                Editar
              </Button>
              {' '}
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(rubrica.id)
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
