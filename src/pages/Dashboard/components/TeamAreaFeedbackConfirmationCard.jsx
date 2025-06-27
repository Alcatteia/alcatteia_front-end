// src/components/TeamAreaFeedbackConfirmationCard.jsx
import React from 'react';
import { FiCheckCircle, FiLoader, FiXCircle } from 'react-icons/fi';

export default function TeamAreaFeedbackConfirmationCard({ status, onClose, message: customMessage }) {
  let icon;
  let defaultMessage; // Mensagem padrão baseada no status
  let bgColor;
  let textColor;

  // Define o ícone, a mensagem padrão, e as classes de cor com base no status da operação.
  switch (status) {
    case 'loading':
      icon = <FiLoader className="animate-spin text-4xl" />;
      defaultMessage = "Processando sua solicitação..."; // Mensagem de carregamento mais genérica
      bgColor = "bg-blue-800";
      textColor = "text-blue-100";
      break;
    case 'success':
      icon = <FiCheckCircle className="text-4xl" />;
      defaultMessage = "Operação concluída com sucesso!";
      bgColor = "bg-green-800";
      textColor = "text-green-100";
      break;
    case 'error':
      icon = <FiXCircle className="text-4xl" />;
      defaultMessage = "Ocorreu um erro na operação.";
      bgColor = "bg-red-600";
      textColor = "text-red-100";
      break;
    default:
      return null; // Não renderiza o componente se o status não for reconhecido.
  }

  const displayMessage = customMessage || defaultMessage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={` ${bgColor} ${textColor} rounded-xl shadow-2xl p-8 text-center flex flex-col items-center max-w-sm w-full transform transition-all duration-300 scale-100`}>
        <div className="mb-4">
          {icon}
        </div>
        <p className="text-xl font-semibold mb-6">{displayMessage}</p>
        {status !== 'loading' && (
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-bold transition-colors
              ${status === 'success' ? 'bg-green-900 hover:bg-green-700' : 'bg-red-900 hover:bg-red-700'}
              text-white`}
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}