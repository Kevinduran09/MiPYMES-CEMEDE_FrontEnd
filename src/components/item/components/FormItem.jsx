import React, { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../../FormField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Grid, Switch } from "@mui/material";
import { useQuery } from "react-query";
import { getRubricas } from "../../rubrica/services/RubricaService";
import { getIndicadores } from "../../indicador/services/IndicadorService";
import { useItemStore } from "../store/useItemStore";
import { useItemActions } from "../handlers/useItemActions";
import { useNavigate } from "react-router-dom";

export const FormItem = () => {
  const navigate = useNavigate();

  const { isLoading: rubricasLoading, data: rubricasData } = useQuery({
    queryKey: ["rubricas"],
    queryFn: getRubricas,
  });

  const { isLoading: indicadoresLoading, data: indicadoresData } = useQuery({
    queryKey: ["indicadores"],
    queryFn: getIndicadores,
  });

  const { createItemFunc, editItemFunc } = useItemActions();
  const { currentItem: item, selectedItem, updateCurrentItem } = useItemStore();
  const methods = useForm({
    defaultValues: item,
  });
  useEffect(() => {
    methods.reset({ ...item });
  }, [item, open]);

  const handleChange = (field, value) => {
    updateCurrentItem({ [field]: value });
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    if (selectedItem === null) {
      createItemFunc(data);
    } else {
      editItemFunc(data);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Información del Ítem</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <FormField
                label="Nombre"
                name="nombre"
                required={true}
                helperText={"Este campo es requerido"}
                inputProps={{
                  maxLength: 255,
                  minLength: 5,
                  title: "El nombre del item debe tener entre 5 y 255 caracteres",
                }}
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              <FormField
                label="Peso"
                name="peso"
                type="number"
                required={true}
                helperText={"Este campo es requerido"}
                inputProps={{
                  min: 1,
                }}
                onChange={(e) => handleChange("peso", e.target.value)}
              />
              <FormField
                label="Descripcion"
                name="descripcion"
                required={true}
                helperText={"Este campo es requerido"}
                inputProps={{
                  maxLength: 1500,
                  minLength: 5,
                  title: "La descripcion del item debe tener entre 5 y 1500 caracteres",
                }}
                onChange={(e) => handleChange("descripcion", e.target.value)}
              />
              <FormField
                label="Evidencia"
                name="evidencia"
                required={true}
                helperText={"Este campo es requerido"}
                inputProps={{
                  maxLength: 255,
                  minLength: 5,
                  title: "La evidencia del item debe tener entre 5 y 255 caracteres",
                }}
                onChange={(e) => handleChange("evidencia", e.target.value)}
              />
            </Box>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="rubricaId"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      options={rubricasData || []}
                      getOptionLabel={(option) => option.nombre || ""}
                      isOptionEqualToValue={(option, value) => option.id === value}
                      value={rubricasData?.find((rubrica) => rubrica.id === field.value) || null}
                      onChange={(_, selectedOption) => {
                        field.onChange(selectedOption ? selectedOption.id : "")
                        handleChange("rubricaId", selectedOption ? selectedOption.id : "")
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Rúbrica"
                          error={!!error}
                          helperText={error ? error.message : null}
                          required={true}
                        />
                      )}
                      disabled={rubricasLoading}
                      loading={rubricasLoading}
                      noOptionsText="No hay rúbricas disponibles"
                    />
                  )}
                />

              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="indicadorId"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      options={indicadoresData?.filter((indicador) => indicador.tipo === "Sub-Indicador") || []}
                      getOptionLabel={(option) => option.nombre || ""}
                      isOptionEqualToValue={(option, value) => option.id === value}
                      value={indicadoresData?.find((indicador) => indicador.id === field.value) || null}
                      onChange={(_, selectedOption) => {
                        field.onChange(selectedOption ? selectedOption.id : "")
                        handleChange("indicadorId", selectedOption ? selectedOption.id : "")
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Indicador"
                          error={!!error}
                          helperText={error ? error.message : null}
                          required={true}
                        />
                      )}
                      disabled={indicadoresLoading}
                      loading={indicadoresLoading}
                      noOptionsText="No hay indicadores disponibles"
                    />
                  )}
                />

              </Grid>
            </Grid>
            <Box marginTop={2}>
              <Typography variant="body1">Habilitar Observacion</Typography>
              <Controller
                name="observacion"
                control={methods.control}
                defaultValue={false}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value || false}
                    onChange={(e) => {
                      field.onChange(e.target.checked)
                      handleChange("observacion", e.target.checked? true : false)
                    }}
                  />
                )}
              />
            </Box>
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
  );
};
