// Styles

import "./styles.css";

// React Router

import { BrowserRouter, Route, Routes } from "react-router";

// Components

import About from "./pages/About/About";
import AccountAccess from "./pages/AccountAccess/AccountAccess";
import Calls from "./pages/Calls/Calls";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
         


                    {/* Rota para página Reuniões */}
                    <Route path="/calls" element={<Calls />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
