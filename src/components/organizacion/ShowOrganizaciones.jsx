import { useQuery } from "react-query";
import { getOrganizaciones } from "../../services/OrganizacionService";
import { TableComponent } from "../TableComponent";
import { useOrganizacionStore } from "../../hooks/useOrganizacionStore";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
export const ShowOrganizaciones = (props) => {
  const navegate = useNavigate();
  const { clear } = useOrganizacionStore();
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
        columns={props.columns}
        rowsSet={organizaciones}
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
    </>
  );
};
