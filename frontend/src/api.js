import axios from "axios";

const api = axios.create({
  // baseURL: `http://localhost:5175/api`,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: `https://amigowebster.in/connectyou-api/`,
  withCredentials: true, // Crucial for receiving cookies from backend
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("RealEstate_admin");
    }
    return Promise.reject(error);
  }
);

export default api;