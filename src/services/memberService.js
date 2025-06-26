// src/services/memberService.js

/**
 * @file Serviço para gerenciamento de dados de membros.
 * @description
 * Este arquivo contém funções para interagir com a API referente aos dados de membros individuais.
 * Ele permite obter informações do membro atualmente logado e buscar detalhes das métricas
 * de desempenho e clima organizacional de um membro específico.
 *
 * **Perfis de Usuário Relevantes:**
 * - **Membro (Member):** Este serviço é primariamente destinado ao perfil de Membro,
 * permitindo que ele acesse seus próprios dados de perfil (`getLoggedInMember`)
 * e suas métricas individuais de desempenho e bem-estar (`getMemberMetricsDetails`).
 */

/**
 * Busca os dados do membro atualmente logado na API.
 * Se a API estiver inacessível (erro de rede), retorna dados mockados e loga um aviso.
 *
 * @returns {Promise<object>} Um objeto contendo os dados do membro logado (id, nome, email, avatar).
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getLoggedInMember = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/member/me`);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.warn("Aguardando dados do membro: Backend (API de membro) não está respondendo. Retornando dados mockados.");
      // Retorna dados mockados para o membro logado
      return {
        id: "mockMemberId123", // Use um ID fictício para testes
        name: "Membro Teste",
        email: "membro.teste@empresa.com",
        avatar: "/src/pages/Dashboard/assets/tom.png", // Imagem de fallback
      };
    }
    console.error("Erro ao buscar dados do membro logado:", error);
    throw error; // Propage outros tipos de erro
  }
};

export const getMemberMetricsDetails = async (memberId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/member/${memberId}/metrics`);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.warn(`Aguardando dados das métricas do membro ${memberId}: Backend (API de métricas) não está respondendo. Retornando dados mockados.`);
      // Retorna dados mockados para as métricas do membro
      return {
        uniao: { percent: 75, trend: "+5pp" },
        empenho: { percent: 80, trend: "-2pp" },
        comunicacao: { percent: 90, trend: "---" },
        foco: { percent: 60, trend: "+10pp" },
        saudeEmocional: { percent: 70, trend: "+3pp" },
        // Dados de clima detalhados
        climate: [
            { name: "Ótimo", percent: 30 },
            { name: "Bem", percent: 40 },
            { name: "Cansado", percent: 20 },
            { name: "Estressado", percent: 10 },
        ],
      };
    }
    console.error(`Erro ao buscar detalhes das métricas do membro ${memberId}:`, error);
    throw error;
  }
};