import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export const IndicadorModal = ({ show, onHide, indicador }) => {
    if (!indicador) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{indicador.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Descripción:</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={indicador.descripcion}
                                readOnly
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const CreateIndicadorModal = ({ show, onHide, indicador, onSave, handleChange, title }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear nuevo indicador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Nombre:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Nombre del Indicador"
                            value={indicador.nombre}
                            name="nombre"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Descripción:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Descripción del Indicador"
                            value={indicador.descripcion}
                            name="descripcion"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onSave}>
                    Guardar Indicador
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const EditIndicadorModal = ({ show, onHide, indicador, onSave, handleChange }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar indicador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Nombre:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            value={indicador.nombre}
                            name="nombre"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Descripción:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            value={indicador.descripcion}
                            name="descripcion"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onSave}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
