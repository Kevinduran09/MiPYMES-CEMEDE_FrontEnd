import { Box, Typography, Grid, Button, Divider, FormControl, FormControlLabel, RadioGroup, Radio, TextField } from '@mui/material';
import { useQuery } from 'react-query';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getCuestionarioOrganizacion } from '../services/CuestionarioService';
import { useCuestionarioStore } from '../store/useCuestionarioStore';
import { useCuestionarioActions } from '../handlers/useActionsCuestionario';

export const FormCuestionarioItemsRespuesta = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { createCuestionarioItemFunc } = useCuestionarioActions();
    const { respuestas } = useCuestionarioStore();

    const { data: cuestionarioOrganizacion } = useQuery({
        queryKey: ["cuestionario", id],
        queryFn: () => getCuestionarioOrganizacion(id),
    });

    const methods = useForm();
    const { control } = methods;

    const { setRespuesta } = useCuestionarioStore((state) => ({
        setRespuesta: state.setRespuesta,
    }));

    const onSubmit = methods.handleSubmit(async (data) => {
        if (data !== null) {
            createCuestionarioItemFunc(respuestas);
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="content p-5">
                    <Box>
                        <Typography variant="h6">Responder cada uno de los items</Typography>
                        <Grid container spacing={2} mt={2}>
                            {/* Mostrar los items con sus rubricas */}
                            {cuestionarioOrganizacion?.cuestionario?.cuestionarioIndicadores?.map((cuestionarioIndicador) => (
                                
                                <Grid item xs={12} key={cuestionarioIndicador.id}>
                                    <Typography variant="h6" gutterBottom>
                                        {cuestionarioIndicador.indicador.nombre}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {cuestionarioIndicador.indicador.descripcion}
                                    </Typography>

                                    {cuestionarioIndicador.indicador.items.map((item) => (
                                        <Box key={item.id} mt={2}>
                                            <Typography variant="body1">{item.nombre}</Typography>
                                            <FormControl component="fieldset">
                                                <Controller
                                                    name={`calificacion_${item.id}`}
                                                    control={control}
                                                    defaultValue="" // O puedes pasar un valor predeterminado, si existe
                                                    render={({ field }) => (
                                                        <RadioGroup
                                                            row
                                                            value={field.value} // Asignar el valor actual del campo
                                                            onChange={(event) => {
                                                                const valor_opcion_seleccionada = event.target.value;
                                                                field.onChange(valor_opcion_seleccionada); // Actualizar el valor seleccionado en el formulario

                                                                // Actualizar en Zustand el estado con idItem, idCuestionarioOrganizacion y valorAlfa
                                                                setRespuesta(id, item.id, valor_opcion_seleccionada, methods.getValues(`observaciones_${item.id}`));
                                                            }}
                                                        >
                                                            {item.rubrica.opciones.map((opcion) => (
                                                                <FormControlLabel
                                                                    key={opcion.id}
                                                                    value={opcion.valor_alfa.toString()}
                                                                    control={<Radio />}
                                                                    label={opcion.nombre}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </FormControl>

                                            <Controller
                                                name={`observaciones_${item.id}`}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Observaciones"
                                                        multiline
                                                        fullWidth
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            setRespuesta(id, item.id, methods.getValues(`calificacion_${item.id}`), e.target.value);
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    ))}
                                    <br />
                                    <Divider />
                                    <br />
                                </Grid>
                            ))}
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
                        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
                            Continuar
                        </Button>
                    </Box>
                </div>
            </form>
        </FormProvider>
    );
};
