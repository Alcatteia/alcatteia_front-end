import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FiMail,
  FiZap,
  FiTarget,
  FiMessageSquare,
  FiGlobe,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiClipboard,
} from "react-icons/fi";

import MemberProfileCard from '../TeamArea/components/MemberProfileCard';
import MemberMetricCard from '../TeamArea/components/MemberMetricCard';
import MemberEmotionalCard from '../TeamArea/components/MemberEmotionalCard';
import MemberFeedbackDetailsModal from '../TeamArea/components/MemberFeedbackDetailsModal';
import { useMemberDashboardData } from '../../hooks/useMemberDashboardData'; // Este é o hook.js que você mencionou

import { translations } from "../../locales/translations";

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang]?.[key] ?? translations['pt'][key] ?? key;
    },
    [lang]
  );
};

export default function MemberDashboard() {
  const [lang, setLang] = useState(() => localStorage.getItem("appLang") || "pt");
  const t = useTranslation(lang);

  // Removido o estado local 'feedbacks' e o useEffect de sincronização
  const {
    member,
    feedbacks, // Use diretamente os feedbacks do hook
    memberMetrics,
    isLoadingMember,
    isLoadingFeedbacks,
    isLoadingMetrics,
    memberError,
    feedbacksError,
    metricsError,
    handleMarkFeedbackAsRead // Esta função DEVE vir do hook e ser uma função válida
  } = useMemberDashboardData(lang);

  const [showFeedbackDetailsModal, setShowFeedbackDetailsModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLang(newLang);
    localStorage.setItem("appLang", newLang);
  };

  const formatDateTime = useCallback((date) => {
    if (!date) return t("notAvailableShort");
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return t("invalidDate");
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  }, [lang, t]);

  const unreadFeedbacksCount = useMemo(
    () => feedbacks.filter((f) => !f.read).length,
    [feedbacks]
  );

  const openFeedbackDetails = useCallback((feedbackItem) => {
    setSelectedFeedback(feedbackItem);
    setShowFeedbackDetailsModal(true);
  }, []);

  // Simplificado: Apenas chama a função do hook.
  // O hook deve ser responsável por atualizar seus próprios 'feedbacks' e re-renderizar o componente pai.
  const handleFeedbackRead = useCallback(async (feedbackId) => {
    if (handleMarkFeedbackAsRead) { // Adicionado um check para garantir que é uma função
      await handleMarkFeedbackAsRead(feedbackId);
    } else {
      console.error("handleMarkFeedbackAsRead não é uma função no hook.");
    }
  }, [handleMarkFeedbackAsRead]);

  const closeFeedbackDetailsModal = useCallback(() => {
    setShowFeedbackDetailsModal(false);
    setSelectedFeedback(null);
  }, []);

  if (isLoadingMember) {
    return (
      <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex items-center justify-center">
        <p className="text-xl">{t("loadingMemberDashboard")}</p>
      </main>
    );
  }

  if (memberError) {
    return (
      <main className="flex-1 bg-[#160F23] text-red-400 font-poppins flex items-center justify-center text-center p-4">
        <p className="text-xl">{memberError}</p>
      </main>
    );
  }

  if (!member) {
    return (
      <main className="flex-1 bg-[#160F23] text-gray-400 font-poppins flex items-center justify-center">
        <p className="text-xl">{t("noMemberData")}</p>
      </main>
    );
  }

  const memberUniao = memberMetrics.uniao?.percent ?? 0;
  const memberEmpenho = memberMetrics.empenho?.percent ?? 0;
  const memberFoco = memberMetrics.foco?.percent ?? 0;
  const memberComunicacao = memberMetrics.comunicacao?.percent ?? 0;
  const memberSaudeEmocional = memberMetrics.saudeEmocional?.percent ?? 0;

  return (
    <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex justify-center overflow-y-auto custom-scrollbar">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 sm:gap-6 md:gap-8 h-full">

        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t("yourIndicators")}
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {t("performanceAndFeedbackOverview")}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex items-center gap-2 mb-2">
              <FiGlobe className="text-gray-400" />
              <select
                value={lang}
                onChange={handleLanguageChange}
                className="bg-[#232046] text-white p-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <span className="text-sm text-gray-500">
              {t("lastUpdate")}: {formatDateTime(new Date())}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-4 mb-2">{t("yourIndividualMetrics")}</h2>
        {isLoadingMetrics ? (
          <div className="text-center py-4 text-gray-400 text-lg">
            {t("loadingMetrics")}
          </div>
        ) : metricsError ? (
          <div className="text-center py-4 text-red-500 text-lg">{metricsError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MemberProfileCard member={member} />
            <MemberMetricCard
              title={t("uniaoAttr")}
              percent={memberUniao}
              icon={FiZap}
            />
            <MemberMetricCard
              title={t("empenhoAttr")}
              percent={memberEmpenho}
              icon={FiZap}
            />
            <MemberMetricCard
              title={t("focoAttr")}
              percent={memberFoco}
              icon={FiTarget}
            />
            <MemberMetricCard
              title={t("comunicacaoAttr")}
              percent={memberComunicacao}
              icon={FiMessageSquare}
            />
            <MemberEmotionalCard
              percent={memberSaudeEmocional}
            />
          </div>
        )}

        <div className="mb-6 border-b border-gray-700 flex justify-between items-center flex-wrap gap-4 pt-4">
          <h2 className="text-2xl font-bold text-white py-3 flex items-center gap-2">
            <FiMail className="text-yellow-400" /> {t("receivedFeedbacks")}
            {unreadFeedbacksCount > 0 && (
              <span className="ml-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                {unreadFeedbacksCount} {t("new")}
              </span>
            )}
          </h2>
        </div>

        <div className="bg-[#18162a] rounded-xl shadow-lg p-6 mb-8">
          {isLoadingFeedbacks ? (
            <div className="text-center py-8 text-gray-400 text-lg">
              {t("loadingFeedbacks")}
            </div>
          ) : feedbacksError ? (
            <div className="text-center py-8 text-red-500 text-lg">{feedbacksError}</div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-lg">
              {t("noFeedbackReceivedYet")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className={`bg-[#232046] p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    ${
                      feedback.read
                        ? "border border-gray-700"
                        : "border-2 border-green-500 ring-2 ring-green-500"
                    }`}
                  onClick={() => openFeedbackDetails(feedback)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        feedback.read
                          ? "bg-gray-600 text-gray-300"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {feedback.read ? t("read") : t("newFeedback")}
                    </span>
                    {feedback.read ? (
                      <FiCheckCircle className="text-green-500 w-4 h-4" />
                    ) : (
                      <FiInfo className="text-yellow-400 w-4 h-4 animate-bounce" />
                    )}
                  </div>
                  <h4 className="text-md font-bold text-white mb-1 truncate">
                    {feedback.subject}
                  </h4>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {feedback.message}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-xs mt-2 border-t border-gray-700 pt-2">
                    <span>
                      {t("from")}:{" "}
                      <span className="font-medium text-gray-300">
                        {feedback.from}
                      </span>
                    </span>
                    <span>{formatDateTime(feedback.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <MemberFeedbackDetailsModal
          isOpen={showFeedbackDetailsModal}
          onClose={closeFeedbackDetailsModal}
          feedback={selectedFeedback}
          onFeedbackRead={handleFeedbackRead}
        />
      </div>
    </main>
  );
}