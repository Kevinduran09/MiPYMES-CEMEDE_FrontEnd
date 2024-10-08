import { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { TableColumns } from "./components/TableColumns";
import { useCuestionarioStore } from "./store/useCuestionarioStore";
import { getCuestionarios } from "./services/CuestionarioService";
import { TableComponent } from "../TableComponent";
import { AddIcon } from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { AddButton } from "../AddButton";

export const Cuestionario = () => {
  const navigate = useNavigate();
  const { columns } = TableColumns();
  const { resetCurrentCuestionario, clearSelectedCuestionario } =
    useCuestionarioStore();

  const {
    isLoading,
    isError,
    data: dataRows,
  } = useQuery({
    queryKey: ["cuestionarios"],
    queryFn: getCuestionarios,
  });

  const navigation = () => {
    resetCurrentCuestionario();
    clearSelectedCuestionario();
    navigate("/cuestionarios/crear");
  };

  const buttons = (
    <>
      <AddButton route={navigation} />
      <Button
        startIcon={<Visibility />}
        color="primary"
        variant="text"
        onClick={() => navigate("/cuestionarios/aplicados")}
      >
        Ver aplicados
      </Button>
    </>
  );

  return (
    <>
      <Container>
        <TableComponent
          title={"Cuestionarios"}
          columns={columns}
          rowsSet={dataRows}
          isError={isError}
          isLoading={isLoading}
          customButtons={buttons}
        />
      </Container>
    </>
  );
};
