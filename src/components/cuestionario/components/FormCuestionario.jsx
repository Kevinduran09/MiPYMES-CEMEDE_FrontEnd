import { Box, Divider, FormControl } from '@mui/material';
import { TextField, Select, InputLabel, MenuItem, Grid, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQuery } from 'react-query';
import { getIndicadores } from '../../indicador/services/IndicadorService';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { getOrganizaciones } from '../../../services/OrganizacionService';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { useCuestionarioActions } from '../handlers/useActionsCuestionario';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { FormField } from '../../FormField';

export const FormCuestionario = () => {

    const navigate = useNavigate();

    const { createCuestionarioFunc, editCuestionarioFunc } = useCuestionarioActions();

    const { currentCuestionario: cuestionario, selectedCuestionario } = useCuestionarioStore();

    const { data: indicadores } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });

    const { data: organizaciones } = useQuery({
        queryKey: ["organizaciones"],
        queryFn: getOrganizaciones,
    });

    const methods = useForm({
        defaultValues: cuestionario,
    });

    useEffect(() => {
        methods.reset({ ...cuestionario });
    }, [cuestionario, open]);

    const onSubmit = methods.handleSubmit(async (data) => {
        if (selectedCuestionario === null) {
            console.log(data)
            createCuestionarioFunc(data);
        } else {
            editCuestionarioFunc(data);
        }
    });

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="content p-5">
                        <Box>
                            <Typography variant="h6">Información del cuestionario</Typography>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} md={6}>
                                    <FormField 
                                        label={"Nombre del cuestionario"}
                                        name={"nombre"}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="fechaCreacion"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControl fullWidth margin='normal'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Fecha de creación"
                                                        value={field.value ? dayjs(field.value) : null}  // Asegurarse de que sea un objeto Dayjs
                                                        onChange={(date) => field.onChange(date ? dayjs(date) : null)}  // Convertir la fecha seleccionada a Dayjs
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>
                                        )}
                                    />


                                </Grid>
                            </Grid>
                            <br />
                            <Divider />
                            <br />
                            <Typography variant="h6">Seleccione los indicadores que desea agregar</Typography>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} md={12}>
                                    {indicadores?.map((indicador) => (
                                        <Controller
                                            key={indicador.id}
                                            name="indicadores" // Un solo campo para todos los indicadores
                                            control={methods.control}
                                            defaultValue={[]} // Inicializamos como un array vacío
                                            render={({ field }) => (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={field.value.includes(indicador.id)} // Verifica si el id está en la lista
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    field.onChange([...field.value, indicador.id]);
                                                                } else {
                                                                    field.onChange(field.value.filter(id => id !== indicador.id));
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={indicador.nombre}
                                                />
                                            )}
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
        </>
    );
}
