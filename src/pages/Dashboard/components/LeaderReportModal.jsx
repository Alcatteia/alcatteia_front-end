import React, { useEffect, useCallback } from "react";
import {
  FiUsers,
  FiHeart,
  FiActivity,
  FiAlertCircle,
  FiClock,
  FiX,
  FiClipboard,
} from "react-icons/fi";
import useReportData from "../../../hooks/useReportData"; 

export default function LeaderReportModal({ isOpen, onClose, teamId }) { // Adicione teamId se for necessário para a API
  const { reportData, loading, error } = useReportData(teamId, isOpen); // Passa o teamId e se deve buscar

  const handleEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) {
    return null;
  }

  let modalContent;
  if (loading) {
    modalContent = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-purple-300">
        <svg
          className="animate-spin h-12 w-12 text-purple-400 mb-4"
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
        <p className="text-xl font-medium">Gerando relatório...</p>
        <p className="text-sm text-gray-400 mt-2">
          Isso pode levar alguns segundos.
        </p>
      </div>
    );
  } else if (error) {
    modalContent = (
      <div className="flex items-center justify-center h-full min-h-[300px] text-red-500 text-center p-4">
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  } else if (!reportData || Object.keys(reportData).length === 0) {
    modalContent = (
      <div className="flex items-center justify-center h-full min-h-[300px] text-gray-400 text-center p-4">
        <p className="text-lg font-medium">
          Nenhum dado de relatório disponível para esta equipe no momento.
        </p>
      </div>
    );
  } else {
    const trendColor =
      reportData.teamHealthTrend &&
      reportData.teamHealthTrend.includes("Melhora")
        ? "text-green-400"
        : reportData.teamHealthTrend &&
          reportData.teamHealthTrend.includes("Piora")
        ? "text-red-400"
        : "text-blue-400";

    modalContent = (
      <div className="p-4 sm:p-8 md:p-10 lg:p-12 text-gray-100 font-sans max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar bg-[#160F23]">
        <h2 className="text-4xl font-extrabold text-white mb-4 text-center leading-tight">
          Relatório de Desempenho da Equipe{" "}
          <span className="text-purple-400">
            {reportData.teamName || "N/A"}
          </span>
        </h2>

        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiUsers className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Sumário Executivo</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-lg">
            <div className="flex flex-col col-span-1">
              <span className="text-sm font-light text-purple-300">
                Membros Ativos
              </span>
              <span className="font-bold text-4xl text-white">
                {reportData.activeMembers || "N/A"} /{" "}
                {reportData.totalMembers || "N/A"}
              </span>
            </div>
            <div className="flex flex-col col-span-1">
              <span className="text-sm font-light text-purple-300">
                Saúde Geral da Equipe
              </span>
              <span className={`font-bold text-4xl ${trendColor}`}>
                {reportData.teamHealthPercent
                  ? `${reportData.teamHealthPercent}%`
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <span className="text-sm font-light text-purple-300">
                Tendência de Saúde
              </span>
              <span className={`font-bold text-xl ${trendColor}`}>
                {reportData.teamHealthTrend || "N/A"}
              </span>
            </div>
          </div>
          <p className="text-lg mt-6 leading-relaxed bg-[#1d273a] p-4 rounded-md border border-gray-800">
            <span className="font-semibold text-purple-300">
              Clima Geral da Equipe:
            </span>{" "}
            {reportData.generalClimate || "N/A"}
          </p>
        </section>

        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiHeart className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">
              Análise de Sentimento e Humor
            </h3>
          </div>
          {reportData.moodDistribution &&
          reportData.moodDistribution.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8">
              {reportData.moodDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-[#1d273a] p-4 rounded-md border border-gray-800"
                >
                  <span className="text-sm font-light text-gray-400">
                    {item.mood || "N/A"}
                  </span>
                  <div className="flex items-end">
                    <span className="font-bold text-3xl text-white mr-2">
                      {item.count || 0}
                    </span>
                    <span className="text-lg text-gray-300">
                      ({item.percent || "0%"})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center py-4">
              Dados de humor não disponíveis.
            </p>
          )}
          <p className="text-lg mt-6 leading-relaxed bg-[#1d273a] p-4 rounded-md border border-gray-800">
            <span className="font-semibold text-purple-300">
              Sentimento Médio:
            </span>{" "}
            <span className="font-bold text-white">
              {reportData.averageSentiment || "N/A"}
            </span>{" "}
            -{" "}
            <span className="text-gray-400">
              Efetividade da Comunicação:{" "}
              {reportData.communicationEffectiveness || "N/A"}/10
            </span>
          </p>
        </section>

        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiActivity className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">
              Níveis de Engajamento e Produtividade
            </h3>
          </div>
          {reportData.activityLevels && reportData.activityLevels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {reportData.activityLevels.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-[#1d273a] p-4 rounded-md border border-gray-800"
                >
                  <span className="text-sm font-light text-gray-400">
                    {item.activity || "N/A"}
                  </span>
                  <div className="flex items-end">
                    <span
                      className={`font-bold text-3xl ${
                        item.color || "text-white"
                      } mr-2`}
                    >
                      {item.count || 0}
                    </span>
                    <span className="text-lg text-gray-300">membros</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center py-4">
              Dados de engajamento não disponíveis.
            </p>
          )}
        </section>

        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiAlertCircle className="text-3xl text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-yellow-300">
              Análise de Desafios & Recomendações
            </h3>
          </div>
          {reportData.challengesAndRecommendations &&
          reportData.challengesAndRecommendations.length > 0 ? (
            <div className="space-y-6">
              {reportData.challengesAndRecommendations.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1d273a] p-6 rounded-md border border-gray-800"
                >
                  <h4 className="text-xl font-semibold text-yellow-200 mb-2">
                    {item.title || "N/A"}
                  </h4>
                  <p className="text-lg mb-3 leading-relaxed text-gray-200">
                    {item.description || "N/A"}
                  </p>
                  <p className="text-lg leading-relaxed italic text-gray-300">
                    <span className="font-semibold text-yellow-100">
                      Ação Sugerida:
                    </span>{" "}
                    {item.recommendation || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center py-4">
              Nenhum desafio ou recomendação identificada no momento.
            </p>
          )}
        </section>

        <section className="mb-6">
          <div className="flex items-center mb-5">
            <FiClipboard className="text-3xl text-teal-400 mr-3" />
            <h3 className="text-2xl font-bold text-teal-300">
              Plano de Ação Sugerido
            </h3>
          </div>
          {reportData.suggestedActionPlan &&
          reportData.suggestedActionPlan.length > 0 ? (
            <ul className="list-disc list-inside bg-[#1d273a] p-6 rounded-md border border-gray-800 text-lg space-y-2">
              {reportData.suggestedActionPlan.map((action, index) => (
                <li key={index} className="text-gray-200">
                  {action || "N/A"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic text-center py-4">
              Nenhum plano de ação sugerido no momento.
            </p>
          )}
        </section>

        <div className="flex items-center justify-end text-gray-400 text-base pt-6 border-t border-gray-800 mt-10">
          <FiClock className="mr-2" />
          <span>
            Última atualização: {reportData.lastUpdateDateTime || "N/A"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      <div
        className={`bg-[#160F23] rounded-lg shadow-xl relative transform transition-all duration-300
                     w-full sm:w-11/12 md:w-[67vw] lg:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto
                     border border-purple-700/50 my-auto`}
      >
        {" "}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-700">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Relatório Detalhado da Equipe
          </h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Fechar modal"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-0">{modalContent}</div>
      </div>
    </div>
  );
}