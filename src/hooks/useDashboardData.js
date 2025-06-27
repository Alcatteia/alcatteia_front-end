// src/hooks/useDashboardData.js

/**
 * @file Hook personalizado para gerenciar dados e lógica do dashboard.
 * @description
 * Este hook encapsula a busca, o processamento e o estado dos dados exibidos nos dashboards (Líder e RH),
 * incluindo métricas de desempenho (união, empenho, comunicação, foco), clima organizacional,
 * métricas gerais da equipe (saúde e engajamento), lista de colaboradores e tendências.
 * Ele integra dados iniciais e expõe um conjunto de estados e funções para fácil consumo por componentes React.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import { translations } from "../locales/translations";
import { initialMetrics, detailedClimateData, suggestionsByAttribute } from "../data/metricasData";

import { FiSmile, FiMeh, FiFrown, FiBarChart2, FiUsers, FiZap, FiMessageSquare, FiTarget } from "react-icons/fi";

export const useDashboardData = (lang) => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [climate, setClimate] = useState(detailedClimateData);
  const [collaborators, setCollaborators] = useState([]);
  const [lastUpdateDateTime, setLastUpdateDateTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const previousMetricsRef = useRef(initialMetrics);
  const previousClimateRef = useRef(detailedClimateData);

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
    []
  );

  const getEmotionalHealthStatus = useCallback(
    (detailedClimate, currentLang) => {
      const emotionalHealthGuidelines = getEmotionalHealthGuidelines(currentLang);

      if (!detailedClimate || detailedClimate.length === 0) {
        return emotionalHealthGuidelines.neutro;
      }

      const cansadoPercent = detailedClimate.find((e) => e.name === "Cansado")?.percent || 0;
      const estressadoPercent = detailedClimate.find((e) => e.name === "Estressado")?.percent || 0;
      const otimoPercent = detailedClimate.find((e) => e.name === "Ótimo")?.percent || 0;
      const bemPercent = detailedClimate.find((e) => e.name === "Bem")?.percent || 0;

      const negativoTotal = cansadoPercent + estressadoPercent;
      const positivoTotal = otimoPercent + bemPercent;

      if (negativoTotal >= 50) {
        return emotionalHealthGuidelines.ruim;
      } else if (negativoTotal >= 25 && negativoTotal < 50) {
        return emotionalHealthGuidelines.medio;
      } else if (positivoTotal >= 70) {
        return emotionalHealthGuidelines.bom;
      } else if (positivoTotal >= 50 && negativoTotal < 25) {
        return emotionalHealthGuidelines.medio;
      }

      return emotionalHealthGuidelines.neutro;
    },
    [getEmotionalHealthGuidelines]
  );

  const calculateLowestAttribute = useCallback((currentMetrics) => {
    const attributesToCheck = ["uniao", "comunicacao", "empenho", "foco"];
    let lowest = null;
    let lowestPercent = Infinity;

    const availableMetrics = attributesToCheck.filter(
      (attr) => currentMetrics[attr] && currentMetrics[attr].percent !== null
    );

    if (availableMetrics.length === 0) {
      return null;
    }

    availableMetrics.forEach((attr) => {
      const metric = currentMetrics[attr];
      if (metric.percent !== null && metric.percent < lowestPercent) {
        lowestPercent = metric.percent;
        lowest = attr;
      }
    });

    if (lowestPercent === 0 && availableMetrics.length > 0) {
      return availableMetrics[0];
    }

    return lowest;
  }, []);

  const calculateAverageTeamHealth = useCallback((currentMetrics) => {
    // Lógica de cálculo para métrica da saúde geral da equipe:
    // A "saúde geral da equipe" é calculada como a média aritmética simples
    // das métricas de "união", "comunicação", "empenho" e "foco".
    // Cada um desses atributos contribui igualmente para a saúde geral nesta versão.
    // Esta lógica pode ser revisada pela equipe de produção para definir pesos diferentes
    // ou incluir outros atributos relevantes.
    const attributesForTeamHealth = ["uniao", "comunicacao", "empenho", "foco"];
    const validMetrics = attributesForTeamHealth.filter(
      (m) => currentMetrics[m] && currentMetrics[m].percent !== null
    );
    const totalHealthPercent = validMetrics.reduce(
      (sum, m) => sum + currentMetrics[m].percent,
      0
    );
    const averageHealth =
      validMetrics.length > 0
        ? (totalHealthPercent / validMetrics.length).toFixed(0)
        : null;
    return averageHealth;
  }, []);

  const calculateTrend = useCallback((currentValue, previousValue) => {
    if (
      currentValue === null ||
      previousValue === null ||
      previousValue === undefined
    ) {
      return "---";
    }

    const diff = currentValue - previousValue;

    if (diff > 0) {
      return `+${diff.toFixed(0)}pp`;
    } else if (diff < 0) {
      return `${diff.toFixed(0)}pp`;
    } else {
      return "---";
    }
  }, []);


  const updateDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Captura os valores atuais dos estados ANTES de buscar novos dados.
      // Estes valores são atualizados diretamente na ref, e as refs não são dependências
      // do useCallback, tornando updateDashboardData estável.
      previousMetricsRef.current = metrics;
      previousClimateRef.current = climate;

      const data = await fetchDashboardData();

      const newMetrics = { ...data.metrics };

      const totalCurrentPositiveClimatePercent =
        (data.climate.find((item) => item.name === "Ótimo")?.percent || 0) +
        (data.climate.find((item) => item.name === "Bem")?.percent || 0);

      newMetrics.saudeEmocional = {
        ...newMetrics.saudeEmocional,
        percent: totalCurrentPositiveClimatePercent > 0 ? totalCurrentPositiveClimatePercent : null,
      };

      setMetrics(newMetrics);
      setClimate(data.climate);
      setCollaborators(data.collaborators || []);
      setLastUpdateDateTime(data.lastUpdate ? new Date(data.lastUpdate) : null);
    } catch (error) {
      console.error("Falha ao buscar dados do dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // CORREÇÃO: Array de dependências vazio para `updateDashboardData`


  useEffect(() => {
    updateDashboardData();
  }, [updateTrigger, lang, updateDashboardData]);

  const handleUpdateDashboard = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  // Cálculos que dependem dos estados (metrics, climate, collaborators)
  const currentEmotionalStatus = getEmotionalHealthStatus(climate, lang);
  const lowestAttributeKey = calculateLowestAttribute(metrics);
  const averageTeamHealth = calculateAverageTeamHealth(metrics);
  const teamHealthTrend = calculateTrend(
    parseFloat(averageTeamHealth),
    parseFloat(calculateAverageTeamHealth(previousMetricsRef.current))
  );

  // Métricas gerais para o Dashboard de RH (saúde e engajamento)
  const hrTeamMetrics = {
    saudeGeral: {
      percent: averageTeamHealth ? parseFloat(averageTeamHealth) : null,
      trend: teamHealthTrend
    },
    engajamento: {
      percent: metrics.empenho?.percent !== null ? metrics.empenho.percent : null,
      trend: calculateTrend(
        metrics.empenho?.percent,
        previousMetricsRef.current.empenho?.percent
      )
    },
  };

  const metricCards = [
    {
      id: "uniao",
      titleKey: "uniaoAttr",
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
      titleKey: "empenhoAttr",
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
      titleKey: "comunicacaoAttr",
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
      titleKey: "focoAttr",
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

  return {
    metrics,
    climate,
    collaborators,
    lastUpdateDateTime,
    isLoading,
    handleUpdateDashboard,
    currentEmotionalStatus,
    lowestAttributeKey,
    averageTeamHealth,
    teamHealthTrend,
    hrTeamMetrics,
    suggestionsByAttribute,
    metricCards,
  };
};
