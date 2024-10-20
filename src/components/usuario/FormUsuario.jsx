import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../FormField";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from "./store/useUsuarioStore";
import { useUsuarioActions } from "./handlers/useUsuarioActions";

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Registro de Usuario</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField label="Nombre de Usuario" name="nombre" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  label="Correo Electrónico"
                  name="correo_electronico"
                  type="email"
                />
              </Grid>
              {editPassword && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="Contraseña"
                      name="contrasena"
                      type={showPassword ? "text" : "password"}
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
                <FormControl fullWidth>
                  <InputLabel id="rol-label">Rol</InputLabel>
                  <Select
                    labelId="rol-label"
                    id="rol"
                    label="Rol"
                    {...methods.register("rol", { required: true })}
                    defaultValue={usuario ? usuario.rol : ""}
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Gestor">Gestor</MenuItem>
                    <MenuItem value="Aplicador">Aplicador</MenuItem>
                  </Select>
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
