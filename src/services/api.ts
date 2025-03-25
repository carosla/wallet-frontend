import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Cria uma instância do Axios
const api = axios.create({
  baseURL: "https://wallet-backend-2rmo.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para recuperar o token do AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Erro ao recuperar o token:", error);
    return null;
  }
};

// Intercepta requisições para adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Buscando o token dinamicamente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
