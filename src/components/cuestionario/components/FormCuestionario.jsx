import {
  Box,
  Divider,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Asegúrate de importar este icono
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery } from "react-query";
import { getIndicadoresRelationItems } from "../../indicador/services/IndicadorService";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useNavigate } from "react-router-dom";
import { useCuestionarioStore } from "../store/useCuestionarioStore";
import { useCuestionarioActions } from "../handlers/useActionsCuestionario";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";
import { FormField } from "../../FormField";
import { ErrorDialogo } from "../../dialogos/Dialogos";

export const FormCuestionario = () => {
  const navigate = useNavigate();

  const { createCuestionarioFunc, editCuestionarioFunc } =
    useCuestionarioActions();

  const { currentCuestionario: cuestionario, selectedCuestionario } =
    useCuestionarioStore();

  const { data: indicadores } = useQuery({
    queryKey: ["indicadores-Cuestionario"],
    queryFn: getIndicadoresRelationItems,
  });

  const methods = useForm({
    defaultValues: cuestionario,
  });

  useEffect(() => {
    methods.reset({ ...cuestionario });
  }, [cuestionario, open]);


  const onSubmit = methods.handleSubmit(async (data) => {
    if (!data.indicadores.length) {
      ErrorDialogo("Error", "No puedes crear un cuestionario sin seleccionar indicadores")
    } else {
      if (selectedCuestionario === null) {
        console.log(data);
        createCuestionarioFunc(data);
      } else {
        editCuestionarioFunc(data);
      }
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
                      label={"Nombre del cuestionario*"}
                      name={"nombre"}
                      isRequerided
                      helperText="Este campo es requerido"

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="fechaCreacion"
                    control={methods.control}
                    render={({ field }) => (
                      <FormControl fullWidth margin="normal" required>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                          <DatePicker
                            label="Fecha de creación"
                            value={field.value ? dayjs(field.value) : null} // Asegurarse de que sea un objeto Dayjs
                            onChange={(date) =>
                              field.onChange(date ? dayjs(date) : null)
                            }
                            
                            disablePast
                            slotProps={{
                              textField: {
                                required: true,
                                helperText: "Este campo es requerido"
                              },
                            }}
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
              <Typography variant="h6">
                Seleccione los indicadores que desea agregar
              </Typography>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={12}>
                  {indicadores?.map((indicador) => (
                    <Accordion key={indicador.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${indicador.id}-content`}
                        id={`panel-${indicador.id}-header`}
                      >
                        <Controller
                          name="indicadores"
                          control={methods.control}
                          defaultValue={[]} // Inicializamos como un array vacío
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={field.value.includes(indicador.id)} // Verifica si el id está en la lista
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      field.onChange([
                                        ...field.value,
                                        indicador.id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (id) => id !== indicador.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              }
                              label={indicador.nombre} // El nombre del indicador en el resumen
                            />
                          )}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography mb={2} fontWeight={700}>
                          Detalles del indicador {indicador.nombre}
                        </Typography>
                        {indicador.items.map((item, index) => (
                          <Typography mb={2}>
                            item {index + 1} - {item.nombre}
                          </Typography>
                        ))}
                      </AccordionDetails>
                    </Accordion>
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
};
