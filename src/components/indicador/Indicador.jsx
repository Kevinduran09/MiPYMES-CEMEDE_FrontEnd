import { Container } from 'react-bootstrap';
import { getIndicadores } from './services/IndicadorService';
import { useQuery } from 'react-query';
import { useIndicadorStore } from './store/useIndicadorStore';
import { useNavigate } from 'react-router-dom';
import { TableComponent } from '../TableComponent';
import { TableColumns } from './components/TableColumns';
import { AddButton } from '../AddButton';

export const Indicador = () => {

    const navigate = useNavigate();
    const { columns } = TableColumns();
    const { clearSelectedIndicador, resetCurrentIndicador } = useIndicadorStore();

    const { isLoading, isError, data: dataRows } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });

    const navigation = () => {
        resetCurrentIndicador();
        clearSelectedIndicador();
        navigate("/indicadores/crear");
    };

    return (
        <Container>
            {dataRows && dataRows.length > 0 ? (
                <TableComponent
                    title={"Indicadores"}
                    columns={columns}
                    rowsSet={dataRows}
                    isError={isError}
                    isLoading={isLoading}
                    customButtons={<AddButton route={navigation} />}
                />
            ) : (
                <p>No hay indicadores disponibles.</p>
            )}
        </Container>
    );
};
