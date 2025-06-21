import axios from 'axios';


const API_BASE = 'http://localhost:8080/api'; // Altere para sua URL real quando o back estiver pronto

// 🔹 CATEGORIAS
export const getCategories = () => axios.get(`${API_BASE}/categories`);

export const createCategory = (title) =>
  axios.post(`${API_BASE}/categories`, { title });

export const deleteCategory = (id) =>
  axios.delete(`${API_BASE}/categories/${id}`);


// 🔹 TAREFAS
export const createTask = (taskData) =>
  axios.post(`${API_BASE}/tasks`, taskData);
// taskData esperado:
// {
//   title, description, status, priority, progress,
//   dueDate, participants: [], comments: [], categoryId
// }

export const deleteTask = (taskId) =>
  axios.delete(`${API_BASE}/tasks/${taskId}`);

export const updateTask = (taskId, updates) =>
  axios.put(`${API_BASE}/tasks/${taskId}`, updates);
// updates pode incluir: title, description, progress, dueDate, priority, etc
// participants: []

export const moveTask = (taskId, newStatus, extra = {}) =>
  // O back-end deve registrar status, statusChangedAt, completedAt e late (se enviados)
  axios.put(`${API_BASE}/tasks/${taskId}/status`, { status: newStatus, ...extra });


// 🔹 COMENTÁRIOS
export const addComment = (taskId, comment) =>
  axios.post(`${API_BASE}/tasks/${taskId}/comments`, comment);
// comment: { text: '...', author: '...' }


// 🔹 USUÁRIOS ATRIBUÍDOS
// (Agora padronizado para participants)
export const assignUser = (taskId, user) =>
  axios.post(`${API_BASE}/tasks/${taskId}/assign`, { user });
// user: { id: '...', name: '...' }

export const removeUser = (taskId, user) =>
  axios.post(`${API_BASE}/tasks/${taskId}/unassign`, { user });


// 🔹 PEDIDOS DE PARTICIPAÇÃO (Sugestão: implemente os endpoints correspondentes no back-end)
// Enviar um pedido de participação para uma tarefa
export function sendParticipationRequest(taskId, requester) {
  // Espera-se que o back-end crie um registro de pedido de participação
  // requester: nome ou id do usuário solicitante
  return axios.post(`${API_BASE}/participation-requests`, { taskId, requester });
}

// Listar pedidos de participação pendentes para um usuário
export function getParticipationRequests(userId) {
  // O back-end deve retornar todos os pedidos de participação pendentes para o usuário informado
  return axios.get(`${API_BASE}/participation-requests?userId=${userId}`);
}

// Aceitar um pedido de participação
export function acceptParticipationRequest(requestId) {
  // O back-end deve adicionar o usuário à tarefa e remover o pedido
  return axios.post(`${API_BASE}/participation-requests/${requestId}/accept`);
}

// Recusar um pedido de participação
export function rejectParticipationRequest(requestId) {
  // O back-end deve apenas remover o pedido
  return axios.post(`${API_BASE}/participation-requests/${requestId}/reject`);
}

// 🔹 NOTIFICAÇÕES (Sugestão: implemente os endpoints correspondentes no back-end)
// Listar notificações do usuário
export function getNotifications(userId) {
  // O back-end deve retornar todas as notificações do usuário
  return axios.get(`${API_BASE}/notifications?userId=${userId}`);
}

// Marcar notificação como lida
export function markNotificationAsRead(notificationId) {
  // O back-end deve marcar a notificação como lida
  return axios.post(`${API_BASE}/notifications/${notificationId}/read`);
}

const kanbanService = {
  getCategories,
  createCategory,
  deleteCategory,
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
