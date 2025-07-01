import React from 'react';
import { FiBarChart2 } from 'react-icons/fi'; 

export default function EmotionalHealthCard({ percent, status, statusColor, onClick, className = "", detailedClimate, t }) {
  const textColorClass = statusColor; 

  return (
    <div
      className={`relative bg-[#1e293b] border-1 border-purple-500 p-4 rounded-lg flex flex-col justify-between
                   ${onClick ? 'cursor-pointer hover:bg-[#2a374d] transition-all duration-300' : ''} ${className}`}
      onClick={onClick}
      role="button"
      aria-label={t("emotionalHealthDetails")} 
    >
      <div className="flex items-center mb-4">
        <FiBarChart2 className="w-7 h-7 text-white mr-3" />
        <h2 className="text-xl font-bold text-white">{t("saudeEmocionalAttr")}</h2> 
      </div>

      <div className="flex-grow flex flex-col justify-center gap-2">
        {detailedClimate && detailedClimate.length > 0 ? (
          detailedClimate.map((emotion, index) => (
            <div key={index} className="w-full mb-[6px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{emotion.name}</span>
                <span className="text-sm font-bold text-gray-100">{emotion.percent}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${emotion.percent > 0 ? 'bg-purple-500' : 'bg-gray-600'}`} 
                  style={{ width: `${emotion.percent}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl font-extrabold text-gray-500 text-center">
            {t("loadingData")} 
          </p>
        )}
      </div>

      <div className="mt-4 text-center">
        {percent !== null && ( 
            <p className={`text-xl font-extrabold ${textColorClass} transition-colors duration-300 mb-2`}>
                {t("generalStatus")}: {status} 
            </p>
        )}
      </div>
    </div>
  );
}