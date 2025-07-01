import React, { useState, useCallback } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAnimatedNumber } from '../../../hooks/useAnimatedNumber';
import { translations } from '../../../locales/translations';

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang]?.[key] ?? translations['pt'][key] ?? key;
    },
    [lang]
  );
};

export default function MemberEmotionalCard({ percent }) {
  const [lang] = useState(() => localStorage.getItem("appLang") || "pt");
  const t = useTranslation(lang);

  const animatedPercent = useAnimatedNumber(percent, 1000);

  const getEmotionalHealthStatusDisplay = useCallback((score) => {
    if (score === null || score === undefined) return t("notAvailableShort");
    if (score >= 80) return t("emotionalStatusExcellent");
    if (score >= 60) return t("emotionalStatusGood");
    if (score >= 40) return t("emotionalStatusRegular");
    return t("emotionalStatusNeedsAttention");
  }, [t]);

  const displayValue = getEmotionalHealthStatusDisplay(percent);

  const iconColorClass = 'text-purple-400';
  const borderColorClass = 'border-purple-700';

  return (
    <div
      className={`bg-[#18162a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-between text-center space-y-3 min-h-[130px] hover:scale-[1.02] transition-transform duration-300 border-2 ${borderColorClass}`}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3">
          <FiHeart className={`w-7 h-7 ${iconColorClass}`} />
          <h3 className="text-xl font-bold text-white flex-grow text-left">{t("saudeEmocionalAttr")}</h3>
        </div>       
      </div>
      
      <div className="w-full mt-auto flex flex-col items-center">
        <h2 className={`text-3xl text-white`}>{displayValue}</h2>
      </div>
    </div>
  );
}