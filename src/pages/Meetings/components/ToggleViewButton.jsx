import { useContext, useState } from "react";

import { FaCalendarAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { SectionMettingsContext } from "../../../contexts/SectionMettingsContext";


export default function ToggleViewButton() {
    const [isOnlineView, setIsOnlineView] = useState(true);
    const { setSectionActive } = useContext(SectionMettingsContext);

    const handleClick = () => {
        setIsOnlineView(!isOnlineView);
        setSectionActive(isOnlineView ? "calendar" : "meetings");
    }

    return (
        <div className="relative w-[350px] h-12 bg-purple-200 rounded-full flex items-center text-xl p-1">
            <div
                className={`absolute top-1 left-1 w-[175px] h-10 rounded-full transition-all duration-300 ${isOnlineView ? "translate-x-0 bg-gradient-to-br from-purple-800 to-purple-600" : "translate-x-[167px] bg-gradient-to-br from-purple-800 to-purple-600"
                    }`}
            />

            <button
                onClick={handleClick}
                className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-2 font-semibold transition-colors ${isOnlineView ? "text-white" : "text-purple-700"
                    }`}
            >
                <MdEditSquare size={18} />
                Ver reuniões
            </button>
            
            <button
                onClick={handleClick}
                className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-2 font-semibold transition-colors ${isOnlineView ? "text-purple-700" : "text-white"
                    }`}
            >
                <FaCalendarAlt size={18} />
                Ver calendário
            </button>
        </div>
    );
}
