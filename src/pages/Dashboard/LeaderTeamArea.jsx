// src/pages/Dashboard/LeaderTeamArea.jsx

import React, { useState, useEffect } from "react";
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
import FeedbackConfirmationCard from "./components/FeedbackConfirmationCard";
import tom from "./assets/tom.png";
import { addFeedback } from "./services/feedbackService";
const initialMembers = [
  {
    id: 1,
    name: "Talita Vitória",
    role: "Back-end",
    email: "talita.vitoria@proa.com",
    photo: tom,
    empenho: 85,
    description: "Desenvolvedora back-end focada em performance e escalabilidade de APIs.",
  },
  {
    id: 2,
    name: "Gabriel Cabral",
    role: "Front-end",
    email: "gabriel.cabral@proa.com",
    photo: tom,
    empenho: 90,
    description: "Especialista em todas as habilidades, todas elas!",
  },
  // Você pode adicionar mais membros aqui quando precisar:
  // {
  //   id: 3,
  //   name: "Felipe Oliveira",
  //   role: "Back-end",
  //   email: "felipe.oliveira@proa.com",
  //   photo: tom,
  //   empenho: 78,
  //   description: "Arquiteto de sistemas, com foco em segurança e integridade de dados.",
  // },
];

const roles = ["Todos", "Back-end", "Front-end", "Full-stack", "Teacher"];

