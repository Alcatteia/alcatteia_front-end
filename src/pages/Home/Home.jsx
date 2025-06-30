import Header from "./components/Header";
import Explanation from "./components/Explanation";
import MainSection from "./components/MainSection";
import Mascot from "./components/Mascot";
import Overview from "./components/Overview";
import Tools from "./components/Tools";
import Clients from "./components/Clients";
import Footer from "./components/Footer";

import "./styles.css";

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <MainSection />
                <Explanation />
                <Tools />
                <Overview />
                <Mascot />
                <Clients />
            </main>
            <Footer />
        </>
    )
}

export default Home