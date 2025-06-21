import { FiCheckCircle } from 'react-icons/fi';

export const STATUS_CONFIG = {
  todo: {
    label: 'A Fazer',
    color: 'border-blue-400',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-100',
    icon: null,
    nextStatus: 'doing',
    borderHex: '#EF4707'
  },
  doing: {
    label: 'Em Progresso',
    color: 'border-yellow-500',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-100',
    icon: null,
    nextStatus: 'done',
    prevStatus: 'todo',
    borderHex: '#2889FF'
  },
  done: {
    label: 'Concluído',
    color: 'border-green-500',
    bgColor: 'bg-green-500',
    textColor: 'text-green-100',
    icon: <FiCheckCircle className="text-green-400" />,
    prevStatus: 'doing',
    borderHex: '#00BE63'
  }
};

/**
 * Ordem de exibição das colunas no Kanban
 * @type {Array<string>}
 */
export const STATUS_ORDER = ['todo', 'doing', 'done'];

/**
 * Prioridades disponíveis para tarefas
 * @type {Object}
 */
export const PRIORITY_CONFIG = {
  low: {
    label: 'Baixa',
    color: 'border-gray-400',
    bgColor: 'bg-gray-400',
    textColor: 'text-gray-800',
    icon: '⬇️'
  },
  medium: {
    label: 'Média',
    color: 'border-yellow-400',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-800',
    icon: '➡️'
  },
  high: {
    label: 'Alta',
    color: 'border-red-500',
    bgColor: 'bg-red-500',
    textColor: 'text-red-100',
    icon: '⬆️'
  }
};

/**
 * Tipos de itens para drag and drop
 * @type {Object}
 */
export const ITEM_TYPES = {
  TASK: 'task',
  CATEGORY: 'category'
};

/**
 * Configurações padrão para novas tarefas
 * @type {Object}
 */
export const DEFAULT_TASK = {
  id: '', // Será gerado automaticamente
  title: 'Nova Tarefa',
  description: '',
  status: 'todo',
  priority: 'medium',
  progress: 0,
  dueDate: null,
  assignedTo: null,
  comments: [],
  createdAt: new Date(),
  category: 'default'
};

/**
 * Configurações padrão para novas categorias
 * @type {Object}
 */
export const DEFAULT_CATEGORY = {
  id: '', // Será gerado automaticamente
  name: 'Nova Categoria',
  color: '#3B82F6', // Cor azul padrão
  isOpen: true
};

/**
 * Cores disponíveis para atribuição aleatória
 * @type {Array<string>}
 */
export const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F06292', '#7986CB', '#9575CD',
  '#64B5F6', '#4DB6AC', '#81C784', '#FFD54F',
  '#FF8A65', '#A1887F', '#90A4AE', '#8D6E63'
];

/**
 * Tipos de ação para histórico/undo
 * @type {Object}
 */
export const ACTION_TYPES = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
  ADD_CATEGORY: 'ADD_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  TOGGLE_CATEGORY: 'TOGGLE_CATEGORY'
};

/**
 * Filtros disponíveis para tarefas
 * @type {Object}
 */
export const FILTER_OPTIONS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
  HIGH_PRIORITY: 'high'
};

/**
 * Configuração inicial do Kanban
 * @type {Object}
 */
export const INITIAL_KANBAN_STATE = {
  tasks: [],
  categories: [],
  currentFilter: FILTER_OPTIONS.ALL,
  history: [],
  historyIndex: -1
};

// Exportação padrão para compatibilidade
export default {
  STATUS_CONFIG,
  STATUS_ORDER,
  PRIORITY_CONFIG,
  ITEM_TYPES,
  DEFAULT_TASK,
  DEFAULT_CATEGORY,
  AVATAR_COLORS,
  ACTION_TYPES,
  FILTER_OPTIONS,
  INITIAL_KANBAN_STATE
};