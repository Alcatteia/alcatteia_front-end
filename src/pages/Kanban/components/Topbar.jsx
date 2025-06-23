import { FiBell, FiMoon, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import NotificationModal from './NotificationModal';

export default function Topbar({ participationRequests = [], acceptParticipation, rejectParticipation }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const hasRequests = participationRequests.length > 0;
  const currentRequest = participationRequests[0];

  return (
    <header className="sticky top-0 z-10 bg-[#160F23]/90 flex justify-end border-b-4 border-[#220731] items-center p-4 backdrop-blur-md">
      {/* Controles do usuário */}
      <div className="flex gap-2 md:gap-4 items-center">
        {/* Notificações */}
        <button 
          className="p-2 rounded-full hover:bg-[#2A1C3A] transition-colors duration-200 relative"
          aria-label="Notificações"
          onClick={() => setShowNotification((prev) => !prev)}
        >
          <FiBell size={25} className="text-gray-300 hover:text-white" />
          {hasRequests && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#160F23]"></span>
          )}
        </button>

        {/* Modal de notificação */}
        {showNotification && hasRequests && currentRequest && (
          <NotificationModal
            requester={currentRequest.requester}
            onAccept={() => {
              acceptParticipation(currentRequest.taskId, currentRequest.requester);
              setShowNotification(false);
            }}
            onReject={() => {
              rejectParticipation(currentRequest.taskId, currentRequest.requester);
              setShowNotification(false);
            }}
          />
        )}
        {showNotification && !hasRequests && (
          <div className="absolute right-4 z-50 flex justify-end" style={{ top: 72 }}>
            <div className="bg-[#1F152D] p-6 rounded-lg border border-[#3A2C4A] w-full max-w-sm text-white relative shadow-xl mt-2">
              <h3 className="text-lg font-bold mb-4">Notificações</h3>
              <p className="mb-6">Nenhuma notificação no momento.</p>
            </div>
          </div>
        )}

        {/* Tema */}
        <button 
          className="p-2 rounded-full hover:bg-[#2A1C3A] transition-colors duration-200"
          aria-label="Alternar tema"
          onClick={() => {/* Lógica de tema */}}
        >
          <FiMoon size={25} className="text-gray-300 hover:text-white" />
        </button>

        {/* Avatar + Menu */}
        <div className="relative">
          <button 
            className="bg-purple-800 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:ring-2 hover:ring-purple-500 transition-all"
            aria-label="Menu do usuário"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FiUser size={26} />
          </button>
          {/* Menu dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#2A1C3A] rounded-md shadow-lg py-1 z-20 border border-[#3A2C4A]">
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3A2C4A] transition-colors">
                <FiUser size={14} /> Perfil
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3A2C4A] transition-colors">
                <FiSettings size={14} /> Configurações
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#3A2C4A] transition-colors">
                <FiLogOut size={14} /> Sair
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
