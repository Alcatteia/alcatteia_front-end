import React from 'react';
import { FiUser } from 'react-icons/fi';

export default function MemberProfileCard({ member }) {
  if (!member) {
    return (
      <div className="bg-[#18162a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[130px] border border-gray-700">
        <FiUser className="w-10 h-10 text-gray-400" />
        <h3 className="text-xl font-bold text-white">Carregando Perfil...</h3>
        <p className="text-gray-400">Dados do membro não disponíveis.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#18162a] rounded-xl shadow-lg p-6 flex flex-col items-start justify-center space-y-1 min-h-[130px] border border-red-500">
      <div className="flex items-center gap-3 w-full">
        <FiUser className="w-7 h-7 text-red-400" />
        <h3 className="text-xl font-bold text-white flex-grow text-left">{member.name}</h3>
      </div>
      <p className="text-lg text-gray-400 ml-[calc(1.75rem+0.75rem)]">{member.role}</p>
    </div>
  );
}