import { useMutation, useQueryClient } from "react-query";
import {
  createItem,
  deleteItem,
  updateItem,
} from "../services/ItemService";
import { ErrorDialogo, SuccessDialogo } from "../../dialogos/Dialogos";

export const useItemMutations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      SuccessDialogo("Eliminado", "Item", "eliminado");
    },
    onError: (error) => {
      ErrorDialogo("Error", "Ha ocurrido un error al eliminar")
    },
  });

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      SuccessDialogo("Creado", "Item", "creado");
    },
    onError: (error) => {
      if (error.response.status == 400) {
        ErrorDialogo("Error", error.response.data.message);
      } else {
        ErrorDialogo("Error", error.response.data.message.join(". "));
      }
    },
  });

  const editMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      SuccessDialogo("Editado", "Item", "editado");
    },
    onError: (error) => {
      if (error.response.status == 400) {
        ErrorDialogo("Error", error.response.data.message);
      } else {
        ErrorDialogo("Error", error.response.data.message.join(". "));
      }
    },
  });

  return { deleteMutation, createMutation, editMutation };
};
