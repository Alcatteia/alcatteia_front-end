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

// Lista base de colaboradores para usar nos mocks, para consistência
const teamMembersForMock = [
  { id: "heverton-souza-id", name: "Heverton Souza", role: "Front-end", email: "heverton.s@alcatteia.com", photo: "https://placehold.co/150x150/FF0000/FFFFFF?text=HS", foco: 70, empenho: 75, saudeEmocional: 65, insights: { foco: "Bom foco, pode se aprimorar em reuniões longas.", empenho: "Empenho sólido nas entregas.", saudeEmocional: "Estável, com pequenos picos de estresse." }, hrInsights: { performance: "Contribuições técnicas relevantes.", absenteeism: "Baixo índice.", contactHistory: "Participou de treinamentos." } },
  { id: "talita-vitoria-id", name: "Talita Vitória", role: "Back-end", email: "talita.v@alcatteia.com", photo: "https://placehold.co/150x150/008000/FFFFFF?text=TV", foco: 80, empenho: 88, saudeEmocional: 70, insights: { foco: "Excelente na resolução de problemas complexos.", empenho: "Altamente dedicada e alta capacidade de entrega.", saudeEmocional: "Resiliente, lida bem com desafios." }, hrInsights: { performance: "Desenvolvimento robusto de APIs.", absenteeism: "Registro impecável.", contactHistory: "Interesse em mentorar." } },
  { id: "pedro-miguel-id", name: "Pedro Miguel", role: "Front-end", email: "pedro.m@alcatteia.com", photo: "https://placehold.co/150x150/FFFF00/000000?text=PM", foco: 65, empenho: 70, saudeEmocional: 60, insights: { foco: "Pode melhorar na manutenção do foco.", empenho: "Mostra empenho em aprender.", saudeEmocional: "Nível de bem-estar médio." }, hrInsights: { performance: "Boas contribuições em features visuais.", absenteeism: "Poucas ausências.", contactHistory: "Discutiu planos de desenvolvimento." } },
  { id: "isabelle-gomes-id", name: "Isabelle Gomes", role: "Full-stack", email: "isabelle.g@alcatteia.com", photo: "https://placehold.co/150x150/800080/FFFFFF?text=IG", foco: 90, empenho: 95, saudeEmocional: 88, insights: { foco: "Capacidade excepcional de transitar.", empenho: "Líder em inovação.", saudeEmocional: "Equilíbrio emocional exemplar." }, hrInsights: { performance: "Desenvolvimento de ponta a ponta com alta qualidade.", absenteeism: "Nenhuma ausência.", contactHistory: "Proativa em oferecer workshops." } },
  { id: "gabriel-de-alencar-id", name: "Gabriel de Alencar", role: "Front-end", email: "gabriel.a@alcatteia.com", photo: "https://placehold.co/150x150/FFA500/FFFFFF?text=GA", foco: 78, empenho: 82, saudeEmocional: 72, insights: { foco: "Bom foco, precisa de mais atenção em testes.", empenho: "Consistente na entrega de funcionalidades.", saudeEmocional: "Bem-estar geral positivo." }, hrInsights: { performance: "Boas habilidades técnicas.", absenteeism: "Poucas ausências.", contactHistory: "Demonstrou interesse." } },
  { id: "rafaela-leite-id", name: "Rafaela Leite", role: "Back-end", email: "rafaela.l@alcatteia.com", photo: "https://placehold.co/150x150/00FFFF/000000?text=RL", foco: 72, empenho: 80, saudeEmocional: 68, insights: { foco: "Foco na otimização de consultas.", empenho: "Entrega constante de módulos.", saudeEmocional: "Estresse moderado." }, hrInsights: { performance: "Desenvolvimento de APIs robustas.", absenteeism: "Todas as ausências justificadas.", contactHistory: "Buscou o RH." } },
  { id: "felipe-oliveira-id", name: "Felipe Oliveira", role: "Back-end", email: "felipe.o@alcatteia.com", photo: "https://placehold.co/150x150/FFC0CB/000000?text=FO", foco: 60, empenho: 68, saudeEmocional: 55, insights: { foco: "Pode melhorar na depuração.", empenho: "Empenho variável.", saudeEmocional: "Apresenta sinais de frustração." }, hrInsights: { performance: "Bom em manutenção de sistemas.", absenteeism: "Algumas faltas recentes.", contactHistory: "RH ofereceu apoio." } },
  { id: "gabriel-cabral-id", name: "Gabriel Cabral", role: "Front-end", email: "gabriel.c@alcatteia.com", photo: "https://placehold.co/150x150/0000FF/FFFFFF?text=GC", foco: 85, empenho: 90, saudeEmocional: 80, insights: { foco: "Excelente concentração.", empenho: "Sempre proativo.", saudeEmocional: "Mantém um bom equilíbrio." }, hrInsights: { performance: "Consistência e qualidade no desenvolvimento.", absenteeism: "Assiduidade exemplar.", contactHistory: "Interações construtivas." } },
];


export const fetchDashboardData = async () => {
  if (REAL_API_ACTIVE) {
    try {
      const response = await api.get('/');
      if (response.data) {
        return {
          metrics: response.data.metrics || {},
          climate: response.data.climate || [],
          collaborators: response.data.collaborators || [],
          lastUpdate: response.data.lastUpdate || new Date().toISOString(),
        };
      } else {
        throw new Error("API retornou dados vazios para o dashboard.");
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.warn("Serviço de Dashboard: API real inacessível. Retornando dados mockados para o dashboard.");
        return new Promise(resolve => setTimeout(() => {
          resolve({
            metrics: {
              uniao: { percent: 70, atributo: "uniaoAttr", pontosFortes: ["Colaboração em equipe"], pontosFracos: ["Silos de informação"], causasRaiz: "Falta de ferramentas de comunicação unificadas.", planoAcao: ["Implementar plataforma de comunicação."] },
              empenho: { percent: 85, atributo: "empenhoAttr", pontosFortes: ["Iniciativa individual"], pontosFracos: ["Burnout em alguns membros"], causasRaiz: "Carga de trabalho desigual.", planoAcao: ["Reavaliar distribuição de tarefas."] },
              comunicacao: { percent: 75, atributo: "comunicacaoAttr", pontosFortes: ["Reuniões eficazes"], pontosFracos: ["Feedback informal inconsistente"], causasRaiz: "Ausência de um processo de feedback estruturado.", planoAcao: ["Treinamento em feedback construtivo."] },
              foco: { percent: 80, atributo: "focoAttr", pontosFortes: ["Clareza de objetivos"], pontosFracos: ["Distrações externas"], causasRaiz: "Ambiente de trabalho ruidoso.", planoAcao: ["Espaços de trabalho silenciosos."] },
              saudeEmocional: { percent: 78, atributo: "saudeEmocionalAttr" },
            },
            climate: [
              { name: "Ótimo", percent: 35 },
              { name: "Bem", percent: 45 },
              { name: "Cansado", percent: 15 },
              { name: "Estressado", percent: 5 },
            ],
            collaborators: teamMembersForMock.map(member => ({ // Mapeia os dados mockados dos colaboradores
              id: member.id,
              name: member.name,
              role: member.role,
              foco: member.foco,
              empenho: member.empenho,
              saudeEmocional: member.saudeEmocional,
              email: member.email,
              insights: member.insights,
              hrInsights: member.hrInsights,
            })),
            lastUpdate: new Date().toISOString(),
          });
        }, 500));
      }
      console.error("Erro inesperado ao buscar dados do dashboard da API real:", error);
      throw error;
    }
  } else {
    console.log("Serviço de Dashboard: REAL_API_ACTIVE é false. Retornando dados mockados.");
    return new Promise(resolve => setTimeout(() => {
      resolve({
        metrics: {
          uniao: { percent: 70, atributo: "uniaoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          empenho: { percent: 85, atributo: "empenhoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          comunicacao: { percent: 75, atributo: "comunicacaoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          foco: { percent: 80, atributo: "focoAttr", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
          saudeEmocional: { percent: 78, atributo: "saudeEmocionalAttr" },
        },
        climate: [
          { name: "Ótimo", percent: 35 },
          { name: "Bem", percent: 45 },
          { name: "Cansado", percent: 15 },
          { name: "Estressado", percent: 5 },
        ],
        collaborators: teamMembersForMock.map(member => ({ // Mapeia os dados mockados dos colaboradores
          id: member.id,
          name: member.name,
          role: member.role,
          foco: member.foco,
          empenho: member.empenho,
          saudeEmocional: member.saudeEmocional,
          email: member.email,
          insights: member.insights,
          hrInsights: member.hrInsights,
        })),
        lastUpdate: new Date().toISOString(),
      });
    }, 500));
  }
};
