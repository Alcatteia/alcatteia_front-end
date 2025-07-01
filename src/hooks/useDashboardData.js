import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { fetchDashboardData, setMockSaveCollaboratorObservation } from "../services/dashboardService";
import { translations } from "../locales/translations";
import { suggestionsByAttribute } from "../data/metricasData";
import { simulatedDashboardStates } from "../data/simulatedDashboardData";

import { FiSmile, FiMeh, FiFrown, FiBarChart2, FiUsers, FiZap, FiMessageSquare, FiTarget } from "react-icons/fi";

export const ACTION_TYPE = {
  TEXT: 'text',
  MODAL: 'modal',
  REDIRECT: 'redirect',
};

export const MODAL_ID = {
  KARAOKE: 'karaoke-modal',
};

export const REDIRECT_PATH = {
  KANBAN: '/kanban',
};

export const useDashboardData = (lang) => {
  const [metrics, setMetrics] = useState(simulatedDashboardStates[0].metrics);
  const [climate, setClimate] = useState(simulatedDashboardStates[0].climate);
  const [rawCollaborators, setRawCollaborators] = useState(simulatedDashboardStates[0].collaborators || []);
  const [lastUpdateDateTime, setLastUpdateDateTime] = useState(new Date(simulatedDashboardStates[0].lastUpdate));
  const [isLoading, setIsLoading] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const [mockHrObservations, setMockHrObservations] = useState(() => {
    const stored = localStorage.getItem('mockHrObservations');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('mockHrObservations', JSON.stringify(mockHrObservations));
  }, [mockHrObservations]);

  const previousMetricsRef = useRef(simulatedDashboardStates[0].metrics);
  const previousClimateRef = useRef(simulatedDashboardStates[0].climate);

  useEffect(() => {
    previousMetricsRef.current = metrics;
    previousClimateRef.current = climate;
  }, [metrics, climate]);

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
      (attr) => currentMetrics[attr] && typeof currentMetrics[attr].percent === 'number' && !isNaN(currentMetrics[attr].percent)
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
      (m) => currentMetrics[m] && typeof currentMetrics[m].percent === 'number' && !isNaN(currentMetrics[m].percent)
    );
    const totalHealthPercent = validMetrics.reduce(
      (sum, m) => sum + currentMetrics[m].percent,
      0
    );
    const averageHealth =
      validMetrics.length > 0
        ? parseFloat((totalHealthPercent / validMetrics.length).toFixed(0))
        : null;
    return averageHealth;
  }, []);

  const calculateTrend = useCallback((currentValue, previousValue) => {
    if (
      currentValue === null ||
      previousValue === null ||
      previousValue === undefined ||
      isNaN(currentValue) ||
      isNaN(previousValue)
    ) {
      return null;
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
    let dataToUse = null;

    try {
      dataToUse = await fetchDashboardData();
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard via serviço:", error);
      dataToUse = { ...simulatedDashboardStates[0] };
      dataToUse.lastUpdate = new Date();
    } finally {
      if (dataToUse) {
        const newMetrics = { ...dataToUse.metrics };

        const totalCurrentPositiveClimatePercent =
          (dataToUse.climate.find((item) => item.name === "Ótimo")?.percent || 0) +
          (dataToUse.climate.find((item) => item.name === "Bem")?.percent || 0);

        newMetrics.saudeEmocional = {
          ...newMetrics.saudeEmocional,
          percent: totalCurrentPositiveClimatePercent > 0 ? Math.min(totalCurrentPositiveClimatePercent, 100) : null,
        };

        setMetrics(newMetrics);
        setClimate(dataToUse.climate);
        setRawCollaborators(dataToUse.collaborators || []);
        setLastUpdateDateTime(new Date(dataToUse.lastUpdate));
      }
      setIsLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    updateDashboardData();
  }, [updateTrigger, lang, updateDashboardData]);

  const handleUpdateDashboard = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const saveMockHrObservation = useCallback((collaboratorId, observationText) => {
    setMockHrObservations(prev => ({
      ...prev,
      [collaboratorId]: observationText
    }));
    return true; // Garante que a função retorna true para indicar sucesso no modo mock
  }, []);

  useEffect(() => {
    setMockSaveCollaboratorObservation(saveMockHrObservation);
  }, [saveMockHrObservation]);

  const collaborators = useMemo(() => {
    const realApiActive = simulatedDashboardStates[0]?.realApiActive;
    if (!realApiActive && rawCollaborators) {
      return rawCollaborators.map(col => ({
        ...col,
        hrObservation: mockHrObservations[col.id] || col.hrObservation || ''
      }));
    }
    return rawCollaborators;
  }, [rawCollaborators, mockHrObservations, simulatedDashboardStates[0]?.realApiActive]);

  const currentEmotionalStatus = getEmotionalHealthStatus(climate, lang);
  const lowestAttributeKey = calculateLowestAttribute(metrics);
  const averageTeamHealth = calculateAverageTeamHealth(metrics);
  const teamHealthTrend = calculateTrend(
    averageTeamHealth,
    parseFloat(calculateAverageTeamHealth(previousMetricsRef.current))
  );

  const hrTeamMetrics = {
    saudeGeral: {
      percent: averageTeamHealth,
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
        previousMetricsRef.current.empenho?.percent
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
        previousMetricsRef.current.comunicacao?.percent
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
        previousMetricsRef.current.foco?.percent
      ),
      barColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
    },
  ];

  const dynamicSuggestionsForCard = useCallback(() => {
    let suggestions = [];

    if (lowestAttributeKey && suggestionsByAttribute[lowestAttributeKey]) {
      suggestionsByAttribute[lowestAttributeKey].forEach(textKey => {
        suggestions.push({
          textKey: textKey,
          type: ACTION_TYPE.TEXT,
          attributeKey: lowestAttributeKey,
        });
      });
    } else if (isLoading) {
      suggestions.push({ textKey: "loadingRecommendations", type: ACTION_TYPE.TEXT, attributeKey: null });
    } else {
      suggestions.push({ textKey: "noRecommendationAvailable", type: ACTION_TYPE.TEXT, attributeKey: null });
    }

    if (currentEmotionalStatus.status === 'ruim' && !suggestions.some(s => s.modalId === MODAL_ID.KARAOKE)) {
      suggestions.unshift({
        textKey: "karaokeSuggestionText",
        type: ACTION_TYPE.MODAL,
        modalId: MODAL_ID.KARAOKE,
        attributeKey: "saudeEmocionalAttr",
        contextTextKey: "toImproveEmotionalClimate",
      });
    }

    if (metrics.empenho?.percent !== null && metrics.empenho.percent < 50 &&
      !suggestions.some(s => s.redirectPath === REDIRECT_PATH.KANBAN)) {
      suggestions.unshift({
        textKey: "kanbanSuggestionText",
        type: ACTION_TYPE.REDIRECT,
        redirectPath: REDIRECT_PATH.KANBAN,
        attributeKey: "empenhoAttr",
        contextTextKey: "toTrackProgress",
      });
    }

    const uniqueSuggestions = [];
    const seenTextKeys = new Set();
    suggestions.forEach(sug => {
        const uniqueId = `${sug.textKey}-${sug.attributeKey || ''}`;
        if (!seenTextKeys.has(uniqueId)) {
            uniqueSuggestions.push(sug);
            seenTextKeys.add(uniqueId);
        }
    });

    return uniqueSuggestions;
  }, [
    lowestAttributeKey,
    currentEmotionalStatus.status,
    metrics.empenho?.percent,
    isLoading,
    metrics
  ]);

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
    suggestions: dynamicSuggestionsForCard(),
    metricCards,
    realApiActive: simulatedDashboardStates[0]?.realApiActive,
  };
};