// src/pages/Dashboard/components/LeaderRecommendationCard.jsx

import React from 'react';
import { MdLightbulb } from 'react-icons/md';

export default function LeaderRecommendationCard({ suggestions, t, onOpenSingleSuggestionModal, onOpenAllSuggestionsModal }) {
  const hasSuggestions = suggestions && suggestions.length > 0;
  // Apenas as duas primeiras sugestões serão exibidas no card principal para evitar rolagem
  const displaySuggestions = hasSuggestions ? suggestions.slice(0, 6) : [];
  // O botão "Ver completo" aparece se houver mais de 2 sugestões
  const hasMoreSuggestionsThanDisplayed = hasSuggestions && suggestions.length > 2;

  const cardClasses = "flex-1 min-w-[200px] bg-gray-800 rounded-xl p-4 shadow flex flex-col justify-between border border-white h-48";

  if (!hasSuggestions) {
    return (
      <div className={`${cardClasses} cursor-pointer`} onClick={() => onOpenAllSuggestionsModal()}>
        <div className="flex items-center gap-2 mb-2">
          <MdLightbulb className="w-6 h-6 text-yellow-400" />
          <span className="text-lg font-semibold text-yellow-300">{t("recommendations")}</span> {/* Título maior */}
        </div>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-300 text-sm text-center">{t("noRecommendationAvailable")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      <div className="flex items-center gap-2 mb-2">
        <MdLightbulb className="w-6 h-6 text-yellow-400" /> {/* Lâmpada sem animação */}
        <span className="text-lg font-semibold text-yellow-300">{t("recommendations")}</span> {/* Título maior */}
      </div>
      <div className="flex-grow flex flex-wrap gap-2 justify-start content-start"> {/* flex-wrap para horizontal, sem scrollbar */}
        {displaySuggestions.map((sug, idx) => (
          <button
            key={idx}
            className="flex items-center bg-gray-800 border border-amber-300 hover:bg-amber-500 transition-colors duration-200 rounded-md px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => onOpenSingleSuggestionModal(sug)}
          >
            <MdLightbulb className="w-4 h-4 mr-2 text-white flex-shrink-0" />
            <span className="text-white text-sm font-semibold whitespace-nowrap">
              {t("suggestionToImprove")}: {t(sug.attributeKey)}
            </span>
          </button>
        ))}
      </div>
   
      {hasMoreSuggestionsThanDisplayed && (
        <button
          className="mt-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg text-sm cursor-pointer transition-colors duration-200 w-full"
          onClick={() => onOpenAllSuggestionsModal()}
        >
          {t("clickOnMetricForMore")} 
        </button>
      )}
    </div>
  );
}