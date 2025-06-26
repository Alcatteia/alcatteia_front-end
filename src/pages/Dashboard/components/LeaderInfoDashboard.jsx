import React from "react";
import { translations } from "../../../locales/translations"; 
import {
  FiInfo,
  FiUsers,
  FiZap,
  FiMessageSquare,
  FiTarget,
  FiBarChart2,
  FiHeart,
} from "react-icons/fi";

const InfoDashboard = ({ lang }) => {
  // Define a função 't' LOCALMENTE dentro de InfoDashboard, usando a 'lang' recebida via prop
  const t = (key) => {
    // Garante que translations[lang] existe antes de tentar acessar translations[lang][key]
    return translations[lang] && translations[lang][key] !== undefined
      ? translations[lang][key]
      : key; // Se nao encontrar, retorna a propria chave
  };

  return (
    <div>
      {/* SEÇÃO "ENTENDA SEU DASHBOARD" */}
      <h2 className="text-3xl md:text-3xl font-extrabold text-white tracking-tight text-center mt-10 mb-4">
        <FiInfo className="inline-block w-9 h-9 mr-3 mb-2 text-white align-middle" />
        {t("understandDashboard")}
      </h2>

      {/* Grids para as descrições gerais do dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-5">
        <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col md:col-span-1">
          <div className="flex-auto">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {t("overviewTitle")}
            </h3>
            <p className="text-white text-base leading-relaxed">
              {t("overviewDescription")}
            </p>
          </div>
        </div>
        <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col md:col-span-1">
          <div className="flex-auto">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {t("sloganTitle")}
            </h3>
            <p className="text-white text-base leading-relaxed">
              {t("sloganDescription")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:col-span-2">
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex items-start gap-3 mb-2 flex-auto">
              <FiUsers className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-blue-400 text-2xl pb-1">
                  {t("uniaoAttr")}
                </p>
                <p className="text-base text-white">{t("unionDescription")}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex items-start gap-3 mb-2 flex-auto">
              <FiZap className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-pink-400 text-2xl pb-1">
                  {t("empenhoAttr")}
                </p>
                <p className="text-base text-white">
                  {t("empenhoDescription")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex items-start gap-3 mb-2 flex-auto">
              <FiMessageSquare className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-orange-400 text-2xl pb-1">
                  {t("comunicacaoAttr")}
                </p>
                <p className="text-base text-white">
                  {t("communicationDescription")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex items-start gap-3 mb-2 flex-auto">
              <FiTarget className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-yellow-400 text-2xl pb-1">
                  {t("focoAttr")}
                </p>
                <p className="text-base text-white">{t("focusDescription")}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex items-start gap-3 mb-2 flex-auto">
              <FiBarChart2 className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-purple-400 text-2xl pb-1">
                  {t("saudeEmocionalAttr")}
                </p>
                <p className="text-base text-white">
                  {t("emotionalHealthDescription")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex items-start gap-3 mb-2 flex-auto">
              <FiHeart className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-green-400 text-2xl pb-1">
                  {t("saudeEquipeAttr")}
                </p>
                <p className="text-base text-white">
                  {t("teamHealthDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDashboard;