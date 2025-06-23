import { useContext } from "react";

import Calendar from "./Calendar";

import Hero from "./Hero";
import InProgress from "./InProgress";
import ScheduledMeetings from "./ScheduledMeetings";

import { SectionContext } from "../../context/SectionContext";


function MeetingsPage() {
    const { sectionActive } = useContext(SectionContext);

    return (
        <>
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
        </>
    )
}

export default MeetingsPage