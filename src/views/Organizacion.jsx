import React from "react";
import { ShowOrganizaciones } from "../components/organizacion/ShowOrganizaciones";
import { organizationColumns } from "../components/organizacion/TableOrganizacionesColumns";
export const Organizacion = () => {
  return (
    <>
      <ShowOrganizaciones columns={organizationColumns} />
    </>
  );
};
