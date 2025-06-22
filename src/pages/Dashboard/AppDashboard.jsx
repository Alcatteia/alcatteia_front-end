import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Componentes de layout globais
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

// Importação dos Dashboards e Áreas de Equipe específicos por perfil.
// - Dashboards estão em 'pages/Dashboard/'
// - LeaderTeamArea está diretamente em 'pages/'
import LeaderDashboard from "./LeaderDashboard";
import HrDashboard from "./HrDashboard";
import MemberDashboard from "./MemberDashboard";
import LeaderTeamArea from "./LeaderTeamArea";

// Dados mockados para simulação de notificações e usuário.
const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png", // Caminho da imagem do perfil do usuário
};

/**
 * Componente principal que gerencia o estado da aplicação e define a estrutura do layout.
 */
function AppContent() {
  // Estado para simular o perfil do usuário logado ('leader', 'hr', 'member').
  const [profile, setProfile] = useState("leader");
  // Hook de navegação do React Router DOM.
  const navigate = useNavigate();

  // Estados para controlar a responsividade e visibilidade da Sidebar.
  const [isMobile, setIsMobile] = useState(false); // true se a tela é mobile.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // true se a Sidebar está aberta (em mobile).

  /**
   * Hook para detectar o tamanho da tela e atualizar 'isMobile'.
   * Garante que a Sidebar feche automaticamente em telas maiores.
   */
  useEffect(() => {
    // Breakpoint para telas de tablet/desktop (1024px, comum para 'lg' no Tailwind).
    const tabletBreakpoint = 1024;

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < tabletBreakpoint;
      setIsMobile(currentIsMobile);

      // Fecha a Sidebar se a tela não for mais mobile.
      if (!currentIsMobile) {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Executa ao montar o componente.
    window.addEventListener("resize", handleResize); // Adiciona listener para redimensionamento.

    return () => {
      window.removeEventListener("resize", handleResize); // Limpa o listener ao desmontar.
    };
  }, []);

  /**
   * Alterna o estado de abertura/fechamento da Sidebar.
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  /**
   * Simula a mudança de perfil do usuário e navega para o dashboard principal.
   * @param {string} newProfile - O novo perfil a ser definido.
   */
  const handleProfileChange = (newProfile) => {
    setProfile(newProfile);
    navigate("/"); // Redireciona para o dashboard.
  };

  /**
   * Renderiza o Dashboard apropriado com base no perfil do usuário.
   */
  const CurrentDashboard = () => {
    if (profile === "leader") return <LeaderDashboard />;
    if (profile === "hr") return <HrDashboard />;
    if (profile === "member") return <MemberDashboard />;
    return <p className="text-white text-center text-xl mt-20">Selecione um perfil para visualizar o dashboard.</p>;
  };

  /**
   * Componente que controla o acesso e renderização da Área da Equipe.
   * Apenas o perfil 'leader' tem acesso completo.
   */
  const CurrentTeamArea = () => {
    if (profile === "leader") {
      return <LeaderTeamArea />;
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center p-8">
          <p className="text-4xl mb-4">🚫</p>
          <h2 className="text-3xl font-bold text-white mb-2">Seu perfil não tem acesso à área da equipe</h2>
          <p className="text-md text-gray-400 mt-2">
            Por favor, retorne ao seu dashboard.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors font-semibold"
          >
            Voltar para o Dashboard
          </button>
        </div>
      );
    }
  };

  return (
    // Contêiner principal da aplicação.
    <div className="flex flex-col h-screen bg-[#0B0011]">
      {/* Seletor de perfil (simulação para desenvolvimento). */}
      <div className="bg-gray-900 text-white px-4 py-2 flex gap-4 items-center">
        <span>Perfil Ativo (Simulação):</span>
        <button
          onClick={() => handleProfileChange("leader")}
          className={`px-3 py-1 rounded transition ${profile === "leader" ? "bg-purple-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Líder
        </button>
        <button
          onClick={() => handleProfileChange("hr")}
          className={`px-3 py-1 rounded transition ${profile === "hr" ? "bg-teal-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          RH
        </button>
        <button
          onClick={() => handleProfileChange("member")}
          className={`px-3 py-1 rounded transition ${profile === "member" ? "bg-blue-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Membro
        </button>
      </div>

      {/* Topbar do layout. */}
      <Topbar
        notificacoes={notificacoes}
        user={user}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Área de conteúdo principal (Sidebar + Rotas). */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar do layout. */}
        <Sidebar
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* Área onde as páginas são renderizadas via React Router. */}
        <main className="flex-1 overflow-y-auto">
          {/* Definição das rotas da aplicação. */}
          <Routes>
            <Route path="/Dashboard" element={<CurrentDashboard />} />
            
            <Route path="/equipe" element={<CurrentTeamArea />} />
            <Route path="*" element={<p className="text-white text-center text-xl mt-20">404 - Página Não Encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/**
 * Componente que envolve o AppContent com o BrowserRouter.
 */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}