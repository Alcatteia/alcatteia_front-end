import React, { useState, useEffect } from "react";
// Remova o import de BrowserRouter aqui (se existir)
import { Routes, Route, useNavigate } from "react-router-dom"; // Mantenha apenas Routes, Route, useNavigate

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import LeaderDashboard from "./LeaderDashboard";
import HrDashboard from "./HrDashboard";
import MemberDashboard from "./MemberDashboard";
import LeaderTeamArea from "./LeaderTeamArea";

const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png",
};

// Renomeie a exportação padrão para AppDashboard em vez de App
// ou ajuste a função AppContent para ser o componente principal exportado
export default function Dashboard() { // Mude o nome da função aqui se necessário
  const [profile, setProfile] = useState("leader");
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const tabletBreakpoint = 1024;

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < tabletBreakpoint;
      setIsMobile(currentIsMobile);

      if (!currentIsMobile) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleProfileChange = (newProfile) => {
  setProfile(newProfile);
  navigate(".");              
};

  const CurrentDashboard = () => {
    if (profile === "leader") return <LeaderDashboard />;
    if (profile === "hr") return <HrDashboard />;
    if (profile === "member") return <MemberDashboard />;
    return <p className="text-white text-center text-xl mt-20">Selecione um perfil para visualizar o dashboard.</p>;
  };

 
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
            onClick={() => navigate("/")} // Navega para a raiz do contexto atual (/dashboard)
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors font-semibold"
          >
            Voltar para o Dashboard
          </button>
        </div>
      );
    }
  };


  return (
    <div className="flex flex-col h-screen bg-[#0B0011]">
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

      <Topbar
        notificacoes={notificacoes}
        user={user}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 min-h-0">
        <Sidebar
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
         <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<CurrentDashboard />} />
            {/* <Route path="/kanban" element={<KanbanPage />} /> */}
            {/* <Route path="/call" element={<CallPage />} /> */}
            <Route path="/equipe" element={<CurrentTeamArea />} />

            <Route path="*" element={<p className="text-white text-center text-xl mt-20">404 - Página Não Encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
