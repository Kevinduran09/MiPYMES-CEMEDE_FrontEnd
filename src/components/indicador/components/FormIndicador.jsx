import React, { useEffect, useState } from "react";
import { useForm, FormProvider, set, Controller } from "react-hook-form";
import { FormField } from "../../FormField";
import Button from "@mui/material/Button";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useIndicadorActions } from "../handlers/useIndicadorActions";
import { useIndicadorStore } from "../store/useIndicadorStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getIndicadores } from "../services/IndicadorService";

export const FormIndicador = () => {
    const navigate = useNavigate();

    const { createIndicadorFunc, editIndicadorFunc } = useIndicadorActions();
    const { currentIndicador: indicador, selectedIndicador } = useIndicadorStore();
    const methods = useForm({
        defaultValues: indicador,
    });

    const {
        isLoading,
        isError,
        data: dataRows,
    } = useQuery({
        queryKey: ["indicadores"],
        queryFn: getIndicadores,
    });

    const [isSub, setIsSub] = useState(false);

    useEffect(() => {
        methods.reset({ ...indicador });
    }, [indicador, open]);

    const onSubmit = methods.handleSubmit(async (data) => {
        if (selectedIndicador === null) {
            const dataVal = data;
            if (!isSub) {
                delete dataVal["indicadorPadreId"];
            }
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
                            <FormField label="Nombre" name="nombre" required={true} helperText={"Este campo es requerido"} />
                            <FormField label="Descripción" name="descripcion" required={true} helperText={"Este campo es requerido"} />
                            <Controller
                                name="tipo"
                                control={methods.control}
                                render={({ field }) => (
                                    <FormControl required={true}>
                                        <InputLabel>Tipo</InputLabel>
                                        <Select
                                            name="tipo"
                                            label="Tipo"
                                            required={true}
                                            value={field.value? field.value : ""}
                                            onChange={(e) => {
                                                setIsSub(e.target.value === "Sub-Indicador");
                                                field.onChange(e);
                                            }}
                                        >
                                            <MenuItem value="Indicador">Indicador</MenuItem>
                                            <MenuItem value="Sub-Indicador">Sub-Indicador</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name="indicadorPadreId"
                                control={methods.control}
                                render={({ field }) => (
                                    <FormControl disabled={!isSub} required={isSub}>
                                        <InputLabel>Indicador padre</InputLabel>
                                        <Select
                                            name="indicadorPadreId"
                                            label="Indicador padre"
                                            required={isSub}
                                            value={field.value? field.value : ""}
                                            onChange={field.onChange}
                                        >
                                            {dataRows?.map((row) => {
                                                if (row.tipo === "Indicador") {
                                                    return (
                                                        <MenuItem value={row.id}>{row.nombre}</MenuItem>
                                                    )
                                                }
                                                return null;
                                            })}
                                        </Select>
                                    </FormControl>
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
