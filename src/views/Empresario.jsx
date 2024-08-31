import { ShowEmpresarios } from "../components/users/ShowEmpresarios";
import { columns } from "../components/users/TableEmpresariosColums";
export const Empresario = () => {
  return (
    <>
      <ShowEmpresarios columns={columns} />
    </>
  );
};
