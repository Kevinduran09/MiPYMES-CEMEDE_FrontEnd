import { Box, TextField, Button, Grid } from "@mui/material";

export const Opcion = ({ id, nombre, valor_alfa, onUpdate, onDelete }) => {
    const handleChange = (field, value) => {
        onUpdate(id, { [field]: value });
    };

    return (
        <Grid container spacing={2} alignItems="center" marginTop={0.5}>
            <Grid item xs={5}>
                <TextField
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Valor Alfa"
                    value={valor_alfa}
                    onChange={(e) => handleChange("valor_alfa", e.target.value)}
                    fullWidth
                    type="number"
                />
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(id)}
                >
                    Eliminar
                </Button>
            </Grid>
        </Grid>
    );
};
