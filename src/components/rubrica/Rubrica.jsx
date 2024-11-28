import { Container } from "react-bootstrap";
import { getRubricas } from "./services/RubricaService";
import { useQuery } from "react-query";
import { useRubricaStore } from "./store/useRubricaStore";
import { TableComponent } from "../TableComponent";
import { TableColumns } from "./components/TableColumns";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
export const Rubrica = () => {
  const navigate = useNavigate();
  const { columns } = TableColumns();
  const { resetCurrentRubrica, clearSelectedRubrica } = useRubricaStore();
  const {
    isLoading,
    data: dataRows,
    isError,
  } = useQuery({
    queryKey: ["rubricas"],
    queryFn: getRubricas,
  });

  const navigation = () => {
    resetCurrentRubrica();
    clearSelectedRubrica();
    navigate("/rubricas/crear");
  };

  return (
    <div>
      <TableComponent
        title={"Rubricas"}
        columns={columns}
        rowsSet={dataRows}
        isError={isError}
        isLoading={isLoading}
        customButtons={
          <CustomButton
            action={navigation}
            icon={<Add />}
            text={"Agregar nuevo"}
          />
        }
      />
    </div>
  );
};
