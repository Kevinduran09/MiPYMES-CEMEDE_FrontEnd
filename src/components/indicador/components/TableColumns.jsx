import { useIndicadorActions } from "../handlers/useIndicadorActions";
import { DeleteButton } from "../../DeleteButton";
import { UpdateButton } from "../../UpdateButton";

export const TableColumns = () => {
  const { handleDeleteClick, handleEditClick } = useIndicadorActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "descripcion", headerName: "Descripcion", width: 140 },
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