// src/components/HrCollaboratorModal.jsx

/**
 * @file Modal para exibir detalhes de um colaborador.
 * @description
 * Este componente é o modal "oficial" que exibe informações detalhadas de um colaborador.
 * Ele espera receber os dados do colaborador via props, buscando informações como
 * cargo, e-mail, métricas de foco, empenho, saúde emocional e insights de RH.
 * Inclui funcionalidade para copiar o e-mail do colaborador.
 */

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

const HrCollaboratorModal = ({ isOpen, onClose, collaborator }) => {
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopyEmail = async (email) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopyStatus("Copiado!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (err) {
      setCopyStatus("Falha ao copiar");
      console.error("Erro ao copiar e-mail:", err);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    if (isNaN(date.getTime())) return "Data Inválida";
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

  if (!isOpen || !collaborator) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-[#1a1a2e] rounded-xl shadow-2xl max-w-3xl w-full border border-purple-800 flex flex-col max-h-[90vh]">
        
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Detalhes do Colaborador {collaborator.name}
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
            <hr className="border-gray-700" />
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiTrendingUp className="text-blue-400" /> Visão Geral de Desempenho (RH):
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.hrInsights?.performance || "Nenhum dado de desempenho disponível."}
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiCalendar className="text-green-400" /> Absenteísmo (RH):
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {collaborator.hrInsights?.absenteeism || "Nenhum dado de absenteísmo disponível."}
              </p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
              <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                <FiMail className="text-orange-400" /> Histórico de Contato (RH):
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
              {formatDateTime(collaborator.lastCheckIn)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HrCollaboratorModal;
