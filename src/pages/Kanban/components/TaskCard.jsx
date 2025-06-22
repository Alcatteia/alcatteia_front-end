import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FiClock,
  FiCheckCircle,
  FiMoreVertical,
  FiTrash2,
  FiX
} from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { ITEM_TYPES } from '../../../constants/kanban';

export default function TaskCard({ task, categoryId, onClick, onDelete, onParticipate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), "dd 'de' MMMM", { locale: ptBR })
    : null;

  // Se a tarefa estiver concluída, a barra de progresso é 100%
  const progress = task.status === 'done' ? 100 : (task.progress ?? 0);

  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPES.TASK,
    item: { id: task.id, status: task.status, categoryId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const getColorClasses = (status) => {
    switch (status) {
      case 'todo':
        return {
          bg: 'bg-[#3C1F24]',
          border: 'border-orange-500',
          accent: 'bg-orange-400',
          text: 'text-orange-400',
          hover: 'hover:bg-[rgba(239,71,7,0.75)]'
        };
      case 'doing':
        return {
          bg: 'bg-[#1F2C3C]',
          border: 'border-blue-500',
          accent: 'bg-blue-400',
          text: 'text-blue-400',
          hover: 'hover:bg-[rgba(40,137,255,0.75)]'
        };
      case 'done':
        return {
          bg: 'bg-[#1F3C2C]',
          border: 'border-green-500',
          accent: 'bg-green-400',
          text: 'text-green-400',
          hover: 'hover:bg-[rgba(0,190,99,0.75)]'
        };
      default:
        return {
          bg: 'bg-[#2A1C3A]',
          border: 'border-gray-500',
          accent: 'bg-gray-400',
          text: 'text-white',
          hover: 'hover:bg-gray-600'
        };
    }
  };

  const { bg, border, accent, text, hover } = getColorClasses(task.status);

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const participants = Array.isArray(task.participants) ? task.participants : [];

  const visibleParticipants = participants.slice(0, 3);
  const extraCount = participants.length > 3 ? participants.length - 3 : 0;

  // Verifica se a tarefa está atrasada
  const isLate =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'done';

  return (
    <>
      <div
        ref={dragRef}
        onClick={onClick}
        role="button"
        tabIndex={0}
        className={`relative rounded-xl p-4 shadow-md cursor-pointer transition duration-200 border-l-4 ${bg} ${border} ${
          isDragging ? 'opacity-40' : 'hover:brightness-110'
        }`}
      >
        {/* Menu de opções */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {task.status === 'done' ? (
            <FiCheckCircle className="text-green-400" />
          ) : (
            <FaPaw className={`${text}`} />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className={`p-1 rounded-full transition-colors duration-200 ${hover}`}
          >
            <FiMoreVertical className="text-white" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 w-40 bg-[#1F152D] border border-gray-600 rounded-lg shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setConfirmDelete(true);
                  setShowMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-[#2A1C3A] hover:text-red-500"
              >
                <FiTrash2 className="mr-2" /> Deletar Tarefa
              </button>
            </div>
          )}
        </div>

        <h4 className="text-md font-semibold mb-2 text-white">{task.title}</h4>

        {formattedDate && (
          <div className={`flex items-center text-sm mb-3 ${isLate ? 'text-red-500' : 'text-gray-400'}`}>
            <FiClock className={`mr-1 ${isLate ? 'text-red-500' : ''}`} />
            Entrega: {formattedDate}
          </div>
        )}

        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className={`${accent} h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex -space-x-2">
            {visibleParticipants.map((name) => (
              <div
                key={name}
                className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center text-xs font-bold border-2 border-white"
                title={name}
              >
                {getInitials(name)}
              </div>
            ))}
            {extraCount > 0 && (
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-black/80 to-black/40 text-white text-xs font-bold flex items-center justify-center border-2 border-white"
                title={`+${extraCount} participantes`}
              >
                +{extraCount}
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onParticipate(task.id);
            }}
            className={`${accent} text-xs text-black font-bold px-3 py-1 rounded-full hover:scale-105 transition`}
          >
            Participar
          </button>
        </div>
      </div>

      {/* Modal de confirmação */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1F152D] p-6 rounded-lg border border-[#3A2C4A] w-full max-w-sm text-white relative shadow-xl">
            <button
              onClick={() => setConfirmDelete(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FiX />
            </button>
            <h3 className="text-lg font-bold mb-4">Confirmar Exclusão</h3>
            <p className="mb-6">
              Deseja realmente deletar a tarefa <strong>{task.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDelete(categoryId, task.id);
                  setConfirmDelete(false);
                }}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

TaskCard.propTypes = {
  categoryId: PropTypes.string.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    assignedTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    dueDate: PropTypes.string,
    progress: PropTypes.number,
    status: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onParticipate: PropTypes.func.isRequired
};
