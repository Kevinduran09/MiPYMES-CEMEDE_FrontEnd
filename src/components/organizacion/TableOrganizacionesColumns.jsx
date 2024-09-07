import { useOrganizacionActions } from "./handlers/useOrganizacionActions.js";
import { DeleteButton } from "../DeleteButton.jsx";
import { UpdateButton } from "../UpdateButton.jsx";

export const OrganizationColumns = (setOpen) => {
  const { deleteOrganizacion, handleEditClick } = useOrganizacionActions();
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "telefono_movil", headerName: "Teléfono Móvil", width: 200 },
    { field: "telefono_fijo", headerName: "Teléfono Fijo", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "pagina_web",
      headerName: "Página Web",
      width: 150,
      renderCell: (params) => (params.row.website_url ? "Sí" : "No"),
    },
    {
      field: "website_url",
      headerName: "URL Sitio Web",
      width: 250,
      renderCell: (params) => params.row.website_url || "N/A",
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
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <DeleteButton handleDelete={deleteOrganizacion} id={params.row.id} />
        </>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 130,
      renderCell: (params) => (
        <>
          <UpdateButton
            handleUpdate={handleEditClick}
            setOpen={setOpen}
            cls={params.row}
          />
        </>
      ),
    },
  ];
  return { columns };
};
