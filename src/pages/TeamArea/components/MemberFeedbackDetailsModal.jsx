import React, { useCallback, useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiClipboard } from 'react-icons/fi';
import { translations } from '../../../locales/translations';

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang]?.[key] ?? translations['pt'][key] ?? key;
    },
    [lang]
  );
};

export default function MemberFeedbackDetailsModal({ isOpen, onClose, feedback, onFeedbackRead }) {
  const [lang] = useState(() => localStorage.getItem("appLang") || "pt");
  const t = useTranslation(lang);

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

  const copyFeedbackContent = useCallback((message) => {
    const textarea = document.createElement('textarea');
    textarea.value = message;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }, []);

  useEffect(() => {
    if (isOpen && feedback && !feedback.read) {
      const markAsRead = async () => {
        try {
          if (onFeedbackRead) {
            onFeedbackRead(feedback.id);
          }
        } catch (err) {
          console.error("Falha ao marcar feedback como lido:", err);
        }
      };
      markAsRead();
    }
  }, [isOpen, feedback, onFeedbackRead]);

  if (!isOpen || !feedback) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative border-2 border-purple-700">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
          onClick={onClose}
          aria-label={t("closeFeedbackDetails")}
        >
          <FiXCircle className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <FiInfo className="text-purple-400" /> {t("feedbackDetails")}
        </h3>

        <div className="mb-4">
          <p className="text-gray-400 text-sm font-bold mb-1">{t("from")}:</p>
          <p className="text-white text-md">{feedback.from}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm font-bold mb-1">{t("subject")}:</p>
          <p className="text-white text-md">{feedback.subject}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm font-bold mb-1">
            {t("message")}:
          </p>
          <div className="bg-[#232046] p-4 rounded-lg text-white text-sm break-words relative">
            {feedback.message}
            <button
              className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-300 transition"
              title={t("copyMessage")}
              onClick={() => copyFeedbackContent(feedback.message)}
            >
              <FiClipboard className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-right text-gray-500 text-xs mb-4">
          <span>{t("receivedOn")}: {formatDateTime(feedback.date)}</span>
        </div>

        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
            onClick={onClose}
          >
            <FiCheckCircle /> {t("closeButton")}
          </button>
        </div>
      </div>
    </div>
  );
}