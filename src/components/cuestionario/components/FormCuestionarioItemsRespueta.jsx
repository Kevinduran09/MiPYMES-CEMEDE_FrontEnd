import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  MobileStepper,
} from "@mui/material";
import { useQuery } from "react-query";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getCuestionarioOrganizacion } from "../services/CuestionarioService";
import { useCuestionarioStore } from "../store/useCuestionarioStore";
import Swal from "sweetalert2";
import { useCuestionarioActions } from './../handlers/useActionsCuestionario';

export const FormCuestionarioItemsRespuesta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createCuestionarioItemFunc } = useCuestionarioActions();
  const { data: cuestionarioOrganizacion } = useQuery({
    queryKey: ["cuestionario", id],
    queryFn: () => getCuestionarioOrganizacion(id),
  });

  const {
    respuestas,
    setRespuesta,
    setApplyingCuestionario,
    resetRespuestas
  } = useCuestionarioStore();

  const initialValues = respuestas.reduce((acc, resp) => {
    acc[`calificacion_${resp.idItem}`] = resp.valor_opcion_seleccionada;
    acc[`observaciones_${resp.idItem}`] = resp.observaciones;
    return acc;
  }, {});

  const methods = useForm({
    defaultValues: initialValues,
  });
  const { control, reset } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = cuestionarioOrganizacion?.cuestionario?.cuestionarioIndicadores.length || 0;

  const isStepComplete = () => {
    const currentItems = cuestionarioOrganizacion.cuestionario.cuestionarioIndicadores[activeStep].indicador.items;
    return currentItems.every((item) => methods.getValues(`calificacion_${item.id}`));
  };

  const handleNext = () => {
    if (isStepComplete()) {
      if (activeStep < totalSteps - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        methods.handleSubmit(onSubmit)();
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "No puede avanzar sin antes completar la informacion"
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    createCuestionarioItemFunc(respuestas);
  };

  useEffect(() => {
    setApplyingCuestionario(true);

    return () => {
      setApplyingCuestionario(false);
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Responder cada uno de los items</Typography>


            {cuestionarioOrganizacion &&
              cuestionarioOrganizacion.cuestionario.cuestionarioIndicadores.map(
                (cuestionarioIndicador, index) =>
                  activeStep === index && (
                    <Grid container spacing={2} mt={2} key={cuestionarioIndicador.id}>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          {cuestionarioIndicador.indicador.nombre}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {cuestionarioIndicador.indicador.descripcion}
                        </Typography>

                        {cuestionarioIndicador.indicador.items.map((item) => (
                          <Box key={item.id} mt={2} sx={{
                            backgroundColor: "white",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)"
                          }}>
                            <div style={{
                              padding: "20px 20px"
                            }}>
                            <Typography variant="body1">{item.nombre}</Typography>
                            <FormControl component="fieldset" required={true}>
                              <Controller
                                name={`calificacion_${item.id}`}
                                control={control}
                                defaultValue=""
                                rules={{ required: "Este campo es requerido" }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <RadioGroup
                                      row
                                      value={field.value}
                                      onChange={(event) => {
                                        const valor_opcion_seleccionada = event.target.value;
                                        field.onChange(valor_opcion_seleccionada);
                                        setRespuesta(
                                          id,
                                          item.id,
                                          valor_opcion_seleccionada,
                                          methods.getValues(`observaciones_${item.id}`)
                                        );
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

                                    {error && (
                                      <Typography color="error" variant="body2">
                                        {error.message}
                                      </Typography>
                                    )}
                                  </>
                                )}
                              />
                            </FormControl>

                            {item.observacion ? (
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
                                      setRespuesta(
                                        id,
                                        item.id,
                                        methods.getValues(`calificacion_${item.id}`),
                                        e.target.value
                                      );
                                    }}
                                  />
                                )}
                              />
                            ) : null}
                            </div>
                          </Box>
                        ))}
                        <br />
                        <Divider />
                        <br />
                      </Grid>
                    </Grid>
                  )
              )}
            {cuestionarioOrganizacion && (
              <MobileStepper
                steps={totalSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <>

                    {activeStep === totalSteps - 1 ? (
                      <>
                        <div>
                          <Button
                            size="small"
                            color="error"
                            sx={{ ml: 1 }}
                            onClick={() => {
                              navigate(-1);
                              resetRespuestas();
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button size="small" type="submit">
                            Confirmar
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button size="small" onClick={handleNext} disabled={activeStep === totalSteps - 1}>
                        Siguiente
                      </Button>
                    )}
                  </>

                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    Anterior
                  </Button>
                }
              />
            )}
          </Box>
        </div>
      </form>
    </FormProvider>
  );
};
