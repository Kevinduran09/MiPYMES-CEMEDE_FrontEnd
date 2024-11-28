import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../../FormField";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Alert,
} from "@mui/material";
import { RiceBowl, Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../store/useUsuarioStore";
import { useUsuarioActions } from "../handlers/useUsuarioActions";

export const FormUsuario = () => {
  const navigate = useNavigate();
  const { usuario } = useUsuarioStore();
  const { createUsuario, updateUsuario } = useUsuarioActions();
  const [showPassword, setShowPassword] = useState(false);
  const [editPassword, setEditPassword] = useState(!!!usuario);
  const methods = useForm({
    defaultValues: {
      nombre: "",
      correo_electronico: "",
      contrasena: "",
      confirmarContrasena: "",
      rol: "",
      ...usuario,
    },
  });

  useEffect(() => {
    if (usuario) {
      methods.reset(usuario);
    }
  }, [usuario]);

  const onSubmit = methods.handleSubmit(async (data) => {
    const { contrasena, confirmarContrasena, ...rest } = data;

    if (editPassword) {
      if (contrasena !== confirmarContrasena) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Las contraseñas no coinciden",
        });
        return;
      }
    }

    try {
      if (!usuario) {
        createUsuario({ ...rest, contrasena });
      } else {
        updateUsuario({
          ...rest,
          ...(editPassword && contrasena && { contrasena }),
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const rules = {
    nombre: {
      required: "Este campo es requerido",
      maxLength: {
        value: 100,
        message: "El nombre no puede exceder los 100 caracteres",
      },
      minLength: {
        value: 6,
        message: "El nombre no puede tener menos de 6 caracteres",
      },
      pattern: {
        value: /^[A-Za-záéíóúüñÑ][A-Za-záéíóúüñÑ\s]*$/,
        message:
          "El nombre solo puede contener letras y espacios, y debe empezar con una letra.",
      },
    },
    correo_electronico: {
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
    contrasena: {
      required: "Este campo es requerido",
      minLength: {
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres.",
      },
      validate: (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (!hasUpperCase) {
          return "La contraseña debe contener al menos 2 letras mayúsculas.";
        }
        if (!hasLowerCase) {
          return "La contraseña debe contener al menos 2 letras minúsculas.";
        }
        if (!hasNumber) {
          return "La contraseña debe contener al menos 2 números.";
        }
        if (!hasSymbol) {
          return "La contraseña debe contener al menos 2 símbolos.";
        }

        return true;
      },
    },
    confirmarContrasena: {
      required: "Este campo es requerido",
      validate: (value) =>
        value === methods.getValues("contrasena") ||
        "Las contraseñas no coinciden.",
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Registro de Usuario</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Nombre completo"
                  name="nombre"
                  rules={rules["nombre"]}
                  required={true}
                  helperText={"Este campo es requerido"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Correo Electrónico"
                  name="correo_electronico"
                  rules={rules["correo_electronico"]}
                  required={true}
                  helperText={"Este campo es requerido"}
                />
              </Grid>
              {editPassword && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="Contraseña"
                      name="contrasena"
                      type={showPassword ? "text" : "password"}
                      rules={rules["contrasena"]}
                      required={true}
                      helperText={"Este campo es requerido"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="Confirmar Contraseña"
                      name="confirmarContrasena"
                      type={showPassword ? "text" : "password"}
                      rules={rules["confirmarContrasena"]}
                      required={true}
                      helperText={"Este campo es requerido"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Typography variant="h6" marginTop={3}>
              Información de Rol
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!methods.formState.errors.rol} required={true}>
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                    labelId="rol-label"
                    id="rol"
                    label="Rol"
                    {...methods.register("rol", {
                      required: "El rol es requerido",
                    })}
                    defaultValue={usuario ? usuario.rol : ""}
                    required={true}
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Gestor">Gestor</MenuItem>
                    <MenuItem value="Aplicador">Aplicador</MenuItem>
                  </Select>
                  {methods.formState.errors.rol && (
                    <Typography variant="caption" color="error" marginLeft={2}>
                      {methods.formState.errors.rol.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {usuario && (
              <Box marginTop={2}>
                <Typography variant="body1">Editar Contraseña</Typography>
                <Switch
                  checked={editPassword}
                  onChange={() => setEditPassword((prev) => !prev)}
                />
              </Box>
            )}
          </Box>

          <Box textAlign="end">
            <Button
              variant="contained"
              color="error"
              type="button"
              sx={{ mt: 3, mr: 1 }}
              onClick={() => navigate(-1)}
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
