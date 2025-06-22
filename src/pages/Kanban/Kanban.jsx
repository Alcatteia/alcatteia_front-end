import { useMemo, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import KanbanProvider, { KanbanContext } from '../../contexts/KanbanContext';
import { AuthProviderKanban, useAuthKanban } from '../../contexts/AuthContextKanban';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import CategoryPanel from './components/CategoryPanel';
import NotificationModal from './components/NotificationModal';

// Detecta se é um dispositivo touch
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default function Kanban() {
  const backend = useMemo(() => {
    return isTouchDevice() ? HTML5Backend : HTML5Backend;
  }, []);
  
  console.log('Usando backend:', backend);
  console.log('Dispositivo touch:', isTouchDevice()); 

  // Consome o contexto para notificações
  const {
    participationRequests = [],
    acceptParticipation,
    rejectParticipation
  } = useContext(KanbanContext) || {};

  const currentRequest = participationRequests[0];

  return (
    <KanbanProvider>
      <DndProvider backend={backend}>
        {/* Notificação de pedido de participação */}
        {currentRequest && (
          <NotificationModal
            requester={currentRequest.requester}
            onAccept={() => acceptParticipation(currentRequest.taskId, currentRequest.requester)}
            onReject={() => rejectParticipation(currentRequest.taskId, currentRequest.requester)}
          />
        )}
        <div className="flex h-screen bg-[#160F23] text-white overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Topbar
              participationRequests={participationRequests}
              acceptParticipation={acceptParticipation}
              rejectParticipation={rejectParticipation}
            />
            <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-[#2D1B4F] scrollbar-track-transparent">
              <CategoryPanel />
            </main>
          </div>
        </div>
      </DndProvider>
    </KanbanProvider>
  );
}
