import { Container } from 'react-bootstrap';
import { getItems } from '../../services/ItemService';
import { useQuery } from 'react-query';
import { useItemStore } from '../../hooks/useItemStore';
import { TableComponent } from '../TableComponent';
import { TableColumns } from './components/TableColumns';
import { useNavigate } from 'react-router-dom';

export const Item = () => {
    const navigate = useNavigate();
    const { columns } = TableColumns();

    const { resetCurrentItem, clearSelectedItem } = useItemStore();
    const { isLoading, isError, data: dataRows } = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    });

    const navigation = () => {
        resetCurrentItem();
        clearSelectedItem();
        navigate("/items/crear");
    };

    return (
        <Container>
            {dataRows && dataRows.length > 0 ? (
                <TableComponent
                    title={"Items"}
                    columns={columns}
                    rowsSet={dataRows}
                    isError={isError}
                    isLoading={isLoading}
                    route={navigation}
                />
            ) : (
                <p>No hay items disponibles.</p>
            )}
        </Container>
    );
};
