import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider } from "react-hook-form";
export const DialogComponent = ({
  setOpen,
  clear,
  onSubmit,
  children,
  flag,
  methods,
  open,
}) => {
  const handleClose = () => {
    setOpen(false);
    clear();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ borderRadius: "35px" }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Typography
          id="transition-modal-title"
          style={{ marginBottom: "5px", fontSize: "2rem" }}
        >
          {flag == false ? "Actualizar" : "Registrar"}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <FormProvider {...methods}>
        <form className="form-update" onSubmit={onSubmit}>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "5px", width: "25%", textAlign: "center" }}
            >
              {flag == false ? "Registrar" : "Actualizar"}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
