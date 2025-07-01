// src/components/modals/TeamAreaMemberDetailsModal.jsx
import React from 'react';
import { FiX, FiMessageCircle, FiTrash2 } from 'react-icons/fi';

const TeamAreaMemberDetailsModal = ({
  show,
  onClose,
  member,
  onSendFeedback,
  onRemoveMember,
}) => {
  if (!show || !member) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative border-2 border-purple-700">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 cursor-pointer"
          onClick={onClose}
        >
          <FiX className="w-6 h-6" />
        </button>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={member.photo}
            alt={member.name}
            className="w-20 h-20 rounded-full border-3 border-purple-400 object-cover"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">
              {member.name}
            </h3>
            <p className="text-purple-300 text-lg">{member.role}</p>
            <p className="text-gray-400 text-sm">{member.email}</p>
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-300 mb-2">
            Sobre o Membro:
          </h4>
          <p className="text-gray-400 leading-relaxed text-base">
            {member.description || "Nenhuma descrição disponível."}
          </p>
        </div>

        {/* Seção de "Empenho" REMOVIDA */}

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6"> {/* Alterado para justify-center */}
          <button
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded transition w-full sm:w-auto cursor-pointer"
            onClick={onSendFeedback}
          >
            <FiMessageCircle /> Enviar Feedback
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition w-full sm:w-auto cursor-pointer"
            onClick={() => onRemoveMember(member.id)}
          >
            <FiTrash2 /> Remover Membro
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamAreaMemberDetailsModal;