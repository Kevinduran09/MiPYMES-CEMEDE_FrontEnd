import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
export const UpdateButton = ({ handleUpdate, cls, setOpen }) => {
  const handleUp = () => {
    handleUpdate(cls);
    setOpen(true);
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
