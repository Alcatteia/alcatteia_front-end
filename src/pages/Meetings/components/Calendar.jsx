import React from 'react';
import DayCell from './DayCell';


const Calendar = () => {
    const days = [
        // Semana 1
        1, 2, 3, 4, "assistir", 6, 7,
        // Semana 2
        8, 9, "ver", 11, 12, 13, 14,
        // Semana 3
        15, 16, 17, "ver", 19, 20, 21,
        // Semana 4
        22, 23, 24, 25, 26, "ver", 28,
        // Semana 5
        29, "ver", null, null, null, null, null,
    ];

    const getStatus = (day) => {
        if (day === "ver") return "ver";
        if (day === "assistir") return "assistir";
        if (day === "agendada") return "agendada";
        if (day == null) return "outroMes"
        return "none";
    };

    return (
        <div className="p-4 bg-gradient-to-br bg-[#291A39] text-white rounded-lg mt-24 mb-32 max-w-[1221px] mx-auto">
            <h2 className="text-xl font-bold mb-4 lg:text-3xl">Maio</h2>
            <div className="grid grid-cols-7 gap-2">
                {["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."].map((d, i) => (
                    <div key={i} className="text-sm font-semibold text-center">{d}</div>
                ))}
                {days.map((day, index) => (
                    <DayCell
                        key={index}
                        day={typeof day === "number" && day}
                        status={getStatus(day)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
