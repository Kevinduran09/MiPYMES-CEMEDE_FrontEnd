import { useQueryClient, useMutation } from "react-query";
import {
  createEmpresario,
  deleteEmpresario,
  updateEmpresario,
} from "../../../services/EmpresarioService";
import { SuccessDialogo } from "../../dialogos/Dialogos";
import { useEmpStore } from "../../../hooks/useEmpStore";

export const EmpresarioMutations = () => {
  const { clear } = useEmpStore();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteEmpresario,
    onSuccess: () => {
      queryClient.invalidateQueries("empresarios");
      SuccessDialogo("Eliminado", "Empresario", "eliminado");
    },
    onError: (error) => {
      console.error("Error deleting Empresario: ", error);
    },
  });
  const createMutation = useMutation({
    mutationFn: createEmpresario,
    onSuccess: () => {
      queryClient.invalidateQueries("empresarios");
      clear();
      SuccessDialogo("Creado", "Empresario", "creado");
    },
    onError: (error) => {
      console.error("Error creating Empresario: ", error);
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateEmpresario,
    onSuccess: () => {
      queryClient.invalidateQueries("empresarios");
      clear();
      SuccessDialogo("Editado", "Empresario", "editado");
    },
    onError: (error) => {
      console.error("Error updating Empresario: ", error);
    },
  });

  return { deleteMutation, createMutation, updateMutation };
};
