import { Form, Row, Col } from 'react-bootstrap';

export const Opcion = ({ id, nombre, valor_alfa, onUpdate }) => {
    return (
        <Row className="mb-2">
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Nombre de la opción"
                    value={nombre}
                    onChange={(e) => onUpdate(id, { nombre: e.target.value })}
                />
            </Col>
            <Col>
                <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Valor Alfa"
                    value={valor_alfa}
                    onChange={(e) => onUpdate(id, { valor_alfa: parseFloat(e.target.value) })}
                />
            </Col>
        </Row>
    );
};