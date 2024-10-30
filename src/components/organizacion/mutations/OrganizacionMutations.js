import { useQueryClient, useMutation, useQuery } from "react-query";
import {
  createOrganizacion,
  deleteOrganizacion,
  updateOrganizacion,
  asociarEmpresarios,
  deleteOrganizacionEmpresario,
  getOrganizacion
} from "../../../services/OrganizacionService";
import { SuccessDialogo } from "../../dialogos/Dialogos";
import { useOrganizacionStore } from "../../../hooks/useOrganizacionStore";
import { useNavigate } from "react-router-dom";
export const OrganizacionMutations = () => {
  const { clear } = useOrganizacionStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate()
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

  const asociarEmpresariosMutation = useMutation({
    mutationFn: asociarEmpresarios,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizaciones",'organizacion']);
  
      SuccessDialogo("Asignacion", "Asignacion", "Realizada");
    },
    onError: (error) => {
      console.error("Error : ", error);
    },
  });

  const deleteEmpresaAsociacionMutation = useMutation({
    mutationFn: deleteOrganizacionEmpresario,
    onSuccess: () => {
      queryClient.invalidateQueries("organizaciones");
    },
    onError: (error) => {
      console.error("Error deleting: ", error);
    },
  });


  return {
    deleteMutation,
    createMutation,
    updateMutation,
    asociarEmpresariosMutation,
    deleteEmpresaAsociacionMutation,
  };
};
