import { useState } from "react";
import { ShowOrganizaciones } from "../components/organizacion/ShowOrganizaciones";
import { OrganizationColumns } from "../components/organizacion/TableOrganizacionesColumns";
import { ModalOrganizacion } from "../components/organizacion/ModalOrganizacion";
export const Organizacion = () => {
  const [open, setOpen] = useState(false);
  const { columns } = OrganizationColumns(setOpen);
  return (
    <>
      <ShowOrganizaciones columns={columns} setOpen={setOpen} />
      <ModalOrganizacion open={open} setOpen={setOpen} />
    </>
  );
};
