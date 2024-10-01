import { useMutation, useQueryClient } from "react-query";
import {
  createItem,
  deleteItem,
  updateItem,
} from "../services/ItemService";
import { SuccessDialogo } from "../../dialogos/Dialogos";

export const useItemMutations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      SuccessDialogo("Eliminado", "Item", "eliminado");
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      SuccessDialogo("Creado", "Item", "creado");
    },
    onError: (error) => {
      console.error("Error creating item:", error);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      SuccessDialogo("Editado", "Item", "editado");
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  return { deleteMutation, createMutation, editMutation };
};
