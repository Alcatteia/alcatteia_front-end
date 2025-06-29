// src/data/simulatedDashboardData.js

// Este arquivo contém dados simulados para o dashboard
// para fins de teste e demonstração do "movimento" das métricas
// e o comportamento das recomendações.

// Definindo a lista base de colaboradores da sua equipe
const newTeamMembersBase = [
  {
    id: "heverton-souza-id",
    name: "Heverton Souza",
    role: "Front-end",
    email: "heverton.s@alcatteia.com",
    photo: "https://placehold.co/150x150/FF0000/FFFFFF?text=HS",
  },
  {
    id: "talita-vitoria-id",
    name: "Talita Vitória",
    role: "Back-end",
    email: "talita.v@alcatteia.com",
    photo: "https://placehold.co/150x150/008000/FFFFFF?text=TV",
  },
  {
    id: "pedro-miguel-id",
    name: "Pedro Miguel",
    role: "Front-end",
    email: "pedro.m@alcatteia.com",
    photo: "https://placehold.co/150x150/FFFF00/000000?text=PM",
  },
  {
    id: "isabelle-gomes-id",
    name: "Isabelle Gomes",
    role: "Full-stack",
    email: "isabelle.g@alcatteia.com",
    photo: "https://placehold.co/150x150/800080/FFFFFF?text=IG",
  },
  {
    id: "gabriel-de-alencar-id",
    name: "Gabriel de Alencar",
    role: "Front-end",
    email: "gabriel.a@alcatteia.com",
    photo: "https://placehold.co/150x150/FFA500/FFFFFF?text=GA",
  },
  {
    id: "rafaela-leite-id",
    name: "Rafaela Leite",
    role: "Back-end",
    email: "rafaela.l@alcatteia.com",
    photo: "https://placehold.co/150x150/00FFFF/000000?text=RL",
  },
  {
    id: "felipe-oliveira-id",
    name: "Felipe Oliveira",
    role: "Back-end",
    email: "felipe.o@alcatteia.com",
    photo: "https://placehold.co/150x150/FFC0CB/000000?text=FO",
  },
  {
    id: "gabriel-cabral-id",
    name: "Gabriel Cabral",
    role: "Front-end",
    email: "gabriel.c@alcatteia.com",
    photo: "https://placehold.co/150x150/0000FF/FFFFFF?text=GC",
  },
];

// Função para gerar dados de colaborador com base no tema do estado
const generateCollaboratorData = (baseMember, stateTheme) => {
  let foco, empenho, saudeEmocional, insights, hrInsights;
  // Geração de lastCheckIn para ser ligeiramente diferente para cada um, mas recente
  const lastCheckIn = new Date(new Date().getTime() - Math.floor(Math.random() * 48 + 1) * 60 * 60 * 1000).toISOString(); 

  switch (stateTheme) {
    case 'low_engagement_focus':
      foco = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // 30-50
      empenho = Math.floor(Math.random() * (50 - 30 + 1)) + 30; // 30-50
      saudeEmocional = Math.floor(Math.random() * (70 - 50 + 1)) + 50; // 50-70
      insights = {
        foco: `Demonstra dificuldade em manter o foco, impactando a entrega de tarefas de ${baseMember.role}.`,
        empenho: `Empenho abaixo do esperado, com sinais de desmotivação nas atividades de ${baseMember.role}.`,
        saudeEmocional: "Saúde emocional moderada, pode estar sentindo o peso das demandas."
      };
      hrInsights = {
        performance: `Queda na produtividade nas entregas de ${baseMember.role} e necessidade de reengajamento.`,
        absenteeism: "Sem ocorrências recentes de absenteísmo.",
        contactHistory: "Não há histórico de contato recente do RH para esta questão."
      };
      break;
    case 'bad_emotional_climate_low_unity':
      foco = Math.floor(Math.random() * (80 - 60 + 1)) + 60; // 60-80
      empenho = Math.floor(Math.random() * (80 - 60 + 1)) + 60; // 60-80
      saudeEmocional = Math.floor(Math.random() * (60 - 40 + 1)) + 40; // 40-60
      insights = {
        foco: `Foco afetado pelo clima geral, com menor concentração em tarefas de ${baseMember.role}.`,
        empenho: `Empenho mantido em ${baseMember.role}, mas com sinais de desgaste devido ao ambiente.`,
        saudeEmocional: "Saúde emocional em declínio, com relatos de estresse e cansaço."
      };
      hrInsights = {
        performance: `Impacto no desempenho de ${baseMember.role} pela desunião e clima tenso.`,
        absenteeism: "Algumas ausências justificadas devido ao estresse.",
        contactHistory: "RH em contato para oferecer suporte e entender as causas do estresse."
      };
      break;
    case 'all_metrics_good':
      foco = Math.floor(Math.random() * (95 - 80 + 1)) + 80; // 80-95
      empenho = Math.floor(Math.random() * (95 - 80 + 1)) + 80; // 80-95
      saudeEmocional = Math.floor(Math.random() * (95 - 80 + 1)) + 80; // 80-95
      insights = {
        foco: `Foco impecável em ${baseMember.role}, com alta produtividade e clareza nas prioridades.`,
        empenho: `Empenho exemplar em ${baseMember.role}, superando expectativas e inspirando a equipe.`,
        saudeEmocional: "Saúde emocional ótima, contribuindo para um ambiente positivo e resiliente."
      };
      hrInsights = {
        performance: `Desempenho excepcional em ${baseMember.role}, com reconhecimento por contribuições significativas.`,
        absenteeism: "Nenhuma ausência.",
        contactHistory: "RH em contato para oportunidades de desenvolvimento e reconhecimento."
      };
      break;
    case 'low_communication':
      foco = Math.floor(Math.random() * (85 - 70 + 1)) + 70; // 70-85
      empenho = Math.floor(Math.random() * (85 - 70 + 1)) + 70; // 70-85
      saudeEmocional = Math.floor(Math.random() * (80 - 65 + 1)) + 65; // 65-80
      insights = {
        foco: `Foco mantido em suas tarefas de ${baseMember.role}, mas impactado pela falta de clareza na comunicação.`,
        empenho: `Empenho presente, mas a ineficácia na comunicação gera retrabalho e atrasos em ${baseMember.role}.`,
        saudeEmocional: "Saúde emocional moderada, com frustração devido a desalinhamentos na comunicação."
      };
      hrInsights = {
        performance: `Qualidade das entregas de ${baseMember.role} afetada por gargalos na comunicação.`,
        absenteeism: "Poucas ausências, ligadas a problemas de alinhamento.",
        contactHistory: "RH discutindo estratégias para melhorar a comunicação interna da equipe."
      };
      break;
  }

  return {
    ...baseMember,
    foco,
    empenho,
    saudeEmocional,
    lastCheckIn,
    insights,
    hrInsights,
  };
};

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
    collaborators: newTeamMembersBase.map(member => generateCollaboratorData(member, 'low_engagement_focus')),
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
    collaborators: newTeamMembersBase.map(member => generateCollaboratorData(member, 'bad_emotional_climate_low_unity')),
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
    collaborators: newTeamMembersBase.map(member => generateCollaboratorData(member, 'all_metrics_good')),
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
    collaborators: newTeamMembersBase.map(member => generateCollaboratorData(member, 'low_communication')),
    lastUpdate: new Date().toISOString(), // Agora
  },
];
