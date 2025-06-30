import { motion } from 'framer-motion'; 
import logo from "../../../assets/home/images/logotipo364.png"

function Header() {

  return (
    
    <header className="relative z-20 w-full p-4 flex justify-between items-center bg-gradient-to-t from-transparent to-black text-white ">

      <div className="flex gap-0.5 items-center">
        <img src={logo} alt="logotipo" className="w-17 mr-4 "/>
        <span className="text-3xl">Alcatteia</span>
      </div>

      <nav className="text-lg flex gap-5">

        <a href="" className="px-5 py-5.5 
        transition-transform duration-500 ease-in-out 
        hover:border-b-3  
        hover:h-14">Home</a>

        <a href="" className="px-5 py-5.5
        transition-transform duration-1500 ease-in-out
        hover:border-b-3 
        hover:h-14">Sobre </a>
        {/*<span
              className="absolute bottom-0 left-0 w-full h-0.5 
                         bg-gradient-to-r from-purple-400 to-pink-400
                         transform scale-x-0 group-hover:scale-x-100 
                         origin-left transition-transform duration-500 ease-in-out"
            />*/}

        <a href="" className="px-5 py-5.5 
        transition-transform duration-500 ease-in 
        hover:border-b-3  
        hover:h-14">Planos</a>

        <a href="" className="mr-3 ml-3 mt-3 mb-5 
        bg-gradient-to-r from-indigo-600  to-fuchsia-400 font-semibold
        px-8 py-2 flex items-center rounded-2xl 
        transition-all hover:scale-105 
        hover:from-blue-600 
        hover:to-blue-400 duration-100 ease-in-out 
        hover:drop-shadow-amber-200 
        hover:drop-shadow-[0_0_8px] focus:outline-none active:scale-110
        hover:font-semibold
        hover:text-amber-900 cursor-pointer"> Login</a>    

        <button className="mr-10 ml-3 mt-3 mb-5 
        bg-gradient-to-r from-indigo-600  to-fuchsia-400 font-semibold
        px-8 py-2 flex items-center rounded-2xl 
        transition-all hover:scale-105 
        hover:from-amber-600 
        hover:to-amber-300 duration-100 ease-in-out 
        hover:drop-shadow-amber-200 
        hover:drop-shadow-[0_0_8px] focus:outline-none active:scale-110
        hover:font-semibold
        hover:text-amber-900 cursor-pointer">Cadastre-se</button>
      </nav>

    </header>


  )
}

export default Header
