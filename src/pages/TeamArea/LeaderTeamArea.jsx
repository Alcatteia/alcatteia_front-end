// src/pages/Dashboard/LeaderTeamArea.jsx
import React, { useState, useCallback } from "react";
import {
  FiUser,
  FiMessageCircle,
  FiTrash2,
  FiCopy,
  FiUserPlus,
  FiX,
  FiSend,
  FiCheckCircle,
  FiInfo,
  FiMail,
} from "react-icons/fi";

import TeamAreaFeedbackConfirmationCard from "../Dashboard/components/TeamAreaFeedbackConfirmationCard";
import { useTeamMembers } from "../../hooks/useTeamMembers";

import TeamAreaAddModal from "../Dashboard/components/TeamAreaAddModal";
import TeamAreaMemberDetailsModal from "../Dashboard/components/TeamAreaMemberDetailsModal";
import TeamAreaSendFeedbackModal from "../Dashboard/components/TeamAreaSendFeedbackModal";
import TeamAreaConfirmRemoveModal from "../Dashboard/components/TeamAreaConfirmRemoveModal";

const roles = ["Todos", "Back-end", "Front-end", "Full-stack", "Teacher"];

const loggedInLeaderName = "Seu Nome de Líder";

export default function LeaderTeamArea() {
  const {
    members,
    alcatteiaAvailableUsers,
    isLoading,
    operationStatus,
    fetchAlcatteiaUsers,
    addMemberToTeam,
    removeMemberFromTeam,
    sendFeedback,
    resetOperationStatus,
  } = useTeamMembers();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [copiedEmail, setCopiedEmail] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const [alcatteiaSearch, setAlcatteiaSearch] = useState("");
  const [alcatteiaRoleFilter, setAlcatteiaRoleFilter] = useState("Todos");

  const handleOpenAddModal = useCallback(() => {
    fetchAlcatteiaUsers();
    setAlcatteiaSearch("");
    setAlcatteiaRoleFilter("Todos");
    setShowAddModal(true);
  }, [fetchAlcatteiaUsers]);

  const handleAddAlcatteiaMember = useCallback(
    async (memberData) => {
      await addMemberToTeam(memberData);
    },
    [addMemberToTeam]
  );

  const handleOpenMemberDetails = useCallback((member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
  }, []);

  const handleOpenConfirmRemove = useCallback(
    (memberId) => {
      const member = members.find((m) => m.id === memberId);
      if (member) {
        setSelectedMember(member);
        setMemberToRemove(member);
        setShowConfirmRemoveModal(true);
      }
      setShowDetailsModal(false);
    },
    [members]
  );

  const handleConfirmRemoveMember = useCallback(async () => {
    if (memberToRemove) {
      await removeMemberFromTeam(memberToRemove.id);
      setShowConfirmRemoveModal(false);
      setMemberToRemove(null);
      setSelectedMember(null);
    }
  }, [memberToRemove, removeMemberFromTeam]);

  const handleOpenFeedbackForm = useCallback(() => {
    setShowDetailsModal(false);
    setShowFeedbackModal(true);
  }, []);

  const handleSendFeedbackSubmit = useCallback(
    async (subject, message) => {
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
    },
    [selectedMember, sendFeedback]
  );

  const handleCopy = useCallback((email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1200);
  }, []);

  const filteredMembers = members.filter(
    (m) =>
      (roleFilter === "Todos" || m.role === roleFilter) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="flex-1 text-gray-200 font-poppins flex justify-center h-full">
      <section className="w-full max-w-[90%] mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8 h-full">
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
            className="w-full md:w-48 rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg bg-[#18162a]">
          <table className="min-w-full text-left text-gray-200">
            <thead>
              <tr className="bg-[#232046]">
                <th className="py-3 px-4 font-semibold">Avatar</th>
                <th className="py-3 px-4 font-semibold">Nome</th>
                <th className="py-3 px-4 font-semibold">Função</th>
                <th className="py-3 px-4 font-semibold">E-mail</th>
                <th className="py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Nenhum membro encontrado. (Mas não desanima, tem mais gente
                    vindo!)
                  </td>
                </tr>
              )}
              {filteredMembers.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-[#232046]/60 transition group"
                >
                  <td className="py-3 px-4">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover"
                    />
                  </td>
                  <td
                    className="py-3 px-4 font-bold cursor-pointer hover:text-purple-300"
                    onClick={() => handleOpenMemberDetails(m)}
                  >
                    {m.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded bg-purple-700 text-purple-100 text-xs font-semibold">
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2 max-w-[200px] truncate">
                    <span className="truncate">{m.email}</span>
                    <button
                      className="text-purple-400 hover:text-purple-200 transition flex-shrink-0"
                      title={
                        copiedEmail === m.email ? "Copiado! Eita!" : "Copiar e-mail"
                      }
                      onClick={() => handleCopy(m.email)}
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                    {copiedEmail === m.email && (
                      <span className="text-green-400 text-xs ml-1 animate-pulse">
                        Copiado! 🙏
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
                        title="Enviar Feedback ao membro"
                        onClick={() => {
                          setSelectedMember(m);
                          handleOpenFeedbackForm();
                        }}
                      >
                        <FiMessageCircle className="w-4 h-4" /> Feedback
                      </button>
                      <button
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition cursor-pointer"
                        title="Remover membro"
                        onClick={() => handleOpenConfirmRemove(m.id)}
                      >
                        <FiTrash2 className="w-4 h-4" /> Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block sm:hidden grid grid-cols-1 gap-4">
          {filteredMembers.length === 0 && (
            <div className="text-center py-6 text-gray-400 bg-[#18162a] rounded-xl shadow-lg p-4">
              Nenhum membro encontrado. (Mas não desanima, tem mais gente
              vindo!)
            </div>
          )}
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
                  className="absolute top-4 right-4 text-gray-400 hover:text-purple-400"
                  onClick={() => handleOpenMemberDetails(m)}
                  title="Ver detalhes"
                >
                  <FiInfo className="w-6 h-6" />
                </button>
              </div>

              <div className="text-gray-400 text-sm mb-3 truncate max-w-[calc(100%-40px)]">
                {m.email}
                <button
                  className="ml-2 text-purple-400 hover:text-purple-200 transition"
                  title={copiedEmail === m.email ? "Copiado!" : "Copiar e-mail"}
                  onClick={() => handleCopy(m.email)}
                >
                  <FiCopy className="w-3 h-3 inline" />
                </button>
                {copiedEmail === m.email && (
                  <span className="text-green-400 text-xs ml-1 animate-pulse">
                    Copiado! 🙏
                  </span>
                )}
              </div>

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

        <TeamAreaMemberDetailsModal
          show={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          member={selectedMember}
          onSendFeedback={handleOpenFeedbackForm}
          onRemoveMember={handleOpenConfirmRemove}
        />

        <TeamAreaSendFeedbackModal
          show={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          member={selectedMember}
          onSendFeedbackSubmit={handleSendFeedbackSubmit}
          operationStatus={operationStatus}
        />

        {operationStatus && operationStatus.type && (
          <TeamAreaFeedbackConfirmationCard
            status={operationStatus.type}
            message={operationStatus.message}
            onClose={resetOperationStatus}
          />
        )}

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