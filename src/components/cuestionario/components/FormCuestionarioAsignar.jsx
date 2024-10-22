import { Box, Divider, FormControl } from '@mui/material';
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
                                            <FormControl fullWidth required>
                                                <InputLabel>Seleccione la organizacion</InputLabel>
                                                <Select
                                                    id="idOrganizacion"
                                                    label="Seleccione la organizacion"
                                                    name={field.name}
                                                    onChange={field.onChange}
                                                    value={field.value ? field.value : ""}
                                                    required
                                                    inputProps={{
                                                        title: "Este campo es requerido",
                                                    }}
                                                >
                                                    {isLoadingOrg ? (
                                                        <MenuItem>No hay organizaciones registradas.</MenuItem>
                                                    ) : (
                                                        organizaciones?.map((organizacion) => (
                                                            <MenuItem key={organizacion.id} value={organizacion.id}>
                                                                {organizacion.nombre}
                                                            </MenuItem>
                                                        ))
                                                    )}

                                                </Select>
                                            </FormControl>
                                        )}
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="idAplicador"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControl fullWidth required>
                                                <InputLabel>Seleccione al aplicador</InputLabel>
                                                <Select
                                                    id="idAplicador"
                                                    label="Seleccione al aplicador"
                                                    name={field.name}
                                                    onChange={field.onChange}
                                                    value={field.value ? field.value : ""}
                                                    required
                                                >
                                                    {isLoadingApl ? (
                                                        <MenuItem>No hay aplicadores registrados.</MenuItem>
                                                    ) : (
                                                        aplicadores?.map((aplicador) => (
                                                            <MenuItem key={aplicador.id} value={aplicador.id}>
                                                                {aplicador.nombre}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Controller
                                        name="fechaRealizacion"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FormControl fullWidth required>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Fecha de realizacion"
                                                        disablePast
                                                        slotProps={{
                                                            textField: {
                                                                required: true,
                                                            },
                                                        }}
                                                        minDate={dayjs(cuesti?.fechaCreacion.split("T")[0])}
                                                        value={field.value ? dayjs(field.value) : null}
                                                        onChange={(date) => field.onChange(date ? dayjs(date) : null)}
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
