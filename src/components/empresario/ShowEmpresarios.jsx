import { useQuery } from "react-query";
import { getEmpresarios } from "../../services/EmpresarioService";
import { TableComponent } from "../TableComponent";

export const ShowEmpresarios = (props) => {
  const {
    isLoading,
    data: empresarios,
    isError,
  } = useQuery({
    queryKey: ["empresarios"],
    queryFn: getEmpresarios,
  });

  return (
    <>
      <TableComponent
        title={"Empresarios"}
        columns={props.columns}
        data={empresarios}
        isError={isError}
        isLoading={isLoading}
        setOpen={props.setOpen}
      />
    </>
  );
};
