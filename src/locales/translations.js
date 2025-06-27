// src/locales/translations.js

/**
 * Objeto de traduções para diferentes idiomas.
 * As chaves representam os identificadores das strings, e os valores são as traduções para cada idioma.
 */
export const translations = {
  pt: {
    // --- Comuns a todos os Dashboards ---
    lastUpdate: "Última Atualização",
    loadingData: "Carregando dados...",
    noData: "Sem dados",
    trend: "Tendência",
    noTrendData: "Sem dados de tendência",
    increaseOf: "Aumento de",
    decreaseOf: "Queda de",
    percentagePoints: "pontos percentuais",
    copy: "Copiar",
    copied: "Copiado!",
    copyFailed: "Falha ao copiar",
    viewDetails: "Ver Detalhes",
    ReportButton: "Relatório",
    loadingOrNoData: "Carregando ou sem dados.",

    // --- Atributos de Equipe (Usados em vários lugares) ---
    uniaoAttr: "União",
    comunicacaoAttr: "Comunicação",
    focoAttr: "Foco",
    empenhoAttr: "Empenho",
    saudeEmocionalAttr: "Saúde Emocional",
    saudeEquipeAttr: "Saúde da Equipe", // Saúde Geral da Equipe

    // --- Status de Saúde Emocional (Detalhes) ---
    goodEmotionalStatus: "Bom",
    goodEmotionalDescription: "A equipe demonstra alto bem-estar emocional, resiliência e otimismo. Um ambiente saudável para a produtividade e a inovação.",
    goodEmotionalActions: [
      "Incentivar o reconhecimento mútuo e celebração de pequenas vitórias.",
      "Oferecer oportunidades de desenvolvimento pessoal e profissional contínuo.",
      "Manter canais abertos para feedback e escuta ativa sobre bem-estar.",
    ],
    mediumEmotionalStatus: "Médio",
    mediumEmotionalDescription: "O bem-estar emocional da equipe está estável, mas há pontos que merecem atenção para evitar estresse futuro. É um bom momento para intervenções preventivas.",
    mediumEmotionalActions: [
      "Promover workshops de gerenciamento de estresse e bem-estar.",
      "Realizar check-ins individuais regulares para identificar necessidades e preocupações.",
      "Fomentar atividades de relaxamento e desconexão durante o expediente.",
    ],
    badEmotionalStatus: "Ruim",
    badEmotionalDescription: "A equipe está passando por um período de estresse ou insatisfação significativa, o que pode impactar a produtividade e a saúde mental. Ações urgentes são necessárias.",
    badEmotionalActions: [
      "Conduzir reuniões individuais focadas no bem-estar e nas preocupações mais urgentes.",
      "Implementar flexibilidade de horários ou redução de carga temporária para alívio imediato.",
      "Buscar apoio de profissionais de saúde mental para a equipe.",
      "Revisar processos e remover gargalos que geram pressão excessiva e constante.",
    ],
    notEvaluatedEmotionalStatus: "Não Avaliado",
    notEvaluatedEmotionalDescription: "Não há dados suficientes para avaliar a saúde emocional da equipe. É fundamental coletar feedback para obter uma visão clara.",
    notEvaluatedEmotionalActions: [
      "Garantir que a pesquisa de bem-estar emocional seja respondida por todos da equipe.",
      "Comunicar a importância do feedback para o suporte e desenvolvimento do bem-estar da equipe.",
    ],

    // --- Nomes do Clima Detalhado (devem corresponder aos 'name's em detailedClimateData) ---
    "Ótimo": "Ótimo",
    "Bem": "Bem",
    "Cansado": "Cansado",
    "Estressado": "Estressado",

    // --- Tradução do Dashboard de RH ---
    dashboardTitleHR: "Dashboard RH",
    dashboardSubtitleHR: "Performance do time",
    teamHealth: "Saúde Geral da Equipe",
    teamEngagement: "Engajamento da Equipe",
    individualVision: "Visão Individual dos Colaboradores",
    noCollaborators: "Nenhum colaborador cadastrado ainda.",
    noCollaboratorsDescription: "Os dados individuais aparecerão aqui assim que forem inseridos.",
    memberDetails: "Detalhes de",
    collaboratorDetails: "Detalhes do Colaborador",
    role: "Cargo",
    email: "Email",
    emotionalHealth: "Saúde Emocional",
    insights: "Insights",
    lastCheckIn: "Último Check-in",
    excellent: "Excelente",
    good: "Bom",
    attention: "Atenção",
    critical: "Crítico",

    // --- Leader Dashboard Translations ---
    leaderDashboardTitle: "Dashboard do Líder",
    leaderDashboardSubtitle: "Desempenho da Equipe",
    updateButton: "Atualizar",
    updatingButton: "Atualizando...",
    teamNamePrefix: "Equipe",
    detailedView: "Visão Detalhada",
    understandDashboard: "Entendendo seu Dashboard",
    overviewTitle: "Visão Geral",
    overviewDescription: "Este painel foi desenvolvido para ser uma ferramenta estratégica para insights sobre desempenho e bem-estar da equipe.",
    sloganTitle: "O sucesso de um é o sucesso de todos!",
    sloganDescription: "Na Alcatteia acreditamos que o sucesso da equipe depende de cada pessoa, por isso mantenha toda sua equipe saudável.",
    
    // Recomendações (título do card e do modal)
    recommendations: "Recomendações",
    recommendationsFor: "Recomendações para",
    loadingRecommendations: "Carregando recomendações...",
    noAttributeDetected: "N/A",
    noRecommendationAvailable: "Nenhuma recomendação disponível no momento. Aguardando dados ou métrica de menor desempenho.",
    suggestionsForImprovement: "Sugestões para melhoria",
    clickOnMetricForMore: "Ver completo.",

    // NOVO: Para o título do modal de detalhes e formatar sugestões no card
    suggestionToImprove: "Melhorar",
    recommendationDetails: "Detalhes da Recomendação",

    // Contexto/Motivo para sugestões interativas
    reasonForSuggestion: "Motivo da Sugestão",
    toImproveEmotionalClimate: "para melhorar o clima",
    toTrackProgress: "para acompanhar o progresso das tarefas",

    // Sugestões específicas com ações
    karaokeSuggestionText: "Que tal ouvir música junto com a equipe?",
    kanbanSuggestionText: "Verifique as tarefas no Kanban.",

    // Títulos dos modais de confirmação (agora usados para ações diretas)
    confirmKaraokeTitle: "Confirmar Karaokê?",
    confirmKanbanTitle: "Verificar Kanban?",
    confirmActionTitle: "Confirmar Ação?",

    // Textos dos botões nos modais de ação
    reunirTeamButton: "Reunir a Equipe",
    returnToKaraokeButton: "Retornar ao Karaokê",
    viewKanbanButton: "Ver Kanban",
    refuseButton: "Recusar",
    closeButton: "Fechar",
    returnToKaraokeSimulation: "Você voltou para a tela de Karaokê (simulado)!",
    returnToKaraokeSimulationLog: "Retornando à tela do Karaokê simulado.",

    // Descrições dos atributos para a seção "Entendendo seu Dashboard"
    unionDescription: "Mede a coesão e o espírito de equipe, indicando a capacidade de colaborar.",
    empenhoDescription: "Reflete a dedicação e produtividade nas tarefas, essencial para o alcance de metas.",
    communicationDescription: "Avalia a clareza e eficácia da troca de informações, fundamental para alinhamento.",
    focusDescription: "Indica a capacidade de concentração em objetivos, impactando a eficiência do trabalho.",
    emotionalHealthDescription: "Reflete o bem-estar mental do time, base para resiliência e criatividade.",
    teamHealthDescription: "Equilíbrio geral da equipe, ligado a União, Empenho, Comunicação e Foco.",

    // Estado Geral
    generalStatus: "Status Geral", // CHAVE AQUI

    // --- Novas traduções para o Member Dashboard ---
    yourIndicators: "Seus indicativos",
    performanceAndFeedbackOverview: "Visão do seu Desempenho e Feedbacks",
    yourIndividualMetrics: "Suas Métricas Individuais",
    yourDedicationAndProductivity: "Sua dedicação e produtividade.",
    yourDeliveriesAndConsistency: "Suas entregas e constância.",
    receivedFeedbacks: "Feedbacks Recebidos",
    new: "Novos",
    newFeedback: "NOVO!",
    read: "Lido",
    from: "De",
    subject: "Assunto",
    message: "Mensagem",
    copyMessage: "Copiar mensagem",
    receivedOn: "Recebido em",
    feedbackDetails: "Detalhes do Feedback",
    noFeedbackReceivedYet: "Nenhum feedback recebido ainda. Continue firme, a benção vai chegar!",
    metricDetailsTitle: "Detalhes de {{attribute}}",
    currentScore: "Pontuação Atual",
    strengths: "Pontos Fortes",
    noStrengths: "Nenhum ponto forte identificado.",
    weaknesses: "Pontos Fracos",
    noWeaknesses: "Nenhum ponto fraco identificado.",
    rootCauses: "Causas Raiz",
    actionPlan: "Plano de Ação",
    noActionPlan: "Nenhum plano de ação definido.",
    deadline: "Prazo",
    proactivity: "Proatividade em novas tarefas e desafios.",
    highDeliveryCapacity: "Alta capacidade de entrega, superando expectativas.",
    complexProblemSolving: "Habilidade em resolver problemas complexos de forma eficiente.",
    difficultyDelegating: "Dificuldade em delegar tarefas, mesmo as menores.",
    tendencyToOverburden: "Tendência a se sobrecarregar com detalhes.",
    excessivePerfectionismCause: "Busca excessiva por perfeição e controle em todas as etapas do projeto.",
    practiceDelegation: "Praticar delegação de tarefas menos críticas.",
    nextSprint: "Próximo Sprint",
    focusOnValueDelivery: "Focar na entrega de valor e não na perfeição absoluta.",
    continuous: "Contínuo",
    excellentConcentration: "Excelente concentração em tarefas críticas e prioritárias.",
    consistentOnTimeDelivery: "Entrega consistente dentro do prazo para projetos essenciais.",
    distractionByInterruptions: "Distração com comunicação interna excessiva e interrupções.",
    multitaskingInefficiency: "Multitarefas em atividades não essenciais, reduzindo a eficiência.",
    interruptionHeavyEnvironmentCause: "Ambiente de trabalho com muitas interrupções e gerenciamento ineficaz do tempo.",
    establishDeepWorkBlocks: "Estabelecer blocos de tempo para trabalho focado (Deep Work).",
    daily: "Diariamente",
    useTimeManagementTools: "Utilizar ferramentas de gerenciamento de tempo para otimizar o fluxo.",
    nextWeek: "Próxima Semana",
  },
  en: {
    // --- Common to all Dashboards ---
    lastUpdate: "Last Update",
    loadingData: "Loading data...",
    noData: "No data",
    trend: "Trend",
    noTrendData: "No trend data",
    increaseOf: "Increase of",
    decreaseOf: "Decrease of",
    percentagePoints: "percentage points",
    copy: "Copy",
    copied: "Copied!",
    copyFailed: "Failed to copy",
    viewDetails: "View Details",
    ReportButton: "Report",
    loadingOrNoData: "Loading or no data.",

    // --- Team Attributes (Used universally) ---
    uniaoAttr: "Unity",
    comunicacaoAttr: "Communication",
    focoAttr: "Focus",
    empenhoAttr: "Commitment",
    saudeEmocionalAttr: "Emotional Health",
    saudeEquipeAttr: "Team Health",

    // --- Emotional Health Status (Details) ---
    goodEmotionalStatus: "Good",
    goodEmotionalDescription: "The team shows high emotional well-being, resilience, and optimism. A healthy environment for productivity and innovation.",
    goodEmotionalActions: [
      "Encourage mutual recognition and celebration of small victories.",
      "Offer continuous personal and professional development opportunities.",
      "Maintain open channels for feedback and active listening about well-being.",
    ],
    mediumEmotionalStatus: "Medium",
    mediumEmotionalDescription: "The team's emotional well-being is stable, but there are points that deserve attention to avoid future stress. It's a good time for preventive interventions.",
    mediumEmotionalActions: [
      "Promote stress management and well-being workshops.",
      "Conduct regular individual check-ins to identify needs and concerns.",
      "Foster relaxation and disconnection activities during work hours.",
    ],
    badEmotionalStatus: "Bad",
    badEmotionalDescription: "The team is experiencing a period of significant stress or dissatisfaction, which can impact productivity and mental health. Urgent actions are needed.",
    badEmotionalActions: [
      "Conduct individual meetings focused on well-being and most urgent concerns.",
      "Implement flexible hours or temporary workload reduction for immediate relief.",
      "Seek support from mental health professionals for the team.",
      "Review processes and remove bottlenecks that generate excessive and constant pressure.",
    ],
    notEvaluatedEmotionalStatus: "Not Evaluated",
    notEvaluatedEmotionalDescription: "There is insufficient data to evaluate the team's emotional health. It is essential to collect feedback to gain a clear view.",
    notEvaluatedEmotionalActions: [
      "Ensure that the emotional well-being survey is answered by everyone on the team.",
      "Communicate the importance of feedback for supporting and developing team well-being.",
    ],

    // --- Detailed Climate Names ---
    "Ótimo": "Great",
    "Bem": "Good",
    "Cansado": "Tired",
    "Estressado": "Stressed",

    // --- HR Dashboard Translations ---
    dashboardTitleHR: "HR Overview",
    dashboardSubtitleHR: "Team Performance",
    teamHealth: "Overall Team Health",
    teamEngagement: "Team Engagement",
    individualVision: "Individual Employee View",
    noCollaborators: "No collaborators registered yet.",
    noCollaboratorsDescription: "Individual data will appear here once entered.",
    memberDetails: "Details of",
    collaboratorDetails: "Collaborator Details",
    role: "Role",
    email: "Email",
    emotionalHealth: "Emotional Health",
    insights: "Insights",
    lastCheckIn: "Last Check-in",
    excellent: "Excellent",
    good: "Good",
    attention: "Attention",
    critical: "Critical",

    // --- Leader Dashboard Translations ---
    leaderDashboardTitle: "Leader Dashboard",
    leaderDashboardSubtitle: "Team Performance",
    updateButton: "Update",
    updatingButton: "Updating...",
    teamNamePrefix: "Team",
    detailedView: "Detailed View",
    understandDashboard: "Understanding Your Dashboard",
    overviewTitle: "Overview",
    overviewDescription: "This dashboard is a strategic tool for insights into team performance and well-being.",
    sloganTitle: "The success of one is the success of all!",
    sloganDescription: "We believe at Alcatteia that team success depends on each person, so keep your entire team healthy.",

    // Recommendations (card and modal title)
    recommendations: "Recommendations",
    recommendationsFor: "Recommendations for",
    loadingRecommendations: "Loading recommendations...",
    noAttributeDetected: "N/A",
    noRecommendationAvailable: "No recommendations available at the moment. Awaiting data or lowest performing metric.",
    suggestionsForImprovement: "Suggestions for improving",
    clickOnMetricForMore: "View full list.",

    // NEW: For the detail modal title and formatting suggestions on the card
    suggestionToImprove: "Improve",
    recommendationDetails: "Recommendation Details",

    // Context/Reason for interactive suggestions
    reasonForSuggestion: "Reason for Suggestion",
    toImproveEmotionalClimate: "to improve the emotional climate",
    toTrackProgress: "to track task progress",

    // Specific suggestions with actions
    karaokeSuggestionText: "How about listening to music with the team?",
    kanbanSuggestionText: "Check tasks on the Kanban.",

    // Confirmation modal titles (now used for direct actions)
    confirmKaraokeTitle: "Confirm Karaoke?",
    confirmKanbanTitle: "Check Kanban?",
    confirmActionTitle: "Confirm Action?",

    // Button texts in action modals
    reunirTeamButton: "Gather the Team",
    returnToKaraokeButton: "Return to Karaoke",
    viewKanbanButton: "View Kanban",
    refuseButton: "Decline",
    closeButton: "Close",
    returnToKaraokeSimulation: "You've returned to the Karaoke screen (simulated)!",
    returnToKaraokeSimulationLog: "Returning to simulated Karaoke screen.",

    // Descriptions of attributes for "Understanding Your Dashboard"
    unionDescription: "Measures cohesion and team spirit, indicating the ability to collaborate.",
    empenhoDescription: "Reflects dedication and productivity in tasks, essential for achieving goals.",
    communicationDescription: "Evaluates clarity and effectiveness of information exchange, crucial for alignment.",
    focusDescription: "Indicates the ability to concentrate on objectives, impacting work efficiency.",
    emotionalHealthDescription: "Reflects the team's mental well-being, a base for resilience and creativity.",
    teamHealthDescription: "Overall team balance, linked to Unity, Commitment, Communication, and Focus.",

    // General Status
    generalStatus: "Overall Status", // CHAVE AQUI

    // --- Member Dashboard Translations ---
    yourIndicators: "Your Indicators",
    performanceAndFeedbackOverview: "Performance and Feedback Overview",
    yourIndividualMetrics: "Your Individual Metrics",
    yourDedicationAndProductivity: "Your dedication and productivity.",
    yourDeliveriesAndConsistency: "Your deliveries and consistency.",
    receivedFeedbacks: "Received Feedbacks",
    new: "New",
    newFeedback: "NEW!",
    read: "Read",
    from: "From",
    subject: "Subject",
    message: "Message",
    copyMessage: "Copy message",
    receivedOn: "Received on",
    feedbackDetails: "Feedback Details",
    noFeedbackReceivedYet: "No feedback received yet. Keep going strong, blessings will come!",
    metricDetailsTitle: "Details of {{attribute}}",
    currentScore: "Current Score",
    strengths: "Strengths",
    noStrengths: "No strengths identified.",
    weaknesses: "Weaknesses",
    noWeaknesses: "No weaknesses identified.",
    rootCauses: "Root Causes",
    actionPlan: "Action Plan",
    noActionPlan: "No action plan defined.",
    deadline: "Deadline",
    proactivity: "Proactivity in new tasks and challenges.",
    highDeliveryCapacity: "High delivery capacity, exceeding expectations.",
    complexProblemSolving: "Ability to solve complex problems efficiently.",
    difficultyDelegating: "Difficulty delegating tasks, even small ones.",
    tendencyToOverburden: "Tendency to overburden with details.",
    excessivePerfectionismCause: "Excessive pursuit of perfection and control in all project stages.",
    practiceDelegation: "Practice delegating less critical tasks.",
    nextSprint: "Next Sprint",
    focusOnValueDelivery: "Focus on value delivery, not absolute perfection.",
    continuous: "Continuous",
    excellentConcentration: "Excellent concentration on critical and priority tasks.",
    consistentOnTimeDelivery: "Consistent on-time delivery for essential projects.",
    distractionByInterruptions: "Distraction by excessive internal communication and interruptions.",
    multitaskingInefficiency: "Multitasking in non-essential activities, reducing efficiency.",
    interruptionHeavyEnvironmentCause: "Work environment with many interruptions and ineffective time management.",
    establishDeepWorkBlocks: "Establish time blocks for focused work (Deep Work).",
    daily: "Daily",
    useTimeManagementTools: "Use time management tools to optimize workflow.",
    nextWeek: "Next Week",
  },
  es: {
    // --- Comunes a todos los Paneles ---
    lastUpdate: "Última Actualización",
    loadingData: "Cargando datos...",
    noData: "Sin datos",
    trend: "Tendencia",
    noTrendData: "Sin datos de tendencia",
    increaseOf: "Aumento de",
    decreaseOf: "Disminución de",
    percentagePoints: "puntos porcentuales",
    copy: "Copiar",
    copied: "¡Copiado!",
    copyFailed: "Error al copiar",
    viewDetails: "Ver Detalles",
    ReportButton: "Informe",
    loadingOrNoData: "Cargando o sin datos.",

    // --- Atributos de Equipo (Usados universalmente) ---
    uniaoAttr: "Unión",
    comunicacaoAttr: "Comunicación",
    focoAttr: "Enfoque",
    empenhoAttr: "Compromiso",
    saudeEmocionalAttr: "Salud Emocional",
    saudeEquipeAttr: "Salud del Equipo",

    // --- Estado de Salud Emocional (Detalles) ---
    goodEmotionalStatus: "Bueno",
    goodEmotionalDescription: "El equipo muestra un alto bienestar emocional, resiliencia y optimismo. Un entorno saludable para la productividad y la innovación.",
    goodEmotionalActions: [
      "Fomentar el reconocimiento mutuo y la celebración de pequeñas victorias.",
      "Ofrecer oportunidades de desarrollo personal y profesional continuo.",
      "Mantener canales abiertos para la retroalimentación y la escucha activa sobre el bienestar.",
    ],
    mediumEmotionalStatus: "Medio",
    mediumEmotionalDescription: "El bienestar emocional del equipo es estable, pero hay puntos que merecen atención para evitar el estrés futuro. Es un buen momento para intervenciones preventivas.",
    mediumEmotionalActions: [
      "Promover talleres de manejo del estrés y el bienestar.",
      "Realizar controles individuales regulares para identificar necesidades y preocupaciones.",
      "Fomentar actividades de relajación y desconexión durante el horario laboral.",
    ],
    badEmotionalStatus: "Malo",
    badEmotionalDescription: "El equipo está experimentando un período de estrés o insatisfacción significativa, lo que puede afectar la productividad y la salud mental. Se necesitan acciones urgentes.",
    badEmotionalActions: [
      "Realizar reuniones individuales centradas en el bienestar y las preocupaciones más urgentes.",
      "Implementar flexibilidad de horarios o reducción temporal de la carga para un alivio inmediato.",
      "Buscar apoyo de profesionales de la salud mental para el equipo.",
      "Revisar procesos y eliminar cuellos de botella que generen presión excesiva y constante.",
    ],
    notEvaluatedEmotionalStatus: "No Evaluado",
    notEvaluatedEmotionalDescription: "No hay datos suficientes para evaluar la salud emocional del equipo. Es esencial recopilar comentarios para obtener una vista clara.",
    notEvaluatedEmotionalActions: [
      "Asegurar que la encuesta de bienestar emocional sea respondida por todos en el equipo.",
      "Comunicar la importancia de la retroalimentación para apoyar y desarrollar el bienestar del equipo.",
    ],

    // --- Nombres Detallados del Clima ---
    "Ótimo": "Excelente",
    "Bem": "Bien",
    "Cansado": "Cansado",
    "Estressado": "Estresado",

    // --- Traducción del Panel de RRHH ---
    dashboardTitleHR: "Visión de RRHH",
    dashboardSubtitleHR: "Rendimiento del Equipo",
    teamHealth: "Salud General del Equipo",
    teamEngagement: "Compromiso del Equipo",
    individualVision: "Vista Individual de Colaboradores",
    noCollaborators: "Aún no hay colaboradores registrados.",
    noCollaboratorsDescription: "Los datos individuales aparecerán aquí una vez ingresados.",
    memberDetails: "Detalles de",
    collaboratorDetails: "Detalles del Colaborador",
    role: "Rol",
    email: "Correo Electrónico",
    emotionalHealth: "Salud Emocional",
    insights: "Percepciones",
    lastCheckIn: "Último Check-in",
    excellent: "Excelente",
    good: "Bueno",
    attention: "Atención",
    critical: "Crítico",

    // --- Traducción del Panel del Líder ---
    leaderDashboardTitle: "Panel del Líder",
    leaderDashboardSubtitle: "Rendimiento del Equipo",
    updateButton: "Actualizar",
    updatingButton: "Actualizando...",
    teamNamePrefix: "Equipo",
    detailedView: "Vista Detallada",
    understandDashboard: "Entendiendo tu Panel",
    overviewTitle: "Resumen",
    overviewDescription: "Este panel es una herramienta estratégica para obtener información sobre el rendimiento y el bienestar del equipo.",
    sloganTitle: "¡El éxito de uno es el éxito de todos!",
    sloganDescription: "Creemos en Alcatteia que el éxito del equipo depende de cada persona, por eso mantén a todo tu equipo saludable.",

    // Recomendaciones (título de la tarjeta y del modal)
    recommendations: "Recomendaciones",
    recommendationsFor: "Recomendaciones para",
    loadingRecommendations: "Cargando recomendaciones...",
    noAttributeDetected: "N/A",
    noRecommendationAvailable: "No hay recomendaciones disponibles en este momento. Esperando datos o la métrica de menor rendimiento.",
    suggestionsForImprovement: "Sugerencias para mejorar",
    clickOnMetricForMore: "Ver lista completa.",

    // NUEVO: Para el título del modal de detalles y formato de sugerencias
    suggestionToImprove: "Mejorar",
    recommendationDetails: "Detalles de la Recomendación",

    // Contexto/Razón para sugerencias interactivas
    reasonForSuggestion: "Motivo de la Sugerencia",
    toImproveEmotionalClimate: "para mejorar el clima",
    toTrackProgress: "para seguir el progreso de las tareas",

    // Sugerencias específicas con acciones
    karaokeSuggestionText: "¿Qué tal escuchar música con el equipo?",
    kanbanSuggestionText: "Verificar las tareas en el Kanban.",

    // Títulos de los modales de confirmación (ahora usados para acciones directas)
    confirmKaraokeTitle: "¿Confirmar Karaoke?",
    confirmKanbanTitle: "¿Verificar Kanban?",
    confirmActionTitle: "¿Confirmar Acción?",

    // Textos de los botones en los modales de acción
    reunirTeamButton: "Reunir al Equipo",
    returnToKaraokeButton: "Regresar al Karaoke",
    viewKanbanButton: "Ver Kanban",
    refuseButton: "Rechazar",
    closeButton: "Cerrar",
    returnToKaraokeSimulation: "¡Has vuelto a la pantalla de Karaoke (simulada)!",
    returnToKaraokeSimulationLog: "Volviendo a la pantalla de Karaoke simulada.",

    // Descripciones de atributos para la sección "Entendiendo tu Panel"
    unionDescription: "Mide la cohesión y el espíritu de equipo, indicando la capacidad de colaborar.",
    empenhoDescription: "Refleja la dedicación y productividad en las tareas, esencial para el logro de metas.",
    communicationDescription: "Evalúa la claridad y eficacia del intercambio de información, fundamental para la alineación.",
    focusDescription: "Indica la capacidad de concentración en objetivos, impactando la eficiencia del trabajo.",
    emotionalHealthDescription: "Refleja el bienestar mental del equipo, base para la resiliencia y creatividad.",
    teamHealthDescription: "Equilibrio general del equipo, ligado a Unión, Compromiso, Comunicación y Enfoque.",

    // Estado General
    generalStatus: "Estado General", // CHAVE AQUI

    // --- Nuevas traduções para o Panel del Miembro ---
    yourIndicators: "Tus Indicadores",
    performanceAndFeedbackOverview: "Resumen de Rendimiento y Retroalimentación",
    yourIndividualMetrics: "Tus Métricas Individuales",
    yourDedicationAndProductivity: "Tu dedicación y productividad.",
    yourDeliveriesAndConsistency: "Tus entregas y consistencia.",
    receivedFeedbacks: "Comentarios Recibidos",
    new: "Nuevos",
    newFeedback: "¡NUEVO!",
    read: "Leído",
    from: "De",
    subject: "Asunto",
    message: "Mensaje",
    copyMessage: "Copiar mensaje",
    receivedOn: "Recibido el",
    feedbackDetails: "Detalles del Comentario",
    noFeedbackReceivedYet: "Aún no se han recibido comentarios. ¡Sigue firme, la bendición llegará!",
    metricDetailsTitle: "Detalles de {{attribute}}",
    currentScore: "Puntuación Actual",
    strengths: "Fortalezas",
    noStrengths: "No se identificaron fortalezas.",
    weaknesses: "Debilidades",
    noWeaknesses: "No se identificaron debilidades.",
    rootCauses: "Causas Raíz",
    actionPlan: "Plan de Acción",
    noActionPlan: "No se definió ningún plan de acción.",
    deadline: "Plazo",
    proactivity: "Proactividad en nuevas tareas y desafíos.",
    highDeliveryCapacity: "Alta capacidad de entrega, superando las expectativas.",
    complexProblemSolving: "Habilidad para resolver problemas complejos de manera eficiente.",
    difficultyDelegating: "Dificultad para delegar tareas, incluso las más pequeñas.",
    tendencyToOverburden: "Tendencia a sobrecargarse con detalles.",
    excessivePerfectionismCause: "Búsqueda excesiva de la perfección y control en todas las etapas del proyecto.",
    practiceDelegation: "Practicar la delegación de tareas menos críticas.",
    nextSprint: "Próximo Sprint",
    focusOnValueDelivery: "Enfocarse en la entrega de valor y no en la perfección absoluta.",
    continuous: "Continuo",
    excellentConcentration: "Excelente concentración en tareas críticas y prioritarias.",
    consistentOnTimeDelivery: "Entrega consistente a tiempo para proyectos esenciales.",
    distractionByInterruptions: "Distracción por comunicación interna excesiva e interrupciones.",
    multitaskingInefficiency: "Multitarea en actividades no esenciales, reduciendo la eficiencia.",
    interruptionHeavyEnvironmentCause: "Ambiente de trabajo con muchas interrupciones y gestión ineficaz del tiempo.",
    establishDeepWorkBlocks: "Establecer bloques de tiempo para trabajo enfocado (Deep Work).",
    daily: "Diariamente",
    useTimeManagementTools: "Utilizar herramientas de gestión del tiempo para optimizar el flujo.",
    nextWeek: "Próxima Semana",
  },
};