import React from "react";

import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../../FormField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { figurasLegales, sectoEmpresarial } from "../../../util/Mucks";
import { FormCheckBox } from "../../FormCheckBox";
import { Grid } from "@mui/material";
import { useOrganizacionStore } from "../store/useOrganizacionStore";
import { useOrganizacionActions } from "../handlers/useOrganizacionActions";
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
    const pathnames = location.pathname.split("/");
    const payload = data;
    if (payload["telefono_fijo"] === "") {

      delete payload["telefono_fijo"];
    }
    if (pathnames.includes("crear")) {

      createOrganizacion(payload);
    } else {
      updateOrganizacion(payload);
    }
  });

  const handleChange = (field, value) => {
    useOrganizacionStore.getState().updateCurrentOrganizacion({ [field]: value });
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
            <Typography variant="h6">Información General</Typography>
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
                label="Nombre"
                name="nombre"
                rules={rules["nombre"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              <FormField
                label="Teléfono móvil"
                name="telefono_movil"
                type="tel"
                rules={rules["telefono_movil"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("telefono_movil", e.target.value)}
              />
              <FormField
                label="Teléfono fijo"
                name="telefono_fijo"
                type="tel"
                rules={rules["telefono_fijo"]}
                isRequerided={false}
                required={false}
                onChange={(e) => handleChange("telefono_fijo", e.target.value)}
              />
              <FormField
                label="Email"
                name="email"
                rules={rules["email"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <FormField
                label="Coordenadas"
                name="coordenadas"
                rules={rules["coordenadas"]}
                isRequerided={false}
                required={false}
                onChange={(e) => handleChange("coordenadas", e.target.value)}
              />
              <FormField
                label="Cantón"
                name="canton"
                rules={rules["canton"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("canton", e.target.value)}
              />
              <FormField
                label="Distrito"
                name="distrito"
                rules={rules["distrito"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("distrito", e.target.value)}
              />
              <FormField
                label="Comunidad"
                name="comunidad"
                rules={rules["comunidad"]}
                helperText={"Este campo es requerido"}
                onChange={(e) => handleChange("comunidad", e.target.value)}
              />
              <FormField
                label="Dirección exacta"
                name="direccion_exacta"
                rules={rules["direccion_exacta"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("direccion_exacta", e.target.value)}
              />
              <FormField
                label="Descripción"
                name="descripcion"
                rules={rules["descripcion"]}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("descripcion", e.target.value)}
              />
              <FormField
                label="Tiempo de operación (años)"
                name="tiempo_operacion_anios"
                rules={rules["tiempo_operacion_anios"]}
                helperText={"Este campo es requerido"}
                type={"number"}
                required
                onChange={(e) => handleChange("tiempo_operacion_anios", e.target.value)}
              />
              <FormField
                label="Cantidad de Personas Fundadoras"
                name="cantidad_personas_fundadoras"
                rules={rules["cantidad_personas_fundadoras"]}
                helperText={"Este campo es requerido"}
                type={"number"}
                required
                onChange={(e) => handleChange("cantidad_personas_fundadoras", e.target.value)}
              />
              <FormField
                label="Cantidad de Personas Fundadoras Masculino"
                name="cantidad_personas_fundadoras_masculino"
                isRequerided={true}
                helperText={"Este campo es requerido"}
                type={"number"}
                required
                onChange={(e) => handleChange("cantidad_personas_fundadoras_masculino", e.target.value)}
              />
              <FormField
                label="Cantidad de Personas Fundadoras Femenino"
                name="cantidad_personas_fundadoras_femenino"
                isRequerided={true}
                type={"number"}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("cantidad_personas_fundadoras_femenino", e.target.value)}
              />
              <FormField
                label="Cantidad de Personas Dueñas Actuales"
                name="cantidad_personas_duenas_actuales"
                rules={rules["cantidad_personas_fundadoras"]}
                type={"number"}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("cantidad_personas_duenas_actuales", e.target.value)}
              />
              <FormField
                label="Cantidad de Personas Dueñas Actuales Masculino"
                name="cantidad_personas_duenas_actuales_masculino"
                isRequerided={true}
                type={"number"}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("cantidad_personas_duenas_actuales_masculino", e.target.value)}
              />
              <FormField
                label="Cantidad de Personas Dueñas Actuales Femenino"
                name="cantidad_personas_duenas_actuales_femenino"
                isRequerided={true}
                type={"number"}
                helperText={"Este campo es requerido"}
                required
                onChange={(e) => handleChange("cantidad_personas_duenas_actuales_femenino", e.target.value)}
              />
            </Box>
            <Grid container fullWidth alignItems="center">
              <Grid item md={2} xs={12}>
                <FormCheckBox
                  name="pagina_web"
                  label="¿Tiene página web?"
                  onChange={(value) => handleChange("pagina_web", value)}
                />
              </Grid>
              <Grid item md={10} xs={12}>
                <FormField
                  isRequerided={false}
                  disabled={!sitioWeb}
                  label="Dirección del sitio web"
                  name="website_url"
                  rules={rules["website_url"]}
                  onChange={(e) => handleChange("website_url", e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="figura_legal"
                  control={methods.control}
                  rules={rules["figura_legal"]}
                  required
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!methods.formState.errors.figura_legal}
                    >
                      <InputLabel>Figura Legal</InputLabel>
                      <Select
                        {...field}
                        label="Figura Legal"
                        required
                        onChange={(e) => {
                          handleChange("figura_legal", e.target.value);
                          field.onChange(e);
                        }}
                      >
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
                  required
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!methods.formState.errors.sector_empresarial}
                    >
                      <InputLabel>Sector Empresarial</InputLabel>
                      <Select
                        {...field}
                        label="Sector Empresarial"
                        onChange={(e) => {
                          handleChange("sector_empresarial", e.target.value);
                          field.onChange(e);
                        }}
                      >
                        {sectoEmpresarial.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {methods.formState.errors.sector_empresarial && (
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
              <FormCheckBox name={"facebook"} label={"Facebook activo"} onChange={(value) => handleChange("facebook", value)} />
              <FormCheckBox name="instagram_activo" label="Instagram activo" onChange={(value) => handleChange("instagram_activo", value)} />
              <FormCheckBox name="youtube_activo" label="YouTube activo" onChange={(value) => handleChange("youtube_activo", value)} />
              <FormCheckBox name="tiktok_activo" label="TikTok activo" onChange={(value) => handleChange("tiktok_activo", value)} />
              <FormCheckBox name="linkedin_activo" label="LinkedIn activo" onChange={(value) => handleChange("linkedin_activo", value)} />
              <FormCheckBox name="pinterest_activo" label="Pinterest activo" onChange={(value) => handleChange("pinterest_activo", value)} />
              <FormCheckBox name="whatsapp_activo" label="WhatsApp activo" onChange={(value) => handleChange("whatsapp_activo", value)} />
              <FormCheckBox
                name="otra_red_social_activo"
                label="Otra red social activa"
                onChange={(value) => handleChange("otra_red_social_activo", value)}
              />
              {!!otherSocialEnable && (
                <FormField
                  sx={{ width: "30%" }}
                  label={"Nombre de otra red social"}
                  name={"otra_red_social_nombre"}
                  onChange={(e) => handleChange("otra_red_social_nombre", e.target.value)}
                />
              )}
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="h6">Actividades productivas o servicios de la empresa</Typography>
            <Box mt={1} gap={"5px"}>
              <FormCheckBox name={"pesca"} label={"Pesca"} onChange={(value) => handleChange("pesca", value)} />
              <FormCheckBox name={"agricultura"} label="Agricultura" onChange={(value) => handleChange("agricultura", value)} />
              <FormCheckBox name={"agroindustria"} label={"Agroindustria"} onChange={(value) => handleChange("agroindustria", value)} />
              <FormCheckBox name={"pecuario"} label={"Pecuario"} onChange={(value) => handleChange("pecuario", value)} />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Inscripciones</Typography>
            <Box mt={1}>
              <FormCheckBox name="ccss_inscrita" label="CCSS inscrita" onChange={(value) => handleChange("ccss_inscrita", value)} />
              <FormCheckBox name="ins_inscrita" label="INS inscrita" onChange={(value) => handleChange("ins_inscrita", value)} />
              <FormCheckBox
                name="hacienda_inscrita"
                label="Hacienda inscrita"
                onChange={(value) => handleChange("hacienda_inscrita", value)}
              />
              <FormCheckBox name="meic_inscrita" label="MEIC inscrita" onChange={(value) => handleChange("meic_inscrita", value)} />
            </Box>
          </Box>
          <Box mt={3}>
            <Typography variant="body1">Estado de la Organización</Typography>
            <Controller
              name="activa"
              control={methods.control}
              defaultValue={true}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value || false}
                      onChange={(e) => {
                        field.onChange(e.target.checked)
                        handleChange("activa", e.target.checked ? true : false)
                      }}
                    />}
                  label={"Activa"}
                />

              )}
            />
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
