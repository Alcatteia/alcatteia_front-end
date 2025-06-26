import React, { useState } from "react";
import LeaderReportModal from "./LeaderReportModal"; // Importe o componente que contém o conteúdo do relatório
import { FiFileText } from "react-icons/fi"; // Ícone para o botão relatório

//componente com dados simulados para o relaório da equipe
import ReportModalTest from "./LeaderReportModalTest";

/**
 * Componente ReportTeam:
 * Este componente serve como um card de atalho no dashboard principal.
 * Ele é responsável por:
 * 1. Exibir uma representação visual para o relatório da equipe.
 * 2. Gerenciar o estado de abertura/fechamento do modal do relatório.
 * 3. Renderizar o componente ReportModal (o relatório detalhado) dentro de um Modal.
 */
export default function ReportTeam({ className, t }) {
  // Estado para controlar a visibilidade do modal do relatório
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Função para abrir o modal do relatório.
  //Chamada quando o botão "Ver Relatório Completo" é clicado.

  const handleOpenReportModal = () => {
    setIsModalOpen(true);
  };

  //Função para fechar o modal do relatório.
  //Chamada quando o usuário fecha o modal (ex: clicando fora ou no botão de fechar).

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
        {/* Agora 't' está disponível via props */}
        {t("ReportButton")}
      </button>

      <ReportModalTest isOpen={isModalOpen} onClose={handleCloseReportModal} />
    </>
  );
}
