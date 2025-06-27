// src/pages/Dashboard/LeaderDashboard.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useDashboardData } from "../../hooks/useDashboardData";

import MetricCard from "./components/LeaderMetricCard";
import TeamHealthCard from "./components/LeaderTeamHealthCard";
import EmotionalHealthCard from "./components/LeaderEmotionalHealthCard";
import LeaderRecommendationCard from "./components/LeaderRecommendationCard";
import Modal from "./components/Modal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import InfoDashboard from "./components/LeaderInfoDashboard";
import ReportTeam from "./components/LeaderReportTeam";
import LeaderSingleSuggestionDetailModal from "./components/LeaderSingleSuggestionDetailModal";

import { formatDateTime } from "../../utils/dashboardUtils";
import { translations } from "../../locales/translations";

import {
  FiRefreshCw,
  FiMusic,
  FiClipboard,
  FiExternalLink
} from "react-icons/fi";
import { MdLightbulb } from 'react-icons/md';

import { MODAL_ID, REDIRECT_PATH, ACTION_TYPE } from "../../hooks/useDashboardData";

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang] && translations[lang][key] !== undefined
        ? translations[lang][key]
        : translations['pt'][key] || key;
    },
    [lang]
  );
};

export default function LeaderDashboard() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("appLang") || "pt"
  );
  const t = useTranslation(lang);

  const [activeModal, setActiveModal] = useState(null);
  const [teamName] = useState("Alcatteia");
  const [activeSingleSuggestionDetail, setActiveSingleSuggestionDetail] = useState(null);

  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const executeRecommendationAction = useCallback((type, data) => {
    if (type === ACTION_TYPE.REDIRECT) {
      console.log(`Redirecionando para: ${data}`);
      window.location.href = data;
    }
    setActiveModal(null);
    setActiveSingleSuggestionDetail(null);
  }, []);

  const handleOpenSingleSuggestionModal = useCallback((sug) => {
    setActiveSingleSuggestionDetail(sug);
    setActiveModal(null);
  }, []);

  const handleOpenAllSuggestionsModal = useCallback(() => {
    setActiveModal("recommendations-modal");
    setActiveSingleSuggestionDetail(null);
  }, []);

  const handleOpenTeamReportModal = () => {
    setActiveModal("team-report-modal");
  };

  const {
    metrics,
    climate,
    lastUpdateDateTime,
    isLoading,
    handleUpdateDashboard,
    currentEmotionalStatus,
    lowestAttributeKey,
    averageTeamHealth,
    teamHealthTrend,
    suggestions,
    metricCards,
  } = useDashboardData(lang);

  const lowestAttributeTranslatedName = lowestAttributeKey
    ? t(metrics[lowestAttributeKey]?.atributo)
    : t("loadingRecommendations");

  return (
    <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex justify-center ">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 h-full">
        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-2xl font-extrabold text-white tracking-tight">
              {t("leaderDashboardTitle")}
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {t("leaderDashboardSubtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 sm:mt-0">
            <LanguageSwitcher
              currentLang={lang}
              onLanguageChange={handleLanguageChange}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="pb-2 border-b border-gray-700 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left pb-2">
            <p className="text-2xl font-bold text-white">
              {t("teamNamePrefix")}: {teamName}
            </p>
            {lastUpdateDateTime && (
              <p className="text-gray-500 text-xs mt-1">
                {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
              </p>
            )}
          </div>

          <div className="flex flex-row items-center gap-2 mt-4 sm:mt-0 pb-2">
            <button
              onClick={handleUpdateDashboard}
              className={`w-full sm:w-auto cursor-pointer bg-purple-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
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
                <FiRefreshCw className="w-5 h-5" />
              )}
              {isLoading ? t("updatingButton") : t("updateButton")}
            </button>

            <div className="lg:col-span-1">
              <ReportTeam t={t} />
            </div>
          </div>
        </div>

        {/* Removido o condicional de isLoading que escondia todo o conteúdo */}
        {/* Agora o dashboard é sempre visível */}
        <>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <TeamHealthCard
                percent={averageTeamHealth}
                tendencia={teamHealthTrend}
                className="w-full md:w-[calc(40%-8px)] md:flex-shrink-0"
                t={t}
              />

              <LeaderRecommendationCard
                suggestions={suggestions}
                onOpenSingleSuggestionModal={handleOpenSingleSuggestionModal}
                onOpenAllSuggestionsModal={handleOpenAllSuggestionsModal}
                className="w-full md:w-[calc(60%-8px)] md:flex-shrink-0"
                t={t}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-1 items-stretch">
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

              <div className="flex flex-col gap-4 w-full md:w-[calc(60%-8px)] md:flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  {metricCards.map((card) => (
                    <MetricCard
                      key={card.id}
                      card={card}
                      icon={card.icon}
                      className="w-full"
                      t={t}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={activeModal === "recommendations-modal"}
            onClose={() => setActiveModal(null)}
            title={
              <span className="text-white">
                {t("recommendationsFor")}{" "}
                {lowestAttributeKey && metrics[lowestAttributeKey] ? t(metrics[lowestAttributeKey].atributo) : t("recommendations")}
              </span>
            }
            footerContent={
              lastUpdateDateTime &&
              lowestAttributeKey &&
              metrics[lowestAttributeKey] ? (
                <p className="text-gray-500 text-sm mt-4 border-t border-gray-700 pt-3">
                  {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
                </p>
              ) : null
            }
          >
            {suggestions && suggestions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    className="flex items-center bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200 rounded-md p-3 cursor-pointer text-left w-full"
                    onClick={() => handleOpenSingleSuggestionModal(sug)}
                  >
                    <MdLightbulb className="w-5 h-5 mr-3 text-white flex-shrink-0" />
                    <span className="flex-1 text-base text-gray-200">
                      {t("suggestionToImprove")}: {t(sug.attributeKey)}{" "}
                      {sug.contextTextKey && <span className="text-gray-400 italic">({t(sug.contextTextKey)})</span>}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">
                {t("loadingRecommendations")}
              </p>
            )}
          </Modal>

          <LeaderSingleSuggestionDetailModal
            isOpen={!!activeSingleSuggestionDetail}
            onClose={() => setActiveSingleSuggestionDetail(null)}
            suggestion={activeSingleSuggestionDetail}
            onConfirmAction={executeRecommendationAction}
            t={t}
          />

          <section>
            <InfoDashboard lang={lang} />
          </section>
        </>
      </div>
    </main>
  );
}