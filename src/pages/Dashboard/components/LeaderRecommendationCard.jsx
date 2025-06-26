// src/pages/Dashboard/components/RecommendationCard.jsx
import React from 'react';
import { MdLightbulb } from 'react-icons/md'; // Usando MdLightbulb conforme o original

/**
 * Componente para exibir um cartão de recomendação.
 * @param {object} props - As propriedades do componente.
 * @param {string|null} props.lowestAttributeKey - A chave do atributo (e.g., "foco", "empenho") para o qual a recomendação se aplica. Pode ser null.
 * @param {object} props.suggestionsByAttribute - Objeto contendo listas de sugestões por atributo.
 * @param {function(string): string} props.t - Função de tradução que recebe uma chave e retorna a string traduzida.
 */
export default function RecommendationCard({ lowestAttributeKey, suggestionsByAttribute, t }) {
  // Acessa as sugestões com base em lowestAttributeKey, garantindo que seja um array vazio se não houver
  const currentSuggestions = (lowestAttributeKey && suggestionsByAttribute[lowestAttributeKey])
    ? suggestionsByAttribute[lowestAttributeKey]
    : [];

  // Define o nome do atributo para exibição
  const attributeDisplayName = lowestAttributeKey ? t(`${lowestAttributeKey}Attr`) : t("noAttributeDetected"); // Usaremos 'noAttributeDetected' se lowestAttributeKey for nulo

  // A função onVerMais não será passada como prop externa, pois a lógica de detalhes
  // é acionada ao clicar no MetricCard no LeaderDashboard.
  // Aqui, vamos apenas exibir uma mensagem se houver mais de 2 sugestões.
  const hasMoreSuggestions = currentSuggestions.length > 2;
  
  // Condição para renderizar o cartão
  if (!lowestAttributeKey || currentSuggestions.length === 0) {
    // Se não houver atributo de menor desempenho ou sem sugestões,
    // podemos renderizar um estado alternativo ou não renderizar nada.
    // Para manter o layout, vamos renderizar o card com uma mensagem de "sem recomendação".
    return (
      <div className="flex-1 min-w-[200px] bg-gray-800 rounded-xl p-6 shadow flex flex-col justify-between border border-white">
        <div className="flex items-center gap-3 mb-4">
          <MdLightbulb className="w-7 h-7 text-yellow-400" />
          <span className="text-lg font-semibold text-yellow-300">{t("recommendations")}</span>
        </div>
        <div>
          <p className="text-gray-300">{t("noRecommendationAvailable")}</p>
        </div>
        {/* Remove o botão "Ver mais" se não houver sugestões válidas ou atributo */}
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-[200px] bg-gray-800 rounded-xl p-6 shadow flex flex-col justify-between border border-white">
      <div className="flex items-center gap-3 mb-4">
        <MdLightbulb className="w-7 h-7 text-yellow-400" /> {/* Ícone de lâmpada. */}
        <span className="text-lg font-semibold text-yellow-300">{t("recommendations")}</span> {/* Título do cartão traduzido. */}
      </div>
      <div>
        <span className="text-gray-300">{t("suggestionsForImprovement")} <b>{attributeDisplayName}</b>:</span> {/* Texto introdutório traduzido. */}
        <ul className="list-disc list-inside mt-2 text-gray-200">
          {currentSuggestions.slice(0, 2).map((s, idx) => ( // Exibe apenas as duas primeiras sugestões.
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
      {hasMoreSuggestions && (
        <p className="mt-2 text-sm text-yellow-400 self-start">
          {t("clickOnMetricForMore")} {/* Nova chave de tradução */}
        </p>
      )}
    </div>
  );
}