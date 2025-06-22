import React, { useState, useEffect, useRef, useCallback } from "react";

// Importações de componentes com base na estrutura de pastas: src/pages/Dashboard/components
import MetricCard from "./components/MetricCard";
import TeamHealthCard from "./components/TeamHealthCard";
import EmotionalHealthCard from "./components/EmotionalHealthCard";
import RecommendationCard from "./components/RecommendationCard";
import Modal from "./components/Modal";
import LanguageSwitcher from "./components/LanguageSwitcher";

// Importações de ícones da biblioteca react-icons/fi
import {
  FiInfo,
  FiUsers,
  FiZap,
  FiMessageSquare,
  FiTarget,
  FiHeart,
  FiSmile,
  FiMeh,
  FiFrown,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

// Importação das traduções com base na estrutura de pastas: src/locales/translations
import { translations } from "./locales/translations";

/**
 * Hook personalizado para facilitar a tradução de textos.
 *
 * @param {string} lang - O idioma atual selecionado.
 * @returns {function(string): string} Uma função que retorna a tradução para uma dada chave.
 */
const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      // Retorna a tradução se a chave existir para o idioma, caso contrário, retorna a própria chave.
      return translations[lang] && translations[lang][key] !== undefined
        ? translations[lang][key]
        : key;
    },
    [lang] // Recria a função `t` apenas quando o idioma `lang` muda.
  );
};

/**
 * Estrutura inicial para os dados das métricas.
 * Cada métrica possui um percentual, um atributo para tradução, e detalhes para análise.
 */
const initialMetrics = {
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

/**
 * Dados detalhados do clima organizacional, com percentuais iniciais zerados.
 */
const detailedClimateData = [
  { name: "Ótimo", percent: 0 },
  { name: "Bem", percent: 0 },
  { name: "Cansado", percent: 0 },
  { name: "Estressado", percent: 0 },
];

/**
 * Objeto contendo sugestões de ações para cada atributo de métrica.
 * Usado para popular o componente RecommendationCard.
 */
const suggestionsByAttribute = {
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

/**
 * Formata um objeto Date para uma string de data e hora no formato 'dd/mm/yyyy hh:MM:ss'.
 *
 * @param {Date} date - O objeto Date a ser formatado.
 * @returns {string} A data e hora formatada ou uma string vazia se a data for nula.
 */
const formatDateTime = (date) => {
  if (!date) return "";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};

/**
 * Componente LeaderDashboard.
 * Exibe um dashboard com métricas de equipe, saúde emocional, recomendações e informações gerais.
 * Gerencia o estado das métricas, clima e interações com modais.
 */
export default function LeaderDashboard() {
  /**
   * Estado para o idioma da aplicação, inicializado a partir do localStorage ou 'pt'.
   */
  const [lang, setLang] = useState(
    () => localStorage.getItem("appLang") || "pt"
  );
  /**
   * Hook de tradução para obter textos no idioma selecionado.
   */
  const t = useTranslation(lang);

  /**
   * Memoiza as diretrizes de saúde emocional para evitar recriações desnecessárias.
   *
   * @param {string} currentLang - O idioma atual para buscar as traduções.
   * @returns {object} Um objeto contendo status, cores, ícones, descrições e ações para diferentes níveis de saúde emocional.
   */
  const getEmotionalHealthGuidelines = useCallback(
    (currentLang) => ({
      bom: {
        status: translations[currentLang].goodEmotionalStatus,
        color: "text-gray-300",
        icon: FiSmile,
        description: translations[currentLang].goodEmotionalDescription,
        actions: translations[currentLang].goodEmotionalActions,
      },
      medio: {
        status: translations[currentLang].mediumEmotionalStatus,
        color: "text-gray-300",
        icon: FiMeh,
        description: translations[currentLang].mediumEmotionalDescription,
        actions: translations[currentLang].mediumEmotionalActions,
      },
      ruim: {
        status: translations[currentLang].badEmotionalStatus,
        color: "text-gray-300",
        icon: FiFrown,
        description: translations[currentLang].badEmotionalDescription,
        actions: translations[currentLang].badEmotionalActions,
      },
      neutro: {
        status: translations[currentLang].notEvaluatedEmotionalStatus,
        color: "text-gray-300",
        icon: FiBarChart2,
        description: translations[currentLang].notEvaluatedEmotionalDescription,
        actions: translations[currentLang].notEvaluatedEmotionalActions,
      },
    }),
    [] // Dependência vazia: as diretrizes só mudam com o `translations` que é importado.
  );

  /**
   * Determina o status da saúde emocional com base nos dados de clima detalhados.
   *
   * @param {Array<object>} detailedClimate - Array de objetos de clima com nome e percentual.
   * @param {string} currentLang - O idioma atual para obter as diretrizes.
   * @returns {object} O objeto de diretrizes que corresponde ao status emocional calculado.
   */
  const getEmotionalHealthStatus = useCallback(
    (detailedClimate, currentLang) => {
      const emotionalHealthGuidelines =
        getEmotionalHealthGuidelines(currentLang);

      // Retorna status neutro se não houver dados de clima.
      if (!detailedClimate || detailedClimate.length === 0) {
        return emotionalHealthGuidelines.neutro;
      }

      // Extrai percentuais de cada estado de humor.
      const cansadoPercent =
        detailedClimate.find((e) => e.name === "Cansado")?.percent || 0;
      const estressadoPercent =
        detailedClimate.find((e) => e.name === "Estressado")?.percent || 0;
      const otimoPercent =
        detailedClimate.find((e) => e.name === "Ótimo")?.percent || 0;
      const bemPercent =
        detailedClimate.find((e) => e.name === "Bem")?.percent || 0;

      // Calcula o total de percentuais negativos e positivos.
      const negativoTotal = cansadoPercent + estressadoPercent;
      const positivoTotal = otimoPercent + bemPercent;

      // Retorna o status emocional com base nas regras de percentual.
      if (negativoTotal >= 50) {
        return emotionalHealthGuidelines.ruim;
      } else if (negativoTotal >= 25 && negativoTotal < 50) {
        return emotionalHealthGuidelines.medio;
      } else if (positivoTotal >= 70) {
        return emotionalHealthGuidelines.bom;
      } else if (positivoTotal >= 50 && negativoTotal < 25) {
        return emotionalHealthGuidelines.medio;
      }

      // Retorno padrão caso nenhuma condição seja atendida.
      return emotionalHealthGuidelines.medio;
    },
    [getEmotionalHealthGuidelines] // Depende da função memoizada `getEmotionalHealthGuidelines`.
  );

  /**
   * Calcula o atributo com o menor percentual entre união, comunicação, empenho e foco.
   *
   * @param {object} metrics - Objeto contendo todas as métricas da equipe.
   * @returns {string|null} A chave do atributo com o menor percentual ou null se não houver dados válidos.
   */
  const calculateLowestAttribute = (metrics) => {
    const attributesToCheck = ["uniao", "comunicacao", "empenho", "foco"];
    let lowest = null;
    let lowestPercent = Infinity;

    // Filtra apenas as métricas que possuem um percentual válido.
    const availableMetrics = attributesToCheck.filter(
      (attr) => metrics[attr] && metrics[attr].percent !== null
    );

    if (availableMetrics.length === 0) {
      return null;
    }

    // Itera sobre as métricas disponíveis para encontrar a de menor percentual.
    availableMetrics.forEach((attr) => {
      const metric = metrics[attr];
      if (metric.percent < lowestPercent) {
        lowestPercent = metric.percent;
        lowest = attr;
      }
    });

    // Caso todos os percentuais sejam 0, retorna o primeiro atributo disponível.
    if (lowestPercent === 0 && availableMetrics.length > 0) {
      return availableMetrics[0];
    }

    return lowest;
  };

  /**
   * Calcula a média dos percentuais de saúde da equipe (união, comunicação, empenho, foco).
   *
   * @param {object} metrics - Objeto contendo todas as métricas da equipe.
   * @returns {string|null} A média arredondada ou null se não houver métricas válidas.
   */
  const calculateAverageTeamHealth = (metrics) => {
    const attributesForTeamHealth = ["uniao", "comunicacao", "empenho", "foco"];
    // Filtra as métricas válidas para o cálculo da média.
    const validMetrics = attributesForTeamHealth.filter(
      (m) => metrics[m].percent !== null
    );
    // Soma os percentuais das métricas válidas.
    const totalHealthPercent = validMetrics.reduce(
      (sum, m) => sum + metrics[m].percent,
      0
    );
    // Calcula a média e a arredonda.
    const averageHealth =
      validMetrics.length > 0
        ? (totalHealthPercent / validMetrics.length).toFixed(0)
        : null;
    return averageHealth;
  };

  /**
   * Calcula a tendência de uma métrica comparando o valor atual com um valor anterior.
   *
   * @param {number|null} currentValue - O valor atual da métrica.
   * @param {number|null|undefined} previousValue - O valor anterior da métrica.
   * @returns {string} Uma string indicando a diferença percentual (positiva, negativa ou neutra).
   */
  const calculateTrend = useCallback((currentValue, previousValue) => {
    // Retorna "---" se os valores forem nulos ou indefinidos.
    if (
      currentValue === null ||
      previousValue === null ||
      previousValue === undefined
    ) {
      return "---";
    }

    const diff = currentValue - previousValue;

    // Retorna a diferença formatada com "pp" (pontos percentuais).
    if (diff > 0) {
      return `+${diff.toFixed(0)}pp`;
    } else if (diff < 0) {
      return `${diff.toFixed(0)}pp`;
    } else {
      return "---";
    }
  }, []); // Dependência vazia, pois a função não depende de estados ou props.

  /**
   * Estado para as métricas da equipe, inicializado com `initialMetrics`.
   */
  const [metrics, setMetrics] = useState(initialMetrics);
  /**
   * Estado para os dados de clima emocional, inicializado com `detailedClimateData`.
   */
  const [climate, setClimate] = useState(detailedClimateData);
  /**
   * Estado para controlar qual modal está ativo.
   */
  const [activeModal, setActiveModal] = useState(null);
  /**
   * Estado para os dados a serem exibidos no modal.
   */
  const [modalData, setModalData] = useState(null);
  /**
   * Estado para a data e hora da última atualização dos dados.
   */
  const [lastUpdateDateTime, setLastUpdateDateTime] = useState(null);
  /**
   * Estado para controlar um "gatilho" de atualização de dados, usado para simular novas buscas.
   */
  const [updateTrigger, setUpdateTrigger] = useState(0);
  /**
   * Estado para controlar o estado de carregamento dos dados.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Ref para armazenar o estado anterior das métricas, permitindo o cálculo da tendência.
   */
  const previousMetricsRef = useRef(initialMetrics);
  /**
   * Ref para armazenar o estado anterior dos dados de clima.
   */
  const previousClimateRef = useRef(detailedClimateData);

  /**
   * Estado para o nome da equipe.
   */
  const [teamName] = useState("Alcatteia");

  /**
   * Efeito colateral para salvar o idioma selecionado no localStorage sempre que 'lang' mudar.
   */
  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  /**
   * Handler para a mudança de idioma.
   *
   * @param {string} newLang - O novo idioma selecionado.
   */
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  /**
   * Função assíncrona para simular a busca de dados de uma API.
   * Atualiza as métricas e os dados de clima com base no valor do 'currentTriggerValue'.
   *
   * @param {number} currentTriggerValue - O valor do gatilho de atualização que determina qual conjunto de dados será retornado.
   */
  const fetchDataFromApi = async (currentTriggerValue) => {
    setIsLoading(true); // Define o estado de carregamento como verdadeiro.
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula um atraso de rede.

    let newMetricsData;
    let newClimateData;

    // Lógica para simular diferentes conjuntos de dados com base no 'currentTriggerValue'.
    if (currentTriggerValue % 3 === 0) {
      newMetricsData = {
        uniao: { ...initialMetrics.uniao, percent: 50 },
        empenho: { ...initialMetrics.empenho, percent: 65 },
        comunicacao: { ...initialMetrics.comunicacao, percent: 70 },
        foco: { ...initialMetrics.foco, percent: 40 },
        saudeEmocional: { ...initialMetrics.saudeEmocional, percent: null },
      };
      newClimateData = [
        { name: "Ótimo", percent: 40 },
        { name: "Bem", percent: 30 },
        { name: "Cansado", percent: 20 },
        { name: "Estressado", percent: 10 },
      ];
    } else if (currentTriggerValue % 3 === 1) {
      newMetricsData = {
        uniao: { ...initialMetrics.uniao, percent: 75 },
        empenho: { ...initialMetrics.empenho, percent: 50 },
        comunicacao: { ...initialMetrics.comunicacao, percent: 70 },
        foco: { ...initialMetrics.foco, percent: 45 },
        saudeEmocional: { ...initialMetrics.saudeEmocional, percent: null },
      };
      newClimateData = [
        { name: "Ótimo", percent: 50 },
        { name: "Bem", percent: 35 },
        { name: "Cansado", percent: 10 },
        { name: "Estressado", percent: 5 },
      ];
    } else {
      newMetricsData = {
        uniao: { ...initialMetrics.uniao, percent: 70 },
        empenho: { ...initialMetrics.empenho, percent: 55 },
        comunicacao: { ...initialMetrics.comunicacao, percent: 68 },
        foco: { ...initialMetrics.foco, percent: 20 },
        saudeEmocional: { ...initialMetrics.saudeEmocional, percent: null },
      };
      newClimateData = [
        { name: "Ótimo", percent: 35 },
        { name: "Bem", percent: 40 },
        { name: "Cansado", percent: 15 },
        { name: "Estressado", percent: 10 },
      ];
    }

    // Calcula o percentual de saúde emocional com base nos novos dados de clima.
    const totalCurrentPositiveClimatePercent =
      (newClimateData.find((item) => item.name === "Ótimo")?.percent || 0) +
      (newClimateData.find((item) => item.name === "Bem")?.percent || 0);
    const newSaudeEmocionalPercent =
      totalCurrentPositiveClimatePercent > 0
        ? totalCurrentPositiveClimatePercent
        : null;

    // Salva o estado atual (que se tornará o 'anterior') antes de atualizar os estados.
    previousMetricsRef.current = metrics;
    previousClimateRef.current = climate;

    // Atualiza o estado das métricas, incluindo o percentual de saúde emocional e o percentual anterior.
    setMetrics((prev) => ({
      ...newMetricsData,
      saudeEmocional: {
        ...prev.saudeEmocional,
        percent: newSaudeEmocionalPercent,
        previousPercent:
          (previousClimateRef.current.find((item) => item.name === "Ótimo")
            ?.percent || 0) +
          (previousClimateRef.current.find((item) => item.name === "Bem")
            ?.percent || 0),
      },
    }));
    // Atualiza o estado dos dados de clima.
    setClimate(newClimateData);
    // Define a data e hora da última atualização.
    setLastUpdateDateTime(new Date());
    setIsLoading(false); // Define o estado de carregamento como falso após a conclusão da busca.
  };

  /**
   * Efeito colateral para buscar os dados iniciais quando o componente é montado.
   * Executa a função `fetchDataFromApi` apenas uma vez.
   */
  useEffect(() => {
    fetchDataFromApi(updateTrigger); // Inicia com o valor de `updateTrigger` (0).
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem.

  /**
   * Função para lidar com o clique do botão de atualização do dashboard.
   * Incrementa o 'updateTrigger' e dispara uma nova busca de dados.
   */
  const handleUpdateDashboard = () => {
    setUpdateTrigger((prev) => {
      const newTriggerValue = prev + 1; // Incrementa o gatilho.
      fetchDataFromApi(newTriggerValue); // Chama a função de busca com o novo valor do gatilho.
      return newTriggerValue; // Retorna o novo valor para o estado.
    });
  };

  /**
   * Determina o status emocional atual da equipe.
   */
  const currentEmotionalStatus = getEmotionalHealthStatus(climate, lang);
  /**
   * Encontra a chave do atributo com a menor pontuação.
   */
  const lowestAttributeKey = calculateLowestAttribute(metrics);
  /**
   * Traduz o nome do atributo de menor pontuação ou exibe uma mensagem de carregamento.
   */
  const lowestAttributeTranslatedName = lowestAttributeKey
    ? t(metrics[lowestAttributeKey].atributo)
    : t("loadingRecommendations");

  /**
   * Calcula a saúde média da equipe.
   */
  const averageHealth = calculateAverageTeamHealth(metrics);
  /**
   * Calcula a saúde média da equipe a partir dos dados anteriores.
   */
  const previousAverageHealth = calculateAverageTeamHealth(
    previousMetricsRef.current
  );
  /**
   * Calcula a tendência da saúde média da equipe.
   */
  const teamHealthTrend = calculateTrend(
    parseFloat(averageHealth),
    parseFloat(previousAverageHealth)
  );

  /**
   * Array de objetos para configurar os cartões de métrica individuais.
   * Inclui título, ícone, percentual, tendência e cores.
   */
  const metricCards = [
    {
      id: "uniao",
      title: t("uniaoAttr"),
      icon: FiUsers,
      percent: metrics.uniao.percent,
      trend: calculateTrend(
        metrics.uniao.percent,
        previousMetricsRef.current.uniao.percent
      ),
      barColor: "bg-blue-500",
      borderColor: "border-blue-500",
    },
    {
      id: "empenho",
      title: t("empenhoAttr"),
      icon: FiZap,
      percent: metrics.empenho.percent,
      trend: calculateTrend(
        metrics.empenho.percent,
        previousMetricsRef.current.empenho.percent
      ),
      barColor: "bg-pink-500",
      borderColor: "border-pink-500",
    },
    {
      id: "comunicacao",
      title: t("comunicacaoAttr"),
      icon: FiMessageSquare,
      percent: metrics.comunicacao.percent,
      trend: calculateTrend(
        metrics.comunicacao.percent,
        previousMetricsRef.current.comunicacao.percent
      ),
      barColor: "bg-orange-500",
      borderColor: "border-orange-500",
    },
    {
      id: "foco",
      title: t("focoAttr"),
      icon: FiTarget,
      percent: metrics.foco.percent,
      trend: calculateTrend(
        metrics.foco.percent,
        previousMetricsRef.current.foco.percent
      ),
      barColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
    },
  ];

  return (
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center overflow-y-auto">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 h-full">
        {/* Seção de Título, Subtítulo e Botões de Ação (Atualizar e Trocar Idioma) */}
        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex items-center justify-between">
          <div>
            {/* Título principal do Dashboard do Líder. */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t("leaderDashboardTitle")}
            </h1>
            {/* Subtítulo do Dashboard. */}
            <p className="text-gray-400 text-lg mt-1">
              {t("leaderDashboardSubtitle")}
            </p>
          </div>
          {/* Contêiner para os botões de ação. */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Botão de atualização do dashboard.
                Exibe um spinner e desabilita o botão enquanto os dados estão sendo carregados. */}
            <button
              onClick={handleUpdateDashboard}
              className={`w-full sm:w-auto bg-purple-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                // Ícone de spinner para indicar carregamento.
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                // Ícone de atualização quando não está carregando.
                <FiRefreshCw className="w-5 h-5" />
              )}
              {/* Texto do botão que muda com base no estado de carregamento. */}
              {isLoading ? t("updatingButton") : t("updateButton")}
            </button>

            {/* Componente para troca de idioma. */}
            <LanguageSwitcher
              currentLang={lang}
              onLanguageChange={handleLanguageChange}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Informações da Equipe e Última Atualização */}
        <div className="text-right -mt-6 mb-4">
          {/* Nome da equipe. */}
          <p className="text-xl font-bold text-white">
            {t("teamNamePrefix")}: {teamName}
          </p>
          {/* Subtítulo indicando visualização detalhada. */}
          <p className="text-gray-500 text-sm">{t("detailedView")}</p>
          {/* Exibe a data da última atualização se disponível. */}
          {lastUpdateDateTime && (
            <p className="text-gray-500 text-xs mt-1">
              {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
            </p>
          )}
        </div>

        {/* Seção principal de cartões de métricas e recomendações */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Linha superior de cartões (Saúde da Equipe e Recomendações) */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Cartão da Saúde Geral da Equipe. */}
            <TeamHealthCard
              percent={averageHealth}
              tendencia={teamHealthTrend}
              className="w-full md:w-[calc(40%-8px)] md:flex-shrink-0"
              t={t}
            />

            {/* Cartão de Recomendações baseado no atributo de menor pontuação. */}
            <RecommendationCard
              atributo={lowestAttributeTranslatedName}
              sugestoes={
                lowestAttributeKey
                  ? suggestionsByAttribute[lowestAttributeKey]
                  : [t("loadingRecommendations")]
              }
              onVerMais={() => {
                // Abre o modal de recomendações se houver um atributo de menor pontuação e percentual válido.
                if (
                  lowestAttributeKey &&
                  metrics[lowestAttributeKey].percent !== null
                ) {
                  setModalData(metrics[lowestAttributeKey]);
                  setActiveModal("recommendations-modal");
                }
              }}
              className="w-full md:w-[calc(60%-8px)] md:flex-shrink-0"
              t={t}
            />
          </div>

          {/* Linha inferior de cartões (Saúde Emocional e Métricas Individuais) */}
          <div className="flex flex-col md:flex-row gap-4 flex-1 items-stretch">
            {/* Cartão de Saúde Emocional. */}
            <EmotionalHealthCard
              percent={metrics.saudeEmocional.percent}
              status={currentEmotionalStatus.status}
              statusColor={currentEmotionalStatus.color}
              statusIcon={currentEmotionalStatus.icon}
              detailedClimate={climate}
              className="w-full md:w-[calc(40%-8px)] md:flex-shrink-0"
              t={t}
              title={t("saudeEmocionalAttr")}
            />

            {/* Contêiner para os cartões de métricas individuais (União, Empenho, Comunicação, Foco). */}
            <div className="flex flex-col gap-4 w-full md:w-[calc(60%-8px)] md:flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Mapeia e renderiza cada MetricCard. */}
                {metricCards.map((card) => (
                  <MetricCard
                    key={card.id}
                    card={card}
                    icon={card.icon}
                    className="w-full h-full"
                    t={t}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO "ENTENDA SEU DASHBOARD" */}
        <h2 className="text-3xl md:text-3xl font-extrabold text-white tracking-tight text-center mt-6 mb-4">
          <FiInfo className="inline-block w-8 h-8 mr-3 text-white align-middle" />
          {t("understandDashboard")}
        </h2>

        {/* Grids para as descrições gerais do dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card de Visão Geral. */}
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col md:col-span-1">
            <div className="flex-auto">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("overviewTitle")}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {t("overviewDescription")}
              </p>
            </div>
          </div>

          {/* Card de Slogan/Propósito. */}
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col md:col-span-1">
            <div className="flex-auto">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("sloganTitle")}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {t("sloganDescription")}
              </p>
            </div>
          </div>

          {/* Seção de descrições detalhadas dos atributos individuais. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:col-span-2">
            {/* Descrição do atributo União. */}
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiUsers className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-400">
                    {t("uniaoAttr")}
                  </p>
                  <p className="text-sm text-white">{t("unionDescription")}</p>
                </div>
              </div>
            </div>
            {/* Descrição do atributo Empenho. */}
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiZap className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-pink-400">
                    {t("empenhoAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("empenhoDescription")}
                  </p>
                </div>
              </div>
            </div>
            {/* Descrição do atributo Comunicação. */}
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiMessageSquare className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-orange-400">
                    {t("comunicacaoAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("communicationDescription")}
                  </p>
                </div>
              </div>
            </div>
            {/* Descrição do atributo Foco. */}
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiTarget className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-400">
                    {t("focoAttr")}
                  </p>
                  <p className="text-sm text-white">{t("focusDescription")}</p>
                </div>
              </div>
            </div>
            {/* Descrição do atributo Saúde Emocional. */}
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiBarChart2 className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-purple-400">
                    {t("saudeEmocionalAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("emotionalHealthDescription")}
                  </p>
                </div>
              </div>
            </div>
            {/* Descrição do atributo Saúde da Equipe. */}
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiHeart className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-green-400">
                    {t("saudeEquipeAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("teamHealthDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Recomendações */}
        <Modal
          isOpen={activeModal === "recommendations-modal"}
          onClose={() => setActiveModal(null)}
          title={
            // Título do modal, que muda dependendo se há um atributo de menor pontuação ou se está carregando.
            lowestAttributeKey &&
            metrics[lowestAttributeKey] &&
            metrics[lowestAttributeKey].percent !== null ? (
              <span className="text-white">
                {t("recommendationsFor")}{" "}
                {t(metrics[lowestAttributeKey].atributo)}
              </span>
            ) : (
              <span className="text-white">{t("recommendations")}</span>
            )
          }
          footerContent={
            // Conteúdo do rodapé do modal, exibindo a data da última atualização.
            lastUpdateDateTime &&
            lowestAttributeKey &&
            metrics[lowestAttributeKey].percent !== null ? (
              <p className="text-gray-500 text-sm mt-4 border-t border-gray-700 pt-3">
                {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
              </p>
            ) : null
          }
        >
          {/* Conteúdo principal do modal, exibindo as sugestões ou uma mensagem de carregamento. */}
          {lowestAttributeKey &&
          metrics[lowestAttributeKey] &&
          metrics[lowestAttributeKey].percent !== null ? (
            <ul className="list-disc list-inside text-gray-200">
              {suggestionsByAttribute[lowestAttributeKey].map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-4">
              {t("loadingRecommendations")}
            </p>
          )}
        </Modal>
      </div>
    </main>
  );
}