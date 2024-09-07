import React from "react";
import { useEmpStore } from "../../../hooks/useEmpStore";
import { EmpresarioMutations } from "../mutations/EmpresarioMutations";
import { ConfirmarDialogo } from "../../dialogos/Dialogos";
export const useEmpresarioActions = () => {
  const { setEmpresario } = useEmpStore();
  const { createMutation, updateMutation, deleteMutation } =
    EmpresarioMutations();
  const createEmplesario = (emp) => {
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
  };
  return {
    createEmplesario,
    updateEmpresario,
    deleteEmpresario,
    handleEditClick,
  };
};
