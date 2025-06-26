// src/components/EmotionalHealthCard.jsx
import React from 'react';
import { FiBarChart2 } from 'react-icons/fi'; // Importa o ícone de barra de gráfico

/**
 * Componente para exibir o cartão de Saúde Emocional da Equipe.
 *
 * @param {object} props - As propriedades do componente.
 * @param {number} props.percent - Porcentagem geral da saúde emocional.
 * @param {string} props.status - Status textual da saúde emocional (e.g., "Bom", "Médio").
 * @param {string} props.statusColor - Classe CSS para a cor do status.
 * @param {function} [props.onClick] - Função de callback para o evento de clique no cartão.
 * @param {string} [props.className=""] - Classes CSS adicionais para o contêiner.
 * @param {Array<object>} props.detailedClimate - Array de objetos com detalhes de emoções ({name: string, percent: number}).
 * @param {function(string): string} props.t - Função de tradução que recebe uma chave e retorna a string traduzida.
 */
export default function EmotionalHealthCard({ percent, status, statusColor, onClick, className = "", detailedClimate, t }) {
  const textColorClass = statusColor; // Classe CSS para a cor do texto do status.

  return (
    <div
      className={`relative bg-[#1e293b] border-1 border-purple-500 p-4 rounded-lg flex flex-col justify-between
                   ${onClick ? 'cursor-pointer hover:bg-[#2a374d] transition-all duration-300' : ''} ${className}`}
      onClick={onClick}
      role="button"
      aria-label={t("emotionalHealthDetails")} // Conteúdo traduzido para acessibilidade.
    >
      <div className="flex items-center mb-4">
        <FiBarChart2 className="w-7 h-7 text-white mr-3" />
        <h2 className="text-xl font-bold text-white">{t("saudeEmocionalAttr")}</h2> {/* Título do cartão traduzido. */}
      </div>

      <div className="flex-grow flex flex-col justify-center gap-2">
        {detailedClimate && detailedClimate.length > 0 ? (
          detailedClimate.map((emotion, index) => (
            <div key={index} className="w-full mb-[6px]">
              <div className="flex justify-between items-center mb-1">
                {/* Nome da emoção. Assumido que emotion.name já está no formato desejado ou é tratado externamente. */}
                <span className="text-sm font-medium text-gray-300">{emotion.name}</span>
                <span className="text-sm font-bold text-gray-100">{emotion.percent}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${emotion.percent > 0 ? 'bg-purple-500' : 'bg-gray-600'}`} // Cor da barra de progresso baseada no percentual.
                  style={{ width: `${emotion.percent}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl font-extrabold text-gray-500 text-center">
            {t("loadingData")} {/* Mensagem de carregamento traduzida. */}
          </p>
        )}
      </div>

      <div className="mt-4 text-center">
        {percent !== null && ( // Exibe o percentual geral apenas se houver dados.
            <p className={`text-xl font-extrabold ${textColorClass} transition-colors duration-300 mb-2`}>
                {t("generalStatus")}: {status} {/* Status geral traduzido. */}
            </p>
        )}
      </div>
    </div>
  );
}