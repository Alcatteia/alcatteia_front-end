import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import SectionContextProvider from "./context/SectionContextProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SectionContextProvider>
            <App />
        </SectionContextProvider>
    </StrictMode>,
)