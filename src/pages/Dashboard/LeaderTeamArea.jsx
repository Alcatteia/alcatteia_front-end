// src/pages/Dashboard/LeaderTeamArea.jsx
import React, { useState, useCallback } from "react";
import {
  FiUserPlus,
  FiInfo,
  FiMail,
  FiMessageCircle,
  FiTrash2,
  FiCopy,
} from "react-icons/fi";

// Importações de componentes e serviços
import TeamAreaFeedbackConfirmationCard from "./components/TeamAreaFeedbackConfirmationCard"; 
import { useTeamMembers } from "../../hooks/useTeamMembers"; 

// Importações dos componentes de Modal
import TeamAreaAddModal from "./components/TeamAreaAddModal";
import TeamAreaMemberDetailsModal from "./components/TeamAreaMemberDetailsModal";
import TeamAreaSendFeedbackModal from "./components/TeamAreaSendFeedbackModal";
import TeamAreaConfirmRemoveModal from "./components/TeamAreaConfirmRemoveModal";

// Dados Estáticos para filtro de pesquisa
const roles = ["Todos", "Back-end", "Front-end", "Full-stack", "Teacher"];

// Variável para simular o nome do líder logado (ajuste conforme sua autenticação real)
const loggedInLeaderName = "Seu Nome de Líder"; 

