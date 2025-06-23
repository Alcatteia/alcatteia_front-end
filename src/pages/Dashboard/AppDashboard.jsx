// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

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
import Kanban from "../Kanban/Kanban";
import { Link } from "react-router";

// Dados mockados para simulação de notificações e usuário.
// const notificacoes = [
//   { id: 1, texto: "Reunião às 10h", lida: false },
//   { id: 2, texto: "Nova tarefa atribuída", lida: true },
// ];
// const user = {
//   nome: "Heverton Souza",
//   foto: "/assets/perfil.png", // Caminho da imagem do perfil do usuário
// };

/**
 * Componente principal que gerencia o estado da aplicação e define a estrutura do layout.
 */
function AppDashboard() {
  // Estado para simular o perfil do usuário logado ('leader', 'hr', 'member').
  // const [profile, setProfile] = useState("leader");
  // Hook de navegação do React Router DOM.
  // const navigate = useNavigate();

  // Estados para controlar a responsividade e visibilidade da Sidebar.
  // const [isMobile, setIsMobile] = useState(false); // true se a tela é mobile.
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false); // true se a Sidebar está aberta (em mobile).

  /**
   * Hook para detectar o tamanho da tela e atualizar 'isMobile'.
   * Garante que a Sidebar feche automaticamente em telas maiores.
   */
  // useEffect(() => {
  //   // Breakpoint para telas de tablet/desktop (1024px, comum para 'lg' no Tailwind).
  //   const tabletBreakpoint = 1024;

  //   const handleResize = () => {
  //     const currentIsMobile = window.innerWidth < tabletBreakpoint;
  //     setIsMobile(currentIsMobile);

  //     // Fecha a Sidebar se a tela não for mais mobile.
  //     if (!currentIsMobile) {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   handleResize(); // Executa ao montar o componente.
  //   window.addEventListener("resize", handleResize); // Adiciona listener para redimensionamento.

  //   return () => {
  //     window.removeEventListener("resize", handleResize); // Limpa o listener ao desmontar.
  //   };
  // }, []);

  /**
   * Alterna o estado de abertura/fechamento da Sidebar.
   */
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(prev => !prev);
  // };

  /**
   * Simula a mudança de perfil do usuário e navega para o dashboard principal.
   * @param {string} newProfile - O novo perfil a ser definido.
   */
  // const handleProfileChange = (newProfile) => {
  //   setProfile(newProfile);
  //   navigate("/"); // Redireciona para o dashboard.
  // };

  // const CurrentTeamArea = () => {
  //   if (profile === "leader") {
  //     return <LeaderTeamArea />;
  //   } else {
  //     return (
  //       <div className="flex flex-col items-center justify-center h-full text-white text-center p-8">
  //         <p className="text-4xl mb-4">🚫</p>
  //         <h2 className="text-3xl font-bold text-white mb-2">Seu perfil não tem acesso à área da equipe</h2>
  //         <p className="text-md text-gray-400 mt-2">
  //           Por favor, retorne ao seu dashboard.
  //         </p>
  //         <button
  //           onClick={() => navigate("/")}
  //           className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors font-semibold"
  //         >
  //           Voltar para o Dashboard
  //         </button>
  //       </div>
  //     );
  //   }
  // };

  return (
    // Contêiner principal da aplicação.
    <div className="flex flex-col h-screen bg-[#0B0011]">
      {/* Seletor de perfil (simulação para desenvolvimento). */}
      {/* <div className="bg-gray-900 text-white px-4 py-2 flex gap-4 items-center">
        <span>Perfil Ativo (Simulação):</span>
        <Link
          to="/dashboard/leader"
          className={`px-3 py-1 rounded transition ${profile === "leader" ? "bg-purple-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Líder
        </Link>

        <Link
          to="/dashboard/recursos-humanos"
          className={`px-3 py-1 rounded transition ${profile === "hr" ? "bg-teal-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          RH
        </Link>

        <Link
          to="/dashboard/member"
          className={`px-3 py-1 rounded transition ${profile === "member" ? "bg-blue-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Membro
        </Link>
      </div> */}

      <div className="flex flex-1 min-h-0">
        <LeaderDashboard />
      </div>
    </div>
  );
}


export default AppDashboard;