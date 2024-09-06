import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Loading } from "../../util/loading";
import { NoFiles } from "../../util/NoFiles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getEmpresarios } from "../../services/EmpresarioService";
import { useState } from "react";
import { ModalEmpresario } from "./ModalEmpresario";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
const theme = createTheme(
  esES // x-data-grid translations
);

export const ShowEmpresarios = (props) => {
  const {
    isLoading,
    data: empresarios,
    isError,
  } = useQuery({
    queryKey: ["empresarios"],
    queryFn: getEmpresarios,
  });
  const [open, setOpen] = useState(false);
  const customToolBar = () => {
    return (
      <GridToolbarContainer>
        <Button
          startIcon={<AddIcon />}
          color="primary"
          variant="text"
          onClick={() => setOpen(true)}
        >
          Agregar nuevo
        </Button>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };
  const handleSearch = (event) => {
    event.preventDefault();
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  else if (isError)
    return (
      <div>
        <NoFiles />
      </div>
    );
  const rows = empresarios
    ? empresarios.map((cls) => ({ ...cls, id: cls.id }))
    : [];
  return (
    <>
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <h2>Empresarios</h2>
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
              toolbar: customToolBar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </ThemeProvider>
      </div>
      <ModalEmpresario open={open} setOpen={setOpen} />
    </>
  );
};
