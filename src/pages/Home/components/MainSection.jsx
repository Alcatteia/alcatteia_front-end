import React, { useState, useEffect } from "react";
import "../styles.css";
import { motion } from 'framer-motion';

function MainSection() {
  const palavras = [
    { palavra: "produtividade", genero: "feminino" },
    { palavra: "comunicação", genero: "feminino" },
    { palavra: "trabalho em equipe", genero: "masculino" },
    { palavra: "conexão", genero: "feminino" },
    { palavra: "engajamento profissional", genero: "masculino" }
  ];

  const [texto, setTexto] = useState("");
  const [indicePalavra, setIndicePalavra] = useState(0);
  const [subindo, setSubindo] = useState(true);
  const [letraIndex, setLetraIndex] = useState(0);
  const [artigo, setArtigo] = useState("da");

  const getArtigo = (palavraObj) => {
    return palavraObj.genero === "feminino" ? "da" : "do";
  };

  useEffect(() => {
    const palavraAtual = palavras[indicePalavra];
    const novoArtigo = getArtigo(palavraAtual);
    setArtigo(novoArtigo);

    const intervalo = setTimeout(() => {
      if (subindo) {
        setTexto(palavraAtual.palavra.slice(0, letraIndex + 1));
        setLetraIndex(letraIndex + 1);
        if (letraIndex + 1 === palavraAtual.palavra.length) {
          setSubindo(false);
        }
      } else {
        setTexto(palavraAtual.palavra.slice(0, letraIndex - 1));
        setLetraIndex(letraIndex - 1);
        if (letraIndex - 1 === 0) {
          setSubindo(true);
          setIndicePalavra((indicePalavra + 1) % palavras.length);
        }
      }
    }, subindo ? 150 : 110);

    return () => clearTimeout(intervalo);
  }, [letraIndex, subindo, indicePalavra]);

  return (
    <section className="z-0 w-full h-157 flex items-center justify-center overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="../../../../src/assets/home/images/videobackground.mp4"
        autoPlay loop muted playsInline
      />
      
      <div className="relative z-20 flex flex-col items-center text-center mb-16 text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-6xl font-bold mt-50"
        >
          Alcatteia: <br />
          <span className="font-medium size-">O futuro {artigo.toLowerCase()} </span> 
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {texto}
          </span>
        </motion.h1>
        
        <div className="flex flex-wrap justify-center gap-6 mt-20">
          <motion.a
            href=""
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-2xl group 
                       bg-gradient-to-r from-purple-600 to-pink-500 
                       hover:from-emerald-500 hover:to-cyan-600
                       transition-all duration-300 ease-in-out
                       hover:shadow-[0_0_14px_1px] 
                       hover:shadow-sky-300 
                       hover:text-cyan-950
                       hover:font-bold"
          >
            <img src="../../../../src/assets/home/images/lobinho.png" alt="Lobo uivando" className='w-5 h-5 mr-0.5 mb-1' />
            <span className="relative z-10">Desperte o instinto</span>
          </motion.a>

          <motion.a
            href="/sobre"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white text-white rounded-2xl font-semibold
                       hover:bg-white hover:text-black transition-all duration-300"
          >
            Conheça a Alcatteia
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default MainSection;