export default function LeaderTeamArea() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [feedbackStatus, setFeedbackStatus] = useState(null); // 'success', 'error', 'loading', null

  const loggedInLeaderName = "Seu Nome (Líder)";

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // Simulação de chamada API
        console.log("Simulando chamada API para buscar membros da equipe. Aguardando a providência!");
      } catch (error) {
        console.error("Erro ao buscar membros da equipe:", error);
        // Opcional: setFeedbackStatus('error') para indicar falha ao carregar
      }
    };
    fetchTeamMembers();
  }, []);

  const filteredMembers = members.filter(
    (m) =>
      (roleFilter === "Todos" || m.role === roleFilter) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()))
  );

  function handleCopy(email) {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1200);
  }

  function openMemberDetails(member) {
    setSelectedMember(member);
    setShowDetailsModal(true);
  }

  function handleAddMember(newMember) {
    // Lógica para adicionar membro (futuramente com API)
    console.log("Adicionando membro via API: (Em breve, pela graça!)", newMember);
    setShowAddModal(false);
  }

  function openFeedbackForm() {
    setFeedbackSubject("");
    setFeedbackMessage("");
    setShowDetailsModal(false); // Fecha o modal de detalhes do membro se estiver aberto
    setShowFeedbackModal(true);
  }

  function handleSendFeedback() {
    if (!feedbackSubject || !feedbackMessage) {
      setFeedbackStatus('error'); // Define o status de erro para o card de feedback
      setTimeout(() => setFeedbackStatus(null), 3000); // Remove o card após 3 segundos
      return;
    }

    setFeedbackStatus('loading'); // Indica que o feedback está sendo enviado
    setShowFeedbackModal(false); // Fecha o modal de feedback

    const newFeedback = {
      id: Date.now(),
      from: loggedInLeaderName,
      to: selectedMember.name,
      toEmail: selectedMember.email,
      subject: feedbackSubject,
      message: feedbackMessage,
      date: new Date().toLocaleString('pt-BR'),
      read: false
    };

    setTimeout(() => {
      try {
        addFeedback(newFeedback); // Chama o serviço para adicionar o feedback
        setFeedbackStatus('success'); // Define o status de sucesso
        setFeedbackSubject("");
        setFeedbackMessage("");
      } catch (error) {
        console.error("Erro ao enviar feedback:", error);
        setFeedbackStatus('error'); // Define o status de erro em caso de falha
      } finally {
        setTimeout(() => {
          setFeedbackStatus(null); // Remove o card de status após 3 segundos
        }, 3000);
      }
    }, 1500); // Simula um atraso de rede
  }

  return (
    <section className="w-full max-w-[90%] mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 flex flex-wrap items-center gap-x-2">
            Equipe <span className="text-white">Alcatteia</span>
            <span className="text-xs bg-purple-700 text-white px-2 py-1 rounded-full mt-1 md:mt-0">{members.length} membros</span>
          </h2>
          <span className="text-gray-300 text-base">Instituto PROA</span>
        </div>
        <div className="flex justify-end md:justify-start gap-4 items-center w-full md:w-auto">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition hover:opacity-90 w-full justify-center md:w-auto"
            title="Adicionar membro"
            onClick={() => setShowAddModal(true)}
          >
            <FiUserPlus className="w-5 h-5" />
            Adicionar Membro
          </button>
        </div>
      </div>

      {/* Filtros */}
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

      {/* Exibição para Desktop (Tabela) */}
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg bg-[#18162a]">
        <table className="min-w-full text-left text-gray-200">
          <thead>
            <tr className="bg-[#232046]">
              <th className="py-3 px-4 font-semibold">Avatar</th>
              <th className="py-3 px-4 font-semibold">Nome</th>
              <th className="py-3 px-4 font-semibold">Função</th>
              <th className="py-3 px-4 font-semibold">E-mail</th>
              <th className="py-3 px-4 font-semibold">Empenho</th>
              <th className="py-3 px-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Nenhum membro encontrado. (Mas não desanima, tem mais gente vindo!)
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
                <td className="py-3 px-4 font-bold cursor-pointer hover:text-purple-300" onClick={() => openMemberDetails(m)}>
                  {m.name}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded bg-purple-700 text-purple-100 text-xs font-semibold">{m.role}</span>
                </td>
                <td className="py-3 px-4 flex items-center gap-2 max-w-[200px] truncate">
                  <span className="truncate">{m.email}</span>
                  <button
                    className="text-purple-400 hover:text-purple-200 transition flex-shrink-0"
                    title={copiedEmail === m.email ? "Copiado! Eita!" : "Copiar e-mail"}
                    onClick={() => handleCopy(m.email)}
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                  {copiedEmail === m.email && (
                    <span className="text-green-400 text-xs ml-1 animate-pulse">Copiado! 🙏</span>
                  )}
                </td>
                {/* Métrica de Empenho */}
                <td className="py-3 px-4 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                        style={{ width: `${m.empenho}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-300 w-8 text-right">{m.empenho}%</span>
                  </div>
                </td>
                {/* Ações na tabela */}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
                      title="Enviar Feedback ao membro"
                      onClick={() => {
                        setSelectedMember(m);
                        openFeedbackForm();
                      }}
                    >
                      <FiMessageCircle className="w-4 h-4" /> Feedback
                    </button>
                    <button
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition opacity-60 cursor-not-allowed"
                      title="Remover membro (em breve, com sabedoria!)"
                      disabled
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

      {/* Exibição para Mobile (Cards) */}
      <div className="block sm:hidden grid grid-cols-1 gap-4">
        {filteredMembers.length === 0 && (
          <div className="text-center py-6 text-gray-400 bg-[#18162a] rounded-xl shadow-lg p-4">
            Nenhum membro encontrado. (Mas não desanima, tem mais gente vindo!)
          </div>
        )}
        {filteredMembers.map((m) => (
          <div key={m.id} className="bg-[#18162a] rounded-xl shadow-lg p-4 relative border border-gray-700">
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
                onClick={() => openMemberDetails(m)}
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
                <span className="text-green-400 text-xs ml-1 animate-pulse">Copiado! 🙏</span>
              )}
            </div>


            {/* Empenho no card */}
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

            {/* Ações no card */}
            <div className="flex justify-end gap-2 text-sm">
              <button
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition w-full sm:w-auto justify-center"
                title="Enviar Feedback"
                onClick={() => {
                  setSelectedMember(m);
                  openFeedbackForm();
                }}
              >
                <FiMessageCircle className="w-4 h-4" /> Feedback
              </button>
              <button
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition opacity-60 cursor-not-allowed w-full sm:w-auto justify-center"
                title="Remover membro"
                disabled
              >
                <FiTrash2 className="w-4 h-4" /> Remover
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Modals permanecem iguais (com a correção do alert no handleSendFeedback) */}
      {/* Modal para adicionar membro */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative border-2 border-cyan-700">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setShowAddModal(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 tracking-wider">
              <FiUserPlus /> Adicionar membro à equipe
            </h3>
            <div className="text-gray-400 text-center py-8">
              Integração com banco de dados em breve. (Deus proverá!)
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Membro */}
      {showDetailsModal && selectedMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative border-2 border-purple-700">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setShowDetailsModal(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-full border-3 border-purple-400 object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                <p className="text-purple-300 text-lg">{selectedMember.role}</p>
                <p className="text-gray-400 text-sm">{selectedMember.email}</p>
              </div>
            </div>

            <hr className="border-gray-700 my-4" />

            {/* Informações detalhadas do membro */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Sobre o Membro:</h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {selectedMember.description || "Nenhuma descrição disponível. (Ainda não abrimos o livro da vida dele!)"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              {/* Empenho */}
              <div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">Empenho:</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedMember.empenho}%` }}
                    ></div>
                  </div>
                  <span className="text-md font-bold text-gray-300">{selectedMember.empenho}%</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Reflete a dedicação e produtividade em tarefas. (Com a força do Espírito Santo!)</p>
              </div>
            </div>

            {/* AÇÕES DENTRO DO MODAL: Agora um único botão de "Enviar Feedback" */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded transition w-full sm:w-auto"
                onClick={openFeedbackForm}
              >
                <FiMessageCircle /> Enviar Feedback
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition opacity-60 cursor-not-allowed w-full sm:w-auto"
                disabled
              >
                <FiTrash2 /> Remover Membro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ENVIO DE FEEDBACK */}
      {showFeedbackModal && selectedMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative border-2 border-green-700">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setShowFeedbackModal(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 tracking-wider">
              <FiSend /> Enviar Feedback para <span className="text-purple-300 ml-1">{selectedMember.name}</span>
            </h3>

            <div className="mb-4">
              <label htmlFor="feedbackTo" className="block text-gray-400 text-sm font-bold mb-2">Para:</label>
              <input
                type="text"
                id="feedbackTo"
                value={selectedMember.email}
                readOnly
                className="w-full rounded px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="feedbackSubject" className="block text-gray-400 text-sm font-bold mb-2">Assunto: <span className="text-red-400">*</span></label>
              <input
                type="text"
                id="feedbackSubject"
                value={feedbackSubject}
                onChange={(e) => setFeedbackSubject(e.target.value)}
                placeholder="Ex: Feedback sobre o projeto X"
                className="w-full rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-green-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="feedbackMessage" className="block text-gray-400 text-sm font-bold mb-2">Feedback: <span className="text-red-400">*</span></label>
              <textarea
                id="feedbackMessage"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows="6"
                placeholder="Descreva o feedback para o membro aqui..."
                className="w-full rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-green-400 resize-y"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
                onClick={() => setShowFeedbackModal(false)}
              >
                <FiX /> Cancelar
              </button>
              <button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                onClick={handleSendFeedback}
              >
                <FiSend /> Enviar Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CARD DE CONFIRMAÇÃO DE FEEDBACK */}
      {feedbackStatus && (
        <FeedbackConfirmationCard
          status={feedbackStatus}
          onClose={() => setFeedbackStatus(null)}
          message={
            feedbackStatus === 'success'
              ? "Feedback enviado com sucesso! A palavra gera, amém!"
              : feedbackStatus === 'error'
                ? "Erro ao enviar feedback. O assunto e a mensagem são obrigatórios!"
                : "Enviando feedback..."
          }
        />
      )}
    </section>
  );
}