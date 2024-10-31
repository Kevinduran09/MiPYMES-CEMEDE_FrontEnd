import { Check, Visibility } from "@mui/icons-material";
import { useCuestionarioActions } from "../handlers/useActionsCuestionario";
import { CustomButton } from "../../CustomButton";
export const TableColumnsCuestionariosAsignados = () => {
  const { handleApplyClick } = useCuestionarioActions();
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
      field: "aplicar",
      headerName: "Aplicar",
      width: 130,
      renderCell: (params) => (
        <>
        
          <CustomButton
            action={() => {
              handleApplyClick(params.row.id);
            }}
            text={"Aplicar"}
            icon={<Check />}
            variant="outlined"
            disabled={params.row.estado}
          />
        </>
      ),
    }
  ];
  return { columns };
};
