import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../../FormField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { useRubricaActions } from "../handlers/useRubricaActions";
import { Opcion } from "./Opcion"; // Asumo que ya tienes un componente Opcion
import { useRubricaStore } from "../store/useRubricaStore";
import { useNavigate } from "react-router-dom";

export const FormRubrica = () => {
    const navigate = useNavigate();

    const { createRubricaFunc, editRubricaFunc } = useRubricaActions();
    const { currentRubrica: rubrica, selectedRubrica, updateCurrentRubrica } = useRubricaStore();
    const methods = useForm({
        defaultValues: rubrica,
    });

    useEffect(() => {
        methods.reset({ ...rubrica });
    }, [rubrica, open]);

    const onSubmit = methods.handleSubmit(async (data) => {
        if (selectedRubrica === null) {
            createRubricaFunc(data);
        } else {
            editRubricaFunc(data);
        }
    });

    const addOpcion = () => {
        const nuevaOpcion = {
            id: Date.now(),
            nombre: '',
            valor_alfa: 0.0,
        };
        updateCurrentRubrica({
            opciones: [...rubrica.opciones, nuevaOpcion],
        });
    };

    const updateOpcion = (id, newData) => {
        const updatedOpciones = rubrica.opciones.map((opcion) =>
            opcion.id === id ? { ...opcion, ...newData } : opcion
        );
        updateCurrentRubrica({ opciones: updatedOpciones });
    };

    const deleteOpcion = (id) => {
        const filteredOpciones = rubrica.opciones.filter((opcion) => opcion.id !== id);
        updateCurrentRubrica({ opciones: filteredOpciones });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <div className="content p-5">
                    <Box>
                        <Typography variant="h6">Información de la Rúbrica</Typography>
                        <Grid container spacing={2}>
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
                            {methods.watch("opciones").map((opcion, index) => (
                                <Opcion
                                    key={opcion.id}
                                    id={opcion.id}
                                    nombre={opcion.nombre}
                                    valor_alfa={opcion.valor_alfa}
                                    onUpdate={updateOpcion}
                                    onDelete={deleteOpcion}
                                />
                            ))}
                        </Box>

                        {methods.watch("tipo") !== "text" && (
                            <Button onClick={addOpcion} variant="contained" sx={{marginTop: "10px"}}>
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
