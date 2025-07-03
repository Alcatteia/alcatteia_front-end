import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiPlus, FiX } from 'react-icons/fi';
import { KanbanContext } from '../../../contexts/KanbanContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

const AVATAR_COLORS = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#9D4EDD'];

const users = [
  { id: 1, name: 'Gabriel Cabral' },
  { id: 2, name: 'Ana Costa' },
  { id: 3, name: 'Bruno Lima' },
  { id: 4, name: 'Carla Mendes' },
  { id: 5, name: 'Diego Alves' }
];

// ...imports e configurações permanecem iguais...

export default function AddTaskButton({ status, category }) {
  const { addTask } = useContext(KanbanContext);
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
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        status
      });
      setFormData({ title: '', description: '', participants: [], dueDate: '', progress: 0 });
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-start lg:justify-center z-50 p-4 overflow-y-auto">
          <div className="mt-10 bg-[#2A1C3A] rounded-xl p-6 w-full max-w-[90vw] sm:max-w-md border border-[#3A2C4A] shadow-xl">
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
              {/* Título */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm text-gray-300 mb-1">Título *</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#1F152D] text-white rounded-lg px-4 py-2 border border-[#3A2C4A] focus:border-yellow-400 focus:outline-none"
                  placeholder="Nome da tarefa"
                  required
                  autoFocus
                />
              </div>

              {/* Descrição */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm text-gray-300 mb-1">Descrição</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#1F152D] text-white rounded-lg px-4 py-2 border border-[#3A2C4A] focus:border-yellow-400 focus:outline-none"
                  placeholder="Detalhes da tarefa..."
                />
              </div>

              {/* Participantes */}
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Responsáveis</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.participants.map((name) => {
                    const bgColor = AVATAR_COLORS[name.length % AVATAR_COLORS.length];
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-2 bg-[#1F152D] border border-[#3A2C4A] rounded-full px-3 py-1 text-white text-sm max-w-full"
                      >
                        <div
                          className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: bgColor }}
                        >
                          {getInitials(name)}
                        </div>
                        <span className="truncate max-w-[100px] min-w-0">{name}</span>
                        <button
                          onClick={() => toggleUser(name)}
                          className="text-red-400 hover:text-red-500 text-xs"
                          title="Remover"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Dropdown */}
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-1 px-3 py-1 bg-[#1F152D] border border-[#3A2C4A] rounded-full text-sm text-white hover:bg-yellow-400 hover:text-black transition"
                  >
                    <FiPlus /> Adicionar responsável
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-50 mt-2 w-full max-w-[90vw] bg-[#1F152D] border border-[#3A2C4A] rounded-lg shadow-lg max-h-60 overflow-auto">
                      {users.map((user) => {
                        const initials = getInitials(user.name);
                        const bgColor = AVATAR_COLORS[user.id % AVATAR_COLORS.length];
                        return (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => {
                              toggleUser(user.name);
                              setDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-[#2A1C3A] text-sm text-white"
                          >
                            <div
                              className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold"
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

              {/* Data de Entrega */}
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm text-gray-300 mb-1">Data de Entrega</label>
                <div className="relative">
                  <DatePicker
                    selected={formData.dueDate ? new Date(formData.dueDate) : null}
                    onChange={(date) => setFormData((prev) => ({ ...prev, dueDate: date }))}
                    locale="pt-BR"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecione a data"
                    className="w-full bg-[#1F152D] text-white rounded-lg px-4 py-2 border border-[#3A2C4A] focus:border-yellow-400 focus:outline-none"
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
