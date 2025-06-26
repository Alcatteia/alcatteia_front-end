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
      // bloqueia o scroll 
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    }
    // Função de limpeza
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Garante que o scroll seja reativado se o componente for desmontado
      
    };
  }, [isOpen, handleEscape]); // Dependências do useEffect

  if (!isOpen) {
    return null;
  }

  return (
    // Overlay: Agora 'fixed' para cobrir toda a viewport,
    // 'inset-0' para ocupar 100% da largura e altura,
    // 'flex items-center justify-center' para centralizar o modal vertical e horizontalmente.
    // 'z-50' para garantir que fique acima de outros elementos.
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4
                     bg-black/75 transition-opacity duration-300 ease-out">
      {/* Container principal do modal */}
      {/* Adicionado 'border-2' e 'border-purple-600' para a borda roxa */}
      {/* Aumentado 'max-h' para 'max-h-[90vh]' para mais espaço vertical */}
      <div className={`bg-[#1e293b] rounded-lg shadow-2xl ${maxWidthClass} mx-auto
                       border-2 border-purple-600 flex flex-col max-h-[90vh] w-full
                       transform transition-all duration-300 ease-out scale-100 opacity-100`}>

        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white flex-grow">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200 p-2 rounded-md hover:bg-gray-700"
            aria-label="Fechar modal"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Corpo do modal: conteúdo principal com scroll se necessário */}
        {/* 'overflow-y-auto' aqui é para o conteúdo interno DO MODAL, permitindo que ele role se for muito grande */}
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