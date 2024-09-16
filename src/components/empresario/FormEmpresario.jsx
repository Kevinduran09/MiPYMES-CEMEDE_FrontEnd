import React from "react";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../FormField";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useEmpStore } from "../../hooks/useEmpStore";
import { useEmpresarioActions } from "./handlers/useEmpresarioActions";

export const FormEmpresario = () => {
  const { empresario } = useEmpStore();
  const { createEmpresario, updateEmpresario } = useEmpresarioActions();
  const methods = useForm({
    defaultValues: empresario,
  });

  useEffect(() => {
    methods.reset({ ...empresario });
  }, [empresario]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (empresario == null) {
      createEmpresario(data);
    } else {
      updateEmpresario(data);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Información del Empresario</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                },
                gap: 2,
              }}
            >
              <FormField label={"Nombre"} name={"nombre"} />
              <FormField label={"Teléfono"} name={"telefono"} type={"tel"} />
              <FormField
                label={"Correo de Contacto"}
                name={"correo_contacto"}
                type={"email"}
              />
              <FormField
                label={"Núm. Personas Fundadoras"}
                name={"numero_personas_fundadoras"}
                type={"number"}
              />
              <FormField
                label={"Núm. Personas"}
                name={"numero_personas"}
                type={"number"}
              />
              <FormField label={"Nacionalidad"} name={"nacionalidad"} />
              <FormField label={"Escolaridad"} name={"escolaridad"} />
              <FormField label={"Edad"} name={"edad"} type={"number"} />
            </Box>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 3 }}
            >
              Guardar
            </Button>
          </Box>
        </div>
      </form>
    </FormProvider>
  );
};
