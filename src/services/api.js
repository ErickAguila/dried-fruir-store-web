import axios from "axios";
import { configVar } from "../shared/configVar";

const api = axios.create({
  baseURL: configVar.URL_BFF_WEB,
  timeout: 5000, // Tiempo máximo de espera (opcional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores (Opcional: Manejar tokens o errores)
api.interceptors.request.use(
  (config) => {
    // Puedes agregar tokens de autenticación aquí
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la respuesta:", error);
    return Promise.reject(error);
  }
);

export default api;
