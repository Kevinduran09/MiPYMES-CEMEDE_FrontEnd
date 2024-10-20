import { ShowEmpresarios } from "../components/empresario/ShowEmpresarios";
import { TableEmpresariosColums } from "../components/empresario/TableEmpresariosColums";
import { Container } from "react-bootstrap";

export const Empresario = () => {
  const { columns } = TableEmpresariosColums();
  return (
    <Container>
      <ShowEmpresarios columns={columns} />
    </Container>
  );
};
