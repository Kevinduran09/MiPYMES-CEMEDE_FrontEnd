import { Delete } from "@mui/icons-material";
import { useCuestionarioActions } from "../handlers/useActionsCuestionario";
import { Check } from "@mui/icons-material";
import { CustomButton } from "../../CustomButton";
import { Edit } from "@mui/icons-material";
export const TableColumns = () => {
  const { handleDeleteClick, handleEditClick, handleAssignClick } =
    useCuestionarioActions();
    
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "fechaCreacion", headerName: "Fecha creacion", width: 200 },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            denegateRols={["Aplicador"]}
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
            denegateRols={["Aplicador"]}
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
    {
      field: "asignar",
      headerName: "Asignar",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            denegateRols={["Aplicador"]}
            icon={<Check />}
            variant="outlined"
            text={"Asignar"}
            action={() => handleAssignClick(params.row)}
          />
        </>
      ),
    },
  ];
  return { columns };
};
