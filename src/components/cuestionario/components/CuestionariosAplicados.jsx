import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { TableComponent } from '../../TableComponent';
import { getCuestionariosAplicados } from '../services/CuestionarioService';
import { TableColumnsCuestionariosAplicados } from './TableColumnsCuestionariosAplicados';
import { useAuthStore } from '../../auth/store/useAuthStore';

export const CuestionariosAplicados = () => {

    const navigate = useNavigate();
    const { columns } = TableColumnsCuestionariosAplicados();
    const { resetCurrentCuestionario, clearSelectedCuestionario } = useCuestionarioStore();
    const { currentUser } = useAuthStore();

    const { isLoading, isError, data: dataRows } = useQuery({
        queryKey: ["cuestionarios"],
        queryFn: getCuestionariosAplicados,
    });

    const navigation = () => {
        resetCurrentCuestionario();
        clearSelectedCuestionario();
        navigate("/cuestionarios/crear");
    };
    const filteredDataRows = dataRows?.filter(row => {
        
        if (!row.estado) {
            return false;
        }

        if (currentUser.rol === "Gestor" || currentUser.rol === "Administrador") {
            return true;
        }
        return row.aplicador?.id === currentUser.sub;
    }) || dataRows;

    return (
        <>
            <Container>
                <TableComponent
                    title={"Cuestionarios"}
                    columns={columns}
                    rowsSet={filteredDataRows}
                    isError={isError}
                    isLoading={isLoading}
                    route={navigation}
                />
            </Container>
        </>
    );
};