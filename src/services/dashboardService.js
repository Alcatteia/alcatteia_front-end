// src/services/dashboardService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/dashboard';

/**
 * @file Serviço para obtenção de dados do dashboard.
 * @description
 * Este arquivo contém funções para interagir com a API de dados do dashboard.
 * Os dados fornecidos (métricas de equipe e clima organizacional) são primariamente
 * destinados a perfis de **Líderes de Equipe (Leader)** e **Recursos Humanos (HR)**,
 * que necessitam de uma visão agregada sobre o desempenho e o bem-estar dos times.
 *
 * @returns {Promise<object>} Um objeto contendo dados de métricas, clima e a última atualização.
 */

export const fetchDashboardData = async () => {
  console.log("Aguardando dados da API...");

  await new Promise(resolve => setTimeout(resolve, 500)); // Simula um atraso de rede

  return {
    metrics: {
      uniao: { percent: null, atributo: "uniaoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
      empenho: { percent: null, atributo: "empenhoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
      comunicacao: { percent: null, atributo: "comunicacaoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
      foco: { percent: null, atributo: "focoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
      saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
    },
    climate: [
      { name: "Ótimo", percent: 0 },
      { name: "Bem", percent: 0 },
      { name: "Cansado", percent: 0 },
      { name: "Estressado", percent: 0 },
    ],
    lastUpdate: null,
  };
};