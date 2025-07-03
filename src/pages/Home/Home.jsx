import Explanation from "./components/Explanation";
import MainSection from "./components/MainSection";
import Mascot from "./components/Mascot";
import Overview from "./components/Overview";
import Tools from "./components/Tools";
import Clients from "./components/Clients";

import "./styles.css";

const Home = () => {
    return (
        <>
            <main>
                <MainSection />
                <Explanation />
                <Tools />
                <Overview />
                <Mascot />
                <Clients />
            </main>
        </>
    )
}

export default Home