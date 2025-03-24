// src/services/storageService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para salvar um item no armazenamento local
export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Erro ao salvar item:", e);
  }
};

// Função para recuperar um item do armazenamento local
export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("Erro ao recuperar item:", e);
  }
};

// Função para remover um item do armazenamento local
export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Erro ao remover item:", e);
  }
};

// Função para limpar todo o armazenamento (opcional)
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Erro ao limpar armazenamento:", e);
  }
};
