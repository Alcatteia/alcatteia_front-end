import React from 'react';
import PropTypes from 'prop-types';
import { FaWolfPackBattalion } from 'react-icons/fa6'; // Substitua pelo ícone correto do lobo, se tiver

export default function NotificationModal({ requester, onAccept, onReject }) {
  return (
    <div className="absolute right-2 top-14 z-50 w-96 bg-[#1F152D] border border-[#3A2C4A] rounded-lg shadow-lg text-white">
      <div className="p-4">
        {/* Título */}
        <h3 className="text-lg font-semibold mb-4">Notificações</h3>

        {/* Notificação individual */}
        <div className="flex items-start gap-3">
          {/* Avatar estilo lobo */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 shadow-sm">
            <FaWolfPackBattalion size={20} />
          </div>

          {/* Mensagem e botões */}
          <div className="flex-1">
            <p className="text-sm mb-3 leading-snug">
              <strong>{requester}</strong> enviou a você um pedido para participar da sua tarefa
            </p>

            <div className="flex gap-2 justify-start">
              <button
                onClick={onAccept}
                className="bg-[#4D4CFF] hover:bg-[#3D3CFF] text-white text-xs px-3 py-1 rounded"
              >
                Aceitar
              </button>
              <button
                onClick={onReject}
                className="bg-transparent border border-[#3A2C4A] hover:bg-[#2A1C3A] text-white text-xs px-3 py-1 rounded"
              >
                Estou bem, obrigado!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NotificationModal.propTypes = {
  requester: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};
