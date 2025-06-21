import { useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiPlus, FiUser, FiCalendar } from 'react-icons/fi';
import { KanbanContext } from '../../../contexts/KanbanContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBR);

export default function AddTaskModal({ onClose, status, category, initialParticipants = [] }) {
  const { addTask, teamMembers } = useContext(KanbanContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    participants: initialParticipants,
    dueDate: null,
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  // Permitir múltiplos participantes e mostrar todos já selecionados
  useEffect(() => {
    if (teamMembers?.length > 0 && formData.participants.length === 0) {
      setFormData(prev => ({ ...prev, participants: [teamMembers[0].name] }));
    }
  }, [teamMembers]);

  // Atualiza participantes se initialParticipants mudar APENAS na montagem
  useEffect(() => {
    setFormData(prev => ({ ...prev, participants: initialParticipants }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      await addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        participants: formData.participants,
        dueDate: formData.dueDate,
        priority: formData.priority,
        status,
        category,
        progress: 0,
        comments: []
      });
      onClose();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, status, category, isFormValid, addTask, onClose]);

  const isDateValid = !formData.dueDate || formData.dueDate >= new Date();
  const isFormValid = formData.title.trim() && isDateValid;
  const selectedMember = teamMembers?.find(m => formData.participants[0] === m.name);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#1F152D] rounded-xl p-6 w-full max-w-md border border-[#3A2C4A]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Nova Tarefa</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Título *</label>
            <input
              type="text"
              placeholder="Nome da tarefa"
              className="w-full bg-[#2A1C3A] text-white p-2 rounded-lg border border-[#3A2C4A] focus:ring-1 focus:ring-purple-500 outline-none"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Descrição</label>
            <textarea
              placeholder="Detalhes da tarefa..."
              className="w-full bg-[#2A1C3A] text-white p-2 rounded-lg border border-[#3A2C4A] focus:ring-1 focus:ring-purple-500 outline-none min-h-[100px]"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 relative">
              <label className="block text-sm font-medium mb-1 text-gray-300">Participantes</label>
              {teamMembers?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.participants.map((name) => {
                    const member = teamMembers.find(m => m.name === name);
                    return (
                      <div key={name} className="flex items-center gap-2 bg-[#2A1C3A] border border-gray-600 rounded-full px-3 py-1 text-white text-sm">
                        {member?.avatar ? (
                          <img src={member.avatar} className="w-6 h-6 rounded-full" alt={member.name} />
                        ) : (
                          <FiUser className="text-gray-400" />
                        )}
                        <span>{name}</span>
                        <button
                          type="button"
                          className="ml-1 text-red-400 hover:text-red-500 text-xs"
                          onClick={() => handleChange('participants', formData.participants.filter(n => n !== name))}
                          title="Remover"
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1 bg-[#2A1C3A] border border-gray-600 text-white rounded-full text-sm hover:bg-yellow-400 hover:text-black"
                    onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                  >
                    <FiPlus /> Adicionar Participante
                  </button>
                </div>
              ) : null}
              {showMemberDropdown && teamMembers?.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-[#2A1C3A] rounded-lg shadow-lg border border-[#3A2C4A] max-h-60 overflow-y-auto">
                  {teamMembers.filter(m => !formData.participants.includes(m.name)).map(member => (
                    <button
                      key={member.id}
                      type="button"
                      className="w-full text-left p-2 hover:bg-[#3A2C4A] flex items-center gap-2"
                      onClick={() => {
                        handleChange('participants', [...formData.participants, member.name]);
                        setShowMemberDropdown(false);
                      }}
                    >
                      {member.avatar ? (
                        <img src={member.avatar} className="w-6 h-6 rounded-full" alt={member.name} />
                      ) : (
                        <FiUser className="text-gray-400" />
                      )}
                      <span>{member.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Prioridade</label>
              <select
                className="w-full bg-[#2A1C3A] text-white p-2 rounded-lg border border-[#3A2C4A] focus:ring-1 focus:ring-purple-500 outline-none"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Data de Entrega</label>
            <div className="relative">
              <DatePicker
                selected={formData.dueDate}
                onChange={(date) => handleChange('dueDate', date)}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                minDate={new Date()}
                className="w-full bg-[#2A1C3A] text-white p-2 rounded-lg border border-[#3A2C4A] focus:ring-1 focus:ring-purple-500 outline-none pl-10"
                placeholderText="Selecione uma data"
                isClearable
              />
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            </div>
            {!isDateValid && (
              <p className="text-red-400 text-xs mt-1">A data deve ser futura</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#3A2C4A]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#3A2C4A] hover:bg-[#4A3C5A] text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">↻</span>
                  Criando...
                </>
              ) : (
                <>
                  <FiPlus />
                  Criar Tarefa
                </>
              )}
            </button>
          </div>
        </ form>
      </ div>
    </ div>
  );
}

AddTaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['todo', 'doing', 'done']).isRequired,
  category: PropTypes.string.isRequired,
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  )
};

AddTaskModal.defaultProps = {
  teamMembers: []
};
