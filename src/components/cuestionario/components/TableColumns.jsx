import { Button } from "@mui/material";
import { DeleteButton } from "../../DeleteButton";
import { UpdateButton } from "../../UpdateButton";
import { useCuestionarioActions } from '../handlers/useActionsCuestionario';
import { Check, CheckBox } from "@mui/icons-material";

export const TableColumns = () => {
  const { handleDeleteClick, handleEditClick, handleApplyClick } = useCuestionarioActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "fechaCreacion", headerName: "Fecha creacion", width: 200 },
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
    {
      field: "aplicar",
      headerName: "Aplicar",
      width: 130,
      renderCell: (params) => (
        <>
          <Button
            startIcon={<Check />}
            variant="outlined"
            color="primary"
            onClick={() => handleApplyClick(params.row)}
          >
            Aplicar
          </Button>
        </>
      ),
    },
  ];
  return { columns };
};