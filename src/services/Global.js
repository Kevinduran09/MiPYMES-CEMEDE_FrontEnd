// export const API_BASE_URL = 'https://site--ingecicd--w28kvw4pk869.code.run';
export const API_BASE_URL = import.meta.env.VITE_API_URL || "localhost:4000";
const token = JSON.parse(localStorage.getItem("authState"))?.state?.token;
export const TOKEN = token != null ? token : "";

export const getToken = async () => {
  const token = JSON.parse(localStorage.getItem("authState"))?.state?.token;
  return token ? token : "";
};
