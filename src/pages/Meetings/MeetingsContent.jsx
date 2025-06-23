import { useContext } from "react";

import Calendar from "./Calendar";

import Hero from "./Hero";
import InProgress from "./InProgress";
import ScheduledMeetings from "./ScheduledMeetings";

import { SectionContext } from "../../context/SectionContext";


function MeetingsContent() {
    const { sectionActive } = useContext(SectionContext);

    return (
        <div className="w-[100% - 256px]">
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