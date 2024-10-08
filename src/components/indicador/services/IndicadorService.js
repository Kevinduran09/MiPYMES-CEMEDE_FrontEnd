import axios from "axios";
import { API_BASE_URL, TOKEN } from "../../../services/Global";

const indicadorRequest = axios.create({
  baseURL: `${API_BASE_URL}/indicador`,
});

export const getIndicadores = async () => {
  const res = await indicadorRequest.get("");
  const data = res.data;
  return data;
};
export const getIndicadoresRelationItems = async () => {
  const res = await indicadorRequest.get("/items");
  const data = res.data;
  return data;
};
export const createIndicador = (indicador) =>
  indicadorRequest.post("/", indicador);

export const updateIndicador = (indicador) =>
  indicadorRequest.patch(`/${indicador.id}`, indicador);

export const deleteIndicador = (id) => indicadorRequest.delete(`/${id}`);

export const getIndicador = async (id) => {
  const res = await indicadorRequest.get(`/${id}`);
  return res.data;
};
