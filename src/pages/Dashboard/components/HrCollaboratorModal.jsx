import React, { useState, useEffect } from "react";
import {
  FiX,
  FiMail,
  FiCopy,
  FiTarget,
  FiZap,
  FiHeart,
  FiTrendingUp,
  FiCheck,
} from "react-icons/fi";

// As props isSaving e saveStatus são passadas do HrDashboard.js
const HrCollaboratorModal = ({ isOpen, onClose, collaborator, onSaveObservation, isSaving, saveStatus }) => {
  const [copyStatus, setCopyStatus] = useState("");
  const [hrObservation, setHrObservation] = useState(collaborator?.hrObservation || "");

  useEffect(() => {
    setHrObservation(collaborator?.hrObservation || "");
    setCopyStatus("");
  }, [collaborator, isOpen]);

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

  // Esta função agora apenas chama a função de salvamento passada pelo pai
  // O pai (HrDashboard) é quem gerencia os estados isSaving e saveStatus
  const handleSave = async () => {
    if (onSaveObservation) {
      await onSaveObservation(collaborator.id, hrObservation);
    }
  };

  if (!isOpen || !collaborator) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-[#1a1a2e] rounded-xl shadow-2xl max-w-3xl w-full border border-purple-800 flex flex-col max-h-[90vh]">

        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white truncate">
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
          <div className="flex items-center sm:items-start gap-4 mb-4 border-b border-gray-700 pb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${collaborator.name.replace(/\s/g, '+')}&background=4c51bf&color=fff&bold=true`}
              alt={collaborator.name}
              className="w-20 h-20 rounded-full border-4 border-blue-500 flex-shrink-0"
            />
            <div className="text-left flex-grow">
              <h3 className="text-xl font-semibold text-white">{collaborator.name}</h3>
              <p className="text-gray-400 text-lg">{collaborator.role}</p>
            </div>
          </div>

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
                Observações (RH):
              </h4>
              <textarea
                id="hr-observation-textarea"
                className="w-full p-2 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-y min-h-[80px]"
                placeholder="Adicione observações sobre o colaborador aqui..."
                value={hrObservation}
                onChange={(e) => setHrObservation(e.target.value)}
              ></textarea>
              <div className="flex justify-center mt-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !hrObservation.trim()}
                  className={`py-1.5 px-3 text-sm rounded-md transition duration-200 ease-in-out shadow-md cursor-pointer flex items-center gap-1 font-bold
                    ${isSaving
                      ? 'bg-gray-500 cursor-not-allowed'
                      : saveStatus === 'saved'
                      ? 'bg-green-600'
                      : saveStatus === 'error'
                      ? 'bg-red-600'
                      : 'bg-purple-600 hover:bg-purple-700'
                    }
                    text-white
                  `}
                >
                  {isSaving ? ( // Se isSaving é true, mostra o estado de carregamento
                      'Salvando...'
                  ) : saveStatus === 'saved' ? ( // Se não está salvando, verifica se foi salvo
                      <>Salvo! <FiCheck className="w-4 h-4" /></>
                  ) : saveStatus === 'error' ? ( // Se não está salvando, verifica se deu erro
                      'Erro ao Salvar ❌'
                  ) : ( // Estado padrão
                      'Salvar Observação'
                  )}
                </button>
              </div>
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