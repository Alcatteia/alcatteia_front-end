import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  STATUS_ORDER,
  STATUS_CONFIG,
  AVATAR_COLORS
} from '../../../constants/kanban';
import {
  FiX,
  FiClock,
  FiUserPlus,
  FiCheck,
  FiTrash2,
  FiPlus
} from 'react-icons/fi';

// Simulação de chamada ao backend
const fetchUsers = async () => {
  return [
    { id: '1', name: 'Gabriel Cabral' },
    { id: '2', name: 'Larissa Costa' },
    { id: '3', name: 'Carlos Henrique' },
    { id: '4', name: 'Talita Souza' },
    { id: '5', name: 'Isabelle Gomes' }
  ];
};

export default function TaskModal({ task, isOpen, onClose, onSave, onDelete }) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setEditedTask({
      ...task,
      participants: Array.isArray(task.participants)
        ? task.participants
        : task.participants
          ? [task.participants]
          : []
    });
  }, [task]);

  const participants = editedTask.participants || [];
  const isAssigned = participants.includes('Você');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (e) => {
    setEditedTask((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleDelete = () => {
    onDelete(editedTask.id);
    onClose();
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const handleParticipate = () => {
    if (!isAssigned) {
      setEditedTask((prev) => ({
        ...prev,
        participants: [...prev.participants, 'Você']
      }));
    }
  };

  const toggleUser = (userName) => {
    setEditedTask((prev) => {
      const alreadyAssigned = prev.participants.includes(userName);
      return {
        ...prev,
        participants: alreadyAssigned
          ? prev.participants.filter((u) => u !== userName)
          : [...prev.participants, userName]
      };
    });
    setDropdownOpen(false);
  };

  const renderAvatars = () =>
    participants.map((user, i) => {
      const initials = user
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

      const bgColor = AVATAR_COLORS[i % AVATAR_COLORS.length];

      return (
        <div
          key={user}
          className="flex items-center gap-2 bg-[#2A1C3A] border border-gray-600 rounded-full px-3 py-1 text-white text-sm"
        >
          <div
            className="w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
          <span>{user}</span>
          <button
            onClick={() => toggleUser(user)}
            className="ml-1 text-red-400 hover:text-red-500 text-xs"
            title="Remover"
          >
            &times;
          </button>
        </div>
      );
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1F152D] w-full max-w-xl rounded-xl p-6 border border-[#3A2C4A] text-white relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>

        {/* TÍTULO */}
        <div className="mb-4">
          <label htmlFor="title" className="text-sm text-gray-300 mb-1 block">Título</label>
          <input
            id="title"
            type="text"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full bg-[#2A1C3A] text-white rounded-md px-3 py-2 border border-[#3A2C4A] focus:border-yellow-400"
          />
        </div>

        {/* DESCRIÇÃO */}
        <div className="mb-4">
          <label htmlFor="description" className="text-sm text-gray-300 mb-1 block">Descrição</label>
          <textarea
            id="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full bg-[#2A1C3A] text-white rounded-md px-3 py-2 border border-[#3A2C4A] focus:border-yellow-400"
            rows={3}
          />
        </div>

        {/* STATUS + DATA */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="w-1/2">
            <label htmlFor="status" className="text-sm text-gray-300 block mb-1">Status</label>
            <select
              id="status"
              value={editedTask.status}
              onChange={handleStatusChange}
              className="bg-[#2A1C3A] text-white border border-[#3A2C4A] px-3 py-2 rounded-md w-full"
            >
              {STATUS_ORDER.map((statusKey) => (
                <option key={statusKey} value={statusKey}>
                  {STATUS_CONFIG[statusKey]?.label || statusKey}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="text-sm text-gray-300 block mb-1">Data de Entrega</label>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FiClock className="text-gray-400" />
              {editedTask.dueDate
                ? format(new Date(editedTask.dueDate), "dd 'de' MMMM", { locale: ptBR })
                : 'Sem data'}
            </div>
          </div>
        </div>

        {/* PARTICIPANTES */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-1">Participantes</label>
          <div className="flex flex-wrap gap-2 mb-2">{renderAvatars()}</div>
          {/* PROGRESSO */}
          <div className="mb-4">
            <label htmlFor="progress" className="text-sm text-gray-300 block mb-1">Progresso</label>
            <div className="flex items-center gap-4">
              <input
                id="progress"
                type="range"
                min="0"
                max="100"
                step="1"
                value={editedTask.progress || 0}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setEditedTask((prev) => ({
                    ...prev,
                    progress: value,
                    status: value >= 100 ? 'done' : prev.status
                  }));
                }}
                className="w-full h-2 bg-[#3A2C4A] rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <span className="w-12 text-sm text-right text-gray-300">
                {editedTask.progress || 0}%
              </span>
            </div>
          </div>


          {/* Dropdown para adicionar */}
          <div className="relative w-full max-w-full">


            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1 bg-[#2A1C3A] border border-gray-600 text-white rounded-full text-sm hover:bg-yellow-400 hover:text-black"
            >
              <FiPlus /> Adicionar Participante
            </button>
            {dropdownOpen && (
  <div className="absolute left-0 right-0 bottom-full mb-2 z-50 bg-[#1F152D] border border-[#3A2C4A] rounded-lg shadow-xl p-2 max-h-60 overflow-auto">


                {users.map((user, index) => {
                  const initials = user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase();
                  const bgColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
                  return (
                    <button
                      key={user.id}
                      onClick={() => toggleUser(user.name)}
                      className="flex items-center gap-2 w-full px-3 py-1 hover:bg-[#2A1C3A] rounded-md text-left text-sm"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        style={{ backgroundColor: bgColor }}
                      >
                        {initials}
                      </div>
                      <span>{user.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm flex items-center gap-1"
          >
            <FiTrash2 /> Deletar
          </button>

          <div className="flex gap-2">
            {!isAssigned && (
              <button
                onClick={handleParticipate}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm flex items-center gap-1"
              >
                <FiUserPlus /> Participar
              </button>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm flex items-center gap-1"
            >
              <FiCheck /> Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

TaskModal.propTypes = {
  task: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
