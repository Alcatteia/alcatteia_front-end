import { useState } from "react";
import { FaUsers, FaCrown, FaUserFriends } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import logo from "../../../assets/home/images/logotipo364.png";
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

const Planos = () => {
  const [isAnual, setIsAnual] = useState(false);

  const formatPrice = (price) => {
    return isAnual
      ? `R$${(price * 0.8).toFixed(2)}/Mês`
      : `R$${price.toFixed(2)}/Mês`;
  };

  const planos = [
    {
      nome: "Trilha",
      preco: 0,
      descricao: "Gratuito",
      itens: [
        "Até 4 Membros",
        "Dashboard Básico",
        "Check-in Diário de humor",
        "Kanban com emoções",
        { texto: "Relatórios semanais", incluso: false },
        { texto: "Alertas Personalizados", incluso: false },
      ],
      icone: <FaUserFriends size={28} />,
      tag: "Grátis",
      cor: "bg-[#0F6EB3]",
      shadow: "shadow-[6px_5px_4px_rgba(15,110,179,0.5)]",
      btnColor: "bg-[#003366] text-white",
      textoBtn: "Comece Agora!",
    },
    {
      nome: "Bando",
      preco: 99,
      descricao: formatPrice(99),
      itens: [
        "Até 15 Membros",
        "Dashboard Completo",
        "Check-in Diário de humor",
        "Kanban com emoções",
        { texto: "Relatórios semanais", incluso: false },
        "Alertas Personalizados",
      ],
      icone: <FaUsers size={28} />,
      tag: "Pro",
      cor: "bg-[#69009C]",
      shadow: "shadow-[6px_5px_4px_rgba(105,0,156,0.5)]",
      btnColor: "bg-[#400060] text-white",
      textoBtn: "15 dias grátis!",
      hoverMsg: "Caso queira adicionar mais pessoas: R$6,00 por pessoa",
    },
    {
      nome: "Alfa",
      preco: 190,
      descricao: formatPrice(190),
      itens: [
        "Até 30 membros",
        "Dashboard avançado",
        "Check-in Diário de humor",
        "Kanban com emoções",
        "Relatórios semanais",
        "Alertas Personalizados",
      ],
      icone: <FaCrown size={28} />,
      tag: "Gold",
      cor: "bg-[#890000]",
      shadow: "shadow-[6px_5px_4px_rgba(137,0,0,0.5)]",
      btnColor: "bg-[#5c0000] text-white",
      textoBtn: "14 dias grátis!",
      hoverMsg: "Caso queira adicionar mais pessoas: R$6,00 por pessoa",
    },
  ];

  return (
    <section className="min-h-screen px-4 py-8 bg-gradient-to-br from-violet-950 via-black to-blue-900 text-white">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Planos Alcatteia</h2>
        <p className="text-gray-300 text-lg">
          Escolha o plano ideal para a jornada da sua equipe
        </p>
        <div className="mt-4 flex justify-center items-center gap-2">
          <span>Mensal</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnual}
              onChange={() => setIsAnual(!isAnual)}
            />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-checked:bg-purple-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <span className="text-green-400 font-semibold">Anual (20% off)</span>
        </div>
      </div>

      {/* Planos */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        {planos.map((plano, idx) => (
          <div
            key={idx}
            className={`relative w-[280px] p-6 rounded-2xl text-white ${plano.cor} ${plano.shadow} hover:shadow-2xl transition duration-300 group overflow-hidden`}
          >
            {/* Tag */}
            <div
              className={`absolute top-3 left-3 px-2 py-1 rounded-full text-sm font-semibold ${plano.tag === "Gold"
                ? "bg-yellow-400 bg-opacity-80 text-black"
                : plano.tag === "Pro"
                  ? "bg-purple-500 bg-opacity-30"
                  : "bg-blue-800 bg-opacity-30"
                }`}
            >
              {plano.tag}
            </div>

            {/* Ícone */}
            <div className="absolute top-3 right-3">{plano.icone}</div>

            {/* Conteúdo */}
            <h3 className="text-2xl font-bold mt-10">{plano.nome}</h3>
            <p className="text-lg mb-4">{plano.descricao}</p>
            <ul className="text-sm space-y-2 mb-6">
              {plano.itens.map((item, i) => {
                const texto = typeof item === "string" ? item : item.texto;
                const incluso = typeof item === "string" || item.incluso;
                return (
                  <li key={i} className="flex items-center gap-2">
                    {incluso ? (
                      <MdCheckCircle className="text-green-400" />
                    ) : (
                      <MdCancel className="text-red-500" />
                    )}
                    {texto}
                  </li>
                );
              })}
            </ul>

            {/* Hover message com z-10 */}
            {plano.hoverMsg && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="text-white text-sm font-medium px-4 py-2 rounded-lg max-w-[90%] text-center">
                  {plano.hoverMsg}
                </div>
              </div>
            )}

            {/* Botão com z-20 para ficar por cima */}
            <button
              className={`w-full py-2 rounded-xl font-bold z-20 relative ${plano.btnColor}`}
            >
              {plano.textoBtn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Planos;


