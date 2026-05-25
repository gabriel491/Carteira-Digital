import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", 
});


// Interceptador para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@Finance:token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default api;