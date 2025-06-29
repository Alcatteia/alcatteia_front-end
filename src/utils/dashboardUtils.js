import { translations } from "../locales/translations";

export const formatDateTime = (date, lang = "pt") => {
  if (!date) return translations[lang]?.notAvailableShort || "N/A";
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return translations[lang]?.invalidDate || "Data Inválida";

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo", // Força o fuso horário para São Paulo
  };

  const localeMap = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };
  const locale = localeMap[lang] || "pt-BR"; // Usa o locale baseado na linguagem

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

