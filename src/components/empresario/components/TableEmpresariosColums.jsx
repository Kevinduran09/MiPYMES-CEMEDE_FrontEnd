import { useEmpresarioActions } from "../handlers/useEmpresarioActions";
import { Delete } from "@mui/icons-material";
import { CustomButton } from "../../CustomButton";
import { Edit } from "@mui/icons-material";
export const TableEmpresariosColums = () => {
  const { handleEditClick, deleteEmpresario } = useEmpresarioActions();

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
    },
    { field: "telefono", headerName: "Teléfono", width: 200 },
    { field: "correo_contacto", headerName: "Correo de Contacto", width: 200 },
    // {
    //   field: "numero_personas_fundadoras",
    //   headerName: "Núm. Personas Fundadoras",
    //   width: 200,
    // },
    // { field: "numero_personas", headerName: "Núm. Personas", width: 200 },
    { field: "nacionalidad", headerName: "Nacionalidad", width: 200 },
    { field: "escolaridad", headerName: "Escolaridad", width: 200 },
    { field: "edad", headerName: "Edad", width: 80 },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            action={() => {
              deleteEmpresario(params.row.id);
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
