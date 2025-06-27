import axios from "axios";

const API_BASE = "http://localhost:8080/usuarios";

// 🔹 CRIAR USUÁRIO (CADASTRO)
export const criarUsuario = (usuarioData) =>
  axios.post(`${API_BASE}/criar`, usuarioData);

// 🔹 LOGIN DE USUÁRIO
export const loginUsuario = (credenciais) =>
  axios.post(`${API_BASE}/login`, credenciais);

// 🔹 BUSCAR USUÁRIO POR EMAIL
export const buscarUsuarioPorEmail = (email) =>
  axios.post(`${API_BASE}/buscar`, { email });

// 🔹 ATUALIZAR USUÁRIO
export const atualizarUsuario = (id, atualizacoes) =>
  axios.put(`${API_BASE}/${id}`, atualizacoes);

// 🔹 DELETAR USUÁRIO
export const deletarUsuario = (id) =>
  axios.delete(`${API_BASE}/${id}`);

const userService = {
  criarUsuario,
  loginUsuario,
  buscarUsuarioPorEmail,
  atualizarUsuario,
  deletarUsuario,
};

export default userService;