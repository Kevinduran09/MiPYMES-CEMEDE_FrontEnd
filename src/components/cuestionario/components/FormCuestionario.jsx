
import { Box, Divider, FormControl } from '@mui/material';
import { TextField, Select, InputLabel, MenuItem, Grid, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQuery } from 'react-query';
import { getIndicadores } from '../../../services/IndicadorService';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export const FormCuestionario = () => {

    const navigate = useNavigate();

    const { data: indicadores } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });


    return (
        <>
            <form>
                <div className="content p-5">
                    <Box>
                        <Typography variant="h6">Informacion del cuestionario</Typography>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Seleccione la empresa</InputLabel>
                                    <Select
                                        id="empresa"
                                        label="Seleccione la empresa"
                                    >
                                        <MenuItem>Empresa</MenuItem>
                                        <MenuItem>Empresa</MenuItem>
                                        <MenuItem>Empresa</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Fecha de creacion" defaultValue={dayjs(new Date())} />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        <Divider />
                        <br />
                        <Typography variant="h6">Seleccione los indicadores que desea agregar</Typography>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} md={12}>
                                {indicadores?.map((indicador) => (
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={indicador.nombre}
                                    />
                                ))}


                            </Grid>
                        </Grid>
                    </Box>
                    <Box textAlign={"end"}>
                        <Button
                            variant="contained"
                            color="error"
                            type="button"
                            sx={{ mt: 3, mr: 1 }}
                            onClick={()=>{
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
        </>
    );
}