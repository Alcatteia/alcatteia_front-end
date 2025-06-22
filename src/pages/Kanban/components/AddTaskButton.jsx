import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiPlus, FiX } from 'react-icons/fi';
import { KanbanContext } from '../../../contexts/KanbanContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

// Cores dos avatares
const AVATAR_COLORS = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#9D4EDD'];

// Simulação de usuários (substitua pelo back-end futuramente)
const users = [
  { id: 1, name: 'Gabriel Cabral' },
  { id: 2, name: 'Ana Costa' },
  { id: 3, name: 'Bruno Lima' },
  { id: 4, name: 'Carla Mendes' },
  { id: 5, name: 'Diego Alves' }
];

export default function AddTaskButton({ status, category }) {
  const { addTask, teamMembers } = useContext(KanbanContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    participants: [],
    dueDate: '',
    progress: 0
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleUser = (userName) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.includes(userName)
        ? prev.participants.filter((u) => u !== userName)
        : [...prev.participants, userName]
    }));
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTask(category, {
        ...formData,
        participants: formData.participants,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
        status
      });
      setFormData({
        title: '',
        description: '',
        participants: [],
        dueDate: '',
        progress: 0
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black w-full py-2 rounded-lg font-semibold transition-colors duration-200"
      >
        + Adicionar tarefa
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2A1C3A] rounded-xl p-6 w-full max-w-md border border-[#3A2C4A]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Nova Tarefa</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Título *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#1F152D] text-white rounded-lg px-4 py-2 border border-[#3A2C4A] focus:border-yellow-400"
                  placeholder="Nome da tarefa"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#1F152D] text-white rounded-lg px-4 py-2 border border-[#3A2C4A] focus:border-yellow-400"
                  placeholder="Detalhes da tarefa..."
                />
              </div>

              {/* Responsáveis */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Responsáveis</label>

                {/* Avatares dos selecionados */}
                {formData.participants.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.participants.map((name) => {
                      const bgColor = AVATAR_COLORS[name.length % AVATAR_COLORS.length];
                      return (
                        <div
                          key={name}
                          className="flex items-center gap-2 bg-[#1F152D] border border-[#3A2C4A] rounded-full px-3 py-1"
                        >
                          <div
                            className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: bgColor }}
                          >
                            {getInitials(name)}
                          </div>
                          <span className="text-sm text-white">{name}</span>
                          <button
                            onClick={() => toggleUser(name)}
                            className="text-gray-400 hover:text-red-400"
                            title="Remover"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Botão e Dropdown acima */}
                <div className="relative">
                  <div className="flex justify-start mb-1">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#1F152D] border border-[#3A2C4A] rounded-full text-sm text-white hover:bg-yellow-400 hover:text-black transition"
                    >
                      <FiPlus /> Adicionar responsável
                    </button>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute bottom-12 left-0 z-50 w-full max-h-60 overflow-auto bg-[#1F152D] border border-[#3A2C4A] rounded-lg shadow-lg">
                      {users.map((user) => {
                        const initials = getInitials(user.name);
                        const bgColor = AVATAR_COLORS[user.id % AVATAR_COLORS.length];
                        return (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => {
                              toggleUser(user.name);
                              setDropdownOpen(false); // Fecha o modal ao escolher participante
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-[#2A1C3A] text-sm text-white"
                          >
                            <div
                              className="w-6 h-6 flex items-center justify-center rounded-full text-xs text-white"
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

              {/* Data de entrega */}
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
                  Data de Entrega
                </label>
                <div className="relative">
                  <DatePicker
                    selected={
                      formData.dueDate ? new Date(formData.dueDate) : null
                    }
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, dueDate: date }))
                    }
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data"
                    className="w-full bg-[#1F152D] text-white rounded-lg px-4 py-2 border border-[#3A2C4A] focus:border-yellow-400"
                    minDate={new Date()}
                    calendarClassName="bg-[#2A1C3A] text-white border border-[#3A2C4A]"
                    showPopperArrow={false}
                  />
                  <div className="absolute top-2 right-4 text-gray-400 pointer-events-none">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#3A2C4A] hover:bg-[#4A3C5A] text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-medium"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

AddTaskButton.propTypes = {
  status: PropTypes.oneOf(['todo', 'doing', 'done']).isRequired,
  category: PropTypes.string.isRequired
};
