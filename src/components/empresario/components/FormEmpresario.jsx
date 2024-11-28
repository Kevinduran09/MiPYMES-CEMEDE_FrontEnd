import React from "react";
import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../../FormField";
import InputMask from 'react-input-mask';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEmpStore } from "../store/useEmpStore";
import { useEmpresarioActions } from "../handlers/useEmpresarioActions";
import { useNavigate } from "react-router-dom";

export const FormEmpresario = () => {
  const navigate = useNavigate();
  const { empresario } = useEmpStore();
  const { createEmpresario, updateEmpresario } = useEmpresarioActions();

  const methods = useForm({
    defaultValues: empresario,
  });

  useEffect(() => {
    methods.reset({ ...empresario });
  }, [empresario]);

  const onSubmit = methods.handleSubmit(async (data) => {
    const pathnames = location.pathname.split("/");
    if (pathnames.includes("crear")) {
      createEmpresario(data);
    } else {
      updateEmpresario(data);
    }
  });

  const handleChange = (field, value) => {
    useEmpStore.getState().updateCurrentEmpresario({ [field]: value });
  };


  const rules = {
    nombre: {
      required: "Este campo es requerido",
      maxLength: {
        value: 50,
        message: "El nombre no puede exceder los 50 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ][A-Za-záéíóúüñÑ\s]*$/,
        message: "El nombre solo puede contener letras y espacios.",
      },
    },
    cedula: {
      required: "Este campo es requerido",
      pattern: {
        value: /^[1-9]-\d{4}-\d{4}$/,
        message: "La cédula debe tener el formato costarricense X-XXXX-XXXX.",
      },
    },
    telefono: {
      required: "Este campo es requerido",
      pattern: {
        value: /^\d{8}$/,
        message: "El número de teléfono debe tener 8 dígitos.",
      },
    },
    email: {
      required: "Este campo es requerido",
      maxLength: {
        value: 90,
        message: "El correo electrónico no puede exceder los 90 caracteres",
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "El correo electrónico no es válido.",
      },
    },
    nacionalidad: {
      required: "Este campo es requerido",
      maxLength: {
        value: 30,
        message: "El texto no puede exceder los 30 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ][A-Za-záéíóúüñÑ\s]*$/,
        message: "La nacionalidad solo puede contener letras y espacios.",
      },
    },
    edad: {
      required: "Este campo es requerido",
      min: {
        value: 20,
        message: "La edad mínima es de 20 años",
      },
      max: {
        value: 60,
        message: "La edad máxima es de 60 años",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Solo se permiten números enteros",
      },
    },
    escolaridad: {
      required: "Este campo es requerido",
    },
    sexo: {
      required: "Este campo es requerido",
    },
  };

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
              <FormField label={"Nombre"} name={"nombre"} rules={rules["nombre"]}
                onChange={(e) => {
                  handleChange("nombre", e.target.value)
                  field.onChange(e);
                }}
              />
              <Controller
                name="cedula"
                control={methods.control}
                rules={rules["cedula"]}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="9-9999-9999"
                    maskChar=""
                    onChange={(e) => {
                      // Actualiza Zustand y el campo del formulario
                      handleChange("cedula", e.target.value);
                      field.onChange(e); // Llama al manejador original de react-hook-form
                    }}
                  >
                    {(inputProps) => (
                      <FormField
                        {...inputProps}
                        label="Cédula"
                        error={!!methods.formState.errors.cedula}
                        helperText={methods.formState.errors.cedula?.message}
                      />
                    )}
                  </InputMask>
                )}
              />

              <FormField label={"Teléfono"} name={"telefono"} type={"tel"} rules={rules["telefono"]}
                onChange={(e) => {
                  handleChange("telefono", e.target.value)
                  field.onChange(e);
                }}
              />
              <FormField label={"Correo de Contacto"} name={"correo_contacto"} rules={rules["email"]}
                onChange={(e) => {
                  handleChange("correo_contacto", e.target.value)
                  field.onChange(e);
                }}
              />

              <FormField label={"Nacionalidad"} name={"nacionalidad"} rules={rules["nacionalidad"]}
                onChange={(e) => {
                  handleChange("nacionalidad", e.target.value)
                  field.onChange(e);
                }}
              />

              <Controller
                name="sexo"
                control={methods.control}
                rules={rules["sexo"]}
                render={({ field }) => (
                  <FormControl fullWidth sx={{ marginTop: "16px" }} error={!!methods.formState.errors.sexo}>
                    <InputLabel>Sexo</InputLabel>
                    <Select {...field} label="Sexo"
                      onChange={(e) => {
                        handleChange("sexo", e.target.value)
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="">Seleccione una opción</MenuItem>
                      <MenuItem value="Hombre">Hombre</MenuItem>
                      <MenuItem value="Mujer">Mujer</MenuItem>
                      <MenuItem value="Indefinido">Indefinido</MenuItem>
                    </Select>
                    {methods.formState.errors.sexo && (
                      <Typography marginLeft={2} variant="caption" color="error">
                        {methods.formState.errors.sexo.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="escolaridad"
                control={methods.control}
                rules={rules["escolaridad"]}
                render={({ field }) => (
                  <FormControl fullWidth sx={{ marginTop: "16px" }} error={!!methods.formState.errors.escolaridad}>
                    <InputLabel>Escolaridad</InputLabel>
                    <Select {...field} label="Escolaridad"
                      onChange={(e) => {
                        handleChange("escolaridad", e.target.value)
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="">Seleccione una opción</MenuItem>
                      <MenuItem value="Sin ninguna escolaridad">
                        Sin ninguna escolaridad
                      </MenuItem>
                      <MenuItem value="Primaria incompleta">
                        Primaria incompleta
                      </MenuItem>
                      <MenuItem value="Primaria completa">
                        Primaria completa
                      </MenuItem>
                      <MenuItem value="Secundaria incompleta">
                        Secundaria incompleta
                      </MenuItem>
                      <MenuItem value="Secundaria completa">
                        Secundaria completa
                      </MenuItem>
                      <MenuItem value="Técnico">Técnico</MenuItem>
                      <MenuItem value="Universidad incompleta">
                        Universidad incompleta
                      </MenuItem>
                      <MenuItem value="Diplomado universitario">
                        Diplomado universitario
                      </MenuItem>
                      <MenuItem value="Bachillerato universitario">
                        Bachillerato universitario
                      </MenuItem>
                      <MenuItem value="Licenciatura">Licenciatura</MenuItem>
                      <MenuItem value="Maestría">Maestría</MenuItem>
                      <MenuItem value="Doctorado">Doctorado</MenuItem>
                    </Select>
                    {methods.formState.errors.escolaridad && (
                      <Typography marginLeft={2} variant="caption" color="error">
                        {methods.formState.errors.escolaridad.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <FormField label={"Edad"} name={"edad"} rules={rules["edad"]}
                onChange={(e) => {
                  handleChange("edad", e.target.value)
                  field.onChange(e);
                }}
              />
            </Box>
          </Box>
          <Box textAlign={"end"}>
            <Button
              variant="contained"
              color="error"
              type="button"
              sx={{ mt: 3, mr: 1 }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
              Guardar
            </Button>
          </Box>
        </div>
      </form>
    </FormProvider>
  );
};
