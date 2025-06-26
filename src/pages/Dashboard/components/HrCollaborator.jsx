// src/components/HrCollaborator.jsx
import React, { useState } from "react";
import HrCollaboratorModalTest from "./HrCollaboratorModalTest";
import HrCollaboratorModal from "./HrCollaboratorModal";
import { FiUser, FiTarget, FiZap, FiHeart } from "react-icons/fi";

const HrCollaborator = ({ collaborator }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getHealthColor = (score) => {
    if (score === null || score === undefined) return "text-gray-400";
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getEngagementColor = (score) => {
    if (score === null || score === undefined) return "text-gray-400";
    if (score >= 85) return "text-purple-400";
    if (score >= 65) return "text-blue-400";
    return "text-red-400";
  };

  const getFocusColor = (score) => {
    if (score === null || score === undefined) return "text-gray-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg border hover:border-purple-500 transition-colors flex flex-col cursor-pointer hover:bg-[#1f1f3a] transition-all duration-300 transform hover:scale-[1.01] border-purple-800"
      >
        <div className="flex items-center justify-between mb-4 flex-col">
          <div className="flex items-center gap-3 ">
            <FiUser className="w-8 h-8 text-white" />
            <h3 className="text-xl font-bold text-white">{collaborator.name}</h3>
          </div>
          <span className="text-sm text-gray-400">{collaborator.role}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <FiTarget className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-gray-300">Foco:</span>
            <span className={`${getFocusColor(collaborator.foco)}`}>
              {collaborator.foco !== null ? `${collaborator.foco}%` : "Sem dados"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiZap className="w-5 h-5 text-pink-400" />
            <span className="font-semibold text-gray-300">Empenho:</span>
            <span className={`${getEngagementColor(collaborator.empenho)}`}>
              {collaborator.empenho !== null ? `${collaborator.empenho}%` : "Sem dados"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiHeart className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-gray-300">Saúde Emocional:</span>
            <span className={`${getHealthColor(collaborator.saudeEmocional)}`}>
              {collaborator.saudeEmocional !== null ? `${collaborator.saudeEmocional}%` : "Sem dados"}
            </span>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-whitefont-medium px-4 py-2 rounded-md transition shadow"
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      <HrCollaboratorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        collaborator={collaborator} 
      />
    </>
  );
};

export default HrCollaborator;