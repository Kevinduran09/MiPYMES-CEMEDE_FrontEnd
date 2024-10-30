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
import { useAuthMutations } from "./mutations/useAuthMutations";

export const Login = () => {
  const navigate = useNavigate();

  const { loginMutation } = useAuthMutations();

  const [formData, setformData] = useState({
    nombre: "",
    contrasena: "",
  });
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    loginMutation.mutate(formData, {
      onSuccess: () => setloading(false),
      onError: () => setloading(false),
    });
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
      <Card className="loginCard">
        <CardContent>
          <Typography mb={3} mt={3} variant="h4" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={onSubmit} style={{ padding: "1rem" }}>
            <Box mb={3}>
              <TextField
                label="Correo Electronico"
                variant="outlined"
                fullWidth
                required
                name="correo_electronico"
                inputProps={{
                  maxLength: 20,
                  minLength: 5,
                }}
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
                inputProps={{
                  maxLength: 16,
                  minLength: 8,
                }}
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
              {/* <Button variant="text" onClick={() => navigate("/register")}>
                Crear una cuenta
              </Button> */}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
