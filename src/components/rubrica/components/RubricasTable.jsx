import { Table } from 'react-bootstrap';

export const RubricasTable = ({ rubricas, onRowClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre de la Rúbrica</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
      {rubricas.map((rubrica, index) => (
          <tr key={rubrica.id} onClick={() => onRowClick(rubrica)}>
            <td>{index + 1}</td>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};