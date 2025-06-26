// src/components/HrCollaboratorModalTest.jsx
import React, { useState, useEffect } from "react";
import {
  FiX,
  FiMail,
  FiCopy,
  FiTarget,
  FiZap,
  FiHeart,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";

const HrCollaboratorModalTest = ({ isOpen, onClose, collaborator: propCollaborator }) => {
  const [copyStatus, setCopyStatus] = useState("");

  const defaultCollaborator = {
    id: "test-gc",
    name: "Gabriel Cabral",
    role: "UX/UI Designer",
    foco: 85,
    empenho: 90,
    saudeEmocional: 80,
    lastCheckIn: new Date(2025, 5, 18, 14, 30, 0),
    email: "gabriel.cabral@proa.com",
    insights: {
      foco: "Excelente concentração em suas atividades de desenvolvimento, raramente se dispersa.",
      empenho: "Altamente motivado, sempre buscando aprimorar as entregas e superar expectativas.",
      saudeEmocional: "Apresenta um bem-estar emocional notável, com boa resiliência sob pressão.",
    },
    hrInsights: {
      performance: "Desempenho consistente acima da média, com fortes habilidades de colaboração e inovação.",
      absenteeism: "Registro de assiduidade impecável, sem ausências nos últimos 24 meses.",
      contactHistory: "Histórico de interações positivas e proativas com o RH, incluindo workshops de liderança e mentoria.",
    },
  };

  const collaborator = propCollaborator || defaultCollaborator;

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Copiado!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (err) {
      setCopyStatus("Falha ao copiar");
      console.error("Erro ao copiar email:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-[#1a1a2e] rounded-xl shadow-2xl max-w-3xl w-full border border-purple-800 flex flex-col max-h-[90vh]">
        
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Detalhes do Colaborador {collaborator.name} (Teste)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Fechar Modal"
          >
            <FiX className="w-7 h-7" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-300 overflow-y-auto custom-scrollbar flex-grow">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              <span className="font-semibold text-white">Cargo:</span>{" "}
              {collaborator.role || "Não informado"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 bg-gray-800/50 p-3 rounded-md border border-gray-700">
            <span className="font-semibold text-white text-lg mr-2 flex-shrink-0">
              Email:
            </span>
            <span className="text-gray-300 text-md truncate flex-grow">
              {collaborator.email || "Não informado"}
            </span>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1 rounded-md flex items-center gap-1 transition shadow-sm text-sm whitespace-nowrap"
              onClick={() => handleCopyEmail(collaborator.email)}
              title="Copiar"
            >
              <FiCopy className="w-4 h-4" /> {copyStatus || "Copiar"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiTarget className="text-yellow-400" /> Foco:{" "}
                <span className={`text-white text-base`}>
                  {collaborator.foco !== null ? `${collaborator.foco}%` : "Sem dados"}
                </span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.insights?.foco || "Nenhum insight disponível para esta categoria."}
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiZap className="text-pink-400" /> Empenho:{" "}
                <span className={`text-white text-base`}>
                  {collaborator.empenho !== null ? `${collaborator.empenho}%` : "Sem dados"}
                </span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.insights?.empenho || "Nenhum insight disponível para esta categoria."}
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiHeart className="text-purple-400" /> Saúde Emocional:{" "}
                <span className={`text-white text-base`}>
                  {collaborator.saudeEmocional !== null ? `${collaborator.saudeEmocional}%` : "Sem dados"}
                </span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.insights?.saudeEmocional || "Nenhum insight disponível para esta categoria."}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <hr />
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiTrendingUp className="text-blue-400" /> Visão Geral de Desempenho:
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.hrInsights?.performance || "Nenhum dado de desempenho disponível."}
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiCalendar className="text-green-400" /> Absenteísmo:
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.hrInsights?.absenteeism || "Nenhum dado de absenteísmo disponível."}
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiMail className="text-orange-400" /> Histórico de Contato:
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.hrInsights?.contactHistory || "Nenhum histórico de contato disponível."}
              </p>
            </div>
          </div>
        </div>

        {collaborator.lastCheckIn && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-700 text-right">
            <p className="text-gray-500 text-sm">
              Último Check-in:{" "}
              {collaborator.lastCheckIn.toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HrCollaboratorModalTest;