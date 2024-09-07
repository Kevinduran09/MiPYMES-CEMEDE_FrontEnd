import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
export const CustomToolbar = (setOpen) => {
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
