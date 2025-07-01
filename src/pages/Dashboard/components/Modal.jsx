// src/components/Modal.jsx
import React, { useEffect, useCallback } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
  size = "md",
}) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  }[size];

  const handleEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // bloqueia o scroll
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    }
    // Função de limpeza
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset"; // Garante que o scroll seja reativado se o componente for desmontado
    };
  }, [isOpen, handleEscape]); // Dependências do useEffect

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4
                     bg-black/75 transition-opacity duration-300 ease-out"
    >
      <div
        className={`bg-[#1e293b] rounded-lg shadow-2xl ${maxWidthClass} mx-auto
                       border-2 border-purple-600 flex flex-col max-h-[90vh] w-full
                       transform transition-all duration-300 ease-out scale-100 opacity-100`}
      >
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

        <div className="p-5 overflow-y-auto flex-1">{children}</div>

        {footerContent && (
          <div className="p-5 border-t border-gray-700 text-sm text-gray-500">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}
