import axios from "axios";
import { API_BASE_URL, TOKEN } from "../../../services/Global";

const rubRequest = axios.create({
  baseURL: `${API_BASE_URL}/rubricas`,
});

export const getRubricas = async () => {
  const res = await rubRequest.get("");
  const data = res.data;
  return data;
};

export const createRubrica = (rub) => rubRequest.post("/", rub);

export const updateRubrica = (rub) => rubRequest.patch(`/${rub.id}`, rub);

export const deleteRubrica = (id) => rubRequest.delete(`/${id}`);

export const getRubrica = async (id) => {
  const res = await rubRequest.get(`/${id}`);
  return res.data;
};
