import { useItemActions } from "../handlers/useItemActions.js";
import { Delete } from "@mui/icons-material";
import { CustomButton } from "../../CustomButton";
import { Edit } from "@mui/icons-material";
export const TableColumns = () => {
  const { handleDeleteClick, handleEditClick } = useItemActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "peso", headerName: "Peso", width: 140 },
    {
      field: "indicador",
      headerName: "Indicador",
      width: 150,
      valueGetter: (params) => params.row.indicador.nombre,
    },
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
