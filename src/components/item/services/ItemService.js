import axios from "axios";
import { API_BASE_URL, getToken } from "../../../services/Global";

const itemRequest = axios.create({
  baseURL: `${API_BASE_URL}/item`,
});

itemRequest.interceptors.request.use(
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

export const getItems = async () => {
  const res = await itemRequest.get("");
  const data = res.data;
  return data;
};

export const createItem = (item) => itemRequest.post("/", item);

export const updateItem = (item) => itemRequest.patch(`/${item.id}`, item);

export const deleteItem = (id) => itemRequest.delete(`/${id}`);

export const getItem = async (id) => {
  const res = await itemRequest.get(`/${id}`);
  return res.data;
};
