import SectionContextProvider from "../../context/SectionContextProvider";
import MeetingsContent from "./MeetingsContent";

function Meetings() {
    return (
        <SectionContextProvider>
            <MeetingsContent />
        </SectionContextProvider>
    );
}

export default Meetings;