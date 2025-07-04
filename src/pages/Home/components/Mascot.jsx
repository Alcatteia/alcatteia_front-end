import React from "react";
import { motion } from "framer-motion";
import lupinImage from "../../../assets/home/images/lupin_acenando.gif";
import { Link } from "react-router";

export default function Mascot() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#31062c] via-black to-violet-950 text-white py-16 md:py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="uppercase text-xs text-pink-400 tracking-wider">#ConhecaOLupin</span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Este é o nosso mascote <br />
            <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
              Lupin
            </span>!
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
            O Lupin é mais do que um mascote: ele simboliza a união, coragem e o espírito colaborativo da Alcatteia. Com sua energia contagiante, ele inspira times a manterem-se conectados, produtivos e focados no bem-estar coletivo.
          </p>

          <Link to="/about">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-purple-600 to-pink-500
                         hover:from-pink-500 hover:to-yellow-400
                         hover:shadow-[0_0_10px_4px_rgba(236,72,153,0.4)]
                         transition-all duration-300 ease-in-out"
            >
              Saiba mais sobre a Alcatteia
            </motion.span>
          </Link>
        </motion.div>

        {/* IMAGEM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
          className="flex justify-center"
        >
          <img
            src={lupinImage}
            alt="Mascote Lupin Alcatteia"
            className="w-64 md:w-80 lg:w-150 object-cover rounded-3xl shadow-lg shadow-purple-800/40"
          />
        </motion.div>

      </div>
    </section>
  );
}
