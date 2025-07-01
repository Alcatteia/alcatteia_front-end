import { useContext, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { SectionMettingsContext } from "../../../contexts/SectionMettingsContext";

export default function ToggleViewButton() {
    const [currentView, setCurrentView] = useState("meetings")
    const { setSectionActive } = useContext(SectionMettingsContext);

    const handleClick = (view) => {
        if (currentView !== view) {
            setCurrentView(view);
            setSectionActive(view);
        }
    };

    return (
        <div className="relative w-[350px] h-12 bg-purple-200 rounded-full flex items-center text-xl p-1">
            {/* Indicador de fundo */}
            <div
                className={`absolute top-1 left-1 w-[175px] h-10 rounded-full transition-all duration-300
                    ${currentView === "meetings"
                        ? "translate-x-0 bg-gradient-to-br from-purple-800 to-purple-600"
                        : "translate-x-[167px] bg-gradient-to-br from-purple-800 to-purple-600"
                    }`}
            />

            {/* Botão: Ver reuniões */}
            <button
                onClick={() => handleClick("meetings")}
                className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-2 font-semibold transition-colors
                    ${currentView === "meetings" ? "text-white" : "text-purple-700"}
                `}
            >
                <MdEditSquare size={18} />
                Ver reuniões
            </button>

            {/* Botão: Ver calendário */}
            <button
                onClick={() => handleClick("calendar")}
                className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-2 font-semibold transition-colors
                    ${currentView === "calendar" ? "text-white" : "text-purple-700"}
                `}
            >
                <FaCalendarAlt size={18} />
                Ver calendário
            </button>
        </div>
    );
}
