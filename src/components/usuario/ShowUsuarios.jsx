import { useQuery } from "react-query";
import { getUsuarios } from "./services/usuarioServices";
import { TableComponent } from "../TableComponent";
import { useUsuarioStore } from "./store/useUsuarioStore";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
export const ShowUsuarios = (props) => {
  const navegate = useNavigate();
  const { clear } = useUsuarioStore();
  const {
    isLoading,
    data: usuarios,
    isError,
  } = useQuery({
    queryKey: ["usuarios"],
    queryFn: getUsuarios,
  });
  const navegation = () => {
    clear();
    navegate("/usuarios/crear");
  };
  return (
    <>
      <TableComponent
        title={"Usuarios"}
        columns={props.columns}
        rowsSet={usuarios}
        isError={isError}
        isLoading={isLoading}
        customButtons={
          <CustomButton
            action={navegation}
            icon={<Add />}
            text={"Agregar nuevo"}
          />
        }
      />
    </>
  );
};
