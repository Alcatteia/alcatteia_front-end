import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'; // Importa ícones de tendência

const HrMetricCard = ({ title, percent, icon: IconComponent, trend, t, className }) => {
  const trendColorClass = trend && trend !== "---"
    ? (trend.startsWith('+') ? 'text-green-400' : 'text-red-400')
    : 'text-gray-400';
  
  const TrendIcon = trend && trend !== "---"
    ? (trend.startsWith('+') ? FiTrendingUp : FiTrendingDown)
    : null;

  return (
    <div
      className={`bg-[#1a1a2e] rounded-xl p-6 shadow-lg border hover:border-purple-500 transition-colors flex flex-col items-center justify-center min-h-[180px] ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
        {IconComponent && <IconComponent className="w-9 h-9 text-purple-400" />}
        <h3 className="font-semibold text-white text-2xl">{title}</h3>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className={`text-6xl font-bold text-white leading-none`}>
          {percent !== null ? `${percent}%` : t("noData")}
        </div>
        {trend && trend !== "---" && (
          <span className={`text-2xl font-semibold flex items-center gap-1 ${trendColorClass}`}>
            {TrendIcon && <TrendIcon className="w-6 h-6" />} {/* Renderiza o ícone de tendência */}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default HrMetricCard;
