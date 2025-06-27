// src/services/dashboardService.js

/**
 * @file Serviço para obtenção de dados do dashboard.
 * @description
 * Este arquivo contém funções para interagir com a API de dados do dashboard.
 * Os dados fornecidos (métricas de equipe, clima organizacional e lista de colaboradores)
 * são primariamente destinados a perfis de **Líderes de Equipe (Leader)** e
 * **Recursos Humanos (HR)**, que necessitam de uma visão agregada sobre o desempenho
 * e o bem-estar dos times e de seus membros individuais.
 */

import axios from 'axios';

const REAL_API_ACTIVE = false; // Mude para true quando sua API estiver pronta
const API_BASE_URL = 'http://localhost:3000/api/dashboard'; // Ajuste sua URL base da API

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

export const fetchDashboardData = async () => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await api.get('/'); // Assumindo que a API do dashboard está em /api/dashboard/
      if (response.data) {
        return {
          metrics: response.data.metrics || {},
          climate: response.data.climate || [],
          collaborators: response.data.collaborators || [], // Adiciona colaboradores da API
          lastUpdate: response.data.lastUpdate || new Date().toISOString(),
        };
      } else {
        throw new Error("API retornou dados vazios para o dashboard.");
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn("Serviço de Dashboard: API real inacessível. Retornando dados mockados para o dashboard.");
        // Fallback para dados mockados em caso de erro de rede
        return new Promise(resolve => setTimeout(() => {
          resolve({
            metrics: {
              uniao: { percent: 70, atributo: "uniaoAttr", pontosFortes: ["Colaboração em equipe"], pontosFracos: ["Silos de informação"], causasRaiz: "Falta de ferramentas de comunicação unificadas.", planoAcao: ["Implementar plataforma de comunicação."] },
              empenho: { percent: 85, atributo: "empenhoAttr", pontosFortes: ["Iniciativa individual"], pontosFracos: ["Burnout em alguns membros"], causasRaiz: "Carga de trabalho desigual.", planoAcao: ["Reavaliar distribuição de tarefas."] },
              comunicacao: { percent: 75, atributo: "comunicacaoAttr", pontosFortes: ["Reuniões eficazes"], pontosFracos: ["Feedback informal inconsistente"], causasRaiz: "Ausência de um processo de feedback estruturado.", planoAcao: ["Treinamento em feedback construtivo."] },
              foco: { percent: 80, atributo: "focoAttr", pontosFortes: ["Clareza de objetivos"], pontosFracos: ["Distrações externas"], causasRaiz: "Ambiente de trabalho ruidoso.", planoAcao: ["Espaços de trabalho silenciosos."] },
              saudeEmocional: { percent: 78, atributo: "saudeEmocionalAttr" }, // Será calculado no hook baseado no clima
            },
            climate: [
              { name: "Ótimo", percent: 35 },
              { name: "Bem", percent: 45 },
              { name: "Cansado", percent: 15 },
              { name: "Estressado", percent: 5 },
            ],
            collaborators: [ // Dados mockados de colaboradores para o dashboard de RH
              {
                id: "gabriel-cabral-id-test",
                name: "Gabriel Cabral",
                role: "UX/UI Designer",
                foco: 85,
                empenho: 90,
                saudeEmocional: 80,
                email: "gabriel.cabral@proa.com",
                insights: {
                  foco: "Excelente concentração em suas atividades de desenvolvimento, raramente se dispersa.",
                  empenho: "Altamente motivado, sempre buscando aprimorar as entregas e superar expectativas.",
                  saudeEmocional: "Apresenta um bem-estar emocional notável, com boa resiliência sob pressão.",
                },
                hrInsights: {
                  performance: "Desempenho consistente acima da média, com fortes habilidades de colaboração e inovação.",
                  absenteeism: "Registro de assiduidade impecável, sem ausências nos últimos 24 meses.",
                  contactHistory: "Histórico de interações positivas e proativas com o RH, incluindo workshops de liderança e mentoria.",
                },
              },
              {
                id: "talita-vitoria-id-test",
                name: "Talita Vitória",
                role: "Backend Developer",
                foco: 75,
                empenho: 88,
                saudeEmocional: 70,
                email: "talita.vitoria@proa.com",
                insights: {
                  foco: "Bom foco, mas pode se dispersar em projetos paralelos.",
                  empenho: "Muito dedicada, especialmente em desafios técnicos complexos.",
                  saudeEmocional: "Estável, mas demonstra sinais de cansaço em fases de entrega intensa.",
                },
                hrInsights: {
                  performance: "Contribuições técnicas significativas, com liderança em projetos de infraestrutura.",
                  absenteeism: "Baixo índice de absenteísmo, justificadas por licenças médicas pontuais.",
                  contactHistory: "Interesse em programas de desenvolvimento de liderança técnica. Participa ativamente de comunidades de desenvolvimento."
                },
              },
            ],
            lastUpdate: new Date().toISOString(),
          });
        }, 500));
      }
      console.error("Erro inesperado ao buscar dados do dashboard da API real:", error);
      throw error;
    }
  } else {
    // Modo de desenvolvimento: Retorna dados mockados diretamente, sem tentar conexão de rede.
    console.log("Serviço de Dashboard: REAL_API_ACTIVE é false. Retornando dados mockados.");
    return new Promise(resolve => setTimeout(() => {
      resolve({
        metrics: {
          uniao: { percent: 70, atributo: "uniaoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          empenho: { percent: 85, atributo: "empenhoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          comunicacao: { percent: 75, atributo: "comunicacaoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          foco: { percent: 80, atributo: "focoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          saudeEmocional: { percent: 78, atributo: "saudeEmocionalAttr" }, // Será calculado no hook baseado no clima
        },
        climate: [
          { name: "Ótimo", percent: 35 },
          { name: "Bem", percent: 45 },
          { name: "Cansado", percent: 15 },
          { name: "Estressado", percent: 5 },
        ],
        collaborators: [ // Dados mockados de colaboradores para o dashboard de RH
          {
            id: "gabriel-cabral-id-test",
            name: "Gabriel Cabral",
            role: "UX/UI Designer",
            foco: 85,
            empenho: 90,
            saudeEmocional: 80,
            email: "gabriel.cabral@proa.com",
            insights: {
              foco: "Excelente concentração em suas atividades de desenvolvimento, raramente se dispersa.",
              empenho: "Altamente motivado, sempre buscando aprimorar as entregas e superar expectativas.",
              saudeEmocional: "Apresenta um bem-estar emocional notável, com boa resiliência sob pressão.",
            },
            hrInsights: {
              performance: "Desempenho consistente acima da média, com fortes habilidades de colaboração e inovação.",
              absenteeism: "Registro de assiduidade impecável, sem ausências nos últimos 24 meses.",
              contactHistory: "Histórico de interações positivas e proativas com o RH, incluindo workshops de liderança e mentoria.",
            },
          },
          {
            id: "talita-vitoria-id-test",
            name: "Talita Vitória",
            role: "Backend Developer",
            foco: 75,
            empenho: 88,
            saudeEmocional: 70,
            email: "talita.vitoria@proa.com",
            insights: {
              foco: "Bom foco, mas pode se dispersar em projetos paralelos.",
              empenho: "Muito dedicada, especialmente em desafios técnicos complexos.",
              saudeEmocional: "Estável, mas demonstra sinais de cansaço em fases de entrega intensa.",
            },
            hrInsights: {
              performance: "Contribuições técnicas significativas, com liderança em projetos de infraestrutura.",
              absenteeism: "Baixo índice de absenteísmo, justificadas por licenças médicas pontuais.",
              contactHistory: "Interesse em programas de desenvolvimento de liderança técnica. Participa ativamente de comunidades de desenvolvimento."
            },
          },
          {
            id: "carlos-santos-id-test",
            name: "Carlos Santos",
            role: "Product Owner",
            foco: 90,
            empenho: 92,
            saudeEmocional: 85,
            email: "carlos.santos@proa.com",
            insights: {
              foco: "Líder natural, mantém a equipe alinhada e focada nos objetivos.",
              empenho: "Excepcional empenho, sempre buscando otimizar o backlog e as entregas.",
              saudeEmocional: "Resiliente e motivador, um pilar de apoio para o time.",
            },
            hrInsights: {
              performance: "Excelente capacidade de comunicação e priorização. Responsável por grandes avanços nos produtos.",
              absenteeism: "Registro perfeito. Sempre presente e engajado.",
              contactHistory: "Proativo em discussões sobre estratégia de produto e mentoring de novos talentos."
            },
          },
        ],
        lastUpdate: new Date().toISOString(),
      });
    }, 500));
  }
};
