import { FaUsers, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router';

import coworking from "../../../assets/home/images/coworking.jpg"

export default function Explanation() {
  return (
    <section className="w-full pt-16 md:pt-20 mt-60 h-160 lg:pt-24 px-6 md:px-16 bg-gradient-to-br from-gray-900 via-[#2f0846] to-black text-white">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* TEXTO */}
        <div className="relative">
          {/* Badge opcional */}
          <span className="uppercase text-xs text-pink-400 tracking-wider mb-2 inline-block">
            #EquipeUnida
          </span>

          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Gestão ágil com propósito <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Conecte
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-600 bg-clip-text text-transparent">
              Inspire
            </span>{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Evolua
            </span>{" "}
          </h2>

          {/* Parágrafo */}
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Transforme sua equipe com um dashboard emocional inteligente que vai além de tarefas, medindo o pulso emocional e fortalecendo a comunicação real. Gere resultados consistentes com uma gestão ágil centrada em pessoas.
          </p>

          {/* Botões */}
          <div className="flex flex-wrap gap-4 mt-5">
            {/* Botão primário */}
            <Link
              to="/account-access"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                         bg-gradient-to-r from-purple-600 to-pink-500
                         hover:from-pink-500 hover:to-yellow-400
                         hover:shadow-[0_0_10px_4px_rgba(236,72,153,0.4)]
                         transition-all duration-300 ease-in-out"
            >
              <FaRocket className="text-lg" />
              Desperte o instinto
            </Link>

            {/* Botão secundário */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-pink-500 
                         text-pink-400 hover:text-white hover:bg-pink-500/10
                         hover:border-pink-400 transition-all duration-300"
            >
              <FaUsers className="text-lg" />
              Sobre nossa equipe
            </Link>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="order-first md:order-none opacity-75">
          <img
            src={coworking}
            alt="Equipe reunida"
            className="w-full rounded-3xl shadow-xl "
          />
        </div>
      </div>
    </section>

  );
}
