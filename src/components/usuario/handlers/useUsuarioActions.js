import React from "react";
import { useUsuarioStore } from "../store/useUsuarioStore"; // Asegúrate de importar el store de usuario
import { UsuarioMutations } from "../mutations/UsuarioMutations";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useNavigate } from "react-router-dom";

export const useUsuarioActions = () => {
  const navigate = useNavigate();
  const { setUsuario } = useUsuarioStore();
  const { createMutation, updateMutation, deleteMutation } = UsuarioMutations();

  const createUsuario = (user) => {
    const usuario = user;
    const OnSucces = () => {
      setUsuario(usuario);
      navigate(-1);
    };
    ConfirmarDialogo(createMutation, usuario, OnSucces);
  };

  const deleteUsuario = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };

  const updateUsuario = (user) => {
    const OnSucces = () => {
      setOrganizacion(org);
      navigate(-1);
    };
    ConfirmarDialogo(updateMutation, user, OnSucces);
  };

  const handleEditClick = (user) => {
    setUsuario(user);
    navigate(`/usuarios/editar/${user.id}`);
  };

  return {
    createUsuario,
    updateUsuario,
    deleteUsuario,
    handleEditClick,
  };
};
