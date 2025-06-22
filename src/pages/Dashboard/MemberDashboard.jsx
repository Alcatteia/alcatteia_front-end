// src/pages/Dashboard/MemberDashboard.jsx

import React, { useState, useEffect, useMemo } from "react";
import {
  FiMail,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiClipboard,
  FiZap, // Para Empenho
  FiTarget, // Para Foco
} from "react-icons/fi";
import tom from "./assets/tom.png";
import {
  getFeedbacksForMember,
  markFeedbackAsRead,
} from "./services/feedbackService";

// Dados simulados do membro logado
const loggedInMemberData = {
  id: 1,
  name: "Talita Vitória",
  role: "Desenvolvedora Back-end Sênior",
  email: "talita.vitoria@proa.com",
  photo: tom,
  empenho: 85,
  foco: 70,
};

// Dados simulados de pontos fortes e planos de ação para as métricas individuais
const memberMetricsDetails = {
  empenho: {
    atributo: "Empenho",
    percent: loggedInMemberData.empenho,
    pontosFortes: [
      "Proatividade em novas tarefas e desafios.",
      "Alta capacidade de entrega, superando expectativas.",
      "Habilidade em resolver problemas complexos de forma eficiente.",
    ],
    pontosFracos: [
      "Dificuldade em delegar tarefas, mesmo as menores.",
      "Tendência a se sobrecarregar com detalhes.",
    ],
    causasRaiz:
      "Busca excessiva por perfeição e controle em todas as etapas do projeto.",
    planoAcao: [
      {
        titulo: "Praticar delegação de tarefas menos críticas.",
        prazo: "Próximo Sprint",
      },
      {
        titulo: "Focar na entrega de valor e não na perfeição absoluta.",
        prazo: "Contínuo",
      },
    ],
  },
  foco: {
    atributo: "Foco",
    percent: loggedInMemberData.foco,
    pontosFortes: [
      "Excelente concentração em tarefas críticas e prioritárias.",
      "Entrega consistente dentro do prazo para projetos essenciais.",
    ],
    pontosFracos: [
      "Distração com comunicação interna excessiva e interrupções.",
      "Multitarefas em atividades não essenciais, reduzindo a eficiência.",
    ],
    causasRaiz:
      "Ambiente de trabalho com muitas interrupções e gerenciamento ineficaz do tempo.",
    planoAcao: [
      {
        titulo: "Estabelecer blocos de tempo para trabalho focado (Deep Work).",
        prazo: "Diariamente",
      },
      {
        titulo:
          "Utilizar ferramentas de gerenciamento de tempo para otimizar o fluxo.",
        prazo: "Próxima Semana",
      },
    ],
  },
};

export default function MemberDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [activeMetricModal, setActiveMetricModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const member = loggedInMemberData;

  useEffect(() => {
    const fetchFeedbacks = () => {
      const memberFeedbacks = getFeedbacksForMember(member.email);
      // Ordena os feedbacks para ter os não lidos primeiro
      const sortedFeedbacks = [...memberFeedbacks].sort((a, b) =>
        a.read === b.read ? 0 : a.read ? 1 : -1
      );
      setFeedbacks(sortedFeedbacks);
    };
    fetchFeedbacks();
  }, [member.email]);

  const unreadFeedbacksCount = useMemo(
    () => feedbacks.filter((f) => !f.read).length,
    [feedbacks]
  );

  const openFeedbackDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailsModal(true);
    if (!feedback.read) {
      markFeedbackAsRead(feedback.id);
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === feedback.id ? { ...f, read: true } : f))
      );
    }
  };

  const openMetricDetails = (metricKey) => {
    setModalData(memberMetricsDetails[metricKey]);
    setActiveMetricModal(metricKey);
  };

  const copyFeedbackContent = (message) => {
    navigator.clipboard.writeText(message);
  };

  return (
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center overflow-y-auto">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 sm:gap-6 md:gap-8 h-full">
        {/* Header Principal - Título e Perfil do Usuário */}
        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Seus indicativos
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              Visão do seu Desempenho e Feedbacks
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <img
              src={member.photo}
              alt={member.name}
              className="w-16 h-16 rounded-full border-3 border-white object-cover flex-shrink-0 shadow-lg mb-2"
            />
            <p className="text-xl font-bold text-white">{member.name}</p>
            <p className="text-gray-500 text-sm">{member.role}</p>
          </div>
        </div>

        {/* Seção de Métricas Principais (Foco e Empenho) */}
        <div className="mb-6 border-b border-gray-700 pt-4">
          <h2 className="text-2xl font-bold text-white py-3">
            <FiZap className="inline-block mr-2 text-green-400" /> Suas Métricas
            Individuais
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {/* Card de Empenho */}
          <div
            className="bg-[#18162a] rounded-xl shadow-lg p-4 flex items-center justify-between border border-pink-400 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => openMetricDetails("empenho")}
          >
            <div className="flex items-center gap-4">
              <FiZap className="text-pink-400 text-4xl" />
              <div>
                <h3 className="text-lg font-bold text-white">Empenho</h3>
                <p className="text-gray-400 text-sm">
                  Sua dedicação e produtividade.
                </p>
              </div>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="50%"
                  cy="50%"
                />
                <circle
                  className="text-pink-500"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 30}
                  strokeDashoffset={
                    2 * Math.PI * 30 - (2 * Math.PI * 30 * member.empenho) / 100
                  }
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="50%"
                  cy="50%"
                  style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
                />
              </svg>
              <span className="absolute text-xl font-bold text-white">
                {member.empenho}%
              </span>
            </div>
          </div>

          {/* Card de Foco */}
          <div
            className="bg-[#18162a] rounded-xl shadow-lg p-4 flex items-center justify-between border border-yellow-400 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => openMetricDetails("foco")}
          >
            <div className="flex items-center gap-4">
              <FiTarget className="text-yellow-400 text-4xl" />
              <div>
                <h3 className="text-lg font-bold text-white">Foco</h3>
                <p className="text-gray-400 text-sm">
                  Suas entregas e constância.
                </p>
              </div>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="50%"
                  cy="50%"
                />
                <circle
                  className="text-yellow-400"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 30}
                  strokeDashoffset={
                    2 * Math.PI * 30 - (2 * Math.PI * 30 * member.foco) / 100
                  }
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="50%"
                  cy="50%"
                  style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
                />
              </svg>
              <span className="absolute text-xl font-bold text-white">
                {member.foco}%
              </span>
            </div>
          </div>
        </div>

        {/* Seção de Feedbacks Recebidos */}
        <div className="mb-6 border-b border-gray-700 flex justify-between items-center flex-wrap gap-4 pt-4">
          <h2 className="text-2xl font-bold text-white py-3 flex items-center gap-2">
            <FiMail className="text-purple-400" /> Feedbacks Recebidos
            {unreadFeedbacksCount > 0 && (
              <span className="ml-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                {unreadFeedbacksCount} Novos
              </span>
            )}
          </h2>
        </div>

        <div className="bg-[#18162a] rounded-xl shadow-lg p-6 mb-8">
          {feedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-lg">
              Nenhum feedback recebido ainda. Continue firme, a benção vai
              chegar!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className={`bg-[#232046] p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    ${
                      feedback.read
                        ? "border border-gray-700"
                        : "border-2 border-green-500 ring-2 ring-green-500"
                    }`}
                  onClick={() => openFeedbackDetails(feedback)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        feedback.read
                          ? "bg-gray-600 text-gray-300"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {feedback.read ? "Lido" : "NOVO!"}
                    </span>
                    {feedback.read ? (
                      <FiCheckCircle className="text-green-500 w-4 h-4" />
                    ) : (
                      <FiInfo className="text-yellow-400 w-4 h-4 animate-bounce" />
                    )}
                  </div>
                  <h4 className="text-md font-bold text-white mb-1 truncate">
                    {feedback.subject}
                  </h4>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {feedback.message}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-xs mt-2 border-t border-gray-700 pt-2">
                    <span>
                      De:{" "}
                      <span className="font-medium text-gray-300">
                        {feedback.from}
                      </span>
                    </span>
                    <span>{feedback.date.split(",")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Detalhes do Feedback */}
        {showDetailsModal && selectedFeedback && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative border-2 border-purple-700">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
                onClick={() => setShowDetailsModal(false)}
              >
                <FiXCircle className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FiInfo className="text-purple-400" /> Detalhes do Feedback
              </h3>

              <div className="mb-4">
                <p className="text-gray-400 text-sm font-bold mb-1">De:</p>
                <p className="text-white text-md">{selectedFeedback.from}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm font-bold mb-1">Assunto:</p>
                <p className="text-white text-md">{selectedFeedback.subject}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm font-bold mb-1">
                  Mensagem:
                </p>
                <div className="bg-[#232046] p-4 rounded-lg text-white text-sm break-words relative">
                  {selectedFeedback.message}
                  <button
                    className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-300 transition"
                    title="Copiar mensagem"
                    onClick={() =>
                      copyFeedbackContent(selectedFeedback.message)
                    }
                  >
                    <FiClipboard className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right text-gray-500 text-xs mb-4">
                <span>Recebido em: {selectedFeedback.date}</span>
              </div>

              <div className="flex justify-end">
                <button
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <FiCheckCircle /> Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}