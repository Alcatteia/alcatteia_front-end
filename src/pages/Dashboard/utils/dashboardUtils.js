/**
 * Formata um objeto Date em uma string de data e hora localizada.
 * @param {Date | null} date - O objeto Date a ser formatado. Pode ser nulo.
 * @param {string} locale - A string de locale (ex: 'pt-BR', 'en-US').
 * @returns {string} A data e hora formatada ou uma string vazia se a data for nula.
 */
export const formatDateTime = (date, locale) => {
  if (!date) return "";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};