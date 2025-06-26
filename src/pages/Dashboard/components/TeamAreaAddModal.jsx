// src/components/TeamAreaAddModal.jsx

import React, { useState, useEffect } from 'react';
import { FiX, FiSearch, FiUserPlus } from 'react-icons/fi';

/**
 * @typedef {object} AlcatteiaUser
 * @property {string} id - ID único do usuário.
 * @property {string} name - Nome do usuário.
 * @property {string} email - E-mail do usuário.
 * @property {string} role - Função/cargo do usuário (ex: "Front-end", "Back-end").
 * @property {string} photo - URL da foto de perfil do usuário.
 * @property {string} [description] - Descrição opcional do usuário.
 */

/**
 * Componente TeamAreaAddModal
 *
 * Modal para adicionar novos membros à equipe, selecionando-os de uma lista
 * de usuários disponíveis (ex: usuários da "Alcatéia"). Permite buscar e filtrar
 * os usuários para facilitar a seleção.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.show - Se o modal deve ser exibido.
 * @param {function} props.onClose - Função de callback para fechar o modal.
 * @param {AlcatteiaUser[]} props.alcatteiaAvailableUsers - Lista de usuários disponíveis para adicionar.
 * @param {string} props.alcatteiaSearch - Termo de busca atual para filtrar usuários.
 * @param {function} props.setAlcatteiaSearch - Função para atualizar o termo de busca.
 * @param {string} props.alcatteiaRoleFilter - Filtro de função/cargo atual.
 * @param {function} props.setAlcatteiaRoleFilter - Função para atualizar o filtro de função.
 * @param {boolean} props.alcatteiaLoading - Indica se a lista de usuários está sendo carregada.
 * @param {function(AlcatteiaUser): Promise<void>} props.onAddMember - Função de callback para adicionar um membro à equipe.
 */
export default function TeamAreaAddModal({
  show,
  onClose,
  alcatteiaAvailableUsers,
  alcatteiaSearch,
  setAlcatteiaSearch,
  alcatteiaRoleFilter,
  setAlcatteiaRoleFilter,
  alcatteiaLoading,
  onAddMember,
}) {
  const roles = ["Todos", "Back-end", "Front-end", "Full-stack", "Teacher"];

  // Filtra os usuários disponíveis com base na busca e filtro de função.
  const filteredAlcatteiaUsers = alcatteiaAvailableUsers.filter(
    (user) =>
      (alcatteiaRoleFilter === "Todos" || user.role === alcatteiaRoleFilter) &&
      (user.name.toLowerCase().includes(alcatteiaSearch.toLowerCase()) ||
       user.email.toLowerCase().includes(alcatteiaSearch.toLowerCase()) ||
       user.role.toLowerCase().includes(alcatteiaSearch.toLowerCase()))
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#160F23] rounded-lg shadow-xl p-6 w-full max-w-2xl relative border border-gray-700">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h2 className="text-2xl font-bold text-white">Adicionar Membros</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de Busca e Filtro */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Buscar usuário..."
              className="w-full rounded px-4 pl-10 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
              value={alcatteiaSearch}
              onChange={(e) => setAlcatteiaSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="w-full md:w-1/3 rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
            value={alcatteiaRoleFilter}
            onChange={(e) => setAlcatteiaRoleFilter(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Lista de Usuários Disponíveis */}
        <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {alcatteiaLoading ? (
            <div className="text-center py-8 text-gray-400">Carregando usuários...</div>
          ) : filteredAlcatteiaUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Nenhum usuário encontrado com os filtros aplicados.</div>
          ) : (
            <ul className="space-y-3">
              {filteredAlcatteiaUsers.map((user) => (
                <li key={user.id} className="flex items-center justify-between bg-[#232046] rounded-lg p-3 shadow-sm border border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photo || "https://via.placeholder.com/40"} // Fallback para foto
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-purple-500"
                    />
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email} - {user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddMember(user)}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
                    title={`Adicionar ${user.name}`}
                  >
                    <FiUserPlus className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="flex justify-end pt-4 border-t border-gray-700 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}