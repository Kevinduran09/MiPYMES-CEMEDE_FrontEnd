import axios from "axios";
import { API_BASE_URL, getToken } from "../../../services/Global";

const orgRequest = axios.create({
  baseURL: `${API_BASE_URL}/organizacion`,
});

orgRequest.interceptors.request.use(
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

export const asociarEmpresarios =  ({ idOrganizacion, empresariosIds }) => {
  orgRequest.post(`/${idOrganizacion}/empresarios`, {
    empresariosIds,
  });
};

export const deleteOrganizacionEmpresario = ({ idOrga, idEmp }) => orgRequest.delete(`/${idOrga}/empresarios/${idEmp}`)