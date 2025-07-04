
import { motion } from "framer-motion";
import { FaBrain, FaChartLine, FaTasks, FaBell, FaVideo } from "react-icons/fa";


function Tools() {

  const recursos = [
    {
      titulo: "Dashboard Estratégico",
      descricao: "Visão customizada: dados individuais, análises de RH e indicativos para liderança em tempo real.",
      icone: <FaBrain className="text-purple-400 text-4xl mb-4 ml-23" />,
      bgColor: "bg-gradient-to-t from-purple-700 via-purple-950 to-black",
      delay: 0.1,
      shadowHover: "hover:shadow-purple-400"
    },
    {
      titulo: "Check-in de humor",
      descricao: "Seu termômetro emocional: simples para o time, poderoso para a gestão.",
      icone: <FaChartLine className="text-cyan-600 text-4xl mb-4 ml-23" />,
      bgColor: "bg-gradient-to-t from-cyan-600 via-cyan-850 to-black",
      delay: 0.1,
      shadowHover: "hover:shadow-cyan-600"
    },
    {
      titulo: "Kanban Colaborativo",
      descricao: "Visual, ágil e feito pra times de verdade trabalharem juntos.",
      icone: <FaTasks className="text-red-500 text-4xl mb-4 ml-22" />,
      bgColor: "bg-gradient-to-t from-red-500 via-red-950 to-black",
      delay: 0.1,
      shadowHover: "hover:shadow-red-800"
    },
    {
      titulo: "Espaço para Reuniões",
      descricao: "Conecte-se por chamadas diretas no ambiente da equipe. Simples, rápido e sem sair da plataforma.",
      icone: <FaVideo className="text-emerald-400 text-4xl mb-4 ml-23.5" />,
      bgColor: "bg-gradient-to-t from-emerald-600 via-emerald-850 to-black",
      delay: 0.1,
      shadowHover: "hover:shadow-emerald-400"
    }
  ];
  return (
    <section className="w-full px-6 py-60 md:py-0 md:px-16 bg-gradient-to-br from-[#2f0846] via-black to-[#31062c] text-white">

      <div className="relative z-10 max-w-7xl mx-auto py-10 px-6 text-center ">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 ">
          Ferramentas que unem <span className="bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent">pessoas</span> e <span className="bg-gradient-to-r from-lime-500 to-amber-500 bg-clip-text text-transparent">resultados</span>
        </h2>
        <p className="text-xl md:text-lg text-gray-300 mb-20 max-w-3xl mx-auto">
          Transforme sua equipe em um time de alta performance. Conheça as ferramentas que unem bem-estar, produtividade e resultados extraordinários
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {recursos.map((item, index) => (
            <motion.div

              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 
               ${item.bgColor}  hover:shadow-[0px_0px_50px_0px] ${item.shadowHover}`}
            >
              {item.icone}
              <h3 className="text-xl font-semibold mb-2 text-">{item.titulo}</h3>
              <p className="text-5px text-gray-300">{item.descricao}</p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tools;


