import axios from 'axios';

const API_BASE = 'http://localhost:8080'; // URL base do backend

// 🔹 CATEGORIAS
export const getCategories = () => axios.get(`${API_BASE}/kanbancategorias`);

export const createCategory = (categoryData) =>
  axios.post(`${API_BASE}/kanbancategorias`, {
    nome: categoryData.title,
    descricao: categoryData.description || '',
    cor: categoryData.color || '#000000',
    ordem: categoryData.order || 0,
    usuarioId: categoryData.usuarioId || 'mockUser',
    timeId: categoryData.timeId || 'mockTime'
  });

export const deleteCategory = (id) =>
  axios.delete(`${API_BASE}/kanbancategorias/${id}`);

export const updateCategory = (id, categoryData) =>
  axios.put(`${API_BASE}/kanbancategorias/${id}`, {
    nome: categoryData.title || categoryData.nome,
    descricao: categoryData.description || categoryData.descricao,
    cor: categoryData.color || categoryData.cor,
    ordem: categoryData.order || categoryData.ordem,
    usuarioId: categoryData.usuarioId,
    timeId: categoryData.timeId
  });

// 🔹 TAREFAS
export const getTasks = () => axios.get(`${API_BASE}/api/tarefas`);

export const createTask = (taskData) =>
  axios.post(`${API_BASE}/api/tarefas`, {
    titulo: taskData.title,
    descricao: taskData.description,
    categoriaId: taskData.categoryId,
    responsavelId: taskData.responsavelId || 'mockUser',
    dataEntrega: taskData.dueDate || null,
    prioridade: taskData.priority || 'normal',
    status: taskData.status || 'TODO'
  });

export const deleteTask = (taskId) =>
  axios.delete(`${API_BASE}/api/tarefas/${taskId}`);

export const updateTask = (taskId, updates) =>
  axios.put(`${API_BASE}/api/tarefas/${taskId}`, {
    titulo: updates.title || updates.titulo,
    descricao: updates.description || updates.descricao,
    categoriaId: updates.categoryId || updates.categoriaId,
    responsavelId: updates.responsavelId || 'mockUser',
    dataEntrega: updates.dueDate || updates.dataEntrega || null,
    prioridade: updates.priority || updates.prioridade || 'normal',
    status: updates.status
  });

export const moveTask = (taskId, newStatus, extra = {}) =>
  axios.put(`${API_BASE}/api/tarefas/${taskId}/status`, {
    status: newStatus,
    ...extra
  });

// 🔹 COMENTÁRIOS (se implementado no back-end)
export const addComment = (taskId, comment) =>
  axios.post(`${API_BASE}/api/tarefas/${taskId}/comments`, comment);

// 🔹 PARTICIPANTES
export const assignUser = (taskId, user) =>
  axios.post(`${API_BASE}/api/tarefas/${taskId}/assign`, { user });

export const removeUser = (taskId, user) =>
  axios.post(`${API_BASE}/api/tarefas/${taskId}/unassign`, { user });

// 🔹 PARTICIPAÇÃO EM TAREFAS
export const sendParticipationRequest = (taskId, requester) =>
  axios.post(`${API_BASE}/api/participation-requests`, { taskId, requester });

export const getParticipationRequests = (userId) =>
  axios.get(`${API_BASE}/api/participation-requests?userId=${userId}`);

export const acceptParticipationRequest = (requestId) =>
  axios.post(`${API_BASE}/api/participation-requests/${requestId}/accept`);

export const rejectParticipationRequest = (requestId) =>
  axios.post(`${API_BASE}/api/participation-requests/${requestId}/reject`);

// 🔹 NOTIFICAÇÕES
export const getNotifications = (userId) =>
  axios.get(`${API_BASE}/api/notifications?userId=${userId}`);

export const markNotificationAsRead = (notificationId) =>
  axios.post(`${API_BASE}/api/notifications/${notificationId}/read`);

// 🔹 Exportação principal (opcional)
const kanbanService = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  moveTask,
  addComment,
  assignUser,
  removeUser,
  sendParticipationRequest,
  getParticipationRequests,
  acceptParticipationRequest,
  rejectParticipationRequest,
  getNotifications,
  markNotificationAsRead
};

export default kanbanService;
