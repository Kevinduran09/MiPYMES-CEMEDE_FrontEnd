import { useQuery } from "react-query";
import { getEmpresarios } from "../../services/EmpresarioService";
import { TableComponent } from "../TableComponent";
import { useEmpStore } from "../../hooks/useEmpStore";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../AddButton";
export const ShowEmpresarios = (props) => {
  const navegate = useNavigate();
  const { clear } = useEmpStore();
  const {
    isLoading,
    data: empresarios,
    isError,
  } = useQuery({
    queryKey: ["empresarios"],
    queryFn: getEmpresarios,
  });
  const navegation = () => {
    clear();
    navegate("/empresarios/crear");
  };
  return (
    <>
      <TableComponent
        title={"Empresarios"}
        columns={props.columns}
        rowsSet={empresarios}
        isError={isError}
        isLoading={isLoading}
        customButtons={<AddButton route={navegation} />}
      />
    </>
  );
};
