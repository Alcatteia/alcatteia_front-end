// src/components/FuncaoSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaChartPie, FaLightbulb, FaVideo } from "react-icons/fa";
import Lobo from "../../../assets/home/images/lupin1.png";

// Importações no topo
import checkinImg from "../../../assets/home/images/check.PNG";
import dashboardImg from "../../../assets/home/images/dashboard.PNG";
import kanbanImg from "../../../assets/home/images/kanban.PNG";
import reunioesImg from "../../../assets/home/images/reuniões.PNG";

const tabs = [
  {
    id: "checkin",
    titulo: "Check-in de humor",
    descricao: "O time registra o humor com emojis ou frases curtas, tornando visível como cada pessoa está se sentindo naquele dia.",
    imagem: checkinImg,
    icon: FaCheckCircle,
    cor: "bg-blue-500",
    borda: "border-b-blue-500",
  },
  {
    id: "dashboard",
    titulo: "Dashboard",
    descricao: "Visualize desempenho e emoções em gráficos intuitivos que revelam padrões e tendências na saúde do time ao longo do tempo.",
    imagem: dashboardImg,
    icon: FaChartPie,
    cor: "bg-red-500",
    borda: "border-b-red-500",
  },
  {
    id: "kanban",
    titulo: "Kanban",
    descricao: "O Kanban apresenta sugestões práticas e organizadas em cards. São ideias simples e eficazes para fortalecer vínculos, resolver conflitos e promover o bem-estar da equipe.",
    imagem: kanbanImg,
    icon: FaLightbulb,
    cor: "bg-yellow-400",
    borda: "border-b-yellow-400",
  },
  {
    id: "reunioes",
    titulo: "Espaço para Reuniões",
    descricao: "Conecte-se com o time por chamadas diretas sem sair da plataforma. Ideal para alinhamentos rápidos e encontros semanais.",
    imagem: reunioesImg,
    icon: FaVideo,
    cor: "bg-green-500",
    borda: "border-b-green-500",
  }
];


export default function FuncaoSection() {
  const [abaAtiva, setAbaAtiva] = useState("checkin");

  const aba = tabs.find((t) => t.id === abaAtiva);

  return (
    <section className="bg-gradient-to-br  from-black via-[#31062c] to-black py-24 px-4 text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Como a Alcatteia Funciona</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Mais do que gestão, uma forma de cuidar do time enquanto alcança resultados. Descubra como a Alcatteia transforma dados em conexões, e rotina em evolução.
        </p>
      </div>

      <div className="flex justify-center gap-4 flex-wrap mb-12 ">
        {tabs.map(({ id, titulo, cor, icon: Icone }) => (
          <button
            key={id}
            onClick={() => setAbaAtiva(id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all backdrop-blur-md ${aba.borda} 
              ${abaAtiva === id ? "bg-white/10 border-b-4 " : "bg-white/10 text-gray-300 hover:text-white hover:bg-white/15 "}`}
          >
            <span className={`w-7 h-7 ${cor} rounded-full flex items-center justify-center`}>
              <Icone className="text-white text-sm" />
            </span>
            {titulo}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={aba.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="max-w-6xl mx-auto rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 bg-[#1b1429]/45 shadow-[0_0_50px_rgba(124,58,237,0.2)]"
        >
          <div className="md:w-1/2 text-center md:text-left">
            <div className={`w-24 h-24 ${aba.cor}  rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6`} >
              <aba.icon className="text-6xl" />

            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{aba.titulo}</h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">{aba.descricao}</p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={aba.imagem}
              alt={aba.titulo}
              className="rounded-xl w-full max-w-xl max-h-[500px] shadow-2xl object-contain"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