// --- Componente Principal ---
export default function LeaderTeamArea() {
  // --- Consumindo o Hook Personalizado ---
  const {
    members,
    alcatteiaAvailableUsers,
    isLoading,
    operationStatus, 
    fetchAlcatteiaUsers,
    addMemberToTeam,
    removeMemberFromTeam,
    sendFeedback, // função de feedback do hook
    resetOperationStatus, 
  } = useTeamMembers();

  // Estados Locais do Componente (não gerenciados pelo hook) 
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Estados dos Modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  // Estados para busca e filtro dentro do modal de adição
  const [alcatteiaSearch, setAlcatteiaSearch] = useState("");
  const [alcatteiaRoleFilter, setAlcatteiaRoleFilter] = useState("Todos");


  // --- Funções de Manipulação de UI e Dados (delegando ao hook) ---

  /**
   * Abre o modal de adição de membros e inicia a busca por usuários da Alcatéia.
   */
  const handleOpenAddModal = useCallback(() => {
    fetchAlcatteiaUsers(); 
    setAlcatteiaSearch(""); 
    setAlcatteiaRoleFilter("Todos"); 
    setShowAddModal(true);
  }, [fetchAlcatteiaUsers]);

  /**
   * Manipulador para adicionar um membro à equipe.
   * Delega a lógica ao hook `useTeamMembers`.
   * @param {object} memberData - Dados do membro a ser adicionado.
   */
  const handleAddAlcatteiaMember = useCallback(async (memberData) => {
    await addMemberToTeam(memberData);
  }, [addMemberToTeam]);

  /**
   * Abre o modal de detalhes de um membro específico.
   * @param {object} member - O objeto do membro selecionado.
   */
  const handleOpenMemberDetails = useCallback((member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  }, []);

  /**
   * Abre o modal de confirmação para remover um membro.
   * Fecha o modal de detalhes se estiver aberto.
   * @param {string} memberId - O ID do membro a ser removido.
   */
  const handleOpenConfirmRemove = useCallback((memberId) => {
    const member = members.find((m) => m.id === memberId);
    if (member) {
      setSelectedMember(member); // Usado para exibir informações no modal de remoção
      setMemberToRemove(member);
      setShowConfirmRemoveModal(true);
    }
    setShowDetailsModal(false); 
  }, [members]);

  /**
   * Confirma e executa a remoção do membro selecionado.
   * Delega a lógica ao hook `useTeamMembers`.
   */
  const handleConfirmRemoveMember = useCallback(async () => {
    if (memberToRemove) {
      await removeMemberFromTeam(memberToRemove.id); 
      setShowConfirmRemoveModal(false);
      setMemberToRemove(null);
      setSelectedMember(null); 
    }
  }, [memberToRemove, removeMemberFromTeam]);

  /**
   * Abre o modal para enviar feedback ao membro selecionado.
   * Fecha o modal de detalhes antes de abrir o de feedback.
   */
  const handleOpenFeedbackForm = useCallback(() => {
    setShowDetailsModal(false); 
    setShowFeedbackModal(true);
  }, []);

  /**
   * Envia o feedback para o membro selecionado.
   * Delega a lógica ao hook `useTeamMembers`.
   * @param {string} subject - Assunto do feedback.
   * @param {string} message - Mensagem do feedback.
   */
  const handleSendFeedbackSubmit = useCallback(async (subject, message) => {
    if (selectedMember) {
      const feedbackData = {
        from: loggedInLeaderName, 
        to: selectedMember.name,
        toEmail: selectedMember.email,
        subject: subject,
        message: message,
      };
      await sendFeedback(feedbackData); 
      setShowFeedbackModal(false);
    }
  }, [selectedMember, sendFeedback]);


  /**
   * Copia o e-mail de um membro para a área de transferência.
   * Exibe uma mensagem temporária de "Copiado!".
   * @param {string} email - O e-mail a ser copiado.
   */
  const handleCopy = useCallback((email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1200);
  }, []);

  // --- Filtros ---
  const filteredMembers = members.filter(
    (m) =>
      (roleFilter === "Todos" || m.role === roleFilter) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()))
  );

  // --- Renderização do Componente ---
  return (
    <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex justify-center h-full">
      <section className="w-full max-w-[90%] mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8 h-full">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1 flex flex-wrap items-center gap-x-2">
              Equipe <span className="text-white">Alcatteia</span>
              <span className="text-xs bg-purple-700 text-white px-2 py-1 rounded-full mt-1 md:mt-0">
                {members.length} membros
              </span>
            </h2>
            <span className="text-gray-300 text-base">Instituto PROA</span>
          </div>
          {/* Botão de Adicionar Membro */}
          <div className="flex justify-end md:justify-start gap-4 items-center w-full md:w-auto">
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition hover:opacity-90 w-full justify-center md:w-auto cursor-pointer"
              title="Adicionar membro"
              onClick={handleOpenAddModal}
            >
              <FiUserPlus className="w-5 h-5" />
              Adicionar Membro
            </button>
          </div>
        </div>

        {/* Seção de Filtros e Busca (para a tabela principal) */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nome, função ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-1/2 rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* --- Exibição de Membros (Cards para Mobile) --- */}
        <div className="block sm:hidden grid grid-cols-1 gap-4">
          {/* Mensagem se nenhum membro for encontrado */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-6 text-gray-400 bg-[#18162a] rounded-xl shadow-lg p-4">
              Nenhum membro encontrado. Adicione novos membros usando o botão
              acima.
            </div>
          )}
          {/* Renderiza cada membro em um card */}
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="bg-[#18162a] rounded-xl shadow-lg p-4 relative border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-16 h-16 rounded-full border-2 border-purple-400 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{m.name}</h3>
                  <p className="text-purple-300 text-sm">{m.role}</p>
                </div>
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 cursor-pointer"
                  onClick={() => handleOpenMemberDetails(m)}
                  title="Ver detalhes"
                >
                  <FiInfo className="w-6 h-6" />
                </button>
              </div>

              {/* E-mail no Card (com botão de copiar) */}
              <div className="text-gray-400 text-sm mb-3 truncate max-w-[calc(100%-40px)]">
                {m.email}
                <button
                  className="ml-2 text-purple-400 hover:text-purple-200 transition cursor-pointer"
                  title={copiedEmail === m.email ? "Copiado!" : "Copiar e-mail"}
                  onClick={() => handleCopy(m.email)}
                >
                  <FiCopy className="w-3 h-3 inline" />
                </button>
                {copiedEmail === m.email && (
                  <span className="text-green-400 text-xs ml-1 animate-pulse">
                    Copiado!
                  </span>
                )}
              </div>

              {/* Barra de Empenho no Card */}
              <div className="mb-4">
                <span className="block text-sm text-gray-300 mb-1">Empenho:</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${m.empenho}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-300">{m.empenho}%</span>
                </div>
              </div>

              {/* Botões de Ação no Card */}
              <div className="flex justify-end gap-2 text-sm">
                <button
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition w-full sm:w-auto justify-center"
                  title="Enviar Feedback"
                  onClick={() => {
                    setSelectedMember(m);
                    handleOpenFeedbackForm();
                  }}
                >
                  <FiMessageCircle className="w-4 h-4" /> Feedback
                </button>
                <button
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition w-full sm:w-auto justify-center cursor-pointer"
                  title="Remover membro"
                  onClick={() => handleOpenConfirmRemove(m.id)}
                >
                  <FiTrash2 className="w-4 h-4" /> Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Tabela de Membros (para Desktop) --- */}
        <div className="hidden sm:block overflow-hidden bg-[#18162a] rounded-xl shadow-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#232046]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Membro
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Função
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Empenho
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#18162a] divide-y divide-gray-700">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-400">
                    Nenhum membro encontrado.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-[#232046] transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-purple-400"
                            src={m.photo}
                            alt={m.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {m.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {m.description || "Sem descrição"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300 flex items-center group">
                        {m.email}
                        <button
                          className="ml-2 text-purple-400 hover:text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                          title={copiedEmail === m.email ? "Copiado!" : "Copiar e-mail"}
                          onClick={() => handleCopy(m.email)}
                        >
                          <FiCopy className="w-4 h-4" />
                        </button>
                        {copiedEmail === m.email && (
                          <span className="text-green-400 text-xs ml-1 animate-pulse">
                            Copiado!
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-300">
                      {m.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                            style={{ width: `${m.empenho}%` }}
                          ></div>
                        </div>
                        <span>{m.empenho}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition"
                          title="Ver detalhes"
                          onClick={() => handleOpenMemberDetails(m)}
                        >
                          <FiInfo className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition"
                          title="Remover membro"
                          onClick={() => handleOpenConfirmRemove(m.id)}
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- Modais --- */}

        {/* Modal para Adicionar Membro (Usuários da Alcatéia) */}
        <TeamAreaAddModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          alcatteiaAvailableUsers={alcatteiaAvailableUsers}
          alcatteiaSearch={alcatteiaSearch}
          setAlcatteiaSearch={setAlcatteiaSearch}
          alcatteiaRoleFilter={alcatteiaRoleFilter}
          setAlcatteiaRoleFilter={setAlcatteiaRoleFilter}
          alcatteiaLoading={isLoading.alcatteia}
          onAddMember={handleAddAlcatteiaMember}
        />

        {/* Modal de Detalhes do Membro*/}
        <TeamAreaMemberDetailsModal
          show={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          member={selectedMember}
          onSendFeedback={handleOpenFeedbackForm}
          onRemoveMember={handleOpenConfirmRemove}
        />

        {/* Modal de Envio de Feedback*/}
        <TeamAreaSendFeedbackModal
          show={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          member={selectedMember}
          onSendFeedbackSubmit={handleSendFeedbackSubmit}
          operationStatus={operationStatus} 
        />

        {/* Card de Confirmação de Feedback (flutua sobre o conteúdo) */}
        {operationStatus && operationStatus.type && (
          <TeamAreaFeedbackConfirmationCard
            status={operationStatus.type}
            message={operationStatus.message} 
            onClose={resetOperationStatus} 
          />
        )}

        {/* Modal de Confirmação de Remoção */}
        <TeamAreaConfirmRemoveModal
          show={showConfirmRemoveModal}
          onClose={() => setShowConfirmRemoveModal(false)}
          member={memberToRemove}
          onConfirm={handleConfirmRemoveMember}
        />
      </section>
    </main>
  );
}