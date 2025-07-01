import React, { useCallback, useState } from 'react';
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

export default function MemberMetricCard({ title, percent, icon: Icon }) {
  const [lang] = useState(() => localStorage.getItem("appLang") || "pt");
  const t = useTranslation(lang);
  const animatedPercent = useAnimatedNumber(percent, 1000);
  const progressBarWidth = `${percent}%`;

  const getMetricColors = (metricTitle) => {
    switch (metricTitle) {
      case t("uniaoAttr"):
        return { icon: "text-blue-400", border: "border-blue-400", bar: "bg-blue-400" };
      case t("empenhoAttr"):
        return { icon: "text-pink-400", border: "border-pink-400", bar: "bg-pink-400" };
      case t("comunicacaoAttr"):
        return { icon: "text-orange-400", border: "border-orange-400", bar: "bg-orange-400" };
      case t("focoAttr"):
        return { icon: "text-yellow-400", border: "border-yellow-400", bar: "bg-yellow-400" };
      default:
        return { icon: "text-gray-400", border: "border-gray-400", bar: "bg-gray-400" };
    }
  };

  const colors = getMetricColors(title);

  return (
    <div
      className={`bg-[#18162a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-between text-center space-y-3 min-h-[130px] hover:scale-[1.02] transition-transform duration-300 border ${colors.border}`}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3">
          {Icon && <Icon className={`w-7 h-7 ${colors.icon}`} />}
          <h3 className="text-xl font-bold text-white text-left">{title}</h3>
        </div>
        <h2 className="text-4xl font-bold text-white">{Math.round(animatedPercent)}%</h2>
      </div>
      
      <div className="w-full mt-auto">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${colors.bar}`}
            style={{ width: progressBarWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
}