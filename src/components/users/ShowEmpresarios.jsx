import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Loading } from "../../util/loading";
import { NoFiles } from "../../util/NoFiles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getEmpresarios } from "../../services/EmpresarioService";
const empresariosData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    telefono: "123456789",
    correo_contacto: "juan.perez@example.com",
    numero_personas_fundadoras: 2,
    numero_personas: 10,
    nacionalidad: "Costarricense",
    escolaridad: "Universitaria",
    edad: 35,
  },
  {
    id: 2,
    nombre: "María Rodríguez",
    telefono: "987654321",
    correo_contacto: "maria.rodriguez@example.com",
    numero_personas_fundadoras: 1,
    numero_personas: 5,
    nacionalidad: "Costarricense",
    escolaridad: "Bachillerato",
    edad: 28,
  },
  {
    id: 3,
    nombre: "Carlos Gómez",
    telefono: "555666777",
    correo_contacto: "carlos.gomez@example.com",
    numero_personas_fundadoras: 3,
    numero_personas: 15,
    nacionalidad: "Costarricense",
    escolaridad: "Maestría",
    edad: 42,
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    telefono: "444333222",
    correo_contacto: "ana.martinez@example.com",
    numero_personas_fundadoras: 2,
    numero_personas: 8,
    nacionalidad: "Costarricense",
    escolaridad: "Doctorado",
    edad: 37,
  },
  {
    id: 5,
    nombre: "Luis Fernández",
    telefono: "111222333",
    correo_contacto: "luis.fernandez@example.com",
    numero_personas_fundadoras: 1,
    numero_personas: 12,
    nacionalidad: "Costarricense",
    escolaridad: "Secundaria",
    edad: 30,
  },
];

const theme = createTheme(
  esES // x-data-grid translations
);

export const ShowEmpresarios = (props) => {
  const {
    isLoading,
    data: users,
    isError,
  } = useQuery({
    queryKey: ["empresarios"],
    queryFn: getEmpresarios,
  });

  const handleSearch = (event) => {
    event.preventDefault();
  };

  //   if (isLoading)
  //     return (
  //       <div>
  //         <Loading />
  //       </div>
  //     );
  //   else if (isError)
  //     return (
  //       <div>
  //         <NoFiles />
  //       </div>
  //     );
  const rows = empresariosData
    ? empresariosData.map((cls) => ({ ...cls, id: cls.id }))
    : [];
  return (
    <>
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <h2>Usuarios</h2>
      </div>

      <div style={{ height: 500, width: "96%" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            className="rowsPerPage"
            columns={props.columns}
            rows={rows}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            disableMultipleRowSelection={true}
            disableColumnSelector={true}
            checkboxSelection={true}
            showCellVerticalBorder={false}
            pageSizeOptions={[5, 10]}
            slots={{
              noRowsOverlay: NoFiles,
              loadingOverlay: Loading,
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </ThemeProvider>
      </div>
    </>
  );
};
