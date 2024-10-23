import React from "react";
import { useOrganizacionStore } from "../../../hooks/useOrganizacionStore";
import { OrganizacionMutations } from "../mutations/OrganizacionMutations";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useNavigate } from "react-router-dom";
export const useOrganizacionActions = () => {
  const navigate = useNavigate();
  const { setOrganizacion } = useOrganizacionStore();

  const { createMutation, updateMutation, deleteMutation } =
    OrganizacionMutations();

  const createOrganizacion = (org) => {
    const orgEdit = org;
    const OnSucces = () => {
      setOrganizacion(org);
      navigate(-1);
    };
    ConfirmarDialogo(createMutation, orgEdit, OnSucces);
  };

  const deleteOrganizacion = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };

  const updateOrganizacion = (org) => {
    const orgEdit = org;
    const OnSucces = () => {
      setOrganizacion(org);
      navigate(-1);
    };
    ConfirmarDialogo(updateMutation, orgEdit, OnSucces);
  };

  const handleEditClick = (org) => {
    setOrganizacion(org);
    navigate(`/organizaciones/editar/${org.id}`);
  };

  return {
    createOrganizacion,
    updateOrganizacion,
    deleteOrganizacion,
    handleEditClick,
  };
};
