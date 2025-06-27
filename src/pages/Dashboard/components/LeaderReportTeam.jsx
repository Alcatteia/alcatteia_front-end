import React, { useState } from "react";
import LeaderReportModal from "./LeaderReportModal"; // Importe o componente que contém o conteúdo do relatório
import { FiFileText } from "react-icons/fi"; // Ícone para o botão relatório

//componente com dados simulados para o relaório da equipe
import LeaderReportModalTest from "./LeaderReportModalTest";

export default function ReportTeam({ className, t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReportModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenReportModal}
        className="w-full xs:w-auto bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md cursor-pointer"
      >
         <FiFileText className="h-5 w-5"/>
        {t("ReportButton")}
      </button>

      <LeaderReportModalTest isOpen={isModalOpen} onClose={handleCloseReportModal} />
    </>
  );
}
