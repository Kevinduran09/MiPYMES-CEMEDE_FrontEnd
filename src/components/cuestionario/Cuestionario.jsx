import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';

export const Cuestionario = () => {

    

    return (
        <>
            <Container>
                <h2 className="mb-5 mt-5">Cuestionarios</h2>
                <div className='d-flex justify-content-end gap-1'>
                    <Button variant="primary" className="mb-3">
                        Crear Nuevo Cuestionario
                    </Button>
                </div>
            </Container>
        </>
    );
};