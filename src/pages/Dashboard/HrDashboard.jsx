import React, { useState, useEffect, useCallback } from "react";
import {
  FiHeart,
  FiUsers,
  FiUser,
} from "react-icons/fi";

import LanguageSwitcher from "./components/LanguageSwitcher";
import HrCollaborator from "./components/HrCollaborator";
import HrMetricCard from "./components/HrMetricCard";
import { useDashboardData } from "../../hooks/useDashboardData";
import { saveCollaboratorObservation } from "../../services/dashboardService";

import { translations } from "../../locales/translations";
import HrCollaboratorModal from "./components/HrCollaboratorModal";

const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang]?.[key] ?? key;
    },
    [lang]
  );
};

const formatDateTime = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return "N/A";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};

export default function HrDashboard() {
  const [lang, setLang] = useState(() => localStorage.getItem("appLang") || "pt");
  const t = useTranslation(lang);

  const {
    collaborators: initialCollaborators,
    lastUpdateDateTime,
    isLoading,
    hrTeamMetrics,
    handleUpdateDashboard,
    realApiActive,
  } = useDashboardData(lang);

  const [localCollaborators, setLocalCollaborators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (initialCollaborators) {
      setLocalCollaborators(initialCollaborators);
    }
  }, [initialCollaborators]);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const handleOpenModal = (collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCollaborator(null);
    setSaveStatus('');
  };

  const handleSaveObservation = useCallback(async (id, observationText) => {
    setIsSaving(true);
    setSaveStatus('saving');

    setLocalCollaborators(prevCollaborators =>
      prevCollaborators.map(col =>
        col.id === id ? { ...col, hrObservation: observationText } : col
      )
    );

    setSelectedCollaborator(prevSelected =>
      prevSelected && prevSelected.id === id
        ? { ...prevSelected, hrObservation: observationText }
        : prevSelected
    );

    const success = await saveCollaboratorObservation(id, observationText);

    if (success) {
      setSaveStatus('saved');
      console.log(`Observação para colaborador ${id} salva com sucesso.`);
    } else {
      setSaveStatus('error');
      console.error(`Falha ao salvar observação para colaborador ${id}.`);
    }

    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('');
      handleCloseModal();
    }, 2000);
  }, [realApiActive, handleCloseModal]);

  if (isLoading) {
    return (
      <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex items-center justify-center">
        <div className="text-xl text-purple-400">Carregando dados do Dashboard de RH...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex justify-center overflow-y-auto custom-scrollbar">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 sm:gap-6 md:gap-8 h-full">
        <div className="flex justify-between items-end pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              {t("dashboardTitleHR")}
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {t("dashboardSubtitleHR")}
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={handleLanguageChange}
                t={t}
              />
            </div>
            {lastUpdateDateTime && (
              <p className="text-gray-500 text-sm mt-2">
                {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HrMetricCard
            title={t("teamHealth")}
            percent={hrTeamMetrics.saudeGeral.percent}
            icon={FiHeart}
            t={t}
            className="border-green-400"
          />
          <HrMetricCard
            title={t("teamEngagement")}
            percent={hrTeamMetrics.engajamento.percent}
            icon={FiUsers}
            t={t}
            className="border border-pink-400"
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-4 mb-6">
            <FiUser className="w-10 h-10 text-white flex" />
            <h2 className="text-3xl font-bold text-purple-400">
              {t("individualVision")}
            </h2>
          </div>

          {localCollaborators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {localCollaborators.map((collaborator) => (
                <HrCollaborator
                  key={collaborator.id}
                  collaborator={collaborator}
                  onSaveObservation={handleSaveObservation}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#1a1a2e] p-8 rounded-xl text-center text-gray-400 text-lg">
              <p className="mb-4">{t("noCollaboratorsYet")}</p>
              <p>{t("noCollaboratorsDescription")}</p>
            </div>
          )}
        </div>

        {isModalOpen && selectedCollaborator && (
          <HrCollaboratorModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            collaborator={selectedCollaborator}
            onSaveObservation={handleSaveObservation}
            isSaving={isSaving}
            saveStatus={saveStatus}
          />
        )}
      </div>
    </main>
  );
}