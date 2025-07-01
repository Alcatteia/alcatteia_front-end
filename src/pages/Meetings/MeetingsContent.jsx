import { useContext } from "react"
import { SectionMettingsContext } from "../../contexts/SectionMettingsContext";
import Calendar from "./components/Calendar";
import InProgress from "./components/InProgress";
import ScheduledMeetings from "./components/ScheduledMeetings";

const MeetingsContent = () => {
    const { sectionActive } = useContext(SectionMettingsContext);

    return (
        <>
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

export default MeetingsContent