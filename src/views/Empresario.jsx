import { ShowEmpresarios } from "../components/empresario/ShowEmpresarios";
import { TableEmpresariosColums } from "../components/empresario/TableEmpresariosColums";
import { useState } from "react";
import { ModalEmpresario } from "../components/empresario/ModalEmpresario";
import { DashboardLayout } from "../layout/DashboardLayout";
export const Empresario = () => {
  const { columns } = TableEmpresariosColums();
  return (
    <>
      <DashboardLayout
        title={"Empresarios"}
        component={<ShowEmpresarios columns={columns} />}
      />
    </>
  );
};
