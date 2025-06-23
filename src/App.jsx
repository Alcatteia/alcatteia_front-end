// Styles

import "./styles.css";

// React Router

import { BrowserRouter, Route, Routes } from "react-router";

// Components

import Sidebar from "./components/Sidebar";

// Pages

import About from "./pages/About/About";
import AccountAccess from "./pages/AccountAccess/AccountAccess";
import Kanban from "./pages/Kanban/Kanban";

import AppDashboard from "./pages/Dashboard/AppDashboard";
import Topbar from "./components/Topbar";
import HrDashboard from "./pages/Dashboard/HrDashboard";
import MemberDashboard from "./pages/Dashboard/MemberDashboard";



function LayoutWithSidebar({ children }) {
    return (
        <div>
            <Topbar />
            <div className="flex">
                <Sidebar />
                <div style={{ flex: 1 }}>{children}</div>
            </div>
        </div>
    );
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rota para Home */}
                    {/* <Route path="/" element={<AccountAccess />} />  */}


                    {/* Rota para página Sobre  */}
                    <Route path="/about" element={<About />} />


                    {/* Rota para página Entrar/Cadastrar  */}
                    <Route path="/account-access" element={<AccountAccess />} />


                    {/* Rota para página Dashboard */}
                    <Route
                        path="/dashboard/leader"
                        element={
                            <LayoutWithSidebar>
                                <AppDashboard />
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
                    
                    {/* Rota para página Kanban */}
                    <Route
                        path="/kanban"
                        element={
                            <LayoutWithSidebar>
                                <Kanban />
                            </LayoutWithSidebar>
                        }
                    />

                    




                    {/* Rota para página Dashboard */}
                    {/* <Route path="/dashboard" element={<Componente />} /> */}


                    {/* Rota para página Reuniões */}
                    {/* <Route path="/meetings" element={<Componente />} /> */}


                    {/* Rota para página Check-in */}
                    {/* <Route path="/check-in" element={<Componente />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
