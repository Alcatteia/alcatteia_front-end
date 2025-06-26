// src/hooks/useTeamMembers.js

/**
 * @file Hook personalizado para gerenciar membros da equipe e operações relacionadas.
 * @description
 * Este hook encapsula a lógica de estado e as interações com serviços (API)
 * para gerenciar os membros da equipe em um componente.
 * Ele provê funcionalidades para carregar membros, adicionar novos, remover existentes,
 * e enviar feedbacks, além de gerenciar os estados de carregamento e o status das operações.
 */

import { useState, useEffect, useCallback } from 'react';
import teamManagementService from '../services/teamManagementService'; // Serviço para gestão de equipe
import { addFeedback } from '../services/feedbackService'; // Serviço para envio de feedback

/**
 * Hook para gerenciar o estado e as operações dos membros da equipe.
 * @returns {object} Um objeto contendo o estado da equipe e funções para manipulá-la.
 * @property {Array<object>} members - A lista atual de membros da equipe.
 * @property {Array<object>} alcatteiaAvailableUsers - A lista de usuários disponíveis para adicionar à equipe.
 * @property {boolean} isLoading - Indica se alguma operação de carregamento principal está em andamento.
 * @property {object | null} operationStatus - O status da última operação (ex: { type: 'success', message: '...' }).
 * @property {function(): Promise<void>} fetchAlcatteiaUsers - Função para buscar usuários disponíveis para adicionar.
 * @property {function(object): Promise<void>} addMemberToTeam - Função para adicionar um novo membro à equipe.
 * @property {function(string): Promise<void>} removeMemberFromTeam - Função para remover um membro da equipe.
 * @property {function(object): Promise<void>} sendFeedback - Função para enviar feedback a um membro.
 * @property {function(): void} resetOperationStatus - Função para limpar o status da operação.
 */
export const useTeamMembers = () => {
  // Estados para os dados da equipe, usuários disponíveis, carregamento e status de operações.
  const [members, setMembers] = useState([]);
  const [alcatteiaAvailableUsers, setAlcatteiaAvailableUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado inicial de carregamento para os membros
  const [operationStatus, setOperationStatus] = useState(null); // { type: 'success' | 'error' | 'loading', message: string }

  /**
   * Limpa o status da operação após um período.
   * Usado para ocultar mensagens de feedback automático na UI.
   */
  const resetOperationStatus = useCallback(() => {
    setOperationStatus(null);
  }, []);

  // Efeito para carregar os membros da equipe na montagem inicial do componente.
  useEffect(() => {
    const fetchMembersInitialData = async () => {
      setIsLoading(true); // Inicia o estado de carregamento
      try {
        const data = await teamManagementService.fetchTeamMembers(); // Busca membros usando o serviço
        setMembers(data); // Atualiza o estado com os membros carregados
      } catch (error) {
        console.error("Falha ao carregar membros da equipe:", error);
        setOperationStatus({ type: "error", message: "Erro ao carregar membros da equipe." }); // Define status de erro
      } finally {
        setIsLoading(false); // Finaliza o estado de carregamento
        setTimeout(resetOperationStatus, 3000); // Limpa o status da operação após 3 segundos
      }
    };
    fetchMembersInitialData();
  }, [resetOperationStatus]); // Dependência para garantir função estável

  /**
   * Busca a lista de usuários disponíveis na "Alcatéia" que podem ser adicionados à equipe.
   */
  const fetchAlcatteiaUsers = useCallback(async () => {
    setOperationStatus({ type: "loading", message: "Carregando usuários disponíveis..." }); // Define status de carregamento
    try {
      const data = await teamManagementService.fetchAllAlcatteiaUsers(); // CORREÇÃO: Chama a função correta do serviço
      setAlcatteiaAvailableUsers(data); // Atualiza o estado com os usuários disponíveis
      setOperationStatus({ type: "success", message: "Usuários disponíveis carregados." }); // Define status de sucesso
    } catch (error) {
      console.error("Falha ao carregar usuários da Alcatéia:", error);
      setOperationStatus({ type: "error", message: "Erro ao carregar usuários da Alcatéia." }); // Define status de erro
    } finally {
      setTimeout(resetOperationStatus, 3000); // Limpa o status da operação após 3 segundos
    }
  }, [resetOperationStatus]);

  /**
   * Adiciona um novo membro à equipe.
   * @param {object} memberData - Os dados do membro a ser adicionado.
   */
  const addMemberToTeam = useCallback(async (memberData) => {
    setOperationStatus({ type: "loading", message: "Adicionando membro..." }); // Define status de carregamento
    try {
      const addedMember = await teamManagementService.addTeamMember(memberData); // Adiciona membro via serviço
      setMembers((prevMembers) => [...prevMembers, addedMember]); // Adiciona à lista de membros no estado
      // Remove o membro recém-adicionado da lista de usuários disponíveis
      setAlcatteiaAvailableUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== addedMember.id)
      );
      setOperationStatus({ type: "success", message: `${addedMember.name} adicionado(a) à equipe!` }); // Define status de sucesso
    } catch (error) {
      console.error("Falha ao adicionar membro:", error);
      setOperationStatus({ type: "error", message: `Erro ao adicionar: ${error.message || 'Verifique o console.'}` }); // Define status de erro
    } finally {
      setTimeout(resetOperationStatus, 3000); // Limpa o status da operação após 3 segundos
    }
  }, [resetOperationStatus]);

  /**
   * Remove um membro da equipe.
   * @param {string} memberId - O ID do membro a ser removido.
   */
  const removeMemberFromTeam = useCallback(async (memberId) => {
    setOperationStatus({ type: "loading", message: "Removendo membro..." }); // Define status de carregamento
    try {
      await teamManagementService.removeTeamMember(memberId); // Remove membro via serviço
      const removedMember = members.find(m => m.id === memberId); // Encontra o membro antes de filtrar
      setMembers((currentMembers) =>
        currentMembers.filter((m) => m.id !== memberId) // Remove da lista de membros no estado
      );
      // Adiciona o membro removido de volta à lista de usuários disponíveis
      if (removedMember) {
        setAlcatteiaAvailableUsers((prevUsers) => {
          const isAlreadyAvailable = prevUsers.some(
            (u) => u.id === removedMember.id
          );
          if (!isAlreadyAvailable) {
            // Garante que a ordem seja mantida para melhor UX (ex: por nome)
            return [...prevUsers, removedMember].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          }
          return prevUsers;
        });
      }
      setOperationStatus({ type: "success", message: "Membro removido com sucesso!" }); // Define status de sucesso
    } catch (error) {
      console.error("Falha ao remover membro:", error);
      setOperationStatus({ type: "error", message: `Erro ao remover: ${error.message || 'Verifique o console.'}` }); // Define status de erro
    } finally {
      setTimeout(resetOperationStatus, 3000); // Limpa o status da operação após 3 segundos
    }
  }, [members, resetOperationStatus]); // 'members' como dependência para 'removedMember'

  /**
   * Envia feedback para um membro.
   * @param {object} feedbackData - Os dados do feedback a ser enviado.
   */
  const sendFeedback = useCallback(async (feedbackData) => {
    setOperationStatus({ type: "loading", message: "Enviando feedback..." }); // Define status de carregamento
    try {
      await addFeedback(feedbackData); // Envia feedback via serviço
      setOperationStatus({ type: "success", message: "Feedback enviado com sucesso!" }); // Define status de sucesso
    } catch (error) {
      console.error("Falha ao enviar feedback:", error);
      setOperationStatus({ type: "error", message: `Erro ao enviar feedback: ${error.message || 'Verifique o console.'}` }); // Define status de erro
    } finally {
      setTimeout(resetOperationStatus, 3000); // Limpa o status da operação após 3 segundos
    }
  }, [resetOperationStatus]);

  // Retorna os estados e funções que o componente que usar este hook terá acesso.
  return {
    members,
    alcatteiaAvailableUsers,
    isLoading,
    operationStatus,
    fetchAlcatteiaUsers,
    addMemberToTeam,
    removeMemberFromTeam,
    sendFeedback,
    resetOperationStatus,
  };
};
