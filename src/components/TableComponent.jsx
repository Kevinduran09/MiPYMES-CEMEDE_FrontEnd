import { DataGrid, esES } from "@mui/x-data-grid";
import { Loading } from "../util/loading";
import { NoFiles } from "../util/NoFiles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomToolbar } from "../util/CustomToolbar";

export const TableComponent = ({
  title,
  columns,
  rowsSet,
  isLoading,
  isError,
  customButtons
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
  const rows = rowsSet ? rowsSet.map((cls) => ({ ...cls, id: cls.id })) : [];
  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{
              padding: "10px",
              border: "none",
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
            }}
            getEstimatedRowHeight={() => 100}
            getRowHeight={() => 'auto'}
            className="rowsPerPage"
            columns={columns}
            rows={rows}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}

            checkboxSelection={true}
            disableMultipleRowSelection={true}
            disableColumnSelector={true}
            showCellVerticalBorder={false}
            pageSizeOptions={[5, 10]}
            slots={{
              noRowsOverlay: NoFiles,
              loadingOverlay: Loading,
              toolbar: () => CustomToolbar(customButtons),
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
