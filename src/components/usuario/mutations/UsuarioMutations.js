import { useQueryClient, useMutation } from "react-query";
import {
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "../services/usuarioServices";
import { SuccessDialogo, ErrorDialogo } from "../../dialogos/Dialogos";
import { useUsuarioStore } from "../store/useUsuarioStore";

export const UsuarioMutations = () => {
  const { clear } = useUsuarioStore(); // Limpia el estado de usuario
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios");
      SuccessDialogo("Eliminado", "Usuario", "eliminado");
    },
    onError: (error) => {
      console.error("Error deleting Usuario: ", error);
    },
  });

  const createMutation = useMutation({
    mutationFn: createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios");
      clear();
      SuccessDialogo("Creado", "Usuario", "creado");
    },
    onError: (error) => {
      if (error.response.status == 400) {
        ErrorDialogo("Error", error.response.data.message);
      }else{
        ErrorDialogo("Error", error.response.data.message.join(". "));
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios");
      clear();
      SuccessDialogo("Editado", "Usuario", "editado");
    },
    onError: (error) => {
      console.error("Error updating Usuario: ", error);
    },
  });

  return { deleteMutation, createMutation, updateMutation };
};
