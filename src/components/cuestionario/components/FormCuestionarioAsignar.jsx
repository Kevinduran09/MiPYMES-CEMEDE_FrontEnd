import { Autocomplete, Box, Divider, FormControl } from '@mui/material';
import { TextField, Select, InputLabel, MenuItem, Grid, Typography, Button } from '@mui/material';
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
import { getAplicadores } from '../../usuario/services/usuarioServices';
import { getCuestionario } from '../services/CuestionarioService';

export const FormCuestionarioAsignar = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { createCuestionarioOrganizacionFunc } = useCuestionarioActions();

    const { applyCuestionario: cuestionario } = useCuestionarioStore();
    const { isLoadingOrg, data: organizaciones } = useQuery({
        queryKey: ["organizaciones"],
        queryFn: getOrganizaciones,
    });

    const { isLoadingApl, data: aplicadores } = useQuery({
        queryKey: ["aplicadores"],
        queryFn: getAplicadores,
    });

    const { data: cuesti } = useQuery({
        queryKey: ["cuestionario", id],
        queryFn: () => getCuestionario(id),
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
    console.log(cuesti)
    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="content p-5" >
                        <Box>
                            <Typography variant="h6">Asignar cuestionario</Typography>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="idOrganizacion"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                id="idOrganizacion"
                                                options={organizaciones || []}
                                                getOptionLabel={(option) => option.nombre}
                                                onChange={(_, value) => field.onChange(value?.id || "")}
                                                isOptionEqualToValue={(option, value) => option.id === value}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Seleccione la organización"
                                                        required
                                                        helperText={"Este campo es obligatorio"}
                                                    />
                                                )}
                                            />
                                        )}
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="idAplicador"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <Autocomplete
                                                id="idAplicador"
                                                options={aplicadores || []}
                                                getOptionLabel={(option) => option.nombre}
                                                onChange={(_, value) => field.onChange(value?.id || "")}
                                                isOptionEqualToValue={(option, value) => option.id === value}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Seleccione al aplicador"
                                                        required
                                                        helperText={"Este campo es obligatorio"}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="fechaRealizacion"
                                        control={methods.control}
                                        render={({ field }) => {
                                            // Obtener la fecha de creación y convertirla a Dayjs
                                            const fechaCreacion = dayjs(cuesti?.fechaCreacion.split("T")[0]);
                                            const fechaActual = dayjs();

                                            // Definir la fecha mínima como la mayor de las dos
                                            const minDate = fechaCreacion.isBefore(fechaActual) ? fechaCreacion : fechaActual;

                                            return (
                                                <FormControl fullWidth required>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Fecha de realización"
                                                            disablePast
                                                            slotProps={{
                                                                textField: {
                                                                    required: true,
                                                                    readOnly: true
                                                                },
                                                            }}
                                                            minDate={minDate} // Usar la fecha mínima calculada
                                                            value={field.value ? dayjs(field.value) : null}
                                                            onChange={(date) => field.onChange(date ? dayjs(date) : null)}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            );
                                        }}
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
