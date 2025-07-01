import { useState, useEffect, useCallback } from 'react';
import teamManagementService from '../services/teamManagementService';
import { addFeedback } from '../services/feedbackService';

export const useTeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [alcatteiaAvailableUsers, setAlcatteiaAvailableUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [operationStatus, setOperationStatus] = useState(null);

  const resetOperationStatus = useCallback(() => {
    setOperationStatus(null);
  }, []);

  useEffect(() => {
    const fetchMembersInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await teamManagementService.fetchTeamMembers();
        setMembers(data);
      } catch (error) {
        console.error("Falha ao carregar membros da equipe:", error);
        setOperationStatus({ type: "error", message: "Erro ao carregar membros da equipe." });
      } finally {
        setIsLoading(false);
        setTimeout(resetOperationStatus, 3000);
      }
    };
    fetchMembersInitialData();
  }, [resetOperationStatus]);

  const fetchAlcatteiaUsers = useCallback(async () => {
    setOperationStatus({ type: "loading", message: "Carregando usuários disponíveis..." });
    try {
      const data = await teamManagementService.fetchAllAlcatteiaUsers();
      setAlcatteiaAvailableUsers(data);
      setOperationStatus({ type: "success", message: "Usuários disponíveis carregados." });
    } catch (error) {
      console.error("Falha ao carregar usuários da Alcatéia:", error);
      setOperationStatus({ type: "error", message: "Erro ao carregar usuários da Alcatéia." });
    } finally {
      setTimeout(resetOperationStatus, 3000);
    }
  }, [resetOperationStatus]);

  const addMemberToTeam = useCallback(async (memberData) => {
    setOperationStatus({ type: "loading", message: "Adicionando membro..." });
    try {
      const addedMember = await teamManagementService.addTeamMember(memberData);
      setMembers((prevMembers) => [...prevMembers, addedMember]);
      setAlcatteiaAvailableUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== addedMember.id)
      );
      setOperationStatus({ type: "success", message: `${addedMember.name} adicionado(a) à equipe!` });
    } catch (error) {
      console.error("Falha ao adicionar membro:", error);
      setOperationStatus({ type: "error", message: `Erro ao adicionar: ${error.message || 'Verifique o console.'}` });
    } finally {
      setTimeout(resetOperationStatus, 3000);
    }
  }, [resetOperationStatus]);

  const removeMemberFromTeam = useCallback(async (memberId) => {
    setOperationStatus({ type: "loading", message: "Removendo membro..." });
    try {
      await teamManagementService.removeTeamMember(memberId);
      const removedMember = members.find(m => m.id === memberId);
      setMembers((currentMembers) =>
        currentMembers.filter((m) => m.id !== memberId)
      );
      if (removedMember) {
        setAlcatteiaAvailableUsers((prevUsers) => {
          const isAlreadyAvailable = prevUsers.some(
            (u) => u.id === removedMember.id
          );
          if (!isAlreadyAvailable) {
            return [...prevUsers, removedMember].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
          }
          return prevUsers;
        });
      }
      setOperationStatus({ type: "success", message: "Membro removido com sucesso!" });
    } catch (error) {
      console.error("Falha ao remover membro:", error);
      setOperationStatus({ type: "error", message: `Erro ao remover: ${error.message || 'Verifique o console.'}` });
    } finally {
      setTimeout(resetOperationStatus, 3000);
    }
  }, [members, resetOperationStatus]);

  const sendFeedback = useCallback(async (feedbackData) => {
    setOperationStatus({ type: "loading", message: "Enviando feedback..." });
    try {
      await addFeedback(feedbackData);
      setOperationStatus({ type: "success", message: "Feedback enviado com sucesso!" });
    } catch (error) {
      console.error("Falha ao enviar feedback:", error);
      setOperationStatus({ type: "error", message: `Erro ao enviar feedback: ${error.message || 'Verifique o console.'}` });
    } finally {
      setTimeout(resetOperationStatus, 3000);
    }
  }, [resetOperationStatus]);

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