import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../../FormField";
import Button from "@mui/material/Button";
import { Box, Typography, Grid } from "@mui/material";
import { useRubricaActions } from "../handlers/useRubricaActions";
import { Opcion } from "./Opcion";
import { useRubricaStore } from "../store/useRubricaStore";
import { useNavigate } from "react-router-dom";

export const FormRubrica = () => {
  const navigate = useNavigate();
  const { createRubricaFunc, editRubricaFunc } = useRubricaActions();
  const { currentRubrica, selectedRubrica } = useRubricaStore();

  const methods = useForm({
    defaultValues: currentRubrica,
  });

  const [opciones, setOpciones] = useState(currentRubrica.opciones || []);

  useEffect(() => {
    methods.reset(currentRubrica);
    setOpciones(currentRubrica.opciones || []);
  }, [currentRubrica, methods]);

  const onSubmit = methods.handleSubmit((data) => {
    const rubricaConOpciones = { ...data, opciones };

    if (selectedRubrica === null) {
      createRubricaFunc(rubricaConOpciones);
    } else {
      editRubricaFunc(rubricaConOpciones);
    }
  });

  // Añadir una nueva opción
  const addOpcion = () => {
    const nuevaOpcion = {
      id: Date.now(),
      nombre: "",
      valor_alfa: 0.0,
    };
    setOpciones((prevOpciones) => [...prevOpciones, nuevaOpcion]);
  };

  // Actualizar una opción específica
  const updateOpcion = (id, newData) => {
    const updatedOpciones = opciones.map((opcion) =>
      opcion.id === id ? { ...opcion, ...newData } : opcion
    );
    setOpciones(updatedOpciones);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="content p-5">
          <Box>
            <Typography variant="h6">Información de la Rúbrica</Typography>
            <Grid container spacing={2}>
              {/* Campo nombre registrado en React Hook Form */}
              <Grid item xs={8}>
                <FormField label="Nombre" name="nombre" />
              </Grid>
              <Grid item xs={4}>
                <FormField label="Tipo" name="tipo" type="select">
                  <option value="radio">Radio Button</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="text">Texto</option>
                </FormField>
              </Grid>
            </Grid>

            <Typography variant="h6" mt={3}>
              Opciones
            </Typography>
            <Box>
              {opciones.map((opcion, index) => (
                <Opcion
                  key={opcion.id}
                  id={opcion.id}
                  nombre={opcion.nombre}
                  valor_alfa={opcion.valor_alfa}
                  onUpdate={updateOpcion}
                />
              ))}
            </Box>

            {methods.watch("tipo") !== "text" && (
              <Button onClick={addOpcion} variant="contained" className="mb-3">
                Añadir Opción
              </Button>
            )}
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