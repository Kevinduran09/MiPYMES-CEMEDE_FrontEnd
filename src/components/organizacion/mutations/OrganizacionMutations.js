import { useQueryClient, useMutation } from "react-query";
import {
  createOrganizacion,
  deleteOrganizacion,
  updateOrganizacion,
} from "../../../services/OrganizacionService";
import { SuccessDialogo } from "../../dialogos/Dialogos";
import { useOrganizacionStore } from "../../../hooks/useOrganizacionStore";
export const OrganizacionMutations = () => {
  const { clear } = useOrganizacionStore();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteOrganizacion,
    onSuccess: () => {
      queryClient.invalidateQueries("organizaciones");
      SuccessDialogo("Eliminado", "Organizacion", "eliminado");
    },
    onError: (error) => {
      console.error("Error deleting Organizacion: ", error);
    },
  });
  const createMutation = useMutation({
    mutationFn: createOrganizacion,
    onSuccess: () => {
      queryClient.invalidateQueries("organizaciones");
      clear();
      SuccessDialogo("Creado", "Organizacion", "creado");
    },
    onError: (error) => {
      console.error("Error creating Organizacion: ", error);
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateOrganizacion,
    onSuccess: () => {
      queryClient.invalidateQueries("organizaciones");
      clear();
      SuccessDialogo("Editado", "Organizacion", "editado");
    },
    onError: (error) => {
      console.error("Error updating Organizacion: ", error);
    },
  });

  return { deleteMutation, createMutation, updateMutation };
};
