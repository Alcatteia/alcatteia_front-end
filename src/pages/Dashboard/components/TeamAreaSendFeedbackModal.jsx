// src/components/TeamAreaSendFeedbackModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiSend, FiLoader } from 'react-icons/fi';

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

  useEffect(() => {
    if (show) {
      setSubject('');
      setMessage('');
      setErrorMessage('');
    }
  }, [show, member]);

  const isSending = operationStatus?.type === 'loading';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!subject.trim() || !message.trim()) {
      setErrorMessage('Assunto e mensagem são obrigatórios.');
      return;
    }

    await onSendFeedbackSubmit(subject, message);
  };

  if (!show || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#160F23] rounded-lg shadow-xl p-6 w-full max-w-md relative border border-gray-700">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h2 className="text-2xl font-bold text-white">
            Feedback para {member.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label htmlFor="feedbackToEmail" className="block text-gray-300 text-sm font-bold mb-2">Para:</label>
            <input
              type="text"
              id="feedbackToEmail"
              value={member.email}
              readOnly
              className="w-full px-4 py-2 rounded bg-[#232046] text-gray-300 border border-gray-600 cursor-not-allowed focus:outline-none"
              disabled={isSending}
            />
          </div>

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
              maxLength={100}
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
              maxLength={500}
            ></textarea>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
          )}

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
