import axios from "axios";
import { API_BASE_URL, TOKEN } from "./Global";

const userRequest = axios.create({
  baseURL: `${API_BASE_URL}/api/usuasrio`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getUsers = async () => {
  const res = await userRequest.get("/");
  const data = res.data;
  const parsedData = data.map((item) => JSON.parse(item));
  return parsedData;
};

export const createUser = (user) => userRequest.post("/", user);

export const updateUser = (user) => userRequest.put("/", user);

export const deleteUser = (username) => userRequest.delete(`/${username}`);

export const getUser = async (id) => {
  const res = await userRequest.get(`/${id}`);
  return res.data;
};
