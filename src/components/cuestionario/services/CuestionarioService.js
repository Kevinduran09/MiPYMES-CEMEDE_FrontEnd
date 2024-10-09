import axios from "axios";
import { API_BASE_URL, getToken } from "../../../services/Global";

const cuestionarioRequest = axios.create({
  baseURL: `${API_BASE_URL}/cuestionarios`,
});

cuestionarioRequest.interceptors.request.use(
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

export const getCuestionarios = async () => {
  const res = await cuestionarioRequest.get("");
  const data = res.data;
  return data;
};

export const getCuestionarioOrganizacion = async (id) => {
  const res = await cuestionarioRequest.get(`/organizacion/${id}`);
  const data = res.data;
  return data;
};

export const getCuestionarioItem = async (id) => {
  const res = await cuestionarioRequest.get(`/items/${id}`);
  const data = res.data;
  return data;
};

export const getCuestionariosAplicados = async () => {
  const res = await cuestionarioRequest.get("/organizacion/");
  const data = res.data;
  return data;
};

export const createCuestionario = (cue) => cuestionarioRequest.post("/", cue);

export const createCuestionarioOrganizacion = (cue) =>
  cuestionarioRequest.post("/organizacion", cue);

export const createCuestionarioItem = (cue) =>
  cuestionarioRequest.post("/item", cue);

export const updateCuestionario = (cue) =>
  cuestionarioRequest.patch(`/${cue.id}`, cue);

export const deleteCuestionario = (id) => cuestionarioRequest.delete(`/${id}`);

export const getCuestionario = async (id) => {
  const res = await cuestionarioRequest.get(`/${id}`);
  return res.data;
};
