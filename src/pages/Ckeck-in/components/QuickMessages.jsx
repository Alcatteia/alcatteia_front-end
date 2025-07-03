import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
// import { useCheck } from '../../../context/CheckContext';

export default function QuickMessages({ messages }) {
  // const { messages } = useCheck();
  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.scrollHeight > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-[#1f152d] p-4 rounded-lg border border-[#3A2C4A] h-full min-h-[180px]">
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-white">
        Recados rápidos para você:
      </h2>

      {messages.map((msg, index) => {
        const userName = typeof msg.user === 'string' ? msg.user : 'Anônimo';
        const messageText = typeof msg.text === 'string' ? msg.text : '[Mensagem inválida]';

        return (
          <div key={index} className="border-b border-[#3A2C4A] pb-2">
            <div className="flex items-center gap-3 mb-1">
              {!msg.avatar || userName === 'Anônimo' ? (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
              ) : (
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover bg-gray-600"
                />
              )}
              <span className="font-medium text-white text-sm">{userName} enviou:</span>
            </div>
            <p className="text-sm text-gray-300">{messageText}</p>
          </div>
        );
      })}

      {/* Botão para rolar para baixo */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-2 right-2 bg-[#2A1C3A] hover:bg-[#3A2C4A] text-white rounded-full p-2 shadow-md transition-all"
          aria-label="Ver mais recados"
        >
          <FiChevronDown size={18} />
        </button>
      )}
    </div>
  );
}
