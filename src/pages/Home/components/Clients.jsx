import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

import client1 from "../../../assets/home/images/client1.png";
import client2 from "../../../assets/home/images/client4.png";
import client3 from "../../../assets/home/images/julio.jpeg";

export default function Testimonials() {
  const depoimentos = [
    {
      nome: "Carla Rodrigues",
      cargo: "Líder de Projetos",
      texto: "Antes tínhamos dificuldades de comunicação. Com o dashboard emocional, melhoramos conexões e resultados.",
      img: client1,
      borda:"border-3",
      cor_borda:"border-red-500",
      borda_perfil:"border-red-500 border-3"
    },
    {
      nome: "Lucas Andrade",
      cargo: "CEO de Startup",
      texto: "Nunca foi tão simples medir o clima do time e agir rápido. A produtividade e o engajamento triplicaram.",
      img: client2,
      borda:"border-3",
      cor_borda:"border-green-400",
      borda_perfil:"border-green-400 border-3"
    },
    {
      nome: "Julio Cesar",
      cargo: "Gestor de RH",
      texto: "A Alcatteia transformou nossa equipe! Hoje trabalhamos com mais leveza e foco, sem perder o cuidado humano.",
      img: client3,
      borda:"border-3",
      cor_borda:"border-orange-400",
      borda_perfil:"border-orange-400 border-3"
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-black via-violet-950 to-black text-white py-20 md:py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Clientes que recomendam
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Veja como a Alcatteia transformou equipes e líderes, trazendo mais
          conexão, resultados e bem-estar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {depoimentos.map((dep, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`bg-gray-900/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300 ${dep.borda} ${dep.cor_borda}`}
          >
            <FaQuoteLeft className="text-3xl mb-4" />
            <p className="text-gray-300 mb-4 italic">"{dep.texto}"</p>
            <img
              src={dep.img}
              alt={dep.nome}
              className={`w-16 h-16 rounded-full mb-2 object-cover border-2 ${dep.borda_perfil}`}
            />
            <h3 className="text-lg font-semibold">{dep.nome}</h3>
            <p className="text-sm text-gray-400">{dep.cargo}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}