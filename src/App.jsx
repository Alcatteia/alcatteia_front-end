// Styles

import "./styles.css";

// React Router

import { BrowserRouter, Route, Routes } from "react-router";

// Components

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages

import Home from "./pages/Home/Home";

import About from "./pages/About/About";

import AccountAccess from "./pages/AccountAccess/AccountAccess";

import Kanban from "./pages/Kanban/Kanban";

import LeaderDashboard from "./pages/Dashboard/LeaderDashboard";
import HrDashboard from "./pages/Dashboard/HrDashboard";
import MemberDashboard from "./pages/Dashboard/MemberDashboard";

import Team from "./pages/TeamArea/LeaderTeamArea"
import Meetings from "./pages/Meetings/Meetings";
import Calls from "./pages/Calls/Calls";

import UserProfile from "./pages/UserProfile/UserProfile";


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
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rota para Home */}
                    <Route path="/" element={
                        <LayoutWithHeaderAndFooter>
                            <Home />
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
        </>
    )
}

export default App
