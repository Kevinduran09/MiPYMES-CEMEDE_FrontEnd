import { useQuery } from "react-query";
import { getOrganizaciones } from "./services/OrganizacionService";
import { TableComponent } from "../TableComponent";
import { useOrganizacionStore } from "./store/useOrganizacionStore";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
import { useAuthStore } from "../auth/store/useAuthStore";
import { OrganizationColumns } from "./components/TableOrganizacionesColumns";
export const Organizacion = () => {
  const navegate = useNavigate();
  const { clear } = useOrganizacionStore();
  const { columns } = OrganizationColumns();
  const { currentUser } = useAuthStore();
  const {
    isLoading,
    data: organizaciones,
    isError,
  } = useQuery({
    queryKey: ["organizaciones"],
    queryFn: getOrganizaciones,
  });
  const navigation = () => {
    clear();
    navegate("/organizaciones/crear");
  };
  return (
    <>
      <TableComponent
        title={"Organizaciones"}
        columns={columns}
        rowsSet={organizaciones}
        isError={isError}
        isLoading={isLoading}
        customButtons={
          <CustomButton
            action={navigation}
            icon={<Add />}
            text={"Agregar nuevo"}
            disabled={currentUser.rol == "Aplicador"}
          />
        }
      />
    </>
  );
};
