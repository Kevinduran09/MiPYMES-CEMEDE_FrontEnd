import { useEmpresarioActions } from "./handlers/useEmpresarioActions";
import { DeleteButton } from "../DeleteButton";
import { UpdateButton } from "../UpdateButton";

export const TableEmpresariosColums = (setOpen) => {
  const { handleEditClick, deleteEmpresario } = useEmpresarioActions();

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
    },
    { field: "telefono", headerName: "Teléfono", width: 200 },
    { field: "correo_contacto", headerName: "Correo de Contacto", width: 200 },
    {
      field: "numero_personas_fundadoras",
      headerName: "Núm. Personas Fundadoras",
      width: 200,
    },
    { field: "numero_personas", headerName: "Núm. Personas", width: 200 },
    { field: "nacionalidad", headerName: "Nacionalidad", width: 200 },
    { field: "escolaridad", headerName: "Escolaridad", width: 200 },
    { field: "edad", headerName: "Edad", width: 80 },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <>
          <DeleteButton handleDelete={deleteEmpresario} id={params.row.id} />
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
