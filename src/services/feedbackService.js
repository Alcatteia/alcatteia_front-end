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

const REAL_API_ACTIVE = false;
const API_BASE_URL = 'http://localhost:3001/api';

export const addFeedback = async (newFeedback) => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await axios.post(`${API_BASE_URL}/feedbacks`, newFeedback);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn("Serviço de Feedback: API real inacessível ao adicionar. Simulando sucesso.");
        return { ...newFeedback, id: `mock-${Date.now()}` };
      }
      console.error("Erro inesperado ao adicionar feedback da API real:", error);
      throw error;
    }
  } else {
    console.warn("Serviço de Feedback: REAL_API_ACTIVE é false. Simulando sucesso ao adicionar feedback.");
    return new Promise(resolve => setTimeout(() => {
        resolve({ ...newFeedback, id: `mock-${Date.now()}` });
    }, 500));
  }
};

export const getFeedbacksForMember = async (memberId) => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await axios.get(`${API_BASE_URL}/members/${memberId}/feedbacks`);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn(`Serviço de Feedback: API real inacessível ao buscar feedbacks para ${memberId}. Retornando dados mockados.`);
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
      console.error(`Erro inesperado ao buscar feedbacks para o membro ${memberId} da API real:`, error);
      throw error;
    }
  } else {
    console.warn(`Serviço de Feedback: REAL_API_ACTIVE é false. Retornando dados mockados para o membro ${memberId}.`);
    return new Promise(resolve => setTimeout(() => {
        resolve([
            {
              id: 1,
              from: "Líder Alpha (mock)",
              to: "Membro Teste (mock)",
              subject: "Ótimo trabalho no projeto X! (mock)",
              message: "Seu empenho e foco foram cruciais para o sucesso. (mock)",
              date: "2025-06-20T10:00:00Z",
              read: false,
            },
            {
              id: 2,
              from: "Líder Beta (mock)",
              to: "Membro Teste (mock)",
              subject: "Sugestão de melhoria (mock)",
              message: "Poderíamos melhorar a comunicação em reuniões de equipe. (mock)",
              date: "2025-06-18T15:30:00Z",
              read: true,
            },
        ]);
    }, 500));
  }
};

export const markFeedbackAsRead = async (feedbackId) => {
  if (REAL_API_ACTIVE) {
    try {
      await axios.patch(`${API_BASE_URL}/feedbacks/${feedbackId}/read`);
      return true;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn(`Serviço de Feedback: API real inacessível ao marcar feedback ${feedbackId} como lido. Simulando sucesso.`);
        return true;
      }
      console.error(`Erro inesperado ao marcar feedback ${feedbackId} como lido da API real:`, error);
      throw error;
    }
  } else {
    console.warn(`Serviço de Feedback: REAL_API_ACTIVE é false. Simulando sucesso ao marcar feedback ${feedbackId} como lido.`);
    return new Promise(resolve => setTimeout(() => {
        resolve(true);
    }, 200));
  }
};
