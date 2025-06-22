// Styles

import "./styles.css";

// React Router

import { BrowserRouter, Route, Routes } from "react-router";

// Components

import About from "./pages/About/About";
import AccountAccess from "./pages/AccountAccess/AccountAccess";
import Dashboard from "./pages/Dashboard/AppDashboard";


function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rota para Home */}
                    <Route path="/" element={<AccountAccess />} /> 


                    {/* Rota para página Sobre  */}
                    <Route path="/about" element={<About />} />


                    {/* Rota para página Entrar/Cadastrar  */}
                    <Route path="/account-access" element={<AccountAccess />} />


                    {/* Rota para página Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} /> 


                    {/* Rota para página Reuniões */}
                    {/* <Route path="/meetings" element={<Componente />} /> */}


                    {/* Rota para página Kanban */}
                    {/* <Route path="/kanban" element={<Componente />} /> */}


                    {/* Rota para página Check-in */}
                    {/* <Route path="/check-in" element={<Componente />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
