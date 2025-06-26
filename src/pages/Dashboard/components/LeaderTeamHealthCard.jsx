// src/components/TeamHealthCard.jsx

import React from "react";
import { FiHeart, FiArrowUpRight, FiArrowDownRight, FiMinus, FiInfo } from "react-icons/fi"; // Importa ícones necessários

/**
 * Componente para exibir o cartão de Saúde Geral da Equipe.
 *
 * @param {object} props - As propriedades do componente.
 * @param {number} props.percent - Porcentagem da saúde geral da equipe.
 * @param {string} props.tendencia - String indicando a tendência (e.g., "+5pp", "-2pp", "---").
 * @param {function(string): string} props.t - Função de tradução que recebe uma chave e retorna a string traduzida.
 * @param {string} [props.className=""] - Classes CSS adicionais para estilização.
 */
export default function TeamHealthCard({ percent, tendencia, t, className = "" }) {
  let trendIcon = <FiMinus className="w-5 h-5" />; // Ícone padrão para "sem alteração".
  let trendColor = "text-gray-300"; // Cor padrão para "sem alteração".
  let trendText = t("noChange"); // Texto padrão para "sem alteração", traduzido.

  // Determina o ícone, cor e texto da tendência com base no valor recebido.
  // A string 'tendencia' é esperada no formato "+Xpp" ou "-Xpp" ou "---".
  if (tendencia && tendencia.startsWith("+")) {
    trendIcon = <FiArrowUpRight className="w-5 h-5" />; // Ícone para aumento.
    trendColor = "text-green-300"; // Cor verde para aumento.
    const numericValue = tendencia.substring(1).replace("pp", ""); // Pega apenas o número, removendo "pp"
    trendText = `${t("increaseOf")} ${numericValue} ${t("percentagePoints")}`; // Constrói a frase com a tradução
  } else if (tendencia && tendencia.startsWith("-")) {
    trendIcon = <FiArrowDownRight className="w-5 h-5" />; // Ícone para queda.
    trendColor = "text-red-300"; // Cor vermelha para queda.
    const numericValue = tendencia.substring(1).replace("pp", ""); // Pega apenas o número, removendo "pp"
    trendText = `${t("decreaseOf")} ${numericValue} ${t("percentagePoints")}`; // Constrói a frase com a tradução
  } else if (tendencia === "---") {
    trendText = t("noChange"); // Garante que "Sem alteração" seja traduzido.
  } else {
    // Caso a tendencia não esteja nos formatos esperados (ex: null, undefined)
    trendText = t("noTrendData");
    trendColor = "text-gray-400";
    trendIcon = <FiInfo className="w-5 h-5 mr-1" />;
  }


  // Verifica se o percentual é nulo (dados não disponíveis)
  const isDataAvailable = percent !== null;

  return (
    <div className={`bg-green-500/20 border border-green-500 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center ${className}`}>

      <div className="flex items-center gap-3 mb-4">
        <FiHeart className="w-8 h-8 text-white" /> {/* Ícone de coração. */}
        <h3 className="font-semibold text-white text-2xl">{t("saudeEquipeAttr")}</h3> {/* Título do cartão traduzido. */}
      </div>

      <div className="flex items-center gap-2 mb-4">
        {isDataAvailable ? (
          // Exibe a porcentagem da saúde geral da equipe se houver dados.
          <div className="text-6xl font-bold text-white leading-none">{percent}%</div>
        ) : (
          // Exibe "Sem dados" se não houver dados.
          <div className="text-4xl font-bold text-gray-400 leading-none">{t("noData")}</div>
        )}
      </div>

      {/* Renderiza a seção de tendência apenas se houver dados disponíveis ou uma tendência definida */}
      {isDataAvailable ? (
        <div className={`flex items-center text-base font-bold ${trendColor}`}>
          {trendIcon} {/* Ícone da tendência (seta para cima/baixo ou traço). */}
          {trendText} {/* Texto da tendência traduzido. */}
        </div>
      ) : (
        <div className="flex items-center text-base font-bold text-gray-400">
          <FiInfo className="w-5 h-5 mr-1" /> {t("noTrendData")}
        </div>
      )}
    </div>
  );
}