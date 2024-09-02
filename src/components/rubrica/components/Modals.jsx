import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import { Opcion } from "./Opcion";

export const RubricaModal = ({ show, onHide, rubrica }) => {
    if (!rubrica) return null;
    console.log(rubrica)
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{rubrica.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Opciones</h5>
                <Form>
                    {rubrica.opciones.map((opcion) => (
                        <Form.Group key={opcion.id} className="mb-3">
                            {rubrica.tipo === 'radio' && (
                                <Form.Check
                                    type="radio"
                                    label={`${opcion.nombre} (Valor Alfa: ${opcion.valor_alfa})`}
                                    name={`option-${rubrica.id}`}
                                />
                            )}
                            {rubrica.tipo === 'checkbox' && (
                                <Form.Check
                                    type="checkbox"
                                    label={`${opcion.nombre} (Valor Alfa: ${opcion.valor_alfa})`}
                                />
                            )}
                            {rubrica.tipo === 'text' && (
                                <Form.Control
                                    type="text"
                                    placeholder={opcion.nombre}
                                    value={opcion.valorAlfa}
                                    readOnly
                                />
                            )}
                        </Form.Group>
                    ))}
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

export const CreateRubricaModal = ({ show, onHide, rubrica, onSave, handleChange, onAddOpcion, onUpdateOpcion }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Nueva Rúbrica</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} className="mb-3">
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="Nombre de la Rúbrica"
                            value={rubrica.nombre}
                            name="nombre"
                            onChange={(e)=>handleChange(e)}
                        />
                    </Col>
                    <Col sm="4">
                        <Form.Control
                            as="select"
                            value={rubrica.tipo}
                            name='tipo'
                            onChange={(e)=>handleChange(e)}
                        >
                            <option value="radio">Radio Button</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="text">Texto</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <h5>Opciones</h5>
                {rubrica.opciones.map((opcion) => (
                    <Opcion
                        key={opcion.id}
                        id={opcion.id}
                        nombre={opcion.nombre}
                        valor_alfa={opcion.valor_alfa}
                        onUpdate={onUpdateOpcion}
                    />
                ))}
                <Button onClick={onAddOpcion} variant="primary" className="mb-3">
                    Añadir Opción
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onSave}>
                    Guardar Rúbrica
                </Button>
            </Modal.Footer>
        </Modal>
    );
};