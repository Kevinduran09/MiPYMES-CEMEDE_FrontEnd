import React, { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../../FormField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useQuery } from 'react-query';
import { getRubricas } from '../../../services/RubricaService';
import { getIndicadores } from '../../../services/IndicadorService';
import { useItemStore } from "../../../hooks/useItemStore";
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
  const { currentItem: item, selectedItem } = useItemStore();
  const methods = useForm({
    defaultValues: item,
  });
  useEffect(() => {
    methods.reset({ ...item });
  }, [item, open]);

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
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
              <FormField label="Nombre" name="nombre" />
              <FormField label="Peso" name="peso" type="number" />
            </Box>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="rubricaId"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Rúbrica</InputLabel>
                      <Select {...field} label="Rúbrica">
                        <MenuItem value="">Seleccionar una rúbrica</MenuItem>
                        {rubricasLoading ? (
                          <MenuItem>No hay rúbricas disponibles.</MenuItem>
                        ) : (
                          rubricasData.map(rubrica => (
                            <MenuItem key={rubrica.id} value={rubrica.id}>
                              {rubrica.nombre}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="indicadorId"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Indicador</InputLabel>
                      <Select {...field} label="Indicador">
                        <MenuItem value="">Seleccionar un indicador</MenuItem>
                        {indicadoresLoading ? (
                          <MenuItem>No hay indicadores disponibles.</MenuItem>
                        ) : (
                          indicadoresData.map(indicador => (
                            <MenuItem key={indicador.id} value={indicador.id}>
                              {indicador.nombre}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
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
  );
};
