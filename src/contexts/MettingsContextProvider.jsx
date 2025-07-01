import { useState } from "react";
import { MeetingsContext } from "./MeetingsContext";

const MettingsContextProvider = ({ children }) => {
    const [meetings, setMeetings] = useState([
        {
            id: '1',
            title: 'Alinhamento',
            date: '2025-05-08',
            time: '07h30',
            administrator: 'Isabelle Gomes',
            participants: 5,
            status: 'live',
            description: 'Reunião de alinhamento semanal da equipe'
        }
    ]);


    return (
        <MeetingsContext.Provider value={{ meetings, setMeetings }}>
            {children}
        </MeetingsContext.Provider>
    );
};

export default MettingsContextProvider;