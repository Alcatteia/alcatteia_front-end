// src/components/TeamHealthCard.jsx

import React from "react";
import { FiHeart, FiArrowUpRight, FiArrowDownRight, FiMinus, FiInfo } from "react-icons/fi";
import { useAnimatedNumber } from '../../../hooks/useAnimatedNumber';

export default function TeamHealthCard({ percent, tendencia, t, className = "", detailedClimate }) {
  const animatedPercent = useAnimatedNumber(percent, 2000); 

  let trendIcon;
  let trendColor;
  let trendText;

  if (tendencia === null || tendencia === undefined) {
    trendIcon = <FiInfo className="w-5 h-5 mr-1" />;
    trendColor = "text-gray-400";
    trendText = t("noTrendData");
  } else if (tendencia.startsWith("+")) {
    trendIcon = <FiArrowUpRight className="w-5 h-5" />;
    trendColor = "text-green-300";
    const numericValue = tendencia.substring(1).replace("pp", "");
    trendText = `${t("increaseOf")} ${numericValue} ${t("percentagePoints")}`;
  } else if (tendencia.startsWith("-")) {
    trendIcon = <FiArrowDownRight className="w-5 h-5" />;
    trendColor = "text-red-300";
    const numericValue = tendencia.substring(1).replace("pp", "");
    trendText = `${t("decreaseOf")} ${numericValue} ${t("percentagePoints")}`;
  } else { // Este bloco é especificamente para quando 'tendencia' é "---" (sem alteração)
    trendIcon = <FiMinus className="w-5 h-5" />;
    trendColor = "text-white"; // Branco, conforme solicitado, para "sem alteração"
    trendText = t("noChange");
  }

  const isDataAvailable = percent !== null;

  return (
    <div className={`bg-gray-800 h-48 border border-green-500 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center ${className}`}>

      <div className="flex items-center gap-3 mb-4">
        <FiHeart className="w-8 h-8 text-green-500" />
        <h3 className="font-semibold text-white text-2xl">{t("saudeEquipeAttr")}</h3>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {isDataAvailable ? (
          <div className="text-6xl font-bold text-white leading-none">{animatedPercent}%</div>
        ) : (
          <div className="text-4xl font-bold text-gray-400 leading-none">{t("noData")}</div>
        )}
      </div>

      {isDataAvailable ? (
        <div className={`flex items-center text-base font-bold ${trendColor}`}>
          {trendIcon}
          {trendText}
        </div>
      ) : (
        <div className="flex items-center text-base font-bold text-gray-400">
          <FiInfo className="w-5 h-5 mr-1" /> {t("noTrendData")}
        </div>
      )}

    </div>
  );
}