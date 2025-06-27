import React, { useState, useEffect, useCallback } from "react";

// import do hooks
import { useDashboardData } from "../../hooks/useDashboardData";

// Importações de componentes
import MetricCard from "./components/LeaderMetricCard";
import TeamHealthCard from "./components/LeaderTeamHealthCard";
import EmotionalHealthCard from "./components/LeaderEmotionalHealthCard";
import LeaderRecommendationCard from "./components/LeaderRecommendationCard";
import Modal from "./components/Modal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import InfoDashboard from "./components/LeaderInfoDashboard"; //
import ReportTeam from "./components/LeaderReportTeam"; // O componente que exibe o relatório

import { formatDateTime } from "../../utils/dashboardUtils";
import { translations } from "../../locales/translations";

import { FiRefreshCw } from "react-icons/fi"; // icone de carregamento

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang] && translations[lang][key] !== undefined
        ? translations[lang][key]
        : key;
    },
    [lang]
  );
};

export default function LeaderDashboard() {
  // Gerenciamento de idioma permanece aqui
  const [lang, setLang] = useState(
    () => localStorage.getItem("appLang") || "pt"
  );
  const t = useTranslation(lang);

  // *** ESTADOS E LÓGICAS ESPECÍFICAS DESTE COMPONENTE ***
  // Estes estados não são de dados do dashboard, mas sim da UI ou de informações estáticas
  const [activeModal, setActiveModal] = useState(null); // Para controlar qual modal está aberto
  const [teamName] = useState("Alcatteia"); // Nome da equipe, que é estático aqui

  // Efeito colateral para salvar o idioma selecionado no localStorage sempre que 'lang' mudar.
  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  // Handler para a mudança de idioma.
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const handleOpenTeamReportModal = () => {
    setActiveModal("team-report-modal");
  };

  // chamada para o hook useDashboardData
  // dados e funções de atualização
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
    suggestionsByAttribute,
    metricCards,
  } = useDashboardData(lang);

  // Lógica para o nome do atributo mais baixo traduzido (depende do `t` local e de lowestAttributeKey do hook)
  const lowestAttributeTranslatedName = lowestAttributeKey
    ? t(metrics[lowestAttributeKey].atributo)
    : t("loadingRecommendations");

  return (
    <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex justify-center ">

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 h-full">
        {/* Seção de Título, Subtítulo e idioma*/}
        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-2xl font-extrabold text-white tracking-tight">
              {t("leaderDashboardTitle")}
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {t("leaderDashboardSubtitle")}
            </p>
          </div>
           {" "}
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 sm:mt-0">
            <LanguageSwitcher
              currentLang={lang}
              onLanguageChange={handleLanguageChange}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        {/*Nome da equipe*/}
        <div className="pb-2 border-b border-gray-700 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           {/* Informações da Equipe*/}
          <div className="text-right pb-2">
            <p className="text-2xl font-bold text-white">
              {t("teamNamePrefix")}: {teamName}
            </p>
            {lastUpdateDateTime && (
              <p className="text-gray-500 text-xs mt-1">
                {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
              </p>
            )}
          </div>

          {/*Botão atualizar e relatório*/}
         <div className="flex flex-row items-center gap-2 mt-4 sm:mt-0 pb-2">

            {/*Botão de atualizar com uma tela de carregamento*/}
            <button
              onClick={handleUpdateDashboard} // CHAMANDO A FUNÇÃO DO HOOK
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

            {/*Botão Componente que exibe o relatório da equipe*/}
            <div className="lg:col-span-1"> 
              <ReportTeam t={t} />{""}
            </div>
          </div>
        </div>

        {/* Tela de atualização do dashboard */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
            {" "}
            <svg
              className="animate-spin h-10 w-10 text-purple-600 mb-4"
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
            <p className="text-xl text-purple-400">{t("loadingData")}</p>
          </div>
        )}

        {/* Renderiza o conteúdo principal se não estiver carregando */}
        {!isLoading && (
          <>
            {/* Seção principal de cartões de métricas e recomendações */}
            <div className="flex flex-col gap-4 mb-4">
              {/* Linha superior de cartões (Saúde da Equipe e Recomendações) */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Cartão da Saúde Geral da Equipe. */}
                <TeamHealthCard
                  percent={averageTeamHealth} // Vem do hook
                  tendencia={teamHealthTrend} // Vem do hook
                  className="w-full md:w-[calc(40%-8px)] md:flex-shrink-0"
                  t={t}
                />

                {/* Cartão de Recomendações baseado no atributo de menor pontuação. */}
                <LeaderRecommendationCard
                  atributo={lowestAttributeTranslatedName} // Vem do estado local, que usa dados do hook
                  sugestoes={
                    lowestAttributeKey
                      ? suggestionsByAttribute[lowestAttributeKey]
                      : [t("loadingRecommendations")]
                  }
                  onVerMais={() => {
                    if (
                      lowestAttributeKey &&
                      metrics[lowestAttributeKey] &&
                      metrics[lowestAttributeKey].percent !== null
                    ) {
                      // metrics do hook
                      setModalData(metrics[lowestAttributeKey]);
                      setActiveModal("recommendations-modal");
                    }
                  }}
                  className="w-full md:w-[calc(60%-8px)] md:flex-shrink-0"
                  t={t}
                />
              </div>

              {/*Cards (Saúde Emocional e Métricas) */}
              <div className="flex flex-col md:flex-row gap-4 flex-1 items-stretch">
                {/* Cartão de Saúde Emocional, com dados do hook */}
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

                {/* Container para os cartões de métricas individuais (União, Empenho, Comunicação, Foco). */}
                <div className="flex flex-col gap-4 w-full md:w-[calc(60%-8px)] md:flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    {/* Mapeia e renderiza cada MetricCard. */}
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

            {/* Modal de Recomendações */}
            <Modal
              isOpen={activeModal === "recommendations-modal"}
              onClose={() => setActiveModal(null)}
              title={
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
                lastUpdateDateTime &&
                lowestAttributeKey &&
                metrics[lowestAttributeKey].percent !== null ? (
                  <p className="text-gray-500 text-sm mt-4 border-t border-gray-700 pt-3">
                    {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
                  </p>
                ) : null
              }
            >
              {lowestAttributeKey &&
              metrics[lowestAttributeKey] &&
              metrics[lowestAttributeKey].percent !== null ? (
                <ul className="list-disc list-inside text-gray-200">
                  {suggestionsByAttribute[lowestAttributeKey].map((s, idx) => (
                    <li key={idx}>{t(s)}</li>
                  ))}
                  ;
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  {t("loadingRecommendations")}
                </p>
              )}
            </Modal>

            {/* SEÇÃO "ENTENDA SEU DASHBOARD"*/}
            <section>
              <InfoDashboard lang={lang} />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
