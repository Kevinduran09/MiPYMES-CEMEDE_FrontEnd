import { DeleteButton } from "../../DeleteButton.jsx";
import { UpdateButton } from "../../UpdateButton.jsx";
import { useRubricaActions } from "../handlers/useRubricaActions.js";

export const TableColumns = () => {
    const { handleDeleteClick, handleEditClick } = useRubricaActions();
    const columns = [
        { field: "nombre", headerName: "Nombre", width: 250 },
        { field: "tipo", headerName: "Tipo", width: 140 },
        {
            field: "opciones",
            headerName: "Opciones",
            width: 150,
            renderCell: (params) => (
                <>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <li>
                            {params.row.opciones.map((opcion) => (
                                <li key={opcion.id}>
                                    {opcion.nombre} - Valor Alfa: {opcion.valor_alfa}
                                </li>
                            ))}
                        </li>
                    </div>
                </>
            ),
        },
        {
            field: "Eliminar",
            headerName: "Eliminar",
            width: 130,
            renderCell: (params) => (
                <>
                    <DeleteButton handleDelete={handleDeleteClick} id={params.row.id} />
                </>
            ),
        },
        {
            field: "Editar",
            headerName: "Editar",
            width: 130,
            renderCell: (params) => (
                <>
                    <UpdateButton handleUpdate={handleEditClick} cls={params.row} />
                </>
            ),
        },
    ];
    return { columns };
};