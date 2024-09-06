import React, { useEffect } from "react";
import { Box, Button, Fade, Modal, Typography, Backdrop } from "@mui/material";
import { createorganizacion } from "../../services/OrganizacionService";
import Swal from "sweetalert2";
import { FormField } from "../FormField";
import { useForm, FormProvider } from "react-hook-form";

export const ModalOrganizacion = ({ organizacion, open, setOpen }) => {
  const methods = useForm({
    defaultValues: { ...organizacion },
  });

  useEffect(() => {
    methods.reset({ ...organizacion });
  }, [organizacion, methods.reset]);

  const handleClose = () => {
    methods.reset();
    setOpen(false);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const res = await createorganizacion(data);
      console.log(res.data);
      Swal.fire({
        title: "Éxito",
        text: "Organización actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#015dfc",
      });
      handleClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la organización",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "2rem",
    p: 4,
    color: "#1A1A1A",
    fontFamily: "inherit",
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h3"
            style={{ marginBottom: "2rem" }}
          >
            Actualizar Organización
          </Typography>
          <FormProvider {...methods}>
            <form className="form-update" onSubmit={onSubmit}>
              <div
                className="form"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <FormField label="Nombre" name="nombre" />
                <FormField label="Teléfono Móvil" name="telefono_movil" />
                <FormField label="Teléfono Fijo" name="telefono_fijo" />
                <FormField label="Email" name="email" type="email" />
                <FormField label="URL Sitio Web" name="website_url" />
                <FormField
                  label="Sector Empresarial"
                  name="sector_empresarial"
                />
                <FormField label="Figura Legal" name="figura_legal" />
                <FormField
                  label="Años de Operación"
                  name="tiempo_operacion_anios"
                  type="number"
                />
                <FormField label="Descripción" name="descripcion" />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "2rem", width: "25%", textAlign: "center" }}
              >
                Actualizar
              </Button>
            </form>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};
