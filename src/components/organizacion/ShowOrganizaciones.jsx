import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Loading } from "../../util/loading";
import { NoFiles } from "../../util/NoFiles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getorganizaciones } from "../../services/OrganizacionService";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { ModalOrganizacion } from "./ModalOrganizacion";
import { useState } from "react";
const theme = createTheme(esES);

export const ShowOrganizaciones = (props) => {
  const [open, setOpen] = useState(false);
  const {
    isLoading,
    data: organizaciones,
    isError,
  } = useQuery({
    queryKey: ["organizaciones"],
    queryFn: getorganizaciones,
  });
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
  const rows = organizaciones
    ? organizaciones.map((cls) => ({ ...cls, id: cls.id }))
    : [];
  return (
    <>
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <h2>Organizaciones</h2>
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
      <ModalOrganizacion open={open} setOpen={setOpen} />;
    </>
  );
};
