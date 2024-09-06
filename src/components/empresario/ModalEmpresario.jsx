import React, { useEffect } from "react";
import { Box, Button, Fade, Modal, Typography, Backdrop } from "@mui/material";
import { createEmpresario } from "../../services/EmpresarioService"; // Asegúrate de importar correctamente el servicio
import Swal from "sweetalert2";
import { FormField } from "../FormField";
import { useForm, FormProvider } from "react-hook-form";
export const ModalEmpresario = ({ empresario, open, setOpen }) => {
  const methods = useForm({
    defaultValues: { ...empresario },
  });

  useEffect(() => {
    methods.reset({ ...empresario });
  }, [empresario, methods.reset]);

  const handleClose = () => {
    methods.reset();
    setOpen(false);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);

    try {
      const res = await createEmpresario(data);
      console.log(res.data);
      Swal.fire({
        title: "Éxito",
        text: "Empresario actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#015dfc",
      });
      handleClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el empresario",
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
            Actualizar Empresario
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
                <FormField label={"Nombre"} name={"name"} />
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
                <FormField label={"Correo Contacto"} name={"correo_contacto"} />
                <FormField
                  label={"N. Personas Funcionarias"}
                  name={"numero_personas_fundadoras"}
                />
                <FormField label={"Numero personas"} name={"numero_personas"} />
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
