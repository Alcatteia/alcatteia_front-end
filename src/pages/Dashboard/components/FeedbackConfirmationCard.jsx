// src/components/FeedbackConfirmationCard.jsx

import React from 'react';
import { FiCheckCircle, FiLoader, FiXCircle } from 'react-icons/fi';

export default function FeedbackConfirmationCard({ status, onClose }) {
  let icon;
  let message;
  let bgColor;
  let textColor;

  switch (status) {
    case 'loading':
      icon = <FiLoader className="animate-spin text-4xl" />;
      message = "Enviando feedback...";
      bgColor = "bg-blue-800";
      textColor = "text-blue-100";
      break;
    case 'success':
      icon = <FiCheckCircle className="text-4xl" />;
      message = "Feedback enviado com sucesso!";
      bgColor = "bg-green-800";
      textColor = "text-green-100";
      break;
    case 'error':
      icon = <FiXCircle className="text-4xl" />;
      message = "Falha ao enviar feedback. Tente novamente.";
      bgColor = "bg-red-800";
      textColor = "text-red-100";
      break;
    default:
      return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={` ${bgColor} ${textColor} rounded-xl shadow-2xl p-8 text-center flex flex-col items-center max-w-sm w-full transform transition-all duration-300 scale-100`}>
        <div className="mb-4">
          {icon}
        </div>
        <p className="text-xl font-semibold mb-6">{message}</p>
        {status !== 'loading' && ( // Oculta o botão "Fechar" enquanto carrega
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-bold transition-colors
              ${status === 'success' ? 'bg-green-900 hover:bg-green-900' : 'bg-red-900 hover:bg-red-900'}
              text-white`}
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}