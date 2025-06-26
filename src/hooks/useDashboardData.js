// src/hooks/useDashboardData.js

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchDashboardData } from "../services/dashboardService";
import { translations } from "../locales/translations";
import { initialMetrics, detailedClimateData, suggestionsByAttribute } from "../data/metricasData";

/**
 * @file Hook personalizado para gerenciar dados e lógica do dashboard.
 * @description
 * Este hook encapsula a busca, o processamento e o estado dos dados exibidos no dashboard,
 * incluindo métricas de desempenho, clima organizacional e tendências.
 * Ele integra dados iniciais de `metricasData.js` e expõe um conjunto de estados e funções
 * para fácil consumo por componentes React.
 */

// Importações dos ícones da biblioteca react-icons/fi
import { FiSmile, FiMeh, FiFrown, FiBarChart2, FiUsers, FiZap, FiMessageSquare, FiTarget } from "react-icons/fi";

export const useDashboardData = (lang) => {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [climate, setClimate] = useState(detailedClimateData);
  const [lastUpdateDateTime, setLastUpdateDateTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Este estado será o gatilho para a atualização

  // Estes useRefs guardarão os *últimos* valores de metrics e climate ANTES de uma nova busca
  const previousMetricsRef = useRef(initialMetrics);
  const previousClimateRef = useRef(detailedClimateData);

  // Funções de cálculo (podem ficar com useCallback e suas dependências como estão)
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

  // *** ALTERAÇÃO CHAVE AQUI NO updateDashboardData useCallback ***
  const updateDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use o "callback form" do setState para obter o estado mais recente
      // e então atribuí-lo ao useRef ANTES da nova busca.
      // Isso evita que 'metrics' e 'climate' se tornem dependências do useCallback
      setMetrics(prevMetrics => {
        previousMetricsRef.current = prevMetrics; // Captura o valor atual ANTES da atualização
        return prevMetrics; // Retorna o mesmo valor para não triggar uma re-render desnecessária
      });
      setClimate(prevClimate => {
        previousClimateRef.current = prevClimate; // Captura o valor atual ANTES da atualização
        return prevClimate; // Retorna o mesmo valor
      });


      const data = await fetchDashboardData();

      const newMetrics = { ...data.metrics };

      const totalCurrentPositiveClimatePercent =
        (data.climate.find((item) => item.name === "Ótimo")?.percent || 0) +
        (data.climate.find((item) => item.name === "Bem")?.percent || 0);

      newMetrics.saudeEmocional = {
        ...newMetrics.saudeEmocional,
        percent: totalCurrentPositiveClimatePercent > 0 ? totalCurrentPositiveClimatePercent : null,
      };

      setMetrics(newMetrics); // Atualiza com os novos dados
      setClimate(data.climate); // Atualiza com os novos dados
      setLastUpdateDateTime(data.lastUpdate ? new Date(data.lastUpdate) : null);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // <--- ARRAY DE DEPENDÊNCIAS VAZIO! updateDashboardData é agora estável.

  // O useEffect agora só dispara quando `updateTrigger` muda
  // E também uma vez ao montar o componente (quando updateTrigger é 0)
  // Adicionamos `lang` para que a dashboard recarregue se o idioma mudar.
  useEffect(() => {
    // Isso garante que a primeira busca aconteça ao montar
    // e que buscas subsequentes só ocorram no clique do botão.
    updateDashboardData();
  }, [updateTrigger, lang, updateDashboardData]); // `updateDashboardData` é estável, então não causará loop.

  const handleUpdateDashboard = () => {
    setUpdateTrigger((prev) => prev + 1); // Incrementa o gatilho, disparando o useEffect
  };

  // Cálculos que dependem dos estados (metrics, climate)
  // Eles serão recalculados a cada render, o que é o esperado
  const currentEmotionalStatus = getEmotionalHealthStatus(climate, lang);
  const lowestAttributeKey = calculateLowestAttribute(metrics);
  const averageTeamHealth = calculateAverageTeamHealth(metrics);
  const teamHealthTrend = calculateTrend(
    parseFloat(averageTeamHealth),
    parseFloat(calculateAverageTeamHealth(previousMetricsRef.current))
  );

  // ... (metricCards - sem mudanças aqui) ...
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
    lastUpdateDateTime,
    isLoading,
    handleUpdateDashboard,
    currentEmotionalStatus,
    lowestAttributeKey,
    averageTeamHealth,
    teamHealthTrend,
    suggestionsByAttribute,
    metricCards,
  };
};