import { ShowUsuarios } from "../components/usuario/ShowUsuarios";
import { UsuarioColumns } from "../components/usuario/UsuarioColumns";
import { useState } from "react";
import { ModalEmpresario } from "../components/empresario/ModalEmpresario";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Container } from "react-bootstrap";

export const Usuario = () => {
  const { columns } = UsuarioColumns();
  return (
    <Container>
      <ShowUsuarios columns={columns} />
    </Container>
  );
};
