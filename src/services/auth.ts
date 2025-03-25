import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "@env";

export const login = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      senha,
    });

    const token = response.data.token;

    // Armazena o token no AsyncStorage
    await AsyncStorage.setItem("authToken", token);

    return token;
  } catch (error: any) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (email: string, senha: string, login: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      senha,
      login,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro no cadastro:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    console.log("Logout realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Erro ao recuperar o token:", error);
    return null;
  }
};
