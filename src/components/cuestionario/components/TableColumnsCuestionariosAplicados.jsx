import { DetailsButton } from "../../DetailsButton";
import { useCuestionarioActions } from "../handlers/useActionsCuestionario";

export const TableColumnsCuestionariosAplicados = () => {
  const { handleDetailsClick } = useCuestionarioActions();
  const columns = [
    {
      field: "nombreCuestionario", headerName: "Nombre cuestionario", width: 250,
      valueGetter: (params) => params.row.cuestionario?.nombre
    },
    { field: "fechaRealizacion", headerName: "Fecha realizado", width: 200 },
    {
      field: "nombreOrganizacion", headerName: "Nombre organizacion", width: 250,
      valueGetter: (params) => params.row.organizacion?.nombre
    },
    {
      field: "detalles",
      headerName: "Detalles",
      width: 130,
      renderCell: (params) => (
        <>
          <DetailsButton handleDetails={handleDetailsClick} id={params.row.id} />
        </>
      ),
    },
  ];
  return { columns };
};