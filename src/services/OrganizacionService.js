import axios from "axios";
import { API_BASE_URL, TOKEN } from "./Global";

const orgRequest = axios.create({
  baseURL: `${API_BASE_URL}/organizacion`,
});

export const getOrganizaciones = async () => {
  const res = await orgRequest.get("");
  const data = res.data;
  return data;
};

export const createOrganizacion = (org) => orgRequest.post("/", org);

export const updateOrganizacion = (org) => orgRequest.patch(`/${org.id}`, org);

export const deleteOrganizacion = (id) => orgRequest.delete(`/${id}`);

export const getOrganizacion = async (id) => {
  const res = await orgRequest.get(`/${id}`);
  return res.data;
};
