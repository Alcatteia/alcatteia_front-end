import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/home/images/logotipo364.png";
import { Link } from "react-router";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-t from-transparent to-black text-white z-50">
      {/* Logo */}
      <Link
        className="flex gap-0.5 items-center ml-5"
        to="/"
      >
        <img src={logo} alt="logotipo" className="w-17 mr-4 " />
        <span className="text-3xl">Alcatteia</span>
      </Link>

      {/* Botão Hamburger */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="lg:hidden text-3xl mr-5 focus:outline-none"
      >
        {menuAberto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menu Desktop */}
      <nav className="text-lg gap-5 relative hidden lg:flex">
        {["Início", "Sobre", "Planos"].map((item, index) => (
          <Link
            key={index}
            to="/account-access"
            className="relative group px-5 py-5 transition-transform duration-500 ease-in-out cursor-pointer"
          >
            {item}
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 min-h-0.5 my-7
                         bg-gradient-to-r from-indigo-600 to-fuchsia-400 h-[3px] rounded-3xl
                         group-hover:w-15 transition-all duration-500 ease-in-out"
            />
          </Link>
        ))}

        <Link
          to="/account-access"
          className="mr-3 ml-3 mt-3 mb-5 
               bg-gradient-to-r from-indigo-600 to-fuchsia-400 font-semibold
               px-8 py-2 flex items-center rounded-2xl 
               transition-all hover:scale-105 
               hover:from-blue-600 hover:to-blue-400
               duration-100 ease-in-out
               hover:drop-shadow-blue-600  
               hover:drop-shadow-[0_0_8px] focus:outline-none active:scale-110
               hover:font-semibold hover:text-blue-950 cursor-pointer"
        >
          Entrar
        </Link>

        <Link
          className="mr-7 ml-1 mt-3 mb-5
        bg-transparent font-semibold border-2 shadow-[0_0_15px] shadow-purple-600 border-purple-400
        text-purple-300
        px-8 py-2 flex items-center rounded-2xl 
        transition-all hover:scale-106 
        hover:bg-gradient-to-r from-amber-300 to-amber-400 
        hover:border-transparent hover:shadow-amber-200 hover:shadow-[0_0_15px]
        duration-100 ease-in-out 
        focus:outline-none active:scale-110
        hover:font-semibold hover:text-yellow-700
        cursor-pointer"

          to="/account-access">
          Cadastre-se
        </Link>
      </nav>

      {/* Menu Mobile/Tablet: lateral overlay */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-black/90 backdrop-blur-md z-[999] flex flex-col items-start p-8 gap-6"
          >
            <button
              onClick={() => setMenuAberto(false)}
              className="self-end text-3xl mb-6 focus:outline-none"
            >
              <FaTimes />
            </button>

            {["Início", "Sobre", "Planos"].map((item, index) => (
              <a
                key={index}
                href="#"
                onClick={() => setMenuAberto(false)}
                className="relative group text-lg px-3 py-2 transition-transform duration-500 ease-in-out cursor-pointer w-full"
              >
                {item}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 min-h-0.5
                             bg-gradient-to-r from-indigo-600 to-fuchsia-400 h-[3px] rounded-3xl
                             group-hover:w-10 transition-all duration-500 ease-in-out"
                />
              </a>
            ))}

            <a
              href="#"
              onClick={() => setMenuAberto(false)}
              className="bg-gradient-to-r from-indigo-600 to-fuchsia-400 font-semibold
                     px-6 py-2 flex items-center rounded-2xl 
                     transition-all hover:scale-105 
                     hover:from-blue-600 hover:to-blue-400
                     duration-100 ease-in-out
                     hover:drop-shadow-blue-600  
                     hover:drop-shadow-[0_0_8px] focus:outline-none active:scale-110
                     hover:font-semibold hover:text-blue-950 cursor-pointer w-full justify-center"
            >
              Entrar
            </a>

            <button
              onClick={() => setMenuAberto(false)}
              className="bg-transparent font-semibold border-2 shadow-[0_0_15px] shadow-purple-600 border-purple-400
                     text-purple-300
                     px-6 py-2 flex items-center rounded-2xl 
                     transition-all hover:scale-106 
                     hover:bg-gradient-to-r from-amber-300 to-amber-400 
                     hover:border-transparent hover:shadow-amber-200 hover:shadow-[0_0_15px]
                     duration-100 ease-in-out 
                     focus:outline-none active:scale-110
                     hover:font-semibold hover:text-yellow-700
                     cursor-pointer w-full justify-center">
              Cadastre-se
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
