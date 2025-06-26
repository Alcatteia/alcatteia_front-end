// src/pages/Dashboard/components/ReportModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { FiUsers, FiHeart, FiActivity, FiAlertCircle, FiClock, FiX, FiClipboard } from 'react-icons/fi';

/**
 * Componente ReportModalTest:
 * Um modal autocontido para visualizar o relatório detalhado e profissional da equipe.
 * Utiliza dados MOCKADOS para fins de teste e visualização do layout.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.isOpen - Se o modal está aberto ou fechado.
 * @param {function} props.onClose - Função a ser chamada quando o modal for fechado.
 */
export default function ReportModalTest({ isOpen, onClose }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fecha o modal ao pressionar ESC
  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Gerencia o listener de ESC e o scroll do body
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Bloqueia o scroll do body
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Restaura o scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  // Função para gerar os dados mockados do relatório
  const generateProfessionalMockData = useCallback(() => {
    const totalMembers = 25;
    const activeMembers = 23;
    const teamHealth = 88;

    return {
      lastUpdateDateTime: new Date().toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }),
      teamName: "Equipe Alpha",
      totalMembers: totalMembers,
      activeMembers: activeMembers,
      teamHealthPercent: teamHealth,
      teamHealthTrend: "Melhora Moderada",
      generalClimate: "O clima da equipe é consistentemente positivo, marcado por alta colaboração e um ambiente de trabalho de apoio mútuo. Os desafios são abordados proativamente, e há um forte senso de pertencimento.",
      averageSentiment: "Positivo Forte",
      communicationEffectiveness: 8.5,

      // Análise de Humor Simplificada para Teste
      moodDistribution: [
        { mood: "Ótimo", count: 12, percent: (12 / totalMembers * 100).toFixed(1) + '%' },
        { mood: "Bem", count: 7, percent: (7 / totalMembers * 100).toFixed(1) + '%' },
        { mood: "Estressado", count: 4, percent: (4 / totalMembers * 100).toFixed(1) + '%' },
        { mood: "Preocupado", count: 2, percent: (2 / totalMembers * 100).toFixed(1) + '%' },
      ],
      // Níveis de Engajamento Detalhados (mantidos como estavam, focando na saúde emocional)
      activityLevels: [
        { activity: "Altamente Engajados", count: 18, color: "text-green-400" },
        { activity: "Moderadamente Engajados", count: 5, color: "text-yellow-400" },
        { activity: "Baixo Engajamento", count: 2, color: "text-red-400" },
      ],

      // Principais Desafios e Recomendações
      challengesAndRecommendations: [
        {
          title: "Necessidade de Desenvolvimento de Novas Habilidades",
          description: "Identificamos uma lacuna em habilidades emergentes, especialmente em ferramentas de análise de dados, o que pode impactar a inovação futura da equipe.",
          recommendation: "Implementar workshops de capacitação em ferramentas de análise de dados e oferecer acesso a cursos online para aprimoramento contínuo.",
        },
        {
          title: "Carga de Trabalho Desigual",
          description: "Alguns membros da equipe reportam sobrecarga de trabalho, enquanto outros sentem falta de projetos desafiadores, indicando uma distribuição ineficiente.",
          recommendation: "Revisar a alocação de tarefas e projetos, utilizando ferramentas de gestão de carga de trabalho para equilibrar a distribuição e otimizar a produtividade.",
        },
        {
          title: "Otimização de Processos Internos",
          description: "Percebe-se que certos processos internos são demorados e burocráticos, impactando a agilidade e a satisfação da equipe.",
          recommendation: "Realizar um mapeamento de processos e implementar metodologias ágeis para simplificar fluxos de trabalho e reduzir gargalos.",
        }
      ],

      // Plano de Ação Sugerido
      suggestedActionPlan: [
        "Agendar reunião com líderes para discutir as recomendações e definir prioridades.",
        "Criar um cronograma de workshops de habilidades e compartilhamento de conhecimento.",
        "Reavaliar a distribuição de projetos e responsabilidades na próxima sprint.",
        "Implementar uma pesquisa de pulso mensal para monitorar o clima pós-intervenções.",
      ]
    };
  }, []); // useCallback sem dependências, pois os dados são estáticos

  // Efeito para buscar os dados do relatório (mockados para este componente de teste)
  useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simula um atraso de carregamento
        setReportData(generateProfessionalMockData());
      } catch (err) {
        console.error("Erro ao carregar dados do relatório:", err);
        setError("Não foi possível carregar o relatório mockado.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMockData();
    }
  }, [isOpen, generateProfessionalMockData]);

  // Não renderiza o modal se não estiver aberto
  if (!isOpen) {
    return null;
  }

  let modalContent;
  // Exibe loading se os dados estiverem sendo carregados
  if (loading) {
    modalContent = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-purple-300">
        <svg className="animate-spin h-12 w-12 text-purple-400 mb-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-xl font-medium">Gerando relatório...</p>
        <p className="text-sm text-gray-400 mt-2">Isso pode levar alguns segundos.</p>
      </div>
    );
  // Exibe mensagem de erro
  } else if (error) {
    modalContent = (
      <div className="flex items-center justify-center h-full min-h-[300px] text-red-500 text-center p-4">
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  // Exibe mensagem se não houver dados (improvável com mock, mas útil se generateProfessionalMockData for alterado)
  } else if (!reportData || Object.keys(reportData).length === 0) {
    modalContent = (
      <div className="flex items-center justify-center h-full min-h-[300px] text-gray-400 text-center p-4">
        <p className="text-lg font-medium">Nenhum dado de relatório disponível para esta equipe no momento.</p>
      </div>
    );
  // Exibe o relatório com os dados carregados
  } else {
    // Define a cor da tendência
    const trendColor = reportData.teamHealthTrend.includes("Melhora") ? "text-green-400" :
                       reportData.teamHealthTrend.includes("Piora") ? "text-red-400" :
                       "text-blue-400";

    modalContent = (
      // Conteúdo principal do relatório com scroll
      <div className="p-4 sm:p-8 md:p-10 lg:p-12 text-gray-100 font-sans max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar bg-[#160F23]">
        {/* Título Principal */}
        <h2 className="text-4xl font-extrabold text-white mb-4 text-center leading-tight">
          Relatório de Desempenho da Equipe <span className="text-purple-400">{reportData.teamName || 'N/A'}</span>
        </h2>

        {/* Visão Geral da Equipe */}
        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiUsers className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Sumário Executivo</h3>
          </div>
          {/* AJUSTE AQUI: Grid responsivo para sumário */}
          {/* Em telas pequenas (base), os primeiros dois itens ficam lado a lado (grid-cols-2) */}
          {/* Em telas maiores que sm (md), volta para 3 colunas (md:grid-cols-3) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-lg">
            <div className="flex flex-col col-span-1"> {/* Membros Ativos */}
              <span className="text-sm font-light text-purple-300">Membros Ativos</span>
              <span className="font-bold text-4xl text-white">{reportData.activeMembers || 'N/A'} / {reportData.totalMembers || 'N/A'}</span>
            </div>
            <div className="flex flex-col col-span-1"> {/* Saúde Geral da Equipe */}
              <span className="text-sm font-light text-purple-300">Saúde Geral da Equipe</span>
              <span className={`font-bold text-4xl ${trendColor}`}>{reportData.teamHealthPercent ? `${reportData.teamHealthPercent}%` : 'N/A'}</span>
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1"> {/* Tendência de Saúde - Ocupa 2 colunas em mobile para não apertar*/}
              <span className="text-sm font-light text-purple-300">Tendência de Saúde</span>
              <span className="font-bold text-xl text-white">{reportData.teamHealthTrend || 'N/A'}</span>
            </div>
             {/* Outros itens se houver, manterão o grid-cols-2 ou 3 em telas maiores */}
          </div>
          <p className="text-lg mt-6 leading-relaxed bg-[#1d273a] p-4 rounded-md border border-gray-800">
            <span className="font-semibold text-purple-300">Clima Geral da Equipe:</span>{" "}
            {reportData.generalClimate || 'N/A'}
          </p>
        </section>

        {/* Análise de Humor Detalhada */}
        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiHeart className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Análise de Sentimento e Humor</h3>
          </div>
          {reportData.moodDistribution && reportData.moodDistribution.length > 0 ? (
            // Grid responsivo para humor
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8"> {/* Ajustado para 2 colunas em md, 4 em lg */}
              {reportData.moodDistribution.map((item, index) => (
                <div key={index} className="flex flex-col bg-[#1d273a] p-4 rounded-md border border-gray-800">
                  <span className="text-sm font-light text-gray-400">{item.mood || 'N/A'}</span>
                  <div className="flex items-end">
                    <span className="font-bold text-3xl text-white mr-2">{item.count || 0}</span>
                    <span className="text-lg text-gray-300">({item.percent || '0%'})</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center py-4">Dados de humor não disponíveis.</p>
          )}
          <p className="text-lg mt-6 leading-relaxed bg-[#1d273a] p-4 rounded-md border border-gray-800">
            <span className="font-semibold text-purple-300">Sentimento Médio:</span>{" "}
            <span className="font-bold text-white">{reportData.averageSentiment || 'N/A'}</span> - {" "}
            <span className="text-gray-400">Efetividade da Comunicação: {reportData.communicationEffectiveness || 'N/A'}/10</span>
          </p>
        </section>

        {/* Níveis de Engajamento */}
        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiActivity className="text-3xl text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Níveis de Engajamento e Produtividade</h3>
          </div>
          {reportData.activityLevels && reportData.activityLevels.length > 0 ? (
            // Grid responsivo para atividades
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
              {reportData.activityLevels.map((item, index) => (
                <div key={index} className="flex flex-col bg-[#1d273a] p-4 rounded-md border border-gray-800">
                  <span className="text-sm font-light text-gray-400">{item.activity || 'N/A'}</span>
                  <div className="flex items-end">
                    <span className={`font-bold text-3xl ${item.color || 'text-white'} mr-2`}>{item.count || 0}</span>
                    <span className="text-lg text-gray-300">membros</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center py-4">Dados de engajamento não disponíveis.</p>
          )}
        </section>

        {/* Principais Desafios e Recomendações */}
        <section className="mb-10 pb-6 border-b border-gray-700">
          <div className="flex items-center mb-5">
            <FiAlertCircle className="text-3xl text-yellow-400 mr-3" />
            <h3 className="text-2xl font-bold text-yellow-300">Análise de Desafios & Recomendações</h3>
          </div>
          {reportData.challengesAndRecommendations && reportData.challengesAndRecommendations.length > 0 ? (
            <div className="space-y-6">
              {reportData.challengesAndRecommendations.map((item, index) => (
                <div key={index} className="bg-[#1d273a] p-6 rounded-md border border-gray-800">
                  <h4 className="text-xl font-semibold text-yellow-200 mb-2">{item.title || 'N/A'}</h4>
                  <p className="text-lg mb-3 leading-relaxed text-gray-200">{item.description || 'N/A'}</p>
                  <p className="text-lg leading-relaxed italic text-gray-300">
                    <span className="font-semibold text-yellow-100">Ação Sugerida:</span>{" "}
                    {item.recommendation || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center py-4">Nenhum desafio ou recomendação identificada no momento.</p>
          )}
        </section>

        {/* Plano de Ação Sugerido */}
        <section className="mb-6">
          <div className="flex items-center mb-5">
            <FiClipboard className="text-3xl text-teal-400 mr-3" />
            <h3 className="text-2xl font-bold text-teal-300">Plano de Ação Sugerido</h3>
          </div>
          {reportData.suggestedActionPlan && reportData.suggestedActionPlan.length > 0 ? (
            <ul className="list-disc list-inside bg-[#1d273a] p-6 rounded-md border border-gray-800 text-lg space-y-2">
              {reportData.suggestedActionPlan.map((action, index) => (
                <li key={index} className="text-gray-200">{action || 'N/A'}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic text-center py-4">Nenhum plano de ação sugerido no momento.</p>
          )}
        </section>

        {/* Rodapé: Última Atualização */}
        <div className="flex items-center justify-end text-gray-400 text-base pt-6 border-t border-gray-800 mt-10">
          <FiClock className="mr-2" />
          <span>Última atualização: {reportData.lastUpdateDateTime || 'N/A'}</span>
        </div>
      </div>
    );
  }

  // Estrutura do modal autocontido
  return (
    // Overlay: Fundo escurecido, centraliza o modal e bloqueia scroll
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      {/* Container principal do modal de relatório */}
      <div className={`bg-[#160F23] rounded-lg shadow-xl relative transform transition-all duration-300
                      w-full sm:w-11/12 md:w-[67vw] lg:max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto
                      border border-purple-700/50 my-auto`}>
        {/* Cabeçalho do modal */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-700">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">Relatório Detalhado da Equipe</h3>
          <div className="flex items-center space-x-4">
            {/* Botão de Fechar o Modal */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Fechar modal"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Corpo do modal */}
        <div className="p-0">
          {modalContent}
        </div>
      </div>
    </div>
  );
}