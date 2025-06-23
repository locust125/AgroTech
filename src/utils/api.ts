import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// Agregar token automáticamente en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
