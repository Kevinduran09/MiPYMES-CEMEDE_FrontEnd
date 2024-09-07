import React from "react";
import { useOrganizacionStore } from "../../../hooks/useOrganizacionStore";
import { OrganizacionMutations } from "../mutations/OrganizacionMutations";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
export const useOrganizacionActions = () => {
  const { setOrganizacion } = useOrganizacionStore();

  const { createMutation, updateMutation, deleteMutation } =
    OrganizacionMutations();

  const createOrganizacion = (org) => {
    const orgEdit = org;

    ConfirmarDialogo(createMutation, orgEdit);
  };

  const deleteOrganizacion = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };

  const updateOrganizacion = (org) => {
    const orgEdit = org;
    ConfirmarDialogo(updateMutation, orgEdit);
  };

  const handleEditClick = (org) => {
    setOrganizacion(org);
  };

  return {
    createOrganizacion,
    updateOrganizacion,
    deleteOrganizacion,
    handleEditClick,
  };
};
