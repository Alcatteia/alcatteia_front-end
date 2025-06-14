import Member from "./Member";

import Lupin from "../../assets/about/lobo_equipe.svg";

import LoboIntregrante1 from "../../assets/about/wolfs/lobo_vermelho.svg";
import LoboIntregrante2 from "../../assets/about/wolfs/lobo_rosa.svg";
import LoboIntregrante3 from "../../assets/about/wolfs/lobo_azul.svg";
import LoboIntregrante4 from "../../assets/about/wolfs/lobo_amarelo.svg";
import LoboIntregrante5 from "../../assets/about/wolfs/lobo_ciano.svg";
import LoboIntregrante6 from "../../assets/about/wolfs/lobo_laranja.svg";
import LoboIntregrante7 from "../../assets/about/wolfs/lobo_verde.svg";
import LoboIntregrante8 from "../../assets/about/wolfs/lobo_roxo.svg";

import Intregrante1 from "../../assets/about/members/integrante_1.jpg";
import Intregrante2 from "../../assets/about/members/integrante_2.png";
import Intregrante3 from "../../assets/about/members/integrante_3.png";
import Intregrante4 from "../../assets/about/members/integrante_4.png";
import Intregrante5 from "../../assets/about/members/integrante_5.png";
import Intregrante6 from "../../assets/about/members/integrante_6.png";
import Intregrante7 from "../../assets/about/members/integrante_7.png";
import Intregrante8 from "../../assets/about/members/integrante_8.png";



const Team = () => {
    const members = [
        {
            id: 1,
            name: "Felipe Oliveira",
            image: Intregrante3,
            icon: LoboIntregrante3
        },
        {
            id: 2,
            name: "Rafaela Nascimento",
            image: Intregrante4,
            icon: LoboIntregrante4
        },
        {
            id: 3,
            name: "Gabriel Cabral",
            image: Intregrante7,
            icon: LoboIntregrante7
        },
        {
            id: 4,
            name: "Pedro Miguel",
            image: Intregrante5,
            icon: LoboIntregrante5
        },
        {
            id: 5,
            name: "Heverton Nascimento",
            image: Intregrante6,
            icon: LoboIntregrante6
        },
        {
            id: 6,
            name: "Talita Vitória",
            image: Intregrante8,
            icon: LoboIntregrante8
        },
        {
            id: 7,
            name: "Gabriel de Alencar",
            image: Intregrante1,
            icon: LoboIntregrante1
        },
        {
            id: 8,
            name: "Isabelle Gomes",
            image: Intregrante2,
            icon: LoboIntregrante2
        },
    ]

    return (
        <section className="max-w-[1121px] mx-auto mt-24 mb-32 lg:mt-28">
            <div className="flex flex-col items-center text-center gap-10 lg:flex-row">
                <div className="max-w-xl md:max-w-3xl">
                    <p className="text-2xl text-white md:text-3xl md:leading-11">
                        Nossa marca <span className="text-[#FFFF59]">nasce</span> com o <span className="text-[#FF59FC]">propósito</span> de fortalecer a conexão entre líderes e suas equipes, inspirando uma <span className="text-[#FF595C]">cultura</span> de escuta, confiança e <span className="text-[#59FFF1]">crescimento</span> mútuo
                    </p>
                </div>

                <div>
                    <img src={Lupin} alt="Mascote Lupin" />
                </div>
            </div>

            <div className="bg-[#22172d] p-10 pt-14 rounded-xl relative bottom-2">
                <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-32">
                    {members.slice(0, 6).map(member => (
                        <Member
                            key={member.id}
                            image={member.image}
                            name={member.name}
                            icon={member.icon}
                        />
                    ))}
                </div>

                <div className="mt-32 grid gap-32 sm:grid-cols-2 md:gap-44">
                    {members.slice(6).map(member => (
                        <Member
                            key={member.id}
                            image={member.image}
                            name={member.name}
                            icon={member.icon}
                        />
                    ))}
                </div>

            </div>

            <div className="mt-24 px-8 text-center">
                <p className="text-2xl text-white md:text-3xl md:leading-11">A <span className="text-[#ED1515]">Alcateia</span> representa muito mais do que um grupo de lobos — simboliza <span className="text-[#196EFF]">união</span>, <span className="text-[#00BE63]">liderança estratégica</span>, <span className="text-[#ECAB06]">proteção</span> e <span className="text-[#FA3AAB]">inteligência emocional</span>  Da sua equipe</p>

                <button className="mt-8 py-3 cursor-pointer text-2xl text-white px-8 rounded-full bg-[#9A00FF] shadow-2xl shadow-[#aa7cff4b] font-semibold">Começar Agora</button>
            </div>
        </section>
    )
}

export default Team