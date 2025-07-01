// Estrutura inicial para os dados das métricas.

/**
 * @file Arquivo de dados estáticos para métricas e clima organizacional.
 * @description
 * Este arquivo centraliza a definição de estruturas de dados iniciais e constantes
 * relacionadas às métricas de desempenho da equipe (União, Empenho, Comunicação, Foco, Saúde Emocional),
 * ao clima organizacional e a sugestões de ações baseadas nos atributos das métricas.
 *
 * Ele serve como uma fonte única de verdade para dados padrão que são utilizados
 * em diversas partes da aplicação, como na inicialização de estados, validações
 * de formulários, exibição de relatórios e oferta de planos de ação sugeridos.
 */
 
export const initialMetrics = {
  uniao: {
    percent: null,
    atributo: "uniaoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  empenho: {
    percent: null,
    atributo: "empenhoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  comunicacao: {
    percent: null,
    atributo: "comunicacaoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  foco: {
    percent: null,
    atributo: "focoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
};

// Dados iniciais para o clima organizacional.
 
export const detailedClimateData = [
  { name: "Ótimo", percent: 0 },
  { name: "Bem", percent: 0 },
  { name: "Cansado", percent: 0 },
  { name: "Estressado", percent: 0 },
];

//Objeto contendo sugestões de ações para cada atributo de métrica.
 
export const suggestionsByAttribute = {
  uniao: [
    "Promover dinâmicas de integração e team-building para fortalecer laços.",
    "Realizar reuniões de feedback coletivo para alinhamento constante e celebração de conquistas.",
    "Organizar eventos informais entre a equipe para promover um ambiente descontraído.",
  ],
  comunicacao: [
    "Implementar reuniões diárias rápidas (daily stand-ups) para alinhamento constante.",
    "Criar canais de comunicação específicos para diferentes tópicos, garantindo clareza.",
    "Fazer rodadas de feedback aberto e construtivo para melhorar a troca de informações.",
  ],
  empenho: [
    "Reconhecer conquistas individuais e coletivas de forma pública e significativa.",
    "Definir metas claras, desafiadoras e alcançáveis, com acompanhamento regular.",
    "Promover desafios motivacionais e gamificação para impulsionar o engajamento.",
  ],
  foco: [
    "Estabelecer horários sem interrupções para atividades que exigem alta concentração.",
    "Priorizar tarefas em conjunto e revisar a lista de prioridades diariamente.",
    "Reduzir reuniões desnecessárias e otimizar as existentes para serem mais objetivas.",
  ],
  saudeEmocional: [
    "Fazer check-ins de humor semanais rápidos para identificar tendências e necessidades.",
    "Promover pausas para relaxamento e atividades de mindfulness durante o dia de trabalho.",
    "Estimular conversas abertas sobre bem-estar e oferecer recursos de apoio psicológico.",
  ],
};