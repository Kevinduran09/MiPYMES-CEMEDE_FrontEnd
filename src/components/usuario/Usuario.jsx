import { useQuery } from "react-query";
import { getUsuarios } from "./services/usuarioServices";
import { TableComponent } from "../TableComponent";
import { useUsuarioStore } from "./store/useUsuarioStore";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
import { UsuarioColumns } from "./components/UsuarioColumns";
export const Usuario = () => {
  const navegate = useNavigate();
  const { clear } = useUsuarioStore();
  const { columns } = UsuarioColumns();
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
      <div>
        <TableComponent
          title={"Usuarios"}
          columns={columns}
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
      </div>
    </>
  );
};
