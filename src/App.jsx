// Styles

import "./styles.css";

import AccountAccess from "./pages/AccountAccess/AccountAccess";

// React Router

import { BrowserRouter, Route, Routes } from "react-router";


function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Rota para Home */}
                    <Route path="/" element={<AccountAccess />} />


                    {/* Rota para página Sobre  */}
                    {/* <Route path="/about" element={<Home />} /> */}


                    {/* Rota para página Dashboard */}
                    {/* <Route path="/dashboard" element={<Componente />} /> */}


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
