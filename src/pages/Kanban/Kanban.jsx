import { useMemo, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KanbanContext } from '../../contexts/KanbanContext';
import CategoryPanel from './components/CategoryPanel';
import NotificationModal from './components/NotificationModal';

export default function Kanban() {
  const backend = useMemo(() => HTML5Backend, []);

  // Acessa o contexto já fornecido pelo KanbanProvider EXTERNO
  const {
    participationRequests = [],
    acceptParticipation,
    rejectParticipation
  } = useContext(KanbanContext) || {};

  const currentRequest = participationRequests[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DndProvider backend={backend}>
      {currentRequest && (
        <NotificationModal
          requester={currentRequest.requester}
          onAccept={() => acceptParticipation(currentRequest.taskId, currentRequest.requester)}
          onReject={() => rejectParticipation(currentRequest.taskId, currentRequest.requester)}
        />
      )}

      <div className="flex h-screen text-white overflow-hidden">
        {/* <Sidebar /> */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:px-16 xl:pr-5 pb-6 overflow-auto scrollbar-thin scrollbar-thumb-[#2D1B4F] scrollbar-track-transparent">
            <CategoryPanel />
          </main>
        </div>
      </div>
    </DndProvider>
  );
}
