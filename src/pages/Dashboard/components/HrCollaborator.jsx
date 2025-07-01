// src/pages/components/HrCollaborator.jsx
import React, { useState } from "react";
import HrCollaboratorModal from "./HrCollaboratorModal";
import { FiUser, FiTarget, FiZap, FiHeart } from "react-icons/fi";

const HrCollaborator = ({ collaborator, onSaveObservation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="bg-[#1a1a2e] rounded-xl p-6 shadow-lg border hover:border-purple-500 transition-colors flex flex-col cursor-pointer hover:bg-[#1f1f3a] transition-all duration-300 transform hover:scale-[1.02] border-purple-800"
      >
        <div className="flex items-center mb-4">
          <FiUser className="w-10 h-10 text-purple-400 mr-4 flex-shrink-0" />

          <div className="flex flex-col flex-grow">
            <h3 className="text-base font-bold text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {collaborator.name}
            </h3>
            <span className="text-sm text-gray-400 mt-0.5">
              {collaborator.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm mt-4">
          <div className="flex items-center justify-between py-1 px-2 rounded-md bg-gray-800/30">
            <div className="flex items-center gap-2">
              <FiTarget className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-white">Foco:</span>
            </div>
            <span className="font-bold text-white text-base">
              {collaborator.foco !== null ? `${collaborator.foco}%` : "S/D"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2 rounded-md bg-gray-800/30">
            <div className="flex items-center gap-2">
              <FiZap className="w-5 h-5 text-pink-400" />
              <span className="font-semibold text-white">Empenho:</span>
            </div>
            <span className="font-bold text-white text-base">
              {collaborator.empenho !== null ? `${collaborator.empenho}%` : "S/D"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2 rounded-md bg-gray-800/30">
            <div className="flex items-center gap-2">
              <FiHeart className="w-5 h-5 text-purple-400" />
              <span className="font-semibold text-white">Saúde Emocional:</span>
            </div>
            <span className="font-bold text-white text-base">
              {collaborator.saudeEmocional !== null ? `${collaborator.saudeEmocional}%` : "S/D"}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      <HrCollaboratorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        collaborator={collaborator}
        onSaveObservation={onSaveObservation}
      />
    </>
  );
};

export default HrCollaborator;