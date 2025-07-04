import React, { useState, useEffect, useRef } from "react";
import "../styles.css";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from "react-router";


function MainSection() {
  const palavras = [
    { palavra: "produtividade", genero: "feminino", cor: "from-purple-500 to-pink-500" },
    { palavra: "comunicação", genero: "feminino", cor: "from-yellow-400 to-orange-500" },
    { palavra: "trabalho em equipe", genero: "masculino", cor: "from-green-400 to-emerald-500" },
    { palavra: "conexão", genero: "feminino", cor: "from-blue-400 to-cyan-500" },
    { palavra: "engajamento profissional", genero: "masculino", cor: "from-red-400 to-pink-500" },
  ];

  const [texto, setTexto] = useState("");
  const [indicePalavra, setIndicePalavra] = useState(0);
  const [subindo, setSubindo] = useState(true); // true = digitando, false = apagando
  const [artigo, setArtigo] = useState("DA");
  const [opacity, setOpacity] = useState(1);

  const letraIndexRef = useRef(0);
  const subindoRef = useRef(true);
  const indicePalavraRef = useRef(0);

  const VELOCIDADE_DIGITACAO = 150;
  const VELOCIDADE_APAGAMENTO = 110;
  const TEMPO_EXIBICAO = 3000;

  // Atualiza os refs sempre que o estado mudar (sincroniza)
  useEffect(() => {
    letraIndexRef.current = texto.length;
  }, [texto]);

  useEffect(() => {
    subindoRef.current = subindo;
  }, [subindo]);

  useEffect(() => {
    indicePalavraRef.current = indicePalavra;
    setArtigo(palavras[indicePalavra]?.genero === "feminino" ? "DA" : "DO");
  }, [indicePalavra]);

  useEffect(() => {
    const handleTyping = () => {
      const palavraAtual = palavras[indicePalavraRef.current];
      const palavraTexto = palavraAtual.palavra;
      const letraAtual = letraIndexRef.current;

      if (subindoRef.current) {
        // Digitando
        if (letraAtual < palavraTexto.length) {
          setTexto(palavraTexto.slice(0, letraAtual + 1));
        } else {
          // Palavra completa - esperar um tempo antes de apagar
          setTimeout(() => {
            setOpacity(0.8);
            setTimeout(() => setOpacity(1), 200);
            setSubindo(false);
          }, TEMPO_EXIBICAO);
          return; // Sai aqui, para não agendar outro timeout imediato
        }
      } else {
        // Apagando
        if (letraAtual > 0) {
          setTexto(palavraTexto.slice(0, letraAtual - 1));
        } else {
          // Apagou tudo, muda a palavra e começa a digitar
          setIndicePalavra((prev) => (prev + 1) % palavras.length);
          setSubindo(true);
        }
      }
    };

    const intervalo = setTimeout(
      handleTyping,
      subindoRef.current ? VELOCIDADE_DIGITACAO : VELOCIDADE_APAGAMENTO
    );

    return () => clearTimeout(intervalo);
  }, [texto, subindo, indicePalavra]);

  const corGradiente = palavras[indicePalavra]?.cor || "from-purple-500 to-pink-500";

  const [hoverLobo, setHoverLobo] = useState(false);

  return (
    <section className="pt-40 md:pt-50 lg:pt-45 z-0 w-full h-157 flex items-center justify-center overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-210 object-cover"
        src="../../../../src/assets/home/images/videobackground.mp4"
        autoPlay loop muted playsInline
      />

      <div className="relative z-20 flex flex-col items-center text-center mb-16 text-white px-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-6xl font-bold mt-30 mb-10"
          >
            Alcatteia: <br />
            <span className="font-medium">O futuro {artigo.toLowerCase()} </span>
            <motion.span
              className={`bg-gradient-to-r ${corGradiente} bg-clip-text text-transparent`}
              style={{ opacity }}
            >
              {texto}
            </motion.span>
          </motion.h1>
          {/* BOTÕES */}
          <div className="flex flex-wrap justify-center items-center gap-10 mt-7">
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/account-access"
                className="relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-2xl group
                    bg-gradient-to-r from-purple-600 to-pink-500
                    hover:from-emerald-200 hover:to-cyan-400
                    transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_15px_0.5px]
                    hover:shadow-sky-300
                    hover:text-cyan-950
                    hover:font-bold"
                onMouseEnter={() => setHoverLobo(true)}
                onMouseLeave={() => setHoverLobo(false)}
              >
                <img
                  src={hoverLobo ? "../../../../src/assets/home/images/lobinho_escuro.png" : "../../../../src/assets/home/images/lobinho.png"}
                  alt="Lobo uivando"
                  className="w-5 h-5 mr-0.5 mb-1 transition duration-300 ease-in-out"
                />
                <span className="relative z-10">Desperte o instinto</span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="px-6 py-3 border border-white text-white rounded-2xl font-semibold
                     hover:bg-white hover:text-black transition-all duration-300"
              >
                Conheça a Alcatteia
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute top-195 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[200%] h-[100px] -translate-x-1/4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradientWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D0843" />
              <stop offset="35%" stopColor="#2D0843" />
              <stop offset="75%" stopColor="#13182A" />
              <stop offset="100%" stopColor="#13182A" />


              {/* <stop offset="90%" stopColor="#2D0843" />
         
        <stop offset="90%" stopColor="#13182A" /> */}
            </linearGradient>
          </defs>
          <path
            fill="url(#gradientWave)"
            d="M0,224L48,197.3C96,171,192,117,288,122.7C384,128,480,192,576,218.7C672,245,768,235,864,213.3C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default MainSection;
