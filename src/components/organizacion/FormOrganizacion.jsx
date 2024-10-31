import React from "react";

import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../FormField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { figurasLegales, sectoEmpresarial } from "../../util/Mucks";
import { FormCheckBox } from "../FormCheckBox";
import { Grid } from "@mui/material";
import { useOrganizacionStore } from "../../hooks/useOrganizacionStore";
import { useOrganizacionActions } from "./handlers/useOrganizacionActions";
import { useNavigate } from "react-router-dom";

export const FormOrganizacion = () => {
  const navigate = useNavigate();

  const { organizacion } = useOrganizacionStore();
  const { createOrganizacion, updateOrganizacion } = useOrganizacionActions();
  const methods = useForm({
    defaultValues: organizacion,
  });
  useEffect(() => {
    methods.reset({ ...organizacion });
  }, [organizacion, open]);

  const { watch } = methods;
  const sitioWeb = watch("pagina_web");
  const otherSocialEnable = watch("otra_red_social_activo");

  const onSubmit = methods.handleSubmit(async (data) => {
    if (organizacion == null) {
      createOrganizacion(data);
    } else {
      updateOrganizacion(data);
    }
  });

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
    telefono_movil: {
      required: "Este campo es requerido",
      pattern: {
        value: /^\d{8}$/,
        message: "El teléfono móvil debe tener 8 dígitos.",
      },
    },
    telefono_fijo: {
      pattern: {
        value: /^\d{7,8}$/,
        message: "El teléfono fijo debe tener entre 7 y 8 dígitos.",
      },
    },
    email: {
      required: "Este campo es requerido",
      maxLength: {
        value: 90,
        message: "El correo electronico no puede exeder los 90 caracteres",
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "El correo electrónico no es válido.",
      },
    },
    website_url: {
      required: {
        value: sitioWeb,
        message: "Este campo es requerido",
      },
      pattern: {
        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
        message: "La URL no es válida.",
      },
    },
    coordenadas: {
      required: "Este campo es requerido",
      pattern: {
        value: /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
        message:
          "Las coordenadas deben estar en el formato correcto (latitud,longitud).",
      },
    },
    canton: {
      required: "Este campo es requerido",
      maxLength: {
        value: 20,
        message: "El nombre no puede exceder los 20 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ\s]+$/,
        message: "El cantón solo puede contener letras y espacios.",
      },
    },
    distrito: {
      required: "Este campo es requerido",
      maxLength: {
        value: 20,
        message: "El nombre no puede exceder los 20 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ\s]+$/,
        message: "El distrito solo puede contener letras y espacios.",
      },
    },
    comunidad: {
      required: "Este campo es requerido",
      maxLength: {
        value: 20,
        message: "El nombre no puede exceder los 20 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ\s]+$/,
        message: "La comunidad solo puede contener letras y espacios.",
      },
    },
    direccion_exacta: {
      required: "Este campo es requerido",
      maxLength: {
        value: 60,
        message: "El nombre no puede exceder los 60 caracteres",
      },
    },
    descripcion: {
      required: "Este campo es requerido",
      maxLength: {
        value: 500,
        message: "La descripción no puede exceder los 500 caracteres.",
      },
    },
    tiempo_operacion_anios: {
      required: "Este campo es requerido",
      min: {
        value: 1,
        message: "El número debe ser mayor a 0",
      },
      max: {
        value: 100,
        message: "El número no puede ser mayor a 100",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Solo se permiten números enteros",
      },
    },
    figura_legal: {
      required: "Este campo es requerido",
    },
    sector_empresarial: {
      required: "Este campo es requerido",
    },
    otra_red_social_nombre: {
      required: {
        value: otherSocialEnable,
        message: "Este campo es requerido",
      },
      maxLength: {
        value: 30,
        message: "El nombre no puede exceder los 30 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ\s]+$/,
        message:
          "El nombre de la red social solo puede contener letras y espacios.",
      },
    },
    cantidad_personas_fundadoras: {
      required: "Este campo es requerido",
      min: {
        value: 1,
        message: "Debe haber al menos 1 fundador",
      },
      max: {
        value: 100,
        message: "La cantidad no puede exceder de 100 fundadores",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Solo se permiten números enteros",
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Informacion General</Typography>
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
              <FormField
                label={"Nombre"}
                name={"nombre"}
                rules={rules["nombre"]}
              />
              <FormField
                label={"Teléfono móvil"}
                name={"telefono_movil"}
                type={"tel"}
                rules={rules["telefono_movil"]}
              />
              <FormField
                label={"Teléfono fijo"}
                name={"telefono_fijo"}
                type={"tel"}
                rules={rules["telefono_fijo"]}
              />
              <FormField
                label={"Email"}
                name={"email"}
                rules={rules["email"]}
              />

              <FormField
                label={"Coordenadas"}
                name={"coordenadas"}
                rules={rules["coordenadas"]}
              />
              <FormField
                label={"Cantón"}
                name={"canton"}
                rules={rules["canton"]}
              />
              <FormField
                label={"Distrito"}
                name={"distrito"}
                rules={rules["distrito"]}
              />

              <FormField
                label={"Comunidad"}
                name={"comunidad"}
                rules={rules["comunidad"]}
              />
              <FormField
                label={"Dirección exacta"}
                name={"direccion_exacta"}
                rules={rules["direccion_exacta"]}
              />
              <FormField
                label={"Descripción"}
                name={"descripcion"}
                rules={rules["descripcion"]}
              />
              <FormField
                label={"Tiempo de operación (años)"}
                name={"tiempo_operacion_anios"}
                rules={rules["tiempo_operacion_anios"]}
              />
              <FormField
                label={"Cantidad de Personas Fundadoras"}
                name={"cantidad_personas_fundadoras"}
                rules={rules["cantidad_personas_fundadoras"]}
              />
            </Box>
            <Grid container fullWidth alignItems={"center"}>
              <Grid item md={2} xs={12}>
                <FormCheckBox
                  name={"pagina_web"}
                  label={"¿Tiene página web?"}
                />
              </Grid>

              <Grid item md={10} xs={12}>
                <FormField
                  isRequerided={false}
                  disabled={!sitioWeb}
                  label={"Direccion del sitio web"}
                  name={"website_url"}
                  rules={rules["website_url"]}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="figura_legal"
                  control={methods.control}
                  rules={rules["figura_legal"]}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!methods.formState.errors.figura_legal}
                    >
                      <InputLabel>Figura Legal</InputLabel>
                      <Select {...field} label="Figura Legal">
                        {figurasLegales.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {methods.formState.errors.figura_legal && (
                        <Typography
                          marginLeft={2}
                          variant="caption"
                          color="error"
                        >
                          {methods.formState.errors.figura_legal.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="sector_empresarial"
                  control={methods.control}
                  rules={rules["sector_empresarial"]}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!methods.formState.errors.sector_empresarial}
                    >
                      <InputLabel>Sector Empresarial</InputLabel>
                      <Select {...field} label="Sector Empresarial">
                        {sectoEmpresarial.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {methods.formState.errors.figura_legal && (
                        <Typography
                          marginLeft={2}
                          variant="caption"
                          color="error"
                        >
                          {methods.formState.errors.sector_empresarial.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Redes Sociales</Typography>
            <Box mt={1}>
              <FormCheckBox name={"facebook"} label={"Facebook activo"} />
              <FormCheckBox name="instagram_activo" label="Instagram activo" />
              <FormCheckBox name="youtube_activo" label="YouTube activo" />
              <FormCheckBox name="tiktok_activo" label="TikTok activo" />
              <FormCheckBox name="linkedin_activo" label="LinkedIn activo" />
              <FormCheckBox name="pinterest_activo" label="Pinterest activo" />
              <FormCheckBox name="whatsapp_activo" label="WhatsApp activo" />
              <FormCheckBox
                name="otra_red_social_activo"
                label="Otra red social activa"
              />
              {!!otherSocialEnable && (
                <FormField
                  sx={{ width: "30%" }}
                  label={"Nombre de otra red social"}
                  name={"otra_red_social_nombre"}
                />
              )}
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="h6">Sector Empresarial</Typography>
            <Box mt={1} gap={"5px"}>
              <FormCheckBox name={"pesca"} label={"Pesca"} />
              <FormCheckBox name={"agricultura"} label="Agricultura" />
              <FormCheckBox name={"agroindustria"} label={"Agroindustria"} />
              <FormCheckBox name={"pecuario"} label={"Pecuario"} />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Inscripciones</Typography>
            <Box mt={1}>
              <FormCheckBox name="ccss_inscrita" label="CCSS inscrita" />
              <FormCheckBox name="ins_inscrita" label="INS inscrita" />
              <FormCheckBox
                name="hacienda_inscrita"
                label="Hacienda inscrita"
              />
              <FormCheckBox name="meic_inscrita" label="MEIC inscrita" />
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
