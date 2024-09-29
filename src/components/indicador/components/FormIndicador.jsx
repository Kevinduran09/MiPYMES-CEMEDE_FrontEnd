import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "../../FormField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useIndicadorActions } from "../handlers/useIndicadorActions";
import { useIndicadorStore } from "../../../hooks/useIndicadorStore";
import { useNavigate } from "react-router-dom";

export const FormIndicador = () => {
    const navigate = useNavigate();

    const { createIndicadorFunc, editIndicadorFunc } = useIndicadorActions();
    const { currentIndicador: indicador, selectedIndicador } = useIndicadorStore();
    const methods = useForm({
        defaultValues: indicador,
    });

    useEffect(() => {
        methods.reset({ ...indicador });
    }, [indicador, open]);

    const onSubmit = methods.handleSubmit(async (data) => {
        if (selectedIndicador === null) {
            createIndicadorFunc(data);
        } else {
            editIndicadorFunc(data);
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <div className="content p-5">
                    <Box>
                        <Typography variant="h6">Información del Indicador</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                            <FormField label="Nombre" name="nombre" />
                            <FormField label="Descripción" name="descripcion" />
                        </Box>
                    </Box>

                    <Box textAlign={"end"}>
                        <Button
                            variant="contained"
                            color="error"
                            type="button"
                            sx={{ mt: 3, mr: 1 }}
                            onClick={()=>{
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
