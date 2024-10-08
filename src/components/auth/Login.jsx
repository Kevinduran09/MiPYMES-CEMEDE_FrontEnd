import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../services/AuthService";
import { useAuthStore } from "../../hooks/useAuthState";

export const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const [formData, setformData] = useState({
    nombre: "",
    contrasena: "",
  });
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setloading(true);
    const res = await login(formData);
    console.log(res);

    setToken(res.access_token);
    setloading(false);
    navigate("/");
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
        sx={{
          maxWidth: 360,
          width: "100%",
          boxShadow: 3,
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <CardContent>
          <Typography mb={3} variant="h4" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={onSubmit}>
            <Box mb={3}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                required
                name="nombre"
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
            <Box mb={2}>
              <FormControlLabel
                control={<Checkbox name="rememberMe" />}
                label="Recordarme"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Iniciar Sesión"}
            </Button>
            <Box mt={2} textAlign="center">
              <Link to="/">¿Olvidaste tu contraseña?</Link>
            </Box>
            <Box mt={2} textAlign="center">
              <Button variant="text" onClick={() => navigate("/")}>
                Crear una cuenta
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
