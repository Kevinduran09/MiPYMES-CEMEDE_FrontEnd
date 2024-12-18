import React from "react";
import { useOrganizacionStore } from "../store/useOrganizacionStore";
import { OrganizacionMutations } from "../mutations/OrganizacionMutations";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useNavigate } from "react-router-dom";
import { getOrganizacion } from "../services/OrganizacionService";
export const useOrganizacionActions = () => {
  const navigate = useNavigate();
  const { setOrganizacion } = useOrganizacionStore();

  const { createMutation, updateMutation, deleteMutation,asociarEmpresariosMutation,deleteEmpresaAsociacionMutation } =
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
  const AsignarEmpresario = async (org) => {
    const organizacion = await getOrganizacion(org.id)
    setOrganizacion(organizacion)
    navigate(`/organizaciones/asignar/empresarios/${org.id}`);
  };
  const asociarEmpresarios = (data)=>{
    const OnSucces = async () => {
      navigate(-1);
    }
    ConfirmarDialogo(asociarEmpresariosMutation, data, OnSucces)
  }
  const eliminarEmpresario = (idOrganizacion, idEmpresario)=>{
    const OnSucces = async ()=>{
      const organizacion = await getOrganizacion(idOrganizacion)
      
      setOrganizacion(organizacion)
    }
    
    ConfirmarDialogo(deleteEmpresaAsociacionMutation, { idOrga: idOrganizacion, idEmp: idEmpresario }, OnSucces)
  }
  return {
    createOrganizacion,
    updateOrganizacion,
    deleteOrganizacion,
    handleEditClick,
    AsignarEmpresario,
    eliminarEmpresario,
    asociarEmpresarios
  };
};
