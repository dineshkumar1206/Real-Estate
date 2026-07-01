import axios from "axios";

const isLocal = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const api = axios.create({
  baseURL: isLocal 
    ? "http://localhost:5175/connectyou-api/api" 
    : "https://amigowebster.in/connectyou-api/api",
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