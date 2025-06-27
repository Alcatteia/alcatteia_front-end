// src/data/simulatedDashboardData.js

// Este arquivo contém dados simulados para o dashboard
// para fins de teste e demonstração do "movimento" das métricas
// e o comportamento das recomendações.

export const simulatedDashboardStates = [
  // Estado 1: Empenho e Foco baixos
  {
    metrics: {
      uniao: { percent: 75, atributo: "uniaoAttr" },
      empenho: { percent: 30, atributo: "empenhoAttr" }, // Baixo empenho
      comunicacao: { percent: 80, atributo: "comunicacaoAttr" },
      foco: { percent: 45, atributo: "focoAttr" }, // Foco baixo
      saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
    },
    climate: [
      { name: "Ótimo", percent: 40 },
      { name: "Bem", percent: 30 },
      { name: "Cansado", percent: 20 },
      { name: "Estressado", percent: 10 },
    ],
    collaborators: [],
    lastUpdate: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
  },
  // Estado 2: Clima Emocional "Ruim" e União baixa
  {
    metrics: {
      uniao: { percent: 40, atributo: "uniaoAttr" }, // União baixa
      empenho: { percent: 70, atributo: "empenhoAttr" },
      comunicacao: { percent: 65, atributo: "comunicacaoAttr" },
      foco: { percent: 75, atributo: "focoAttr" },
      saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
    },
    climate: [
      { name: "Ótimo", percent: 10 },
      { name: "Bem", percent: 15 },
      { name: "Cansado", percent: 30 },
      { name: "Estressado", percent: 45 }, // Estressado e cansado alto
    ],
    collaborators: [],
    lastUpdate: new Date(new Date().getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hora atrás
  },
  // Estado 3: Todas as métricas boas (sem recomendação específica)
  {
    metrics: {
      uniao: { percent: 85, atributo: "uniaoAttr" },
      empenho: { percent: 90, atributo: "empenhoAttr" },
      comunicacao: { percent: 92, atributo: "comunicacaoAttr" },
      foco: { percent: 88, atributo: "focoAttr" },
      saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
    },
    climate: [
      { name: "Ótimo", percent: 60 },
      { name: "Bem", percent: 35 },
      { name: "Cansado", percent: 3 },
      { name: "Estressado", percent: 2 },
    ],
    collaborators: [],
    lastUpdate: new Date().toISOString(), // Agora
  },
  // Estado 4: Comunicação baixa
  {
    metrics: {
      uniao: { percent: 70, atributo: "uniaoAttr" },
      empenho: { percent: 75, atributo: "empenhoAttr" },
      comunicacao: { percent: 35, atributo: "comunicacaoAttr" }, // Comunicação baixa
      foco: { percent: 80, atributo: "focoAttr" },
      saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
    },
    climate: [
      { name: "Ótimo", percent: 50 },
      { name: "Bem", percent: 30 },
      { name: "Cansado", percent: 15 },
      { name: "Estressado", percent: 5 },
    ],
    collaborators: [],
    lastUpdate: new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString(), // 1 hora no futuro
  },
];