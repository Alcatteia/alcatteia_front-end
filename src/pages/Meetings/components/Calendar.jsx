import React, { useContext } from 'react';
import DayCell from './DayCell';
import { MeetingsContext } from '../../../contexts/MeetingsContext';

const Calendar = () => {
    const { meetings } = useContext(MeetingsContext);

    const days = Array.from({ length: 35 }, (_, i) => i + 1); 

    const isDayScheduled = (day) => {
        return meetings.some(meeting => {
            const meetingDate = new Date(meeting.date + 'T12:00:00'); 
            return meetingDate.getDate() === day && meetingDate.getMonth() === 4;
        });
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
                        day={day}
                        status={isDayScheduled(day) ? "agendada" : "none"}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
