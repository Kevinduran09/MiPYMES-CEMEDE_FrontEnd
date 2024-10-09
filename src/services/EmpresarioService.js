import axios from "axios";
import { API_BASE_URL, getToken } from "./Global";

const empRequest = axios.create({
  baseURL: `${API_BASE_URL}/empresarios`,
});

empRequest.interceptors.request.use(
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

export const getEmpresarios = async () => {
  const res = await empRequest.get("");
  const data = res.data;
  return data;
};

export const createEmpresario = (emp) => empRequest.post("/", emp);

export const updateEmpresario = (emp) => empRequest.patch(`/${emp.id}`, emp);

export const deleteEmpresario = (id) => empRequest.delete(`/${id}`);

export const getEmpresario = async (id) => {
  const res = await empRequest.get(`/${id}`);
  return res.data;
};
