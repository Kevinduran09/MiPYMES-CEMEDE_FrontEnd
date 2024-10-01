import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { TableComponent } from '../../TableComponent';
import { getCuestionarioItem, getCuestionariosAplicados } from '../services/CuestionarioService';
import { TableColumnsCuestionariosAplicadosItems } from './TableColumnsCuestionariosAplicadosItems';

export const CuestionariosAplicadoItems = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { columns } = TableColumnsCuestionariosAplicadosItems();
    const { resetCurrentCuestionario, clearSelectedCuestionario } = useCuestionarioStore();

    const { isLoading, isError, data: cuestionarioItem } = useQuery({
        queryKey: ["cuestionario", id],
        queryFn: () => getCuestionarioItem(id),
    });

    const navigation = () => {
        resetCurrentCuestionario();
        clearSelectedCuestionario();
    };

    console.log(cuestionarioItem?.cuestionarioItems)
    return (
        <>
            <Container>
                {cuestionarioItem?.cuestionarioItems && cuestionarioItem.cuestionarioItems.length > 0 ? (
                    <TableComponent
                        title={"Cuestionarios"}
                        columns={columns}
                        rowsSet={cuestionarioItem.cuestionarioItems}
                        isError={isError}
                        isLoading={isLoading}
                        route={navigation}
                    />
                ) : (
                    <p>No hay cuestionarios disponibles.</p>
                )}
            </Container>
        </>
    );
};