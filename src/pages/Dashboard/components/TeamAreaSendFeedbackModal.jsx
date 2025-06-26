// src/components/TeamAreaSendFeedbackModal.jsx

import React, { useState, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';

/**
 * @typedef {object} TeamMember
 * @property {string} id - ID único do membro.
 * @property {string} name - Nome do membro.
 * @property {string} email - E-mail do membro.
 * @property {string} role - Função/cargo do membro.
 * @property {string} photo - URL da foto de perfil do membro.
 * @property {number} empenho - Nível de empenho do membro.
 * @property {string} [description] - Descrição opcional do membro.
 */

/**
 * @typedef {'loading' | 'success' | 'error' | null} OperationStatusType
 */

/**
 * @typedef {object} OperationStatus
 * @property {OperationStatusType} type - O tipo de status da operação.
 * @property {string | null} message - Mensagem associada ao status.
 */

/**
 * Componente TeamAreaSendFeedbackModal
 *
 * Modal para o líder de equipe enviar feedback a um membro específico.
 * Permite preencher um assunto e uma mensagem, e gerencia o estado de envio.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.show - Se o modal deve ser exibido.
 * @param {function} props.onClose - Função de callback para fechar o modal.
 * @param {TeamMember | null} props.member - O objeto do membro para quem o feedback será enviado.
 * @param {function(string, string): Promise<void>} props.onSendFeedbackSubmit - Função de callback para enviar o feedback. Recebe assunto e mensagem.
 * @param {OperationStatus | null} props.operationStatus - O status atual da operação (ex: 'loading', 'success', 'error'). Usado para desabilitar o formulário enquanto envia.
 */
export default function TeamAreaSendFeedbackModal({
  show,
  onClose,
  member,
  onSendFeedbackSubmit,
  operationStatus,
}) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Limpa o formulário quando o modal é aberto ou o membro muda
  useEffect(() => {
    if (show) {
      setSubject('');
      setMessage('');
      setErrorMessage('');
    }
  }, [show, member]);

  // Verifica se o status de operação está em carregamento
  const isSending = operationStatus?.type === 'loading';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa qualquer erro anterior

    if (!subject.trim() || !message.trim()) {
      setErrorMessage('Assunto e mensagem são obrigatórios.');
      return;
    }

    // Chama a função de envio do componente pai
    await onSendFeedbackSubmit(subject, message);
    // O modal será fechado pelo pai após o sucesso, se o hook gerenciar isso.
  };

  if (!show || !member) return null; // Não renderiza se não estiver visível ou sem membro

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#160F23] rounded-lg shadow-xl p-6 w-full max-w-md relative border border-gray-700">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h2 className="text-2xl font-bold text-white">
            Feedback para {member.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Formulário de Feedback */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="subject" className="block text-gray-300 text-sm font-bold mb-2">
              Assunto:
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 rounded bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSending}
              maxLength={100} // Limite de caracteres para o assunto
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
              Mensagem:
            </label>
            <textarea
              id="message"
              className="w-full px-4 py-2 rounded bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400 h-32 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
              maxLength={500} // Limite de caracteres para a mensagem
            ></textarea>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              disabled={isSending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-colors
                ${isSending ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
                text-white`}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <FiLoader className="animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  <FiSend /> Enviar Feedback
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}