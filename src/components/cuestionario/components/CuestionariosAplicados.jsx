import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { TableComponent } from '../../TableComponent';
import { getCuestionariosAplicados } from '../services/CuestionarioService';
import { TableColumnsCuestionariosAplicados } from './TableColumnsCuestionariosAplicados';

export const CuestionariosAplicados = () => {

    const navigate = useNavigate();
    const { columns } = TableColumnsCuestionariosAplicados();
    const { resetCurrentCuestionario, clearSelectedCuestionario } = useCuestionarioStore();

    const { isLoading, isError, data: dataRows } = useQuery({
        queryKey: ["cuestionarios"],
        queryFn: getCuestionariosAplicados,
    });

    const navigation = () => {
        resetCurrentCuestionario();
        clearSelectedCuestionario();
        navigate("/cuestionarios/crear");
    };


    return (
        <>
            <Container>
                {dataRows && dataRows.length > 0 ? (
                    <TableComponent
                        title={"Cuestionarios"}
                        columns={columns}
                        rowsSet={dataRows}
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