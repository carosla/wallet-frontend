import axios from 'axios';
import api from './api';

// Função de cadastro
export const registerUser = async (data: { login: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`https://wallet-backend-2rmo.onrender.com/api/auth/register`, data);
        return response.data; // Pode retornar a resposta que você precisa, como um token, ou mensagem de sucesso
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Erro ao cadastrar usuário');
    }
};

// Função de login
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${api}/api/auth/login`, { email, password });
        return response.data; // Retorna o token ou dados de autenticação
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Erro ao realizar login');
    }
};
