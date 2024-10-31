import { Delete } from "@mui/icons-material";
import { CustomButton } from "../../CustomButton";
import { Edit } from "@mui/icons-material";
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
          <div style={{ display: "flex", justifyContent: "center" }}>
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
