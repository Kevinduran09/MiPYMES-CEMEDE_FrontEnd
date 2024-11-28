import React from "react";
import { useEmpStore } from "../store/useEmpStore";
import { EmpresarioMutations } from "../mutations/EmpresarioMutations";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
import { useNavigate } from "react-router-dom";

export const useEmpresarioActions = () => {
  const navigate = useNavigate();
  const { setEmpresario } = useEmpStore();
  const { createMutation, updateMutation, deleteMutation } =
    EmpresarioMutations();

  const createEmpresario = (emp) => {
    const empEdit = emp;
    delete empEdit["organizaciones"];
    const OnSucces = () => {
      setEmpresario(empEdit);
      navigate(-1);
    };
    ConfirmarDialogo(createMutation, empEdit, OnSucces);
  };

  const deleteEmpresario = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };

  const updateEmpresario = (emp) => {
    const empEdit = emp;
    delete empEdit["organizaciones"];
    const OnSucces = () => {
      setEmpresario(empEdit);
      navigate(-1);
    };
    ConfirmarDialogo(updateMutation, empEdit, OnSucces);
  };

  const handleEditClick = (emp) => {
    setEmpresario(emp);
    navigate(`/empresarios/editar/${emp.id}`);
  };

  return {
    createEmpresario,
    updateEmpresario,
    deleteEmpresario,
    handleEditClick,
  };
};
