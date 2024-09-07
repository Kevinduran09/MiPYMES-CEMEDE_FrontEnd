import { useQuery } from "react-query";
import { getOrganizaciones } from "../../services/OrganizacionService";
import { TableComponent } from "../TableComponent";

export const ShowOrganizaciones = (props) => {
  const {
    isLoading,
    data: organizaciones,
    isError,
  } = useQuery({
    queryKey: ["organizaciones"],
    queryFn: getOrganizaciones,
  });
  return (
    <>
      <TableComponent
        title={"Organizaciones"}
        columns={props.columns}
        data={organizaciones}
        isError={isError}
        isLoading={isLoading}
        setOpen={props.setOpen}
      />
    </>
  );
};
