import MettingsContextProvider from "./MettingsContextProvider";
import SectionMettingsContextProvider from "./SectionMettingsContextProvider";

const AppMettingsProvider = ({ children }) => {
    return (
        <MettingsContextProvider>
            <SectionMettingsContextProvider>
                {children}
            </SectionMettingsContextProvider>
        </MettingsContextProvider>
    );
};

export default AppMettingsProvider;