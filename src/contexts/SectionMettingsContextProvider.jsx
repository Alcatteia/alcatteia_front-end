import { useState } from "react";
import { SectionMettingsContext  } from "./SectionMettingsContext";

const SectionMettingsContextProvider = ({ children }) => {
    const [sectionActive, setSectionActive] = useState("");

    return (
        <SectionMettingsContext.Provider value={{ sectionActive, setSectionActive }}>
            {children}
        </SectionMettingsContext.Provider>
    );
};

export default SectionMettingsContextProvider;