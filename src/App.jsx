// Styles

import "./styles.css";

// React Router

import { BrowserRouter, Route, Routes } from "react-router";

// Context

import { CheckProvider } from "./contexts/CheckContext";

// Components

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages

import Home from "./pages/Home/Home";

import About from "./pages/About/About";

import AccountAccess from "./pages/AccountAccess/AccountAccess";

import Plans from "./pages/Plans/Plans";

import UserProfile from "./pages/UserProfile/UserProfile";

import Kanban from "./pages/Kanban/Kanban";
import KanbanProvider from './contexts/KanbanContext';

import LeaderDashboard from "./pages/Dashboard/LeaderDashboard";
import HrDashboard from "./pages/Dashboard/HrDashboard";
import MemberDashboard from "./pages/Dashboard/MemberDashboard";

import Meetings from "./pages/Meetings/Meetings";
import Calls from "./pages/Calls/Calls";

import Team from "./pages/TeamArea/LeaderTeamArea";
import Check from "./pages/Check-in/Check";




function LayoutWithSidebar({ children }) {
    return (
        <div>
            <Topbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 pt-14 lg:ml-[240px]">{children}</div>
            </div>
        </div>
    );
}

function LayoutWithHeaderAndFooter({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}


function App() {
    return (
        <KanbanProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rota para Home */}
                    <Route path="/" element={
                        <LayoutWithHeaderAndFooter>
                            <Home />
                        </LayoutWithHeaderAndFooter>
                    } />


                    {/* Rota para Planos */}
                    <Route path="/plans" element={
                        <LayoutWithHeaderAndFooter>
                            <Plans />
                        </LayoutWithHeaderAndFooter>
                    } />


                    {/* Rota para página Sobre  */}
                    <Route path="/about" element={
                        <LayoutWithHeaderAndFooter>
                            <About />
                        </LayoutWithHeaderAndFooter>
                    } />


                    {/* Rota para página Entrar/Cadastrar  */}
                    <Route path="/account-access" element={
                        <LayoutWithHeaderAndFooter>
                            <AccountAccess />
                        </LayoutWithHeaderAndFooter>
                    } />


                    {/* Rotas para páginas de Dashboard */}
                    <Route
                        path="/dashboard/leader"
                        element={
                            <LayoutWithSidebar>
                                <LeaderDashboard />
                            </LayoutWithSidebar>
                        }
                    />

                    <Route
                        path="/dashboard/rh"
                        element={
                            <LayoutWithSidebar>
                                <HrDashboard />
                            </LayoutWithSidebar>
                        }
                    />

                    <Route
                        path="/dashboard/member"
                        element={
                            <LayoutWithSidebar>
                                <MemberDashboard />
                            </LayoutWithSidebar>
                        }
                    />

                    {/* Rota para página Equipes */}
                    <Route
                        path="/team/leader"
                        element={
                            <LayoutWithSidebar>
                                <Team />
                            </LayoutWithSidebar>
                        }
                    />
                    {/* Rota para página Kanban */}
                    <Route
                        path="/kanban"
                        element={
                            <LayoutWithSidebar>
                                
                                    <Kanban />
                                
                            </LayoutWithSidebar>
                        }
                    />


                    {/* Rota para página Reuniões */}
                    <Route
                        path="/meetings"
                        element={
                            <LayoutWithSidebar>
                                <Meetings />
                            </LayoutWithSidebar>
                        }
                    />

                    <Route
                        path="/calls"
                        element={
                            <LayoutWithSidebar>
                                <Calls />
                            </LayoutWithSidebar>
                        }
                    />


                    {/* Rota para página Check-in */}
                    <Route path="/check-in" element={
                        <LayoutWithSidebar>
                            <CheckProvider>
                                <Check />
                            </CheckProvider>
                        </LayoutWithSidebar>
                    } />


                    {/* Rota para página Perfil do Usuário */}
                    <Route
                        path="/user-profile"
                        element={
                            <LayoutWithSidebar>
                                <UserProfile />
                            </LayoutWithSidebar>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </KanbanProvider>
    )
}

export default App
