import { useUsuarioActions } from "./handlers/useUsuarioActions.js";
import { Delete } from "@mui/icons-material";
import { CustomButton } from "../CustomButton.jsx";
import { Edit } from "@mui/icons-material";
export const UsuarioColumns = () => {
  const { deleteUsuario, handleEditClick } = useUsuarioActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    {
      field: "correo_electronico",
      headerName: "Correo Electrónico",
      width: 250,
    },
    {
      field: "rol",
      headerName: "Rol",
      width: 200,
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          {params.row.id == 1 ? null : (
            <CustomButton
              action={() => {
                deleteUsuario(params.row.id);
              }}
              color="error"
              text={"Eliminar"}
              variant="contained"
              icon={<Delete />}
              denegateRols={["Gestor", "Aplicador"]}
            />
          )}
        </>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <>
          {params.row.id == 1 ? null : (
            <CustomButton
              action={() => {
                handleEditClick(params.row);
              }}
              icon={<Edit />}
              text={"Editar"}
              variant="contained"
            />
          )}
        </>
      ),
    },
  ];

  return { columns };
};
