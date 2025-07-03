import React, { useState } from 'react';
import { useCheck } from '../../context/CheckContext';
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import MoodSelector from "./components/MoodSelector";
import MessageInput from "./components/MessageInput";
import QuickMessages from "./components/QuickMessages";
import lupinImg from '../../assets/Ckeck-in/image/mascote.png';

export default function Check() {
  const [participationRequests, setParticipationRequests] = useState([]);
  const { user, messages, sendMessage } = useCheck();

  const handleAccept = (taskId, requester) => {
    setParticipationRequests((prev) =>
      prev.filter((req) => req.taskId !== taskId || req.requester !== requester)
    );
  };

  const handleReject = (taskId, requester) => {
    setParticipationRequests((prev) =>
      prev.filter((req) => req.taskId !== taskId || req.requester !== requester)
    );
  };

  function getDataAtualBR() {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className="flex h-screen  bg-[#1d142e] pt-6 pb-32  text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1  md:p-8 overflow-y-auto flex justify-center">
          <div className="w-full max-w-[1100px]">

            {/* Saudação com mascote */}
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4 mb-8">
              <img src={lupinImg} alt="Mascote" className="w-35 md:w-40 md:mr-4" />
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-2xl md:text-3xl font-semibold">
                  Olá <span style={{ color: user.color }}>{user.name}</span>, como você está hoje?
                </h1>
                <p className="text-sm text-gray-300 mt-1">{getDataAtualBR()}</p>
              </div>
            </div>

            {/* Emoções */}
            <div className="relative w-full h-40 sm:h-60 flex flex-row items-center justify-center">
              <MoodSelector userHighlightColor={user.color} />
            </div>

            {/* Mensagens e Recados */}
            <div className="relative w-full h-40 sm:h-60 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MessageInput />
              <QuickMessages messages={messages} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
