import axios from "axios";
import { API_BASE_URL, TOKEN } from "./Global";

const orgRequest = axios.create({
  baseURL: `${API_BASE_URL}/organizacion`,
});

export const getorganizaciones = async () => {
  const res = await orgRequest.get("");
  const data = res.data;
  return data;
};

export const createorganizacion = (org) => orgRequest.post("/", org);

export const updateorganizacion = (org) => orgRequest.patch(`/${org.id}`, org);

export const deleteorganizacion = (id) => orgRequest.delete(`/${id}`);

export const getorganizacion = async (id) => {
  const res = await orgRequest.get(`/${id}`);
  return res.data;
};
