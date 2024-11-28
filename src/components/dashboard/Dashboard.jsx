import { Container, Card } from "react-bootstrap";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Box, Typography } from "@mui/material";
import { getCuestionariosAplicados } from "../cuestionario/services/CuestionarioService";
import { useQuery } from "react-query";
import { getUsuarios } from "../usuario/services/usuarioServices";
import { getEmpresarios } from "../empresario/services/EmpresarioService";
import { getOrganizaciones } from "../organizacion/services/OrganizacionService";

export const Dashboard = () => {

    const { data: dataRowsAplicados } = useQuery({
        queryKey: ["cuestionarios"],
        queryFn: getCuestionariosAplicados,
    });
    const { data: dataRowsUsuarios } = useQuery({
        queryKey: ["usuarios"],
        queryFn: getUsuarios,
    });

    const { data: dataRowsEmpresarios } = useQuery({
        queryKey: ["empresarios"],
        queryFn: getEmpresarios,
    });

    const { data: dataRowsOrganizaciones } = useQuery({
        queryKey: ["organizaciones"],
        queryFn: getOrganizaciones,
    });

    const filteredDataRowsAplicados = dataRowsAplicados?.filter(row => row.estado === true)

    return (
        <div style={{ display: "flex", margin: "2rem" }}>
            <Grid container spacing={2}>
                {/* Cards para la información */}
                <Grid item xs={12} md={3}>
                    <Card
                        className="text-center"
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#721c24",
                            color: "#ffdddd",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",

                        }}
                    >
                        <Card.Body>
                            <Card.Title>Cantidad de Empresarios</Card.Title>
                            <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                {dataRowsEmpresarios?.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card
                        className="text-center"
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#155724",
                            color: "#d4edda",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Card.Body>
                            <Card.Title>Cantidad de Organizaciones</Card.Title>
                            <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                {dataRowsOrganizaciones?.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card
                        className="text-center"
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#004085",
                            color: "#cce5ff",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Card.Body>
                            <Card.Title>Cantidad de Usuarios</Card.Title>
                            <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                {dataRowsUsuarios?.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card
                        className="text-center"
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#856404",
                            color: "#fff3cd",
                            borderRadius: "15px",
                            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Card.Body>
                            <Card.Title>Cuestionarios Aplicados</Card.Title>
                            <Card.Text style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                {filteredDataRowsAplicados?.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%", height: 510, marginTop: "10px", paddingTop: "10px", borderRadius: "15px", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)", }}>
                        <Box sx={{ textAlign: "center", marginBottom: "5px", }}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                                Número de Cuestionarios Asignados
                            </Typography>
                            <Typography variant="body2" component="div" sx={{ color: "#666" }}>
                                Agrupados por estado
                            </Typography>
                        </Box>
                        <BarChart
                            xAxis={[
                                {
                                    id: "categories",
                                    data: ["Pendientes", "Aplicados"],
                                    scaleType: "band",
                                    colorMap: {
                                        type: "ordinal",
                                        values: ["Pendientes", "Aplicados"],
                                        colors: ["#721c24", "#856404"],
                                    },
                                },
                            ]}
                            series={[
                                {
                                    data: [
                                        dataRowsAplicados?.filter(row => row.estado !== true)?.length || 0,
                                        dataRowsAplicados?.filter(row => row.estado === true)?.length || 0,
                                    ],
                                },
                            ]}
                            height={450}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ width: "100%", height: 510, marginTop: "10px", paddingTop: "10px", borderRadius: "15px", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)", }}>
                        <Box sx={{ textAlign: "center", marginBottom: "5px", }}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                                Número de Organizaciones
                            </Typography>
                            <Typography variant="body2" component="div" sx={{ color: "#666" }}>
                                Agrupadas por estado
                            </Typography>
                        </Box>
                        <BarChart
                            xAxis={[
                                {
                                    id: "categories",
                                    data: ["Inactivas","Activas"],
                                    scaleType: "band",
                                    colorMap: {
                                        type: "ordinal",
                                        values: ["Inactivas","Activas"],
                                        colors: ["#721c24", "#155724"],
                                    },
                                },
                            ]}
                            series={[
                                {
                                    data: [
                                        dataRowsOrganizaciones?.filter(row => row.activa !== true)?.length || 0,
                                        dataRowsOrganizaciones?.filter(row => row.activa === true)?.length || 0,
                                    ],
                                },
                            ]}
                            height={450}
                        />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};
