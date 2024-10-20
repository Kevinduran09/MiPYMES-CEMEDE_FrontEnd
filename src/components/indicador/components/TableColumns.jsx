import { useIndicadorActions } from "../handlers/useIndicadorActions";
import { Delete } from "@mui/icons-material";
import { CustomButton } from "../../CustomButton";
import { Edit } from "@mui/icons-material";
export const TableColumns = () => {
  const { handleDeleteClick, handleEditClick } = useIndicadorActions();

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "descripcion", headerName: "Descripción", width: 140 },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            action={() => {
              handleDeleteClick(params.row.id);
            }}
            color="error"
            text={"Eliminar"}
            variant="contained"
            icon={<Delete />}
          />
        </>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            action={() => {
              handleEditClick(params.row);
            }}
            icon={<Edit />}
            text={"Editar"}
            variant="contained"
          />
        </>
      ),
    },
  ];

  return { columns };
};
