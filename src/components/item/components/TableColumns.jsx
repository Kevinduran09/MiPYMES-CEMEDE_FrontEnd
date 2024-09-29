import { useItemActions } from "../handlers/useItemActions.js";
import { DeleteButton } from "../../DeleteButton.jsx";
import { UpdateButton } from "../../UpdateButton.jsx";

export const TableColumns = () => {
  const { handleDeleteClick, handleEditClick } = useItemActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "peso", headerName: "Peso", width: 140 },
    {
      field: "indicador",
      headerName: "Indicador",
      width: 150,
      renderCell: (params) => (params.row.indicador.nombre),
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
