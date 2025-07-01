import Hero from "./components/Hero";
import AppMettingsProvider from "../../contexts/AppMettingsProvider";
import MeetingsContent from "./MeetingsContent";


function Meetings() {

    return (
        <AppMettingsProvider>
            <div className="w-[100% - 256px]">
                <Hero />
                <MeetingsContent />
            </div>
        </AppMettingsProvider>

    )
}

export default Meetings;