// src/services/feedbackService.js

/**
 * @file Serviço para gerenciamento de feedbacks.
 * @description
 * Este arquivo contém funções para interagir com a API de feedbacks.
 * Ele permite adicionar novos feedbacks, recuperar feedbacks enviados para membros específicos
 * e marcar feedbacks como lidos.
 *
 * **Perfis de Usuário Relevantes:**
 * - **Líder (Leader):** Principalmente para *enviar* feedbacks a membros da equipe (`addFeedback`)
 * e para *visualizar* o histórico de feedbacks da equipe (`getFeedbacksForMember`).
 * - **Membro (Member):** Principalmente para *receber* e *visualizar* seus próprios feedbacks
 * (`getFeedbacksForMember`) e *marcar* como lido (`markFeedbackAsRead`).
 * - **Recursos Humanos (HR):** Pode *visualizar* feedbacks para acompanhamento e gestão
 * de desempenho (`getFeedbacksForMember`).
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const addFeedback = async (newFeedback) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedbacks`, newFeedback);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.warn("Aguardando dados de feedback (POST): Backend (API de feedback) não está respondendo. Simulando sucesso.");
      // Simula sucesso no envio de feedback
      return { ...newFeedback, id: `mock-${Date.now()}` };
    }
    console.error("Erro ao adicionar feedback:", error);
    throw error;
  }
};

export const getFeedbacksForMember = async (memberId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/members/${memberId}/feedbacks`);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.warn(`Aguardando feedbacks para o membro ${memberId}: Backend (API de feedbacks) não está respondendo. Retornando dados mockados.`);
      // Retorna feedbacks mockados para o membro (ex: alguns feedbacks fictícios)
      return [
        {
          id: 1,
          from: "Líder Alpha",
          to: "Membro Teste",
          subject: "Ótimo trabalho no projeto X!",
          message: "Seu empenho e foco foram cruciais para o sucesso.",
          date: "2025-06-20T10:00:00Z",
          read: false,
        },
        {
          id: 2,
          from: "Líder Beta",
          to: "Membro Teste",
          subject: "Sugestão de melhoria",
          message: "Poderíamos melhorar a comunicação em reuniões de equipe.",
          date: "2025-06-18T15:30:00Z",
          read: true,
        },
      ];
    }
    console.error(`Erro ao buscar feedbacks para o membro ${memberId}:`, error);
    throw error;
  }
};

export const markFeedbackAsRead = async (feedbackId) => {
  try {
    await axios.patch(`${API_BASE_URL}/feedbacks/${feedbackId}/read`);
    return true;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      console.warn(`Aguardando marcação de feedback ${feedbackId} como lido: Backend não está respondendo. Simulando sucesso.`);
      return true; // Simula sucesso
    }
    console.error(`Erro ao marcar feedback ${feedbackId} como lido:`, error);
    throw error;
  }
};