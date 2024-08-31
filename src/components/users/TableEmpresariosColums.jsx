import { DeleteEmpresario } from "./DeleteEmpresario";
import { UpdateEmpresario } from "./UpdateEmpresario";

export const columns = [
  {
    field: "nombre",
    headerName: "Nombre",
    width: 200,

    renderCell: (params) => (
      <>
        <p style={{ marginBottom: 0 }}>{params.row.nombre}</p>
      </>
    ),
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
  { field: "edad", headerName: "Edad", width: 200 },
  {
    field: "Eliminar",
    headerName: "Eliminar",
    width: 150,
    renderCell: (params) => (
      <>
        <DeleteEmpresario id={params.row.id} />
      </>
    ),
  },
  {
    field: "Editar",
    headerName: "Editar",
    width: 200,
    renderCell: (params) => (
      <>
        <UpdateEmpresario cls={params.row} />
      </>
    ),
  },
];
