import Explanation from "./components/Explanation";
import MainSection from "./components/MainSection";
import Mascot from "./components/Mascot";
import Overview from "./components/Overview";
import Tools from "./components/Tools";
import Clients from "./components/Clients";

import "./styles.css";
import { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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