import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
export const UpdateButton = ({ handleUpdate, cls }) => {
  const handleUp = () => {
    handleUpdate(cls);
  };
  return (
    <>
      <Button
        startIcon={<EditIcon />}
        variant="contained"
        color="primary"
        onClick={handleUp}
      >
        Editar
      </Button>
    </>
  );
};
