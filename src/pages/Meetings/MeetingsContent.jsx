import { useContext, useEffect } from "react";

import Calendar from "./Calendar";

import Hero from "./Hero";
import InProgress from "./InProgress";
import ScheduledMeetings from "./ScheduledMeetings";

import { SectionContext } from "../../context/SectionContext";


function MeetingsContent() {
    const { sectionActive } = useContext(SectionContext);


    useEffect(() => {
        window.scrollTo(0, 0); // Rola a página para o topo ao carregar o componente.
    }, []);

    return (
        <div>
            <Hero />
            {sectionActive == "calendar" ?
                (
                    <Calendar />
                ) : (
                    <div>
                        <InProgress />
                        <ScheduledMeetings />
                    </div>
                )
            }
        </div>
    )
}

export default MeetingsContent;