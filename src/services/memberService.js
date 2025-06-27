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

import axios from 'axios';

const REAL_API_ACTIVE = false;
const API_BASE_URL = 'http://localhost:3001/api';

export const getLoggedInMember = async () => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await axios.get(`${API_BASE_URL}/member/me`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn("Serviço de Membro: API real inacessível. Retornando dados mockados para o membro logado.");
        return {
          id: "mockMemberId123",
          name: "Membro Teste",
          email: "membro.teste@empresa.com",
          avatar: "https://placehold.co/150x150/800080/FFFFFF?text=MT",
        };
      }
      console.error("Erro inesperado ao buscar dados do membro logado da API real:", error);
      throw error;
    }
  } else {
    console.warn("Serviço de Membro: REAL_API_ACTIVE é false. Retornando dados mockados para o membro logado.");
    return {
      id: "mockMemberId123",
      name: "Membro Teste",
      email: "membro.teste@empresa.com",
      avatar: "https://placehold.co/150x150/800080/FFFFFF?text=MT",
    };
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
        return {
          uniao: { percent: 75, trend: "+5pp" },
          empenho: { percent: 80, trend: "-2pp" },
          comunicacao: { percent: 90, trend: "---" },
          foco: { percent: 60, trend: "+10pp" },
          saudeEmocional: { percent: 70, trend: "+3pp" },
          climate: [
              { name: "Ótimo", percent: 30 },
              { name: "Bem", percent: 40 },
              { name: "Cansado", percent: 20 },
              { name: "Estressado", percent: 10 },
          ],
        };
      }
      console.error(`Erro inesperado ao buscar detalhes das métricas do membro ${memberId} da API real:`, error);
      throw error;
    }
  } else {
    console.warn(`Serviço de Membro: REAL_API_ACTIVE é false. Retornando dados mockados para as métricas de ${memberId}.`);
    return {
      uniao: { percent: 75, trend: "+5pp" },
      empenho: { percent: 80, trend: "-2pp" },
      comunicacao: { percent: 90, trend: "---" },
      foco: { percent: 60, trend: "+10pp" },
      saudeEmocional: { percent: 70, trend: "+3pp" },
      climate: [
          { name: "Ótimo", percent: 30 },
          { name: "Bem", percent: 40 },
          { name: "Cansado", percent: 20 },
          { name: "Estressado", percent: 10 },
      ],
    };
  }
};
