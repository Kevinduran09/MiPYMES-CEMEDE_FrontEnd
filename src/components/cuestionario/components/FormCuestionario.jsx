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
                <Grid item xs={12}>
                  <FormField
                    label={"Nombre del cuestionario*"}
                    name={"nombre"}
                    isRequerided
                    helperText="Este campo es requerido"
                    inputProps={{
                      maxLength: 150,
                      minLength: 5,
                      title: "El nombre del cuestionario debe tener entre 5 y 150 caracteres",
                    }}
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
                  {indicadores?.map((indicador) => {
                    if (indicador.tipo === "Sub-Indicador") {
                      return (
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
                              Items del indicador:
                            </Typography>
                            {indicador.items?.map((item, index) => (
                              <Typography mb={2}>
                                item {index + 1} - {item.nombre}
                              </Typography>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                    return null;
                  })}
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
