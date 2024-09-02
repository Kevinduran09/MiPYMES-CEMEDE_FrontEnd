import { Table } from 'react-bootstrap';

export const ItemsTable = ({ items, onRowClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre del item</th>
          <th>Peso</th>
        </tr>
      </thead>
      <tbody>
      {items.map((item, index) => (
          <tr key={item.id} onClick={() => onRowClick(item)}>
            <td>{index + 1}</td>
            <td>{item.nombre}</td>
            <td>{item.peso}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};