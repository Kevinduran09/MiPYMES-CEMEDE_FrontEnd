// export const API_BASE_URL = 'https://site--ingecicd--w28kvw4pk869.code.run';
export const API_BASE_URL = "http://localhost:8000";
const token = JSON.parse(localStorage.getItem("authState"))?.state?.token;
export const TOKEN = token != null ? token : "";
