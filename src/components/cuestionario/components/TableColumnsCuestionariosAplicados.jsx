import { Check, Visibility } from "@mui/icons-material";
import { useCuestionarioActions } from "../handlers/useActionsCuestionario";
import { CustomButton } from "../../CustomButton";
export const TableColumnsCuestionariosAplicados = () => {
  const { handleDetailsClick, handleApplyClick } = useCuestionarioActions();
  const columns = [
    {
      field: "nombreCuestionario",
      headerName: "Nombre cuestionario",
      width: 200,
      valueGetter: (params) => params.row.cuestionario?.nombre,
    },
    { field: "fechaRealizacion", headerName: "Fecha realizado", width: 200 },
    {
      field: "nombreOrganizacion",
      headerName: "Nombre organizacion",
      width: 200,
      valueGetter: (params) => params.row.organizacion?.nombre,
    },
    {
      field: "nombreAplicador",
      headerName: "Nombre aplicador",
      width: 200,
      valueGetter: (params) => params.row.aplicador?.nombre,
    },
    {
      field: "detalles",
      headerName: "Detalles",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            action={() => {
              handleDetailsClick(params.row.id);
            }}
            text={"Ver"}
            icon={<Visibility />}
            variant="outlined"
            disabled={params.row.estado? false: true}
          />
        </>
      ),
    },
  ];
  return { columns };
};
