import { FaUsers, FaRocket} from 'react-icons/fa';

export default function Explanation() {
  return (
    <section className="w-full py-40 px-6 md:px-16 bg-gradient-to-br from-gray-900 via-[#1d0625] to-black text-white">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* TEXTO */}
        <div className="relative">
          {/* Badge opcional */}
          <span className="uppercase text-xs text-pink-400 tracking-wider mb-2 inline-block">
            #EquipeUnida
          </span>

          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Gestão Ágil com Propósito: <br />
             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Conecte
            </span>,{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Inspire
            </span>,{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Evolua
            </span>{"."}
          </h2>

          {/* Parágrafo */}
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Transforme sua equipe com um <span className='font-bold'>dashboard emocional inteligente</span> que vai além de tarefas, medindo o <span className='font-bold'>pulso emocional</span> e fortalecendo a <span className='font-bold'>comunicação real</span>. Gere resultados consistentes com uma <span className='font-bold'>gestão ágil</span> centrada em pessoas.
          </p>

          {/* Botões */}
          <div className="flex flex-wrap gap-4">
            {/* Botão primário */}
            <a
              href=""
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                         bg-gradient-to-r from-purple-600 to-pink-500
                         hover:from-pink-500 hover:to-yellow-400
                         hover:shadow-[0_0_10px_4px_rgba(236,72,153,0.4)]
                         transition-all duration-300 ease-in-out"
            >
              <FaRocket className="text-lg" />
              Desperte o instinto
            </a>

            {/* Botão secundário */}
            <a
              href=""
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-pink-500 
                         text-pink-400 hover:text-white hover:bg-pink-500/10
                         hover:border-pink-400 transition-all duration-300"
            >
              <FaUsers className="text-lg" />
              Sobre nossa Equipe
            </a>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="order-first md:order-none">
          <img
            src="https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg"
            alt="Equipe reunida"
            className="w-full rounded-3xl shadow-xl "
          />
        </div>
      </div>
    </section> 
  
  );
}
