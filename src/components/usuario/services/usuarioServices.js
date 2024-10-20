import axios from "axios";
import { API_BASE_URL, getToken } from "../../../services/Global";

const usuarioRequest = axios.create({
  baseURL: `${API_BASE_URL}/usuario`,
});

usuarioRequest.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUsuarios = async () => {
  const res = await usuarioRequest.get("");
  const data = res.data;
  return data;
};

export const getUsuario = async (id) => {
  const res = await usuarioRequest.get(`/${id}`);
  return res.data;
};

export const createUsuario = async (usuario) => {
  try {
    await usuarioRequest.post("/", usuario);
  } catch (error) {
    throw error;
  }
};

export const updateUsuario = (usuario) =>
  usuarioRequest.patch(`/${usuario.id}`, usuario);

export const deleteUsuario = (id) => usuarioRequest.delete(`/${id}`);
