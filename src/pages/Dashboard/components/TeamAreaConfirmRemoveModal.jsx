// src/components/TeamAreaConfirmRemoveModal.jsx

import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

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
 * Componente TeamAreaConfirmRemoveModal
 *
 * Modal de confirmação para remover um membro da equipe.
 * Exibe uma mensagem de alerta e requer a confirmação do usuário antes de prosseguir
 * com a remoção, evitando ações acidentais.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.show - Se o modal deve ser exibido.
 * @param {function} props.onClose - Função de callback para fechar o modal.
 * @param {TeamMember | null} props.member - O objeto do membro a ser removido. Pode ser null se nenhum membro estiver selecionado.
 * @param {function(): Promise<void>} props.onConfirm - Função de callback a ser executada quando a remoção for confirmada.
 */
export default function TeamAreaConfirmRemoveModal({ show, onClose, member, onConfirm }) {
  if (!show || !member) return null; // Não renderiza se não estiver visível ou se não houver membro

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#160F23] rounded-lg shadow-xl p-6 w-full max-w-md relative border border-gray-700">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h2 className="text-2xl font-bold text-white">Confirmar Remoção</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="flex flex-col items-center text-center mb-6">
          <FiAlertTriangle className="text-red-500 text-6xl mb-4" />
          <p className="text-gray-300 text-lg mb-2">
            Tem certeza que deseja remover **{member.name}** da equipe?
          </p>
          <p className="text-gray-400 text-sm">
            Esta ação não poderá ser desfeita.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}