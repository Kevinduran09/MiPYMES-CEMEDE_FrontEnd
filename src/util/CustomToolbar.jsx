import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const CustomToolbar = (route) => {
  const navegate = useNavigate();
  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddIcon />}
        color="primary"
        variant="text"
        onClick={() => route()}
      >
        Agregar nuevo
      </Button>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};
