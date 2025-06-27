// src/pages/Dashboard/components/MetricCard.jsx

import React from 'react';
import { useAnimatedNumber } from '../../../hooks/useAnimatedNumber';

export default function MetricCard({ card = {}, onClick, icon: IconComponent, t }) {
  const { borderColor, titleKey, trend, percent, barColor } = card;
  const desiredBackgroundColor = "#1e293b";

  // Use o hook para animar o percentual
  const animatedPercent = useAnimatedNumber(percent, 2000); 

  const showData = percent !== null && percent !== undefined;

  return (
    <div
      className={`card flex-1 min-w-[200px] rounded-xl p-[14px] shadow max-h-[200px] relative
                   transition-transform duration-200 hover:scale-102
                   ${borderColor || "border-gray-700"} border`}
      style={{ backgroundColor: desiredBackgroundColor }}
      onClick={onClick}
    >
      {trend && trend !== "---" && (
        <div className="absolute top-4 right-4 text-white font-semibold text-sm">
          {trend}
        </div>
      )}

      <div className="flex items-center mb-4">
        <h3 className="font-semibold text-gray-300 flex items-center gap-2 text-xl">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-gray-400" />
          )}
          {t(titleKey)}
        </h3>
      </div>

      {showData ? (
        <>
          <div className="text-4xl font-bold text-gray-100 mb-2">{animatedPercent}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className={`${barColor} h-2.5 rounded-full transition-all duration-800 ease-out`} // Adiciona transição
              style={{ width: `${animatedPercent}%` }}
            ></div>
          </div>
        </>
      ) : (
        <div className="flex flex-grow items-center justify-center w-full h-full">
          <p className="text-gray-500 text-lg">{t("noData")}</p>
        </div>
      )}
    </div>
  );
}