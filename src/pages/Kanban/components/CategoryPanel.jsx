import { useContext, useState } from 'react';
import { KanbanContext } from '../../../contexts/KanbanContext';
import KanbanBoard from './KanbanBoard';
import { FiChevronDown, FiChevronRight, FiPlus, FiTrash } from 'react-icons/fi';

export default function CategoryPanel() {
  const { categories, addCategory, deleteCategory, receiveParticipationRequest } = useContext(KanbanContext);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleToggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleAddCategory = () => {
    const title = newCategoryTitle.trim();
    if (title) {
      addCategory(title);
      setNewCategoryTitle('');
      setIsAdding(false);
    }
  };

  const confirmDelete = (id) => {
    setCategoryToDelete(id);
  };

  const handleDeleteConfirmed = () => {
    deleteCategory(categoryToDelete);
    setCategoryToDelete(null);
    if (expandedCategory === categoryToDelete) {
      setExpandedCategory(null);
    }
  };

  const handleParticipate = (taskId) => {
    receiveParticipationRequest('SeuNome', taskId); // Substitua por usuário real
  };

  return (
    <div className="space-y-8 text-white">
      {/* Header + botão adicionar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">Categorias</h2>
        <button
          onClick={() => setIsAdding(prev => !prev)}
          className="flex items-center justify-center bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition w-full sm:w-auto max-w-xs"
        >
          <FiPlus className="mr-2" />
          Adicionar Categoria
        </button>
      </div>

      {/* Formulário de nova categoria */}
      {isAdding && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <input
            type="text"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            placeholder="Nome da nova categoria"
            className="flex-1 bg-[#1F152D] border border-gray-600 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 transition font-medium w-full sm:w-auto max-w-xs"
            disabled={!newCategoryTitle.trim()}
          >
            Criar
          </button>
        </div>
      )}

      {/* Lista de Categorias */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#2A1C3A] border border-[#3A2C4A] rounded-xl overflow-hidden">
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-[#352445] transition"
              onClick={() => handleToggleCategory(cat.id)}
            >
              <div className="flex flex-wrap items-center gap-2 text-lg font-bold">
                {expandedCategory === cat.id ? <FiChevronDown /> : <FiChevronRight />}
                {cat.title}
                <span
                  title="Número de tarefas a fazer"
                  className="ml-3 bg-stone-600 text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  {cat.columns.todo.length}
                </span>
              </div>
              <button
                aria-label="Excluir categoria"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(cat.id);
                }}
                className="text-red-400 hover:text-red-300 transition"
              >
                <FiTrash />
              </button>
            </div>

            {/* Conteúdo expandido com correção de overflow horizontal */}
            {expandedCategory === cat.id && (
              <div className="p-4 pt-0 overflow-x-auto w-full">
                <div className="min-w-[360px] sm:min-w-full">
                  <KanbanBoard category={cat} onParticipate={handleParticipate} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de exclusão */}
      {categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A1C3A] p-6 rounded-lg border border-[#3A2C4A] w-full max-w-xs sm:max-w-md text-center text-sm">
            <h4 className="text-lg font-semibold mb-4">Confirmar Exclusão</h4>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir esta categoria? Essa ação não poderá ser desfeita.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

