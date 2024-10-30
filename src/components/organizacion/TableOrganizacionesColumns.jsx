import { useOrganizacionActions } from "./handlers/useOrganizacionActions.js";
import { Delete } from "@mui/icons-material";
import { CustomButton } from "../CustomButton.jsx";
import { Edit } from "@mui/icons-material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
export const OrganizationColumns = () => {
  const { deleteOrganizacion, handleEditClick, AsignarEmpresario } = useOrganizacionActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "telefono_movil", headerName: "Teléfono Móvil", width: 200 },
    { field: "telefono_fijo", headerName: "Teléfono Fijo", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "pagina_web",
      headerName: "Página Web",
      width: 150,
      valueGetter: (params) => (params.row.website_url ? "Sí" : "No"),
    },
    {
      field: "website_url",
      headerName: "URL Sitio Web",
      width: 250,
      valueGetter: (params) => params.row.website_url || "N/A",
    },
    {
      field: "sector_empresarial",
      headerName: "Sector Empresarial",
      width: 200,
    },
    { field: "figura_legal", headerName: "Figura Legal", width: 250 },
    {
      field: "tiempo_operacion_anios",
      headerName: "Años de Operación",
      width: 200,
    },
    {
      field: "Asignar Empresario",
      headerName: "Asignar",
      width: 130,
      renderCell: (params) => (
        <>
          <CustomButton
            denegateRols={["Aplicador"]}
            action={() => {
              AsignarEmpresario(params.row);
            }}
            
            text={"Asignar"}
            variant="asignar"
            icon={<AssignmentIndIcon />}
          />
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
            denegateRols={["Aplicador"]}
            action={() => {
              deleteOrganizacion(params.row.id);
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
