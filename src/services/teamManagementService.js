// src/services/teamManagementService.js

/**
 * @file Serviço para gestão completa de usuários e equipes.
 * @description
 * Este arquivo contém funções para interagir com a API (ou dados simulados)
 * para operações de gerenciamento de equipes. Inclui a busca de todos os usuários
 * da plataforma, a recuperação de membros específicos da equipe, e a realização
 * de operações de adicionar, remover e atualizar membros da equipe.
 *
 * **Perfis de Usuário Relevantes:**
 * - **Líder:** Utilizado principalmente para visualizar, adicionar e remover membros
 * da sua equipe, e para encontrar usuários disponíveis para adicionar.
 * - **RH (Recursos Humanos):** Pode usar essas funcionalidades para uma gestão mais
 * abrangente de usuários e equipes em nível organizacional.
 */

import axios from 'axios';

// IMPORTANTE: Defina REAL_API_ACTIVE como true quando sua API de backend para esses endpoints estiver pronta e funcionando.
const REAL_API_ACTIVE = false; // <-- Mude para true quando estiver pronto para usar a API real
const BASE_API_URL = "http://localhost:3001/api"; // Ajuste se sua API de backend estiver em uma porta/caminho diferente

// Instância do Axios configurada para chamadas de API
const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000, // Tempo limite para as requisições da API
  headers: { 'Content-Type': 'application/json' }
});

// --- DADOS SIMULADOS E FUNÇÕES AUXILIARES DE LOCAL STORAGE (para REAL_API_ACTIVE = false) ---
// Nota: As fotos simuladas são URLs de placeholder.
const alcatteiaUsersMock = [
  { id: "alcatteia-1", name: "Gabriel Cabral", role: "Front-end", email: "gabriel.c@alcatteia.com", photo: "https://placehold.co/150x150/0000FF/FFFFFF?text=GC", empenho: 70, description: "Desenvolvedor front-end com foco em React e UX." },
  { id: "alcatteia-2", name: "Mariana Silva", role: "Back-end", email: "mariana.s@alcatteia.com", photo: "https://placehold.co/150x150/FF0000/FFFFFF?text=MS", empenho: 85, description: "Especialista em APIs e banco de dados." },
  { id: "alcatteia-3", name: "Pedro Lima", role: "Full-stack", email: "pedro.l@alcatteia.com", photo: "https://placehold.co/150x150/008000/FFFFFF?text=PL", empenho: 90, description: "Experiência completa no ciclo de desenvolvimento de software." },
  { id: "alcatteia-4", name: "Ana Costa", role: "Teacher", email: "ana.c@alcatteia.com", photo: "https://placehold.co/150x150/FFFF00/000000?text=AC", empenho: 95, description: "Mentora e instrutora de novas tecnologias." },
];

/**
 * Salva a lista atual de membros da equipe no armazenamento local do navegador.
 * Isso é apenas para o comportamento da API simulada.
 * @param {Array<object>} currentMembers - A lista de membros a ser salva.
 */
const saveMembersToLocal = (currentMembers) => {
  localStorage.setItem('teamMembers', JSON.stringify(currentMembers));
};

/**
 * Recupera a lista de membros da equipe do armazenamento local do navegador.
 * Isso é apenas para o comportamento da API simulada.
 * @returns {Array<object>} A lista de membros do localStorage, ou um array vazio.
 */
const getMembersFromLocal = () => {
  try {
    const stored = localStorage.getItem('teamMembers');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Erro ao carregar membros do localStorage:", e);
    localStorage.removeItem('teamMembers'); // Limpa dados corrompidos
    return [];
  }
};
// --- FIM DOS DADOS SIMULADOS E FUNÇÕES AUXILIARES DE LOCAL STORAGE ---


const teamManagementService = {

  /**
   * Busca todos os usuários disponíveis da plataforma (usuários da "Alcatéia").
   * Geralmente usado para preencher uma lista para adicionar novos membros a uma equipe.
   * Filtra os usuários que já estão na equipe atual (para dados simulados).
   * @returns {Promise<Array<object>>} Uma lista de objetos de usuário disponíveis.
   * @throws {Error} Se a chamada da API falhar.
   */
  fetchAllAlcatteiaUsers: async () => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.get('/users'); // Assumindo que /api/users retorna TODOS os usuários da plataforma
        const allUsers = response.data || [];
        // Opcionalmente, obtenha os membros da equipe atual para filtrar os já adicionados.
        // Isso pode exigir outra chamada de API ou uma lista em cache em um aplicativo real.
        // Por enquanto, o backend pode lidar com isso ou o filtro pode ser feito no lado do cliente.
        const currentTeamMembers = await teamManagementService.fetchTeamMembers(); // Chamada recursiva para obter a equipe atual
        const currentMemberIds = new Set(currentTeamMembers.map(m => m.id));
        return allUsers.filter(user => !currentMemberIds.has(user.id));
      } catch (error) {
        console.error("Erro ao buscar todos os usuários da API real:", error);
        throw error;
      }
    } else {
      console.log("Serviço de Equipe: Buscando usuários da Alcatéia (dados simulados)."); // Log descritivo para mock
      // Lógica de dados simulados com atraso simulado
      return new Promise(resolve => {
        setTimeout(() => {
          const currentMembers = getMembersFromLocal();
          const currentMemberIds = new Set(currentMembers.map(m => m.id));
          const availableUsers = alcatteiaUsersMock.filter(user => !currentMemberIds.has(user.id));
          resolve(availableUsers);
        }, 300);
      });
    }
  },

  /**
   * Busca a lista de membros para a equipe atual.
   * Se a API não estiver ativa, exibe um console.log e retorna membros pré-definidos
   * se o localStorage estiver vazio.
   * @returns {Promise<Array<object>>} Uma lista de objetos de membros da equipe.
   * @throws {Error} Se a chamada da API falhar.
   */
  fetchTeamMembers: async () => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.get('/team-members'); // Ou '/team' se esse for o seu endpoint
        if (response.data && response.data.length > 0) {
          return response.data;
        } else {
          return []; // Retorna array vazio se não houver dados.
        }
      } catch (error) {
        console.error("Erro ao buscar membros da equipe da API real:", error);
        throw error;
      }
    } else {
      console.log("Serviço de Equipe: Buscando membros da equipe (dados simulados)."); // Log descritivo para mock
      // Lógica de dados simulados com atraso simulado e persistência no localStorage
      return new Promise(resolve => {
        setTimeout(() => {
          const stored = getMembersFromLocal();
          if (stored.length > 0) {
            resolve(stored);
          } else {
            // Membros pré-definidos quando o localStorage está vazio
            const defaultMembers = [
                {
                    id: "preset-gabriel",
                    name: "Gabriel Cabral",
                    role: "Front-end",
                    email: "gabriel.c@alcatteia.com",
                    photo: "https://placehold.co/150x150/0000FF/FFFFFF?text=GC",
                    empenho: 70,
                    description: "Desenvolvedor front-end com foco em React e UX."
                },
                {
                    id: "preset-talita",
                    name: "Talita Vitória",
                    role: "Back-end",
                    email: "talita.v@alcatteia.com",
                    photo: "https://placehold.co/150x150/FF69B4/FFFFFF?text=TV", // Cor de rosa para Talita
                    empenho: 85,
                    description: "Engenheira de backend com experiência em otimização de sistemas."
                }
            ];
            saveMembersToLocal(defaultMembers);
            resolve(defaultMembers);
          }
        }, 500);
      });
    }
  },

  /**
   * Adiciona um novo usuário como membro à equipe.
   * @param {object} memberData - Os dados do usuário a ser adicionado (ex: id, nome, email, função).
   * @returns {Promise<object>} O objeto do membro adicionado com sucesso.
   * @throws {Error} Se a operação falhar ou se o membro já estiver na equipe (validação simulada).
   */
  addTeamMember: async (memberData) => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.post('/team-members', memberData); // Assumindo /api/team-members para adicionar
        return response.data;
      } catch (error) {
        console.error("Erro ao adicionar membro à equipe na API real:", error);
        throw error;
      }
    } else {
      console.log("Serviço de Equipe: Adicionando membro (dados simulados)."); // Log descritivo para mock
      // Lógica de dados simulados com atraso simulado e atualização do localStorage
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currentMembers = getMembersFromLocal();
          if (!memberData.id || !memberData.name || !memberData.email || !memberData.role) {
            return reject(new Error("Nome, e-mail e função são obrigatórios para um novo membro."));
          }
          if (currentMembers.some(m => m.id === memberData.id)) {
            return reject(new Error("Este membro já está na equipe."));
          }
          
          // Garante que o membro adicionado tenha uma foto de fallback se não fornecida
          const newMember = {
            id: memberData.id || String(Date.now()),
            photo: memberData.photo || "https://placehold.co/150x150/CCCCCC/000000?text=NOVO", // Placeholder para novos membros
            empenho: memberData.empenho || 50,
            description: memberData.description || "Nenhuma descrição fornecida.",
            ...memberData, // Sobrescreve com os dados fornecidos
          };

          currentMembers.push(newMember);
          saveMembersToLocal(currentMembers);
          resolve(newMember);
        }, 700);
      });
    }
  },

  /**
   * Atualiza os dados de um membro existente na equipe.
   * @param {string} memberId - O ID do membro a ser atualizado.
   * @param {object} updatedData - Os dados a serem atualizados para o membro.
   * @returns {Promise<object>} O objeto do membro atualizado.
   * @throws {Error} Se a operação falhar ou se o membro não for encontrado (validação simulada).
   */
  updateTeamMember: async (memberId, updatedData) => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.put(`/team-members/${memberId}`, updatedData); // Ou PATCH se preferir
        return response.data;
      } catch (error) {
        console.error(`Erro ao atualizar membro da equipe ${memberId} na API real:`, error);
        throw error;
      }
    } else {
      console.log("Serviço de Equipe: Atualizando membro (dados simulados)."); // Log descritivo para mock
      // Lógica de dados simulados com atraso simulado e atualização do localStorage
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currentMembers = getMembersFromLocal();
          const index = currentMembers.findIndex(m => m.id === memberId);
          if (index > -1) {
            currentMembers[index] = { ...currentMembers[index], ...updatedData };
            saveMembersToLocal(currentMembers);
            resolve(currentMembers[index]);
          } else {
            reject(new Error("Membro não encontrado para atualização."));
          }
        }, 600);
      });
    }
  },

  /**
   * Remove um membro da equipe.
   * @param {string} memberId - O ID do membro a ser removido.
   * @returns {Promise<object>} Um objeto de mensagem de sucesso após a remoção bem-sucedida.
   * @throws {Error} Se a operação falhar ou se o membro não for encontrado (validação simulada).
   */
  removeTeamMember: async (memberId) => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.delete(`/team-members/${memberId}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao remover membro da equipe ${memberId} da API real:`, error);
        throw error;
      }
    } else {
      console.log("Serviço de Equipe: Removendo membro (dados simulados)."); // Log descritivo para mock
      // Lógica de dados simulados com atraso simulado e atualização do localStorage
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currentMembers = getMembersFromLocal();
          const initialLength = currentMembers.length;
          currentMembers = currentMembers.filter(m => m.id !== memberId);
          saveMembersToLocal(currentMembers);
          if (currentMembers.length < initialLength) {
            resolve({ message: "Membro removido com sucesso!" });
          } else {
            reject(new Error("Membro não encontrado para remoção."));
          }
        }, 500);
      });
    }
  }
};

export default teamManagementService;