import { ShowEmpresarios } from "../components/empresario/ShowEmpresarios";
import { TableEmpresariosColums } from "../components/empresario/TableEmpresariosColums";
import { useState } from "react";
import { ModalEmpresario } from "../components/empresario/ModalEmpresario";
export const Empresario = () => {
  const [open, setOpen] = useState(false);
  const { columns } = TableEmpresariosColums(setOpen);
  return (
    <>
      <ShowEmpresarios columns={columns} setOpen={setOpen} />
      <ModalEmpresario open={open} setOpen={setOpen} />
    </>
  );
};
