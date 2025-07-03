import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Ajuste aqui para o backend real quando estiver disponível

const checkService = {
  // Testa se o backend está online
  async ping() {
    return axios.get(`${API_URL}/ping`);
  },

  // Buscar dados do usuário logado
  async getUser() {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },

  // Buscar todas as mensagens
  async getMessages() {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  },

  // Enviar uma nova mensagem
  async sendMessage(message) {
    const response = await axios.post(`${API_URL}/messages`, message);
    return response.data;
  },

  // Buscar humor atual do usuário
  async getCurrentMood() {
    const response = await axios.get(`${API_URL}/mood`);
    return response.data;
  },

  // Enviar humor atual
  async setMood(moodLabel) {
    const response = await axios.post(`${API_URL}/mood`, {
      mood: moodLabel,
      selectedAt: new Date().toISOString(),
    });
    return response.data;
  },
};

export default checkService;