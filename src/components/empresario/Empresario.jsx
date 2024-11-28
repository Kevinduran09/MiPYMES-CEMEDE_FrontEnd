import { useQuery } from "react-query";
import { getEmpresarios } from "./services/EmpresarioService";
import { TableComponent } from "../TableComponent";
import { useEmpStore } from "./store/useEmpStore";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
import { TableEmpresariosColums } from "./components/TableEmpresariosColums";
export const Empresario = () => {
  const navegate = useNavigate();
  const { columns } = TableEmpresariosColums();
  const { clear } = useEmpStore();
  const {
    isLoading,
    data: empresarios,
    isError,
  } = useQuery({
    queryKey: ["empresarios"],
    queryFn: getEmpresarios,
  });
  const navigation = () => {
    clear();
    navegate("/empresarios/crear");
  };
  return (
    <>
      <div>
        <TableComponent
          title={"Empresarios"}
          columns={columns}
          rowsSet={empresarios}
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
    </>
  );
};
