import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export const AddButton = ({ route, ...props }) => {
  return (
    <Button
      startIcon={<AddIcon />}
      color="primary"
      variant="text"
      onClick={() => route()}
      {...props}
    >
      Agregar nuevo
    </Button>
  );
};
