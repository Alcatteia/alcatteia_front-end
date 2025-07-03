import React, { useState } from 'react';
import { useCheck } from '../../../context/CheckContext';

export default function MessageInput() {
  const { user, sendMessage } = useCheck();
  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (text.trim() === '') return;

    const messageData = {
      user: isAnonymous ? 'Anônimo' : user.name,
      avatar: isAnonymous ? null : user.avatar,
      text: text.trim(),
    };

    sendMessage(messageData);
    setText('');
    setIsAnonymous(false);
  };

  return (
    <div className="bg-[#1F152D] p-4 rounded-lg border border-[#3A2C4A] w-full flex flex-col justify-between min-h-[230px] overflow-hidden">
      {/* Título */}
      <h2 className="text-base sm:text-lg font-semibold mb-2 text-white">
        Diga algo para sua Alcateia!
      </h2>

      {/* Textarea + contador */}
      <div className="relative flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={100}
          placeholder="Aqui vai um pensamento..."
          className="w-full h-full bg-[#2A1C3A] text-white p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 break-words"
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-400">
          {text.length}/100
        </span>
      </div>

      {/* Opções */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-2 w-full">
        {/* Checkbox Anônimo */}
        <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 w-full sm:w-auto justify-start">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
            className="accent-purple-500"
          />
          Enviar como anônimo
        </label>

        {/* Botão Enviar */}
        <div className="w-full sm:w-auto flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={text.trim() === ''}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded transition w-full sm:w-auto"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
