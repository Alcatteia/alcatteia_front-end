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

const REAL_API_ACTIVE = false;
const BASE_API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

const alcatteiaUsersMock = [
  {
    id: "heverton-souza-id",
    name: "Heverton Souza",
    role: "Front-end",
    email: "heverton.s@alcatteia.com",
    photo: "https://placehold.co/150x150/FF0000/FFFFFF?text=HS",
    empenho: 70,
    foco: 80,
    saudeEmocional: 75,
    lastCheckIn: "2024-06-28T10:00:00Z",
    description: "Desenvolvedor front-end com foco em React e otimização de performance.",
    insights: {
      foco: "Mostra bom foco em tarefas complexas.",
      empenho: "Constantemente engajado em projetos.",
      saudeEmocional: "Nível de estresse controlado, boa resiliência."
    },
    hrInsights: {
      performance: "Desempenho consistente, cumpre prazos com qualidade.",
    },
    observation: "Colaborador proativo, bom com trabalho em equipe. Precisa de acompanhamento no desenvolvimento de novas habilidades."
  },
  {
    id: "talita-vitoria-id",
    name: "Talita Vitória",
    role: "Back-end",
    email: "talita.v@alcatteia.com",
    photo: "https://placehold.co/150x150/008000/FFFFFF?text=TV",
    empenho: 85,
    foco: 90,
    saudeEmocional: 88,
    lastCheckIn: "2024-06-29T14:30:00Z",
    description: "Engenheira de backend especialista em APIs e banco de dados.",
    insights: {
      foco: "Excelente foco, raramente se distrai.",
      empenho: "Dedicação notável, sempre buscando otimização.",
      saudeEmocional: "Bem equilibrada, gerencia bem a pressão."
    },
    hrInsights: {
      performance: "Desempenho excepcional, entrega soluções robustas e eficientes.",
    },
    observation: "Talita é um pilar da equipe de backend, sempre disposta a ajudar e inovar."
  },
  {
    id: "pedro-miguel-id",
    name: "Pedro Miguel",
    role: "Front-end",
    email: "pedro.m@alcatteia.com",
    photo: "https://placehold.co/150x150/FFFF00/000000?text=PM",
    empenho: 65,
    foco: 60,
    saudeEmocional: 70,
    lastCheckIn: "2024-06-27T09:15:00Z",
    description: "Desenvolvedor front-end em ascensão, com paixão por interfaces.",
    insights: {
      foco: "Às vezes perde o foco em tarefas longas.",
      empenho: "Pode melhorar o engajamento em projetos menos desafiadores.",
      saudeEmocional: "Variações no humor, precisa de mais suporte."
    },
    hrInsights: {
      performance: "Desempenho em desenvolvimento, mostra potencial mas precisa de direcionamento.",
    },
    observation: "Pedro é criativo, mas precisa de apoio para gerenciar o tempo e manter o foco. Plano de desenvolvimento individual em andamento."
  },
  {
    id: "isabelle-gomes-id",
    name: "Isabelle Gomes",
    role: "Full-stack",
    email: "isabelle.g@alcatteia.com",
    photo: "https://placehold.co/150x150/800080/FFFFFF?text=IG",
    empenho: 90,
    foco: 95,
    saudeEmocional: 92,
    lastCheckIn: "2024-06-30T11:45:00Z",
    description: "Desenvolvedora full-stack com experiência em soluções de ponta a ponta.",
    insights: {
      foco: "Foco impecável, líder técnico natural.",
      empenho: "Altíssimo empenho, sempre superando expectativas.",
      saudeEmocional: "Excepcional equilíbrio, fonte de inspiração."
    },
    hrInsights: {
      performance: "Colaboradora chave, desempenho extraordinário em todas as áreas.",
    },
    observation: "Isabelle é um talento raro, com habilidades técnicas e interpessoais que a destacam. Considerar para futura liderança."
  },
  {
    id: "gabriel-de-alencar-id",
    name: "Gabriel de Alencar",
    role: "Front-end",
    email: "gabriel.a@alcatteia.com",
    photo: "https://placehold.co/150x150/FFA500/FFFFFF?text=GA",
    empenho: 78,
    foco: 85,
    saudeEmocional: 80,
    lastCheckIn: "2024-06-26T16:00:00Z",
    description: "Desenvolvedor front-end com foco em acessibilidade e usabilidade.",
    insights: {
      foco: "Bom foco, especialmente em detalhes de UI.",
      empenho: "Consistente no empenho.",
      saudeEmocional: "Estável, boa interação com a equipe."
    },
    hrInsights: {
      performance: "Sólido desempenho, especialista em acessibilidade, agrega muito valor.",
    },
    observation: "Gabriel é um defensor da acessibilidade, suas contribuições melhoram a usabilidade de nossos produtos."
  },
  {
    id: "rafaela-leite-id",
    name: "Rafaela Leite",
    role: "Back-end",
    email: "rafaela.l@alcatteia.com",
    photo: "https://placehold.co/150x150/00FFFF/000000?text=RL",
    empenho: 80,
    foco: 88,
    saudeEmocional: 82,
    lastCheckIn: "2024-06-29T09:00:00Z",
    description: "Engenheira de backend focada em escalabilidade e segurança de dados.",
    insights: {
      foco: "Foco apurado em questões de segurança.",
      empenho: "Altamente dedicada a soluções robustas.",
      saudeEmocional: "Calma sob pressão, boa influência na equipe."
    },
    hrInsights: {
      performance: "Desempenho forte em segurança e escalabilidade, fundamental para a infraestrutura.",
    },
    observation: "Rafaela é essencial para garantir a segurança dos nossos sistemas, sempre atualizada com as melhores práticas."
  },
  {
    id: "felipe-oliveira-id",
    name: "Felipe Oliveira",
    role: "Back-end",
    email: "felipe.o@alcatteia.com",
    photo: "https://placehold.co/150x150/FFC0CB/000000?text=FO",
    empenho: 60,
    foco: 55,
    saudeEmocional: 68,
    lastCheckIn: "2024-06-25T13:00:00Z",
    description: "Desenvolvedor backend em treinamento, dedicado a aprender novas tecnologias.",
    insights: {
      foco: "Precisa de ajuda para manter o foco em tarefas complexas.",
      empenho: "Está aprendendo a gerenciar o empenho.",
      saudeEmocional: "Sensível a feedback, precisa de acompanhamento positivo."
    },
    hrInsights: {
      performance: "Em fase de ramp-up, bom progresso, mas ainda precisa de desenvolvimento.",
    },
    observation: "Felipe está no início de sua jornada, mas mostra grande potencial. Mentoria ativa é crucial neste período."
  },
  {
    id: "gabriel-cabral-id",
    name: "Gabriel Cabral",
    role: "Front-end",
    email: "gabriel.c@alcatteia.com",
    photo: "https://placehold.co/150x150/0000FF/FFFFFF?text=GC",
    empenho: 88,
    foco: 90,
    saudeEmocional: 85,
    lastCheckIn: "2024-06-28T17:00:00Z",
    description: "Designer UX/UI e desenvolvedor front-end, focado na experiência do usuário.",
    insights: {
      foco: "Excelente foco em design e implementação.",
      empenho: "Muito engajado, paixão pelo que faz.",
      saudeEmocional: "Estável e proativo em ajudar a equipe."
    },
    hrInsights: {
      performance: "Combinação rara de design e código, contribui significativamente para a qualidade do produto.",
    },
    observation: "Gabriel é uma força criativa e técnica. Seu foco na experiência do usuário é um diferencial."
  },
];

const saveMembersToLocal = (currentMembers) => {
  localStorage.setItem('teamMembers', JSON.stringify(currentMembers));
};

const getMembersFromLocal = () => {
  try {
    const stored = localStorage.getItem('teamMembers');
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      email: member.email,
      photo: member.photo,
      empenho: member.empenho,
      foco: member.foco,
      saudeEmocional: member.saudeEmocional,
      lastCheckIn: member.lastCheckIn,
      description: member.description,
      insights: member.insights,
      hrInsights: member.hrInsights || { performance: "Nenhum dado de desempenho disponível." },
      observation: member.observation || "",
      absenteeism: undefined,
      contactHistory: undefined,
    }));
  } catch (e) {
    console.error("Erro ao carregar membros do localStorage:", e);
    localStorage.removeItem('teamMembers');
    return [];
  }
};

const teamManagementService = {
  fetchAllAlcatteiaUsers: async () => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.get('/users');
        const allUsers = response.data || [];
        const currentTeamMembers = await teamManagementService.fetchTeamMembers();
        const currentMemberIds = new Set(currentTeamMembers.map(m => m.id));
        return allUsers
          .filter(user => !currentMemberIds.has(user.id))
          .map(user => ({
            ...user,
            hrInsights: user.hrInsights || { performance: "Nenhum dado de desempenho disponível." },
            observation: user.observation || "",
            absenteeism: undefined,
            contactHistory: undefined,
          }));
      } catch (error) {
        console.error("Erro ao buscar todos os usuários da API real:", error);
        throw error;
      }
    } else {
      console.log("Aguardando dados da API (fetchAllAlcatteiaUsers).");
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

  fetchTeamMembers: async () => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.get('/team-members');
        let members = response.data || [];
        members = members.map(member => ({
          ...member,
          hrInsights: member.hrInsights || { performance: "Nenhum dado de desempenho disponível." },
          observation: member.observation || "",
          absenteeism: undefined,
          contactHistory: undefined,
        }));
        return members;
      } catch (error) {
        console.error("Erro ao buscar membros da equipe da API real:", error);
        throw error;
      }
    } else {
      console.log("Aguardando dados da API.");
      return new Promise(resolve => {
        setTimeout(() => {
          const stored = getMembersFromLocal();
          if (stored.length > 0) {
            resolve(stored);
          } else {
            const defaultMembers = [
                alcatteiaUsersMock.find(m => m.id === "gabriel-cabral-id"),
                alcatteiaUsersMock.find(m => m.id === "talita-vitoria-id"),
                alcatteiaUsersMock.find(m => m.id === "heverton-souza-id")
            ].filter(Boolean);
            saveMembersToLocal(defaultMembers);
            resolve(defaultMembers);
          }
        }, 500);
      });
    }
  },

  addTeamMember: async (memberData) => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.post('/team-members', memberData);
        return response.data;
      } catch (error) {
        console.error("Erro ao adicionar membro à equipe na API real:", error);
        throw error;
      }
    } else {
      console.log("Aguardando dados da API (addTeamMember).");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currentMembers = getMembersFromLocal();
          if (!memberData.id || !memberData.name || !memberData.email || !memberData.role) {
            return reject(new Error("Nome, e-mail e função são obrigatórios para um novo membro."));
          }
          if (currentMembers.some(m => m.id === memberData.id)) {
            return reject(new Error("Este membro já está na equipe."));
          }

          const userFromMock = alcatteiaUsersMock.find(m => m.id === memberData.id);

          const newMember = {
            id: memberData.id || String(Date.now()),
            name: memberData.name,
            role: memberData.role,
            email: memberData.email,
            photo: memberData.photo || (userFromMock ? userFromMock.photo : "https://placehold.co/150x150/CCCCCC/000000?text=NOVO"),
            empenho: memberData.empenho || (userFromMock ? userFromMock.empenho : 50),
            foco: memberData.foco || (userFromMock ? userFromMock.foco : 50),
            saudeEmocional: memberData.saudeEmocional || (userFromMock ? userFromMock.saudeEmocional : 50),
            lastCheckIn: memberData.lastCheckIn || (userFromMock ? userFromMock.lastCheckIn : null),
            description: memberData.description || (userFromMock ? userFromMock.description : "Nenhuma descrição fornecida."),
            insights: memberData.insights || (userFromMock ? userFromMock.insights : {}),
            hrInsights: memberData.hrInsights || (userFromMock ? userFromMock.hrInsights : { performance: "Nenhum dado de desempenho disponível." }),
            observation: memberData.observation || (userFromMock ? userFromMock.observation : ""),
          };

          currentMembers.push(newMember);
          saveMembersToLocal(currentMembers);
          resolve(newMember);
        }, 700);
      });
    }
  },

  updateTeamMember: async (memberId, updatedData) => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.put(`/team-members/${memberId}`, updatedData);
        return {
          ...response.data,
          hrInsights: response.data.hrInsights || { performance: "Nenhum dado de desempenho disponível." },
          observation: response.data.observation || "",
          absenteeism: undefined,
          contactHistory: undefined,
        };
      } catch (error) {
        console.error(`Erro ao atualizar membro da equipe ${memberId} na API real:`, error);
        throw error;
      }
    } else {
      console.log("Aguardando dados da API (updateTeamMember).");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currentMembers = getMembersFromLocal();
          const index = currentMembers.findIndex(m => m.id === memberId);
          if (index > -1) {
            currentMembers[index] = { ...currentMembers[index], ...updatedData };
            delete currentMembers[index].absenteeism;
            delete currentMembers[index].contactHistory;
            saveMembersToLocal(currentMembers);
            resolve(currentMembers[index]);
          } else {
            reject(new Error("Membro não encontrado para atualização."));
          }
        }, 600);
      });
    }
  },

  updateCollaboratorObservation: async (collaboratorId, observationText) => {
    if (REAL_API_ACTIVE) {
      try {
        const response = await api.patch(`/hr/collaborators/${collaboratorId}/observation`, { observation: observationText });
        return response.data;
      } catch (error) {
        console.error(`Erro ao atualizar observação do colaborador ${collaboratorId} na API real:`, error);
        throw error;
      }
    } else {
      console.log("Aguardando dados da API (updateCollaboratorObservation).");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currentMembers = getMembersFromLocal();
          const index = currentMembers.findIndex(m => m.id === collaboratorId);
          if (index > -1) {
            currentMembers[index].observation = observationText;
            saveMembersToLocal(currentMembers);
            resolve(currentMembers[index]);
          } else {
            reject(new Error("Colaborador não encontrado para atualizar observação."));
          }
        }, 800);
      });
    }
  },

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
      console.log("Aguardando dados da API (removeTeamMember).");
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