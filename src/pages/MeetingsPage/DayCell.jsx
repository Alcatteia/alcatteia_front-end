import React from 'react';

const DayCell = ({ day, status }) => {
    const baseStyle = "h-20 w-full flex items-center justify-center rounded-md relative border border-gray-600";

    const statusStyles = {
        none: "bg-[#bda5d640]",
        ver: "bg-blue-700 text-white",
        assistir: "bg-yellow-400 text-black",
        agendada: "bg-purple-500 text-white",
        outroMes: "bg-[#bda5d613]"
    };

    const labelMap = {
        ver: "Ver reunião",
        assistir: "Assistir reunião",
        agendada: "Reunião agendada"
    };

    return (
        <div className={`${baseStyle} ${statusStyles[status] || "bg-gray-800"}`}>
            {/* Número do dia */}
            {day && (
                <div className="absolute top-1 left-1 text-lg font-semibold text-gray-300">
                    {day}
                </div>
            )}

            {/* Texto do status */}
            {status !== "none" && (
                <span className="text-center font-medium">
                    {labelMap[status]}
                </span>
            )}
        </div>
    );
};

export default DayCell;
