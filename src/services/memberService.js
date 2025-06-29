import axios from 'axios';

const REAL_API_ACTIVE = false;
const API_BASE_URL = 'http://localhost:3001/api';

const mockLoggedInMemberData = {
  id: 101, // ID numérico simulado
  name: "Gabriel de Alencar",
  role: "Desenvolvedor Front-end",
  photo: "https://placehold.co/100x100/purple/white?text=GA", // Foto para Gabriel
};

const mockMemberMetricsDetailsData = {
  uniao: { percent: 72 }, // Adicionado União
  empenho: { percent: 85 },
  foco: { percent: 68 },
  saudeEmocional: { percent: 55 }, // Ajustado para 'Regular'
  comunicacao: { percent: 79 },
};

export const getLoggedInMember = async () => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await axios.get(`${API_BASE_URL}/member/me`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn("Serviço de Membro: API real inacessível. Retornando dados mockados para o membro logado.");
        console.log("Aguardando dados da API para o dashboard do membro - Membro Logado.");
        return mockLoggedInMemberData;
      }
      console.error("Erro inesperado ao buscar dados do membro logado da API real:", error);
      throw error;
    }
  } else {
    console.log("Aguardando dados da API para o dashboard do membro - Membro Logado.");
    return new Promise(resolve => setTimeout(() => resolve(mockLoggedInMemberData), 500));
  }
};

export const getMemberMetricsDetails = async (memberId) => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await axios.get(`${API_BASE_URL}/member/${memberId}/metrics`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn(`Serviço de Membro: API real inacessível ao buscar métricas de ${memberId}. Retornando dados mockados.`);
        console.log("Aguardando dados da API para o dashboard do membro - Métricas.");
        return mockMemberMetricsDetailsData;
      }
      console.error(`Erro inesperado ao buscar detalhes das métricas do membro ${memberId} da API real:`, error);
      throw error;
    }
  } else {
    console.log("Aguardando dados da API para o dashboard do membro - Métricas.");
    return new Promise(resolve => setTimeout(() => resolve(mockMemberMetricsDetailsData), 700));
  }
};