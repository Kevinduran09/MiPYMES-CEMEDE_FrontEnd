import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { TableColumns } from "./components/TableColumns";
import { useCuestionarioStore } from "./store/useCuestionarioStore";
import { getCuestionarios } from "./services/CuestionarioService";
import { TableComponent } from "../TableComponent";
import AddIcon from "@mui/icons-material/Add"; // Cambia esto
import Visibility from "@mui/icons-material/Visibility"; // Cambia esto
import { CustomButton } from "../CustomButton";
import { useAuthStore } from "../auth/store/useAuthStore";

export const Cuestionario = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { columns } = TableColumns(currentUser);
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
      <CustomButton
        action={navigation}
        icon={<AddIcon />} // Cambiado a JSX
        text={"Agregar nuevo"}
        disabled={currentUser.rol == "Aplicador"}
      />
      <CustomButton
        icon={<Visibility />} // Cambiado a JSX
        action={() => {
          navigate("/cuestionarios/aplicados");
        }}
        text={"Ver aplicados"}
      />
    </>
  );

  return (
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
  );
};
