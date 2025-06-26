import React, { useEffect, useState } from 'react';
import { useCheck } from '../../../context/CheckContext';
import contenteImg from '../../../assets/Ckeck-in/image/motivado.png';
import motivadoImg from '../../../assets/Ckeck-in/image/animado.png';
import calmoImg from '../../../assets/Ckeck-in/image/calmo.png';
import desanimadoImg from '../../../assets/Ckeck-in/image/desanimado.png';
import estressadoImg from '../../../assets/Ckeck-in/image/estressado.png';

const moods = [
  { label: "Contente", img: contenteImg },
  { label: "Motivado(a)", img:motivadoImg },
  { label: "Calmo(a)", img: calmoImg },
  { label: "Desanimado(a)", img: desanimadoImg },
  { label: "Estressado(a)", img: estressadoImg },
];

export default function MoodSelector() {
  const { user, checkinMood } = useCheck();
  const [selected, setSelected] = useState(null);
  const [blockUntil, setBlockUntil] = useState(null);
  const [countdown, setCountdown] = useState('');

  // Verifica bloqueio salvo localmente
  useEffect(() => {
    const stored = localStorage.getItem('checkin_block_until');
    if (stored) {
      const blockTime = new Date(stored);
      if (blockTime > new Date()) {
        setBlockUntil(blockTime);
      }
    }
  }, []);

  //  Atualiza contador regressivo
  useEffect(() => {
    if (!blockUntil) return;
    const interval = setInterval(() => {
      const now = new Date();
      const diff = blockUntil - now;
      if (diff <= 0) {
        setBlockUntil(null);
        localStorage.removeItem('checkin_block_until');
        clearInterval(interval);
      } else {
        const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [blockUntil]);

  const handleMoodSelect = async (label) => {
    setSelected(label);

    try {
      await checkinMood(label); // Salva humor no back-end
    } catch (err) {
      console.error("Erro ao salvar humor:", err);
    }

    // BLOQUEIO POR 20 HORAS mas atualize esta com 30 segundos
    const unblockTime = new Date(Date.now() + 0.01 * 60 * 60 * 1000);
    setBlockUntil(unblockTime);
    localStorage.setItem('checkin_block_until', unblockTime.toISOString());
  };

  //  BLOQUEIO se estiver dentro das 20h, mostra a mensagem
  if (blockUntil) {
    return (
       <div className="w-full text-center text-white mt-6">
      <div className="flex justify-center mb-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#00e0ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-lg md:text-xl font-semibold">Check-in realizado!</p>
      <p className="text-sm md:text-base mt-1">Retorne em:</p>
      <div className="text-2xl md:text-3xl font-bold mt-2 text-purple-300 tracking-wide">{countdown}</div>
    </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-4 w-full justify-center items-center">
      {moods.map((mood, index) => {
        const isSelected = selected === mood.label;

        return (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            className={`
              relative flex flex-col items-center justify-center
              flex-1 w-full h-[120px] sm:h-[180px]
              bg-[#1F152D] rounded-xl border transition-all duration-300
              ${isSelected ? 'scale-105 shadow-[0_0_18px_2px_rgba(0,224,255,0.5)]' : 'hover:shadow-[0_0_10px_1px_rgba(0,224,255,0.4)]'}
              ${isSelected ? '' : 'hover:scale-105'}
            `}
            style={{
              borderColor: isSelected ? user.color : 'transparent',
              minWidth: 0,
            }}
          >
            <img src={mood.img} alt={mood.label} className="w-15 h-15 sm:w-20 sm:h-20 mb-2 z-10" />
            <span className="text-[10px] sm:text-[18px] text-white z-10">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
}
