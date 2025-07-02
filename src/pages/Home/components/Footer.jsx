import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import logo from "../../../assets/home/images/logotipo364.png";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-[#2f0846] to-black text-white px-6 md:px-16 py-12">
      {/* Gradiente sutil no topo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo e slogan */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img src={logo} alt="Logo Alcatteia" className="w-20 md:w-24" />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Alcatteia</h3>
            <p className="text-gray-400 text-sm md:text-base max-w-xs">
              O sucesso de um é o sucesso de todos.
            </p>
          </div>
        </div>

        {/* Links de navegação */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm md:text-base">
          <a href="#" className="hover:text-red-400 transition-colors">Início</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Sobre</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Planos</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Contato</a>
        </div>

        {/* Redes sociais */}
        <div className="flex gap-4 text-2xl">
          <a href="#" className="hover:scale-110 transition-transform text-pink-400 hover:text-pink-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:scale-110 transition-transform text-blue-400 hover:text-blue-300">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:scale-110 transition-transform text-gray-300 hover:text-gray-100">
            <FaGithub />
          </a>
          <a href="#" className="hover:scale-110 transition-transform text-indigo-400 hover:text-indigo-300">
            <FaDiscord />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} Alcatteia. Todos os direitos reservados.
      </div>
    </footer>
  );
}