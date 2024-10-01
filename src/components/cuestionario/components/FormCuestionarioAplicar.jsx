import { Box, Divider, FormControl } from '@mui/material';
import { TextField, Select, InputLabel, MenuItem, Grid, Typography, Button} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQuery } from 'react-query';
import { getIndicadores } from '../../indicador/services/IndicadorService';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrganizaciones } from '../../../services/OrganizacionService';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { useCuestionarioActions } from '../handlers/useActionsCuestionario';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useEffect } from 'react';

export const FormCuestionarioAplicar = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const { createCuestionarioOrganizacionFunc } = useCuestionarioActions();

    const { applyCuestionario: cuestionario, selectedCuestionario } = useCuestionarioStore();

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
        if (data !== null) {
            data["idCuestionario"] = id;
            createCuestionarioOrganizacionFunc(data);
        }
    });

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="content p-5" >
                        <Box>
                            <Typography variant="h6">Cuestionario nombre</Typography>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="idOrganizacion"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <InputLabel>Seleccione la organizacion</InputLabel>
                                                <Select
                                                    id="idOrganizacion"
                                                    label="Seleccione la organizacion"
                                                    {...field}
                                                >
                                                    {organizaciones?.map((organizacion) => (
                                                        <MenuItem key={organizacion.id} value={organizacion.id}>
                                                            {organizacion.nombre}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="fechaRealizacion"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Fecha de realizacion"
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
                                Continuar
                            </Button>
                        </Box>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}
