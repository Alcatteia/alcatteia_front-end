import { useEffect } from "react";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Team from "./components/Team";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <Hero />
            <Mission />
            <Team />
        </main>
    )
}

export default About