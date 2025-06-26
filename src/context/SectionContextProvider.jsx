import { useState } from "react";
import { SectionContext } from "./SectionContext.js";

const SectionContextProvider = ({ children }) => {
    const [sectionActive, setSectionActive] = useState("");

    return (
        <SectionContext.Provider value={{ sectionActive, setSectionActive }}>
            {children}
        </SectionContext.Provider>
    );
};

export default SectionContextProvider;