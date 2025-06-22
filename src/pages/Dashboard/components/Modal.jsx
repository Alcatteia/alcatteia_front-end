// src/components/Modal.jsx
import React, { useEffect, useCallback } from 'react';
import { FiX } from 'react-icons/fi'; // Ícone de fechar do Feather Icons

/**
 * Componente Modal reutilizável.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.isOpen - Se o modal está aberto ou fechado.
 * @param {function} props.onClose - Função a ser chamada quando o modal for fechado.
 * @param {React.ReactNode} props.title - O título do modal, pode ser string ou JSX.
 * @param {React.ReactNode} props.children - O conteúdo principal do modal.
 * @param {React.ReactNode} [props.footerContent] - Conteúdo opcional para o rodapé do modal (ex: data de atualização).
 * @param {string} [props.size] - Tamanho do modal ('sm', 'md', 'lg', 'xl', '2xl', '3xl'). Padrão 'md'.
 */
export default function Modal({ isOpen, onClose, title, children, footerContent, size = 'md' }) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl' 
  }[size];

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Não bloqueamos o scroll do body aqui se o modal for "inline"
      // document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      // document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) {
    return null;
  }

  return (
    // Overlay: Agora 'absolute' para se posicionar dentro do seu pai 'relative'.
    // Fundo translúcido sólido, sem blur.
    // Usamos 'bg-black/75' para um escurecimento mais perceptível, como Monday/ClickUp.
    <div className="absolute inset-0 flex items-center justify- z-50 p-4
                    bg-black/75 transition-opacity duration-300 ease-out">
      {/* Container principal do modal */}
      <div className={`bg-[#1e293b] rounded-lg shadow-2xl ${maxWidthClass} mx-auto
                      border border-gray-700 flex flex-col max-h-[50vh]
                      transform transition-all duration-300 ease-out scale-100 opacity-100`}>

        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white flex-grow">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200 p-2 rounded-md hover:bg-gray-700" // Mais retangular como em ferramentas
            aria-label="Fechar modal"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Corpo do modal: conteúdo principal com scroll se necessário */}
        {/* 'overflow-y-auto' aqui é para o conteúdo interno DO MODAL, não para o modal em si rolar a tela */}
        <div className="p-5 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Rodapé do modal: renderizado apenas se houver footerContent */}
        {footerContent && (
          <div className="p-5 border-t border-gray-700 text-sm text-gray-500">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}