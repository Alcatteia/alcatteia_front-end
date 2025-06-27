// src/pages/Dashboard/MemberDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  FiMail, FiCheckCircle, FiXCircle, FiInfo, FiClipboard,
  FiZap, // Ícone para Empenho
  FiTarget, // Ícone para Foco
} from "react-icons/fi";
import tom from "../../assets/dashboard/tom.png"; // Avatar de fallback

// Importa funções dos serviços de API
import { getFeedbacksForMember, markFeedbackAsRead } from "../../services/feedbackService";
import { getLoggedInMember, getMemberMetricsDetails } from "../../services/memberService";

export default function MemberDashboard() {
  // Estados para dados do membro, feedbacks e métricas
  const [member, setMember] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [memberMetrics, setMemberMetrics] = useState({});

  // Estados para controle do modal de feedback
  const [showFeedbackDetailsModal, setShowFeedbackDetailsModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Estados para carregamento e erros das APIs
  const [isLoadingMember, setIsLoadingMember] = useState(true);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [memberError, setMemberError] = useState(null);
  const [feedbacksError, setFeedbacksError] = useState(null);
  const [metricsError, setMetricsError] = useState(null);

  // Efeito para carregar dados do membro logado uma vez
  useEffect(() => {
    const loadMemberData = async () => {
      setIsLoadingMember(true);
      setMemberError(null);
      try {
        const data = await getLoggedInMember();
        setMember(data);
      } catch (err) {
        setMemberError("Erro ao carregar dados do membro. Verifique sua conexão ou a API.");
        console.error("Erro ao buscar dados do membro:", err);
      } finally {
        setIsLoadingMember(false);
      }
    };
    loadMemberData();
  }, []);

  // Efeito para carregar feedbacks e métricas quando o ID do membro estiver disponível
  useEffect(() => {
    if (member?.id) { // Agora verifica apenas o ID do membro
      const loadFeedbacks = async () => {
        setIsLoadingFeedbacks(true);
        setFeedbacksError(null);
        try {
          // *** MUDANÇA AQUI: Passamos member.id para getFeedbacksForMember ***
          const fetchedFeedbacks = await getFeedbacksForMember(member.id);
          const sortedFeedbacks = [...fetchedFeedbacks].sort((a, b) =>
            a.read === b.read ? 0 : a.read ? 1 : -1
          ); // Ordena não lidos primeiro
          setFeedbacks(sortedFeedbacks);
        } catch (err) {
          setFeedbacksError("Erro ao carregar feedbacks. Tente novamente.");
          console.error("Erro ao buscar feedbacks:", err);
        } finally {
          setIsLoadingFeedbacks(false);
        }
      };

      const loadMetricsDetails = async () => {
        setIsLoadingMetrics(true);
        setMetricsError(null);
        try {
          const data = await getMemberMetricsDetails(member.id);
          setMemberMetrics(data);
        } catch (err) {
          setMetricsError("Erro ao carregar detalhes das métricas. Tente novamente.");
          console.error("Erro ao buscar métricas:", err);
        } finally {
          setIsLoadingMetrics(false);
        }
      };

      loadFeedbacks();
      loadMetricsDetails();
    }
  }, [member?.id]); // Depende apenas do 'id' do membro

  // Conta feedbacks não lidos (otimizado)
  const unreadFeedbacksCount = useMemo(
    () => feedbacks.filter((f) => !f.read).length,
    [feedbacks]
  );

  // Abre modal de feedback e marca como lido
  const openFeedbackDetails = async (feedback) => {
    setSelectedFeedback(feedback);
    setShowFeedbackDetailsModal(true);
    if (!feedback.read) {
      try {
        await markFeedbackAsRead(feedback.id);
        // Atualiza o estado local para refletir que o feedback foi lido
        setFeedbacks((prev) =>
          prev.map((f) => (f.id === feedback.id ? { ...f, read: true } : f))
        );
      } catch (err) {
        console.error("Falha ao marcar feedback como lido:", err);
      }
    }
  };

  // Copia mensagem do feedback para a área de transferência
  const copyFeedbackContent = (message) => {
    navigator.clipboard.writeText(message);
  };

  // Exibe mensagem de carregamento inicial do membro
  if (isLoadingMember) {
    return (
      <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex items-center justify-center">
        <p className="text-xl">Carregando painel do membro...</p>
      </main>
    );
  }

  // Exibe erro de carregamento do membro
  if (memberError) {
    return (
      <main className="flex-1 bg-[#160F23] text-red-400 font-poppins flex items-center justify-center text-center p-4">
        <p className="text-xl">{memberError}</p>
      </main>
    );
  }

  // Exibe mensagem se não houver dados de membro
  if (!member) {
    return (
      <main className="flex-1 bg-[#160F23] text-gray-400 font-poppins flex items-center justify-center">
        <p className="text-xl">Nenhum dado de membro disponível para exibir.</p>
      </main>
    );
  }

  // Obtém porcentagens das métricas (0 se não houver dados ainda)
  const memberEmpenho = memberMetrics.empenho?.percent || 0;
  const memberFoco = memberMetrics.foco?.percent || 0;

  return (
    <main className="flex-1 bg-[#160F23] text-gray-200 font-poppins flex justify-center overflow-y-auto">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 sm:gap-6 md:gap-8 h-full">
        {/* Cabeçalho principal */}
        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Seus indicativos
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              Visão do seu desempenho e feedbacks
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <img
              src={member.photo || tom}
              alt={member.name}
              className="w-16 h-16 rounded-full border-3 border-white object-cover flex-shrink-0 shadow-lg mb-2"
            />
            <p className="text-xl font-bold text-white">{member.name}</p>
            <p className="text-gray-500 text-sm">{member.role}</p>
          </div>
        </div>

        {/* Seção de Métricas */}
        {isLoadingMetrics ? (
          <div className="text-center py-4 text-gray-400 text-lg">Carregando métricas...</div>
        ) : metricsError ? (
          <div className="text-center py-4 text-red-500 text-lg">{metricsError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-2">
            {/* Card de Empenho */}
            <div className="bg-[#18162a] rounded-xl shadow-lg p-4 flex items-center justify-between border border-pink-400">
              <div className="flex items-center gap-4">
                <FiZap className="text-pink-400 text-4xl" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Empenho</h3>
                  <p className="text-gray-400 text-base">
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
                      2 * Math.PI * 30 - (2 * Math.PI * 30 * memberEmpenho) / 100
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
                  {memberEmpenho}%
                </span>
              </div>
            </div>

            {/* Card de Foco */}
            <div className="bg-[#18162a] rounded-xl shadow-lg p-4 flex items-center justify-between border border-yellow-400">
              <div className="flex items-center gap-4">
                <FiTarget className="text-yellow-400 text-4xl" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Foco</h3>
                  <p className="text-gray-400 text-base">
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
                      2 * Math.PI * 30 - (2 * Math.PI * 30 * memberFoco) / 100
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
                  {memberFoco}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Seção de Feedbacks Recebidos */}
        <div className="mb-6 border-b border-gray-700 flex justify-between items-center flex-wrap gap-4 pt-4">
          <h2 className="text-2xl font-bold text-white py-3 flex items-center gap-2">
            <FiMail className="text-yellow-400" /> Feedbacks recebidos
            {unreadFeedbacksCount > 0 && (
              <span className="ml-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                {unreadFeedbacksCount} Novos
              </span>
            )}
          </h2>
        </div>

        <div className="bg-[#18162a] rounded-xl shadow-lg p-6 mb-8">
          {isLoadingFeedbacks ? (
            <div className="text-center py-8 text-gray-400 text-lg">
              Carregando feedbacks...
            </div>
          ) : feedbacksError ? (
            <div className="text-center py-8 text-red-500 text-lg">
              {feedbacksError}
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-lg">
              Nenhum feedback recebido ainda.
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
                    <span>{new Date(feedback.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Detalhes do Feedback */}
        {showFeedbackDetailsModal && selectedFeedback && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#18162a] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative border-2 border-purple-700">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
                onClick={() => setShowFeedbackDetailsModal(false)}
                aria-label="Fechar Detalhes do Feedback"
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
                <span>Recebido em: {new Date(selectedFeedback.date).toLocaleDateString("pt-BR")}</span>
              </div>

              <div className="flex justify-end">
                <button
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
                  onClick={() => setShowFeedbackDetailsModal(false)}
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