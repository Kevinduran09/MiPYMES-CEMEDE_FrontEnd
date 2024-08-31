import axios from 'axios';
import { API_BASE_URL, TOKEN } from './Global';

const authAPI = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`
});

export const loginRequest = async (user) => {
  const res = await authAPI.post('/login', user, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return res.data;
}

export const registerRequest = async (user) => {
  const res = await authAPI.post('/register', user, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return res.data;
}

export const currentActive = async () => { 
  try {
      const res = await authAPI.get('/current', {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      return res.data;
    } catch (error) {
      return error.response;
    }
}