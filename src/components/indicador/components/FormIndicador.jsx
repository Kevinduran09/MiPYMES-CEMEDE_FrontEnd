import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { FormField } from "../../FormField";
import Button from "@mui/material/Button";
import {
    Autocomplete,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useIndicadorActions } from "../handlers/useIndicadorActions";
import { useIndicadorStore } from "../store/useIndicadorStore";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getIndicadores } from "../services/IndicadorService";

export const FormIndicador = () => {
    const navigate = useNavigate();

    const { createIndicadorFunc, editIndicadorFunc } = useIndicadorActions();
    const { currentIndicador, selectedIndicador, updateCurrentIndicador } = useIndicadorStore();
    const methods = useForm({
        defaultValues: currentIndicador,
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
        if (currentIndicador === null) {
            methods.reset({ ...currentIndicador });
        }
    }, [currentIndicador]);

    const handleChange = (field, value) => {
        updateCurrentIndicador({ [field]: value });
    };

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
                        <Box
                            sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
                        >
                            <FormField
                                label="Nombre"
                                name="nombre"
                                required={true}
                                helperText={"Este campo es requerido"}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                    title: "El nombre del indicador debe tener entre 5 y 255 caracteres",
                                }}
                                onChange={(e) => { 
                                    handleChange("nombre", e.target.value)
                                    field.onChange(e);
                                }}
                            />
                            <FormField
                                label="Descripción"
                                name="descripcion"
                                required={true}
                                helperText={"Este campo es requerido"}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                    title: "La descripción debe tener entre 5 y 255 caracteres",
                                }}
                                onChange={(e) => {
                                    handleChange("descripcion", e.target.value)
                                    field.onChange(e);
                                }}
                            />
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
                                            value={field.value ? field.value : ""}
                                            onChange={(e) => {
                                                setIsSub(e.target.value === "Sub-Indicador");
                                                handleChange("tipo", e.target.value);
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
                                render={({ field, fieldState: { error } }) => (
                                    <Autocomplete
                                        options={dataRows?.filter((row) => row.tipo === "Indicador") || []}
                                        getOptionLabel={(option) => option.nombre || ""}
                                        isOptionEqualToValue={(option, value) => option.id === value}
                                        value={dataRows?.find((row) => row.id === field.value) || null}
                                        onChange={(_, selectedOption) => {
                                            handleChange("indicadorPadreId", selectedOption ? selectedOption.id : null);
                                            field.onChange(selectedOption ? selectedOption.id : null);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Indicador padre"
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                required={isSub}
                                            />
                                        )}
                                        disabled={!isSub}
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
