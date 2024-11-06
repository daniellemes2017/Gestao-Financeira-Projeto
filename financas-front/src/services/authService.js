// src/services/authService.js
import authApi from "./authApi";


export const login = async (email, senha) => {
  try {
    const response = await authApi.post("/auth/login", {
      email,
      senha,
    });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {

    throw new Error("Falha no login. Verifique suas credenciais.");
  }
};


export const register = async ({ nome, email, senha }) => {
  try {
    const response = await authApi.post("/auth/register", {
      nome,
      email,
      senha,
    });
    return response.data;
  } catch (error) {

    throw new Error("Erro ao registrar usuário. Por favor, tente novamente.");
  }
};

export async function getUsuario() {
  return authApi.get("/auth/usuario");
}
