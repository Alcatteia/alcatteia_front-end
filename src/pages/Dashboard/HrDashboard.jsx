import React, { useState, useEffect, useCallback } from "react";
import {
  FiHeart,   // Ícone para saúde emocional/geral
  FiUsers,  // Ícone para usuários/equipe
  FiUser,   // Ícone para usuário individual
  FiTarget, // Ícone para foco/metas
  FiZap,    // Ícone para empenho/energia
  FiMail,   // Ícone para e-mail
  FiInfo,   // Ícone para informações/detalhes
  FiCopy,   // Ícone para copiar
} from "react-icons/fi";

// Importações de componentes globais
import Modal from "./components/Modal";
import LanguageSwitcher from "./components/LanguageSwitcher";
// Importação do objeto de traduções
import { translations } from "../../locales/translations";
import { Link } from "react-router";

// --- FUNÇÕES UTILITÁRIAS ---

/**
 * Hook personalizado para acessar as traduções com base no idioma selecionado.
 * Retorna uma função `t` que recebe uma chave e retorna a string traduzida.
 * @param {string} lang - O código do idioma ('pt' para português, 'en' para inglês, etc.).
 * @returns {Function} Uma função que recebe uma chave e retorna a string traduzida.
 */
const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      // Verifica se o idioma e a chave existem nas traduções, caso contrário, retorna a própria chave.
      return translations[lang] && translations[lang][key] !== undefined
        ? translations[lang][key]
        : key;
    },
    [lang] // O useCallback garante que a função `t` só é recriada se o idioma mudar.
  );
};

/**
 * Formata um objeto Date para uma string de data e hora no formato brasileiro (dd/MM/yyyy HH:mm:ss).
 * @param {Date} date - O objeto Date a ser formatado.
 * @returns {string} A data e hora formatada ou "N/A" se o objeto Date for inválido.
 */
const formatDateTime = (date) => {
  // Verifica se a entrada é um objeto Date válido para evitar erros de formatação.
  if (!(date instanceof Date) || isNaN(date)) return "N/A";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Formato 24 horas
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};

/**
 * Retorna o texto descritivo de status para um percentual.
 * NOTA: A colorização é tratada diretamente no componente de apresentação (HrMetricCard).
 * @param {number|null} percent - O valor percentual da métrica.
 * @param {Function} t - Função de tradução.
 * @returns {{status: string}} Objeto contendo a string de status traduzida.
 */
// const getStatusText = (percent, t) => {
//   if (percent === null) return { status: t("noData") }; // Sem dados disponíveis
//   if (percent >= 80) return { status: t("excellent") }; // Excelente
//   if (percent >= 60) return { status: t("good") };     // Bom
//   if (percent >= 40) return { status: t("attention") }; // Atenção
//   return { status: t("critical") };                     // Crítico
// };

// --- COMPONENTES REUTILIZÁVEIS ---

/**
 * Componente de card base para consistência visual no dashboard.
 * Aplica estilos comuns como fundo, arredondamento, sombra e transição de cor na borda.
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado dentro do card.
 * @param {string} [props.className=""] - Classes CSS adicionais para estilização.
 * @returns {JSX.Element} Um elemento div estilizado como um card.
 */
const BaseCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#1a1a2e] rounded-xl p-6 shadow-lg border hover:border-purple-500 transition-colors flex flex-col ${className}`}
  >
    {children}
  </div>
);

/**
 * Card para exibir uma métrica geral para o dashboard de RH, mostrando apenas o percentual.
 * O percentual é exibido sempre na cor branca, sem colorização de status.
 * @param {object} props - Propriedades do componente.
 * @param {string} props.title - O título da métrica (ex: "Saúde Geral da Equipe").
 * @param {number|null} props.percent - O valor percentual da métrica (0-100 ou null).
 * @param {React.ComponentType} props.icon - O componente de ícone a ser exibido (ex: FiHeart).
 * @param {Function} props.t - Função de tradução para textos internos.
 * @param {string} [props.className] - Classes CSS adicionais para estilização do card.
 * @returns {JSX.Element} Um card de métrica para o dashboard de RH.
 */
const HrMetricCard = ({
  title,
  percent,
  icon: IconComponent, // Renomeia 'icon' para 'IconComponent' para uso como JSX
  t,
  className,
}) => {
  return (
    <BaseCard
      // Centraliza o conteúdo e garante altura mínima para consistência visual
      className={`items-center justify-center min-h-[180px] ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-3 mb-4 ">
        {/* Renderiza o ícone se fornecido */}
        {IconComponent && <IconComponent className="w-9 h-9 text-black-400" />}
        {/* Título da métrica */}
        <h3 className="font-semibold text-white text-2xl">{title}</h3>
      </div>
      <div className="flex items-center gap-2 mb-2">
        {/* Exibe o percentual ou "N/A" se não houver dados, sempre em branco. */}
        <div className={`text-6xl font-bold text-white leading-none`}>
          {percent !== null ? `${percent}%` : t("noData")}
        </div>
      </div>
    </BaseCard>
  );
};

/**
 * Card de sumário para um membro individual da equipe, exibindo métricas chave e um botão de detalhes.
 * As porcentagens individuais são exibidas sempre na cor branca.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.member - O objeto de dados do membro a ser exibido.
 * @param {Function} props.onOpenDetails - Função de callback para abrir o modal de detalhes do membro.
 * @param {Function} props.t - Função de tradução.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @returns {JSX.Element} Um card de sumário de membro.
 */
const MemberSummaryCard = ({ member, onOpenDetails, t, className }) => {
  return (
    <BaseCard className={`w-full flex flex-col justify-between overflow-hidden ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        {/* Ícone de usuário e informações básicas do membro */}
        <FiUser className="w-12 h-12 text-white p-2 bg-indigo-900/40 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white truncate">
            {member.name}
          </h3>
          <p className="text-gray-400 text-sm truncate">{member.role}</p>
        </div>
      </div>

      {/* Seção de métricas individuais do membro */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-2 text-lg">
            <FiTarget className="text-yellow-400" /> {t("foco")}:
          </span>
          {/* Porcentagem de foco, cor branca fixa. */}
          <span className={`text-white font-bold text-lg`}>{member.foco}%</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-2 text-lg">
            <FiZap className="text-pink-400" /> {t("empenho")}:
          </span>
          {/* Porcentagem de empenho, cor branca fixa. */}
          <span className={`text-white font-bold text-lg`}>
            {member.empenho}%
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-2 text-lg">
            <FiHeart className="text-purple-500" /> {t("emotionalHealth")}:
          </span>
          {/* Porcentagem de saúde emocional, cor branca fixa. */}
          <span className={`text-white font-bold text-lg`}>
            {member.saudeEmocional}%
          </span>
        </div>
      </div>

      {/* Botão para abrir o modal de detalhes do membro */}
      <button
        className="w-full bg-purple-800 hover:bg-purple-700 cursor-pointer text-white font-medium px-4 py-3 rounded-md flex items-center justify-center gap-2 transition shadow mt-auto"
        onClick={() => onOpenDetails(member)}
      >
        <FiInfo className="w-5 h-5" /> {t("viewDetails")}
      </button>
    </BaseCard>
  );
};

// --- COMPONENTE PRINCIPAL: HR DASHBOARD ---
/**
 * Componente principal do Dashboard de RH (Recursos Humanos).
 * Exibe métricas gerais da equipe e detalhes individuais dos membros.
 */
export default function HrDashboard() {
  // Estado para controlar o idioma selecionado, inicializando do localStorage ou 'pt'.
  const [lang, setLang] = useState(
    () => localStorage.getItem("appLang") || "pt"
  );
  // Hook de tradução para obter strings traduzidas com base no idioma atual.
  const t = useTranslation(lang);

  // Estado para armazenar a data e hora da última "atualização" simulada.
  // const [lastUpdateDateTime, setLastUpdateDateTime] = useState(new Date());

  // Dados estáticos simulados para as métricas gerais da equipe de RH.
  const [teamMetrics] = useState({
    saudeGeral: { percent: 78 },
    engajamento: { percent: 85 },
  });

  // Dados estáticos simulados para membros individuais da equipe.
  const [individualMembers] = useState([
    {
      id: "m1",
      name: "Talita Vitória",
      role: "Desenvolvedora Back-end",
      foco: 70,
      empenho: 75,
      saudeEmocional: 60,
      lastCheckIn: new Date(2025, 5, 17, 10, 0, 0), // Mês é 0-indexado (junho é 5)
      insights: {
        foco: "Consegue manter o foco na maioria das tarefas, mas pode se dispersar com interrupções.",
        empenho:
          "Esforça-se para atingir metas, buscando sempre a melhoria contínua.",
        saudeEmocional:
          "Demonstra boa adaptabilidade, mas pode sentir a pressão em momentos de pico.",
      },
      email: "talita.mendes@proa.com",
    },
    {
      id: "m2",
      name: "Gabriel Cabral",
      role: "Todas, todas elas", // Exemplo de cargo
      foco: 85,
      empenho: 90,
      saudeEmocional: 80,
      lastCheckIn: new Date(2025, 5, 18, 14, 30, 0),
      insights: {
        foco: "Excelente concentração em suas atividades de desenvolvimento.",
        empenho:
          "Altamente motivado e entrega resultados consistentes e de alta qualidade.",
        saudeEmocional:
          "Apresenta um ótimo bem-estar emocional, resiliente a desafios.",
      },
      email: "gabriel.cabral@proa.com",
    },
  ]);

  // Estado para controlar a exibição e o conteúdo do modal de detalhes de um membro.
  const [selectedMember, setSelectedMember] = useState(null);
  // Estado para controlar a mensagem de status da cópia de e-mail (ex: "Copiado!").
  const [copyStatus, setCopyStatus] = useState("");

  // Efeito para persistir o idioma selecionado no localStorage sempre que o estado 'lang' é atualizado.
  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  /**
   * Função de callback para ser passada ao LanguageSwitcher.
   * Atualiza o estado 'lang' com o novo idioma selecionado.
   * @param {string} newLang - O novo código de idioma a ser definido.
   */
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  /**
   * Abre o modal de detalhes de um membro específico.
   * @param {object} member - O objeto de dados do membro a ser exibido no modal.
   */
  const handleOpenMemberDetails = (member) => {
    setSelectedMember(member);
    setCopyStatus(""); // Reseta a mensagem de status de cópia ao abrir um novo modal.
  };

  /**
   * Fecha o modal de detalhes do membro, limpando o membro selecionado do estado.
   */
  const handleCloseMemberDetails = () => {
    setSelectedMember(null);
  };

  /**
   * Copia o endereço de e-mail de um membro para a área de transferência do sistema.
   * Exibe uma mensagem de status temporária para feedback ao usuário.
   * @param {string} email - O endereço de e-mail a ser copiado.
   */
  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email); // Tenta copiar o texto para a área de transferência.
      setCopyStatus(t("copied")); // Define a mensagem de sucesso (traduzida).
      setTimeout(() => setCopyStatus(""), 2000); // Limpa a mensagem após 2 segundos.
    } catch (err) {
      setCopyStatus(t("copyFailed")); // Define a mensagem de falha (traduzida).
      console.error("Erro ao copiar email:", err); // Registra o erro no console para depuração.
    }
  };

  return (
    // Contêiner principal do dashboard, com flexbox para layout e scroll vertical.
    
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center overflow-y-auto custom-scrollbar">
      {/* Contêiner interno que centraliza e adiciona padding responsivo ao conteúdo. */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 flex flex-col gap-4 sm:gap-6 md:gap-8 h-full">
        {/* Seção de cabeçalho do dashboard com título, subtítulo e seletor de idioma. */}
        <div className="flex justify-between items-end pb-4 border-b border-gray-700">
          <div>
            {/* Título principal do Dashboard de RH. */}
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              {t("dashboardTitleHR")}
            </h1>
            {/* Subtítulo descritivo do Dashboard. */}
            <p className="text-gray-400 text-lg mt-1">
              {t("dashboardSubtitleHR")}
            </p>
          </div>
          {/* Seção de status de atualização e seletor de idioma. */}
          <div className="text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              {/* Componente para alternar o idioma da interface. */}
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={handleLanguageChange}
              />
            </div>
            {/* Exibe a data e hora da última "atualização" simulada. */}
            <p className="text-gray-500 text-sm mt-2">
              {/* {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)} */}
            </p>
          </div>
        </div>

        {/* Seção de Métricas Gerais da Equipe para o RH. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Card de Saúde Geral da Equipe. */}
          <HrMetricCard
            title={t("teamHealth")}
            percent={teamMetrics.saudeGeral.percent}
            icon={FiHeart}
            t={t}
            className="border-green-400" // Exemplo de borda colorida para visualização
          />
          {/* Card de Engajamento da Equipe. */}
          <HrMetricCard
            title={t("teamEngagement")}
            percent={teamMetrics.engajamento.percent}
            icon={FiUsers}
            t={t}
            className="border border-pink-400" // Exemplo de borda colorida para visualização
          />
        </div>

        {/* Seção de Métricas Individuais dos Membros. */}
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-6">
            <FiUser className="w-10 h-10 text-white flex " />
            {/* Título da seção de visão individual. */}
            <h2 className="text-3xl font-bold text-purple-400">
              {t("individualVision")}
            </h2>
          </div>
          {/* Renderização condicional dos cards de membros ou uma mensagem. */}
          {individualMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Mapeia os dados dos membros para renderizar um MemberSummaryCard para cada um. */}
              {individualMembers.map((member) => (
                <MemberSummaryCard
                  key={member.id}
                  member={member}
                  onOpenDetails={handleOpenMemberDetails} // Passa a função para abrir o modal de detalhes.
                  t={t} // Passa a função de tradução.
                />
              ))}
            </div>
          ) : (
            // Mensagem exibida se não houver colaboradores para listar.
            <div className="bg-[#1a1a2e] p-8 rounded-xl text-center text-gray-400 text-lg">
              <p className="mb-4">{t("noCollaborators")}</p>
              <p>{t("noCollaboratorsDescription")}</p>
            </div>
          )}
        </div>

        {/* Modal de Detalhes do Membro, visível apenas quando 'selectedMember' não é nulo. */}
        <Modal
          isOpen={!!selectedMember} // O modal está aberto se um membro estiver selecionado.
          onClose={handleCloseMemberDetails} // Função para fechar o modal.
          // Título dinâmico do modal, incluindo o nome do membro se disponível.
          title={
            selectedMember ? (
              <span className="text-white">
                {t("memberDetails")} {selectedMember.name}
              </span>
            ) : (
              <span className="text-white">{t("collaboratorDetails")}</span>
            )
          }
          // Conteúdo do rodapé do modal, exibindo a data do último check-in.
          footerContent={
            selectedMember && selectedMember.lastCheckIn ? (
              <p className="text-gray-500 text-sm mt-4 border-t border-gray-700 pt-3">
                {t("lastCheckIn")}: {formatDateTime(selectedMember.lastCheckIn)}
              </p>
            ) : null
          }
          size="md" // Tamanho médio do modal.
        >
          {/* Conteúdo detalhado do membro dentro do modal. */}
          {selectedMember && (
            <div className="space-y-4 text-gray-300">
              {/* Informações básicas: Cargo do membro. */}
              <div className="flex items-center justify-between">
                <p className="text-lg">
                  <span className="font-semibold text-white">{t("role")}:</span>{" "}
                  {selectedMember.role}
                </p>
              </div>

              {/* Seção de e-mail do membro com botão de copiar. */}
              <div className="flex items-center justify-between gap-2 bg-gray-800/50 p-3 rounded-md border border-gray-700">
                <span className="font-semibold text-white text-lg mr-2 flex-shrink-0">
                  {t("email")}:
                </span>
                <span className="text-gray-300 text-md truncate flex-grow">
                  {selectedMember.email}
                </span>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1 rounded-md flex items-center gap-1 transition shadow-sm text-sm whitespace-nowrap"
                  onClick={() => handleCopyEmail(selectedMember.email)}
                  title={t("copy")} // Dica ao passar o mouse
                >
                  <FiCopy className="w-4 h-4" /> {copyStatus || t("copy")} {/* Exibe status ou texto padrão */}
                </button>
              </div>

              {/* Métricas detalhadas do membro (Foco, Empenho, Saúde Emocional) com insights. */}
              <div className="grid grid-cols-1 gap-4 mt-4">
                {/* Detalhes de Foco. */}
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                    <FiTarget className="text-yellow-400" /> {t("foco")}:{" "}
                    <span className={`text-white text-base`}>
                      {selectedMember.foco}%
                    </span>
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {selectedMember.insights.foco}
                  </p>
                </div>
                {/* Detalhes de Empenho. */}
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                    <FiZap className="text-pink-400" /> {t("empenho")}:{" "}
                    <span className={`text-white text-base`}>
                      {selectedMember.empenho}%
                    </span>
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {selectedMember.insights.empenho}
                  </p>
                </div>
                {/* Detalhes de Saúde Emocional. */}
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                    <FiHeart className="text-purple-400" />{" "}
                    {t("emotionalHealth")}:{" "}
                    <span className={`text-white text-base`}>
                      {selectedMember.saudeEmocional}%
                    </span>
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {selectedMember.insights.saudeEmocional}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}