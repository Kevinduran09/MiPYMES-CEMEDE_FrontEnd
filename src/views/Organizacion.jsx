import { useState } from "react";
import { ShowOrganizaciones } from "../components/organizacion/ShowOrganizaciones";
import { OrganizationColumns } from "../components/organizacion/TableOrganizacionesColumns";

import { DashboardLayout } from "../components/../layout/DashboardLayout";
export const Organizacion = () => {
  const { columns } = OrganizationColumns();
  return (
    <>
      <DashboardLayout
        title={"Organizaciones"}
        component={<ShowOrganizaciones columns={columns} />}
      ></DashboardLayout>
    </>
  );
};
