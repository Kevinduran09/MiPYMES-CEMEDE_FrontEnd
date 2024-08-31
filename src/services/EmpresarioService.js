import axios from "axios";
import { API_BASE_URL, TOKEN } from "./Global";

const userRequest = axios.create({
  baseURL: `${API_BASE_URL}/empresarios`,
});

export const getEmpresarios = async () => {
  const res = await userRequest.get("");
  const data = res.data;
  return data;
};

export const createEmpresario = (emp) => userRequest.post("/", emp);

export const updateEmpresario = (emp) => userRequest.patch(`/${emp.id}`, emp);

export const deleteEmpresario = (id) => userRequest.delete(`/${id}`);

export const getEmpresario = async (id) => {
  const res = await userRequest.get(`/${id}`);
  return res.data;
};
