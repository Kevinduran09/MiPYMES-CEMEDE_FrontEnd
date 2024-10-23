import { Grid, TextField, Button } from '@mui/material';

export const Opcion = ({ id, nombre, valor_alfa, onUpdate, onDelete, disabled }) => {
    return (
        <Grid container spacing={2} alignItems="center" className="mb-2">
            <Grid item xs={5}>
                <TextField
                    fullWidth
                    disabled={disabled}
                    label="Nombre de la opción"
                    value={nombre}
                    required
                    inputProps={{ minLength: 1, maxLength: 255, title: "El nombre de la opcion debe tener entre 1 y 255 caracteres" }}
                    onChange={(e) => onUpdate(id, { nombre: e.target.value })}
                    helperText="Este campo es requerido"
                />
            </Grid>
            <Grid item  xs={5}>
                <TextField
                    fullWidth
                    disabled={disabled}
                    type="number"
                    label="Valor Alfa"
                    value={valor_alfa}
                    required
                    inputProps={{ step: 0.1, min: 0, max: 1 }}
                    onChange={(e) => onUpdate(id, { valor_alfa: parseFloat(e.target.value) })}
                    helperText="Debe estar entre 0 y 1"
                />
            </Grid>
            <Grid item marginBottom={2.5} xs={2}>
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(id)}
                    disabled={disabled}
                >
                    Eliminar
                </Button>
            </Grid>
        </Grid>
    );
};
