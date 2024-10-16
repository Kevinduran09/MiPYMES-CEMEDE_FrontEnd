import { useMutation, useQueryClient } from 'react-query';
import {login, registerRequest} from "../services/AuthService";
import { SuccessDialogo, EliminarDialogo, ErrorDialogo } from '../../dialogos/Dialogos';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const useAuthMutations = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { setToken } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            queryClient.invalidateQueries("cuestionarios");
            setToken(response.access_token)
            navigate("/");
            SuccessDialogo('Usuario', 'Usuario', 'autenticado');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        onError: (error) => {
            ErrorDialogo("Error", "¡Usuario o contraseña incorrecta!");
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerRequest,
        onSuccess: () => {
            queryClient.invalidateQueries("cuestionarios");
            SuccessDialogo('Usuario', 'Usuario', 'registrado');
            navigate("/login");
        },
        onError: (error) => {
            
        },
    });

    return { loginMutation, registerMutation };
}