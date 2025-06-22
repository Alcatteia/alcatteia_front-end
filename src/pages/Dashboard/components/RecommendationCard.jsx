import React from "react";
import { MdLightbulb } from 'react-icons/md'; // Importa o ícone de lâmpada do Material Design Icons.

/**
 * Componente para exibir um cartão de recomendação.
 *
 * @param {object} props - As propriedades do componente.
 * @param {string} props.atributo - O atributo (e.g., "Foco", "Empenho") para o qual a recomendação se aplica.
 * @param {Array<string>} props.sugestoes - Lista de sugestões de melhoria.
 * @param {function} props.onVerMais - Função de callback para o botão "Ver mais".
 * @param {function(string): string} props.t - Função de tradução que recebe uma chave e retorna a string traduzida.
 */
export default function RecommendationCard({ atributo, sugestoes, onVerMais, t }) {
  return (
    <div className="flex-1 min-w-[200px] bg-gray-800 rounded-xl p-6 shadow flex flex-col justify-between border border-white">
      <div className="flex items-center gap-3 mb-4">
        <MdLightbulb className="w-7 h-7 text-yellow-400" /> {/* Ícone de lâmpada. */}
        <span className="text-lg font-semibold text-yellow-300">{t("recommendations")}</span> {/* Título do cartão traduzido. */}
      </div>
      <div>
        <span className="text-gray-300">{t("suggestionsForImprovement")} <b>{atributo}</b>:</span> {/* Texto introdutório traduzido. */}
        <ul className="list-disc list-inside mt-2 text-gray-200">
          {sugestoes.slice(0, 2).map((s, idx) => ( // Exibe apenas as duas primeiras sugestões.
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
      <button
        className="mt-2 text-sm text-yellow-400 hover:underline self-start"
        onClick={onVerMais}
      >
        {t("viewMore")} {/* Texto do botão traduzido. */}
      </button>
    </div>
  );
}