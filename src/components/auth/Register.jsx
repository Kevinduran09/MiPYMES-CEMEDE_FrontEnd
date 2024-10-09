import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Box, Card, CardContent, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";;
import { useAuthMutations } from "./mutations/useAuthMutations";

export const Register = () => {
  const navigate = useNavigate();

  const { registerMutation } = useAuthMutations();

  const [formData, setformData] = useState({
    nombre: "",
    contrasena: "",
    correo_electronico: ""
  });

  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    registerMutation.mutate(formData,
      {
        onSuccess: () => setloading(false),
        onError: () => setloading(false)
      }
    );
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card
        className="loginCard"
      >
        <CardContent>
          <Typography mb={3} mt={3} variant="h4" align="center" gutterBottom>
            Crear cuenta
          </Typography>
          <form onSubmit={onSubmit} style={{ padding: "1rem" }}>
            <Box mb={3}>
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                required
                name="nombre"
                onChange={handleChangeForm}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Correo eletronico"
                variant="outlined"
                fullWidth
                required
                type="email"
                name="correo_electronico"
                onChange={handleChangeForm}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                name="contrasena"
                onChange={handleChangeForm}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Crear cuenta"}
            </Button>
            <Box mt={2} textAlign="center">
              <Link to="/login">¿Ya posees una cuenta?</Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
