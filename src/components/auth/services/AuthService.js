//AuthService.js

import axios from "axios";
import { API_BASE_URL } from "../../../services/Global";
import { useAuthStore } from "../store/useAuthStore";

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
});

export const login = async (user) => {
  const res = await authAPI.post("/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res.data);

  return res.data;
};

export const registerRequest = async (user) => {
  const res = await authAPI.post("/register", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const currentActive = async () => {
  try {
    const token = useAuthStore.getState().token;
    const res = await authAPI.get("/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
