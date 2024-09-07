import React, { useEffect } from "react";
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
import { useEmpresarioActions } from "./handlers/useEmpresarioActions";
import { FormField } from "../FormField";
import { useForm, FormProvider } from "react-hook-form";
import { useEmpStore } from "../../hooks/useEmpStore";
export const ModalEmpresario = ({ open, setOpen }) => {
  const { empresario, clear } = useEmpStore();
  const { createEmplesario, updateEmpresario } = useEmpresarioActions();
  const methods = useForm({
    defaultValues: { ...empresario },
  });

  useEffect(() => {
    methods.reset({ ...empresario });
  }, [empresario, open]);

  const handleClose = () => {
    setOpen(false);
    clear();
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    if (empresario == null) {
      createEmplesario(data);
    } else {
      updateEmpresario(data);
    }
    setOpen(false);
  });

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
          {empresario != null ? "Actualizar Registro" : "Registrar Empresario"}
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
          <DialogContent dividers>
            <div
              className="form"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <FormField label={"Nombre"} name={"nombre"} />
              <FormField
                label={"Telefono"}
                name={"telefono"}
                options={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Debe ingresar un número de teléfono válido",
                  },
                  minLength: {
                    value: 8,
                    message: "El teléfono debe tener al menos 8 dígitos",
                  },
                  maxLength: {
                    value: 10,
                    message: "El teléfono debe tener máximo 10 dígitos",
                  },
                }}
              />
              <FormField
                label={"Correo Contacto"}
                name={"correo_contacto"}
                type="email"
              />
              <FormField
                label={"N. Personas Funcionarias"}
                name={"numero_personas_fundadoras"}
                options={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Debe ingresar una cantidad valida",
                  },
                }}
              />
              <FormField
                label={"Numero personas"}
                name={"numero_personas"}
                options={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Debe ingresar una cantidad valida",
                  },
                }}
              />
              <FormField label={"Nacionalidad"} name={"nacionalidad"} />
              <FormField label={"Escolaridad"} name={"escolaridad"} />
              <FormField
                label={"Edad"}
                name={"edad"}
                options={{
                  pattern: {
                    value: /^[20-70]+$/,
                    message: "Debe ingresar una edad valida",
                  },
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "5px", width: "25%", textAlign: "center" }}
            >
              {empresario == null ? "Registrar" : "Actualizar"}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
