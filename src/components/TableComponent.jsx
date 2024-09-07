import { DataGrid, esES } from "@mui/x-data-grid";
import { Loading } from "../util/loading";
import { NoFiles } from "../util/NoFiles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomToolbar } from "../util/CustomToolbar";

export const TableComponent = ({
  title,
  columns,
  data,
  setOpen,
  isLoading,
  isError,
}) => {
  const theme = createTheme(esES);
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
  const rows = data ? data.map((cls) => ({ ...cls, id: cls.id })) : [];
  return (
    <>
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <h2>{title}</h2>
      </div>
      <div style={{ height: 500, width: "96%" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            className="rowsPerPage"
            columns={columns}
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
              toolbar: () => CustomToolbar(setOpen),
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
