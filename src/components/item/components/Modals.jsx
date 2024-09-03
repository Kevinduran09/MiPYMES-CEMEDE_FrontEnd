import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { getRubricas } from '../../../services/RubricaService';
import { getIndicadores } from '../../../services/IndicadorService';
import { useQuery } from 'react-query';
export const ItemModal = ({ show, onHide, item }) => {
    if (!item) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{item.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Peso:</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="number"
                                value={item.peso}
                                readOnly
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Rúbrica:</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="select"
                                value={item.rubrica ? item.rubrica.id : ''}
                                readOnly
                            >
                                {item.rubrica && (
                                    <option value={item.rubrica.id}>
                                        {item.rubrica.nombre}
                                    </option>
                                )}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">Indicador:</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="select"
                                value={item.indicador ? item.indicador.id : ''}
                                readOnly
                            >
                                {item.indicador && (
                                    <option value={item.indicador.id}>
                                        {item.indicador.nombre}
                                    </option>
                                )}
                            </Form.Control>
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

export const CreateItemModal = ({ show, onHide, item, onSave, handleChange, title }) => {

    const { isLoading: rubricasLoading, data: rubricasData } = useQuery({
        queryKey: ["rubricas"],
        queryFn: getRubricas,
    });

    const { isLoading: indicadoresLoading, data: indicadoresData } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear nuevo item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Nombre:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Nombre del Item"
                            value={item.nombre}
                            name="nombre"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Peso:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="number"
                            placeholder="Peso del Item"
                            value={item.peso}
                            name="peso"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Rúbrica:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            as="select"
                            name="rubricaId"
                            value={item.rubricaId}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar una rúbrica</option>
                            {rubricasLoading ? (
                                <p>No hay rubricas disponibles.</p>
                            ) : (
                                rubricasData.map((rubrica) => (
                                    <option key={rubrica.id} value={rubrica.id}>
                                        {rubrica.nombre}
                                    </option>
                                ))
                            )}


                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Indicador:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            as="select"
                            name="indicadorId"
                            value={item.indicadorId}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar un indicador</option>
                            {indicadoresLoading ? (
                                <p>No hay indicadores disponibles.</p>
                            ) : (
                                indicadoresData.map((indicador) => (
                                    <option key={indicador.id} value={indicador.id}>
                                        {indicador.nombre}
                                    </option>
                                ))
                            )}

                        </Form.Control>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onSave}>
                    Guardar Item
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export const EditItemModal = ({ show, onHide, item, onSave, handleChange }) => {
    const { isLoading: rubricasLoading, data: rubricasData } = useQuery({
        queryKey: ["rubricas"],
        queryFn: getRubricas,
    });

    const { isLoading: indicadoresLoading, data: indicadoresData } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Nombre:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Nombre del Item"
                            value={item.nombre}
                            name="nombre"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Peso:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="number"
                            placeholder="Peso del Item"
                            value={item.peso}
                            name="peso"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Rúbrica:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            as="select"
                            name="rubricaId"
                            value={item.rubricaId || ''}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar una rúbrica</option>
                            {rubricasLoading ? (
                                <option value="">Cargando...</option>
                            ) : (
                                rubricasData.map((rubrica) => (
                                    <option key={rubrica.id} value={rubrica.id}>
                                        {rubrica.nombre}
                                    </option>
                                ))
                            )}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">Indicador:</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            as="select"
                            name="indicadorId"
                            value={item.indicadorId || ''}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar un indicador</option>
                            {indicadoresLoading ? (
                                <option value="">Cargando...</option>
                            ) : (
                                indicadoresData.map((indicador) => (
                                    <option key={indicador.id} value={indicador.id}>
                                        {indicador.nombre}
                                    </option>
                                ))
                            )}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={onSave}>
                    Guardar Item
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
