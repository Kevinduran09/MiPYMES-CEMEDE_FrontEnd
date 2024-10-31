import { ShowOrganizaciones } from "../components/organizacion/ShowOrganizaciones";
import { OrganizationColumns } from "../components/organizacion/TableOrganizacionesColumns";
import { Container } from "react-bootstrap";

export const Organizacion = () => {
  const { columns } = OrganizationColumns();
  return (
    <Container>
      <ShowOrganizaciones columns={columns} />
    </Container>
  );
};
