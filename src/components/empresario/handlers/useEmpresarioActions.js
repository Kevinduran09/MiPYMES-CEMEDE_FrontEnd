import React from "react";
import { useEmpStore } from "../../../hooks/useEmpStore";
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
    ConfirmarDialogo(createMutation, empEdit);
  };
  const deleteEmpresario = (id) => {
    ConfirmarDialogo(deleteMutation, id);
  };
  const updateEmpresario = (emp) => {
    const empEdit = emp;
    delete empEdit["organizaciones"];
    ConfirmarDialogo(updateMutation, empEdit);
  };
  const handleEditClick = (emp) => {
    setEmpresario(emp);
    navigate("/Empresario-Form");
  };
  return {
    createEmpresario,
    updateEmpresario,
    deleteEmpresario,
    handleEditClick,
  };
};
