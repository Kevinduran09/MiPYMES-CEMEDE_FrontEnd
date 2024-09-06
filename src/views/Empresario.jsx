import { ShowEmpresarios } from "../components/empresario/ShowEmpresarios";
import { columns } from "../components/empresario/TableEmpresariosColums";
export const Empresario = () => {
  return (
    <>
      <ShowEmpresarios columns={columns} />
    </>
  );
};
