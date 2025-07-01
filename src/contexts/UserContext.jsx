import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    const salvarUsuario = (dadosUsuario) => {
        localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        setUsuario(dadosUsuario);
    };

    const recuperarUsuario = () => {
        const usuarioSalvo = localStorage.getItem("usuario");
        let usuarioJSON = JSON.parse(usuarioSalvo);
        setUsuario(usuarioJSON);
    };

    const sair = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <UserContext.Provider value={{ usuario, salvarUsuario, recuperarUsuario, sair }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
