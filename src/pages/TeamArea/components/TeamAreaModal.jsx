// src/components/modals/TeamAreaAddModal.jsx
import React from 'react';
import { FiX, FiSearch, FiPlusCircle } from 'react-icons/fi';

// Dados Estáticos para filtro de pesquisa (se forem comuns, podem ir para um arquivo de constantes)
const roles = ["Todos", "Back-end", "Front-end", "Full-stack", "Teacher"];

const TeamAreaAddModal = ({
  show,
  onClose,
  alcatteiaAvailableUsers,
  alcatteiaSearch,
  setAlcatteiaSearch,
  alcatteiaRoleFilter,
  setAlcatteiaRoleFilter,
  alcatteiaLoading,
  onAddMember, // Função para adicionar membro (recebida via props)
}) => {
  if (!show) return null;

  // Filtra os usuários para o modal adicionar membro
  const filteredAlcatteiaUsers = alcatteiaAvailableUsers.filter(
    (u) =>
      (alcatteiaRoleFilter === "Todos" || u.role === alcatteiaRoleFilter) &&
      (u.name.toLowerCase().includes(alcatteiaSearch.toLowerCase()) ||
        u.role.toLowerCase().includes(alcatteiaSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(alcatteiaSearch.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl relative border-2 border-cyan-700">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 cursor-pointer"
          onClick={onClose}
        >
          <FiX className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 tracking-wider">
          <FiPlusCircle /> Adicionar Membros da Alcatéia
        </h3>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full md:w-3/4">
            <input
              type="text"
              placeholder="Buscar usuário por nome, função ou e-mail..."
              value={alcatteiaSearch}
              onChange={(e) => setAlcatteiaSearch(e.target.value)}
              className="w-full rounded px-4 pl-10 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={alcatteiaRoleFilter}
            onChange={(e) => setAlcatteiaRoleFilter(e.target.value)}
            className="w-full md:w-1/4 rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {alcatteiaLoading ? (
            <div className="flex justify-center items-center h-full text-gray-400">
              Carregando usuários da Alcatéia...
            </div>
          ) : filteredAlcatteiaUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Nenhum usuário disponível com os critérios de busca.
              <br />
              (Ou todos os usuários já foram adicionados à sua equipe)
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredAlcatteiaUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-[#232046] rounded-lg p-4 flex items-center justify-between gap-4 border border-gray-700 hover:border-purple-500 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
                    />
                    <div>
                      <h4 className="text-md font-semibold text-white">
                        {user.name}
                      </h4>
                      <p className="text-sm text-purple-300">{user.role}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition shadow-md cursor-pointer"
                    title={`Adicionar ${user.name} à equipe`}
                    onClick={() => onAddMember(user)}
                  >
                    <FiPlusCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
            onClick={onClose}
          >
            <FiX /> Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamAreaAddModal;