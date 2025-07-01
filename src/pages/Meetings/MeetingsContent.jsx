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
                    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 mb-32">
                        <InProgress />
                        <ScheduledMeetings />
                    </div>
                )
            }
        </>
    )
}

export default MeetingsContent