import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Box, Button, Card, CardContent, Typography, TextField, Alert } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useOrganizacionStore } from "../store/useOrganizacionStore";
import { getEmpresarios } from "../../empresario/services/EmpresarioService";
import { useOrganizacionActions } from "../handlers/useOrganizacionActions";

export const FormOrganizacionEmpresario = () => {
    const navigate = useNavigate();
    const methods = useForm();
    const { organizacion } = useOrganizacionStore();
    const { id } = useParams();

    const { asociarEmpresarios, eliminarEmpresario } = useOrganizacionActions();
    const [selectedEmpresarios, setSelectedEmpresarios] = useState([]);
    const [error, setError] = useState(false);

    const { data: empresarios = [], isLoading: loadingEmpresarios } = useQuery("empresarios", getEmpresarios);

    useEffect(() => {
        if (organizacion && organizacion.empresariosRelacionados) {
            const asociados = organizacion.empresariosRelacionados.map(emp => ({
                ...emp,
                isRelated: true
            }));
            setSelectedEmpresarios(asociados);
        }
    }, [organizacion, empresarios]);

    const onSubmit = () => {
        if (!hasNewEmpresarios) {
            setError(true);
            return;
        }

        const nuevosEmpresarios = selectedEmpresarios
            .filter(emp => !emp.isRelated)
            .map(emp => emp.empresario.id);

        asociarEmpresarios({
            idOrganizacion: id,
            empresariosIds: nuevosEmpresarios,
        });
    };

    const handleAddEmpresario = (event, value) => {
        if (value && !selectedEmpresarios.find(position => position.empresario.id === value.id)) {
            setSelectedEmpresarios(prev => [...prev, { empresario: { ...value }, isRelated: false }]);
        }
    };

    const handleRemoveEmpresario = (empresario) => {
        eliminarEmpresario(id, empresario.id);
    };

    const handleUnselectEmpresario = (empresario) => {
        setSelectedEmpresarios(prev => prev.filter(emp => emp.empresario.id !== empresario.id));
    };

    const hasNewEmpresarios = selectedEmpresarios.some(emp => !emp.isRelated);

    if (loadingEmpresarios) return <p>Cargando empresarios...</p>;

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box p={3}>
                    <Typography marginBottom={3} variant="h6">{`Nombre de la empresa: ${organizacion.nombre}`}</Typography>
                    <Typography variant="h6">Relacionar Empresarios</Typography>
                    <Box mt={2}>
                        <Controller
                            name="empresario"
                            control={methods.control}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    options={empresarios} 
                                    getOptionLabel={(option) => `Nombre Empresario: ${option.nombre}. Cedula: ${option.cedula}`}
                                    onChange={handleAddEmpresario}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selecciona un Empresario" variant="outlined" />
                                    )}
                                />
                            )}
                        />
                    </Box>
                    <Box mt={3}>
                        <Typography variant="h6">Empresarios Seleccionados</Typography>
                        {selectedEmpresarios.length === 0 ? (
                            <Typography variant="body1">No hay empresarios seleccionados.</Typography>
                        ) : (
                            <Box mt={1} display="flex" flexDirection="column" gap={2}>
                                {selectedEmpresarios.map(posicion => (
                                    <Card key={posicion.id} sx={{ width: "100%" }}>
                                        <CardContent>
                                            <Typography variant="h6">{`Nombre Empresario: ${posicion.empresario.nombre}`}</Typography>
                                            <Typography variant="body2">{`Cédula: ${posicion.empresario.cedula}`}</Typography>
                                            <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
                                                {posicion.isRelated ? (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleRemoveEmpresario(posicion.empresario)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outlined"
                                                        color="warning"
                                                        onClick={() => handleUnselectEmpresario(posicion.empresario)}
                                                    >
                                                        Quitar
                                                    </Button>
                                                )}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>
                    { !hasNewEmpresarios && (
                        <Box mt={2}>
                            <Alert severity="error">Debes seleccionar al menos un empresario nuevo antes de guardar.</Alert>
                        </Box>
                    )}
                    <Box mt={3} textAlign="end">
                        <Button
                            variant="contained"
                            color="error"
                            type="button"
                            sx={{ mr: 1 }}
                            onClick={() => navigate(-1)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!hasNewEmpresarios}  
                        >
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};
