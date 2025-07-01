// src/services/dashboardService.js
import { simulatedDashboardStates } from "../data/simulatedDashboardData";

const REAL_API_ACTIVE = false;

const API_BASE_URL = "http://localhost:3001/api";

let mockSaveFunction = null;

export const setMockSaveCollaboratorObservation = (fn) => {
  mockSaveFunction = fn;
};


export const fetchDashboardData = async () => {
  if (!REAL_API_ACTIVE) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const randomIndex = Math.floor(Math.random() * simulatedDashboardStates.length);
    return {
      ...simulatedDashboardStates[randomIndex],
      lastUpdate: new Date().toISOString(),
      realApiActive: REAL_API_ACTIVE,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/dashboard-data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      ...data,
      lastUpdate: data.lastUpdate || new Date().toISOString(),
      realApiActive: REAL_API_ACTIVE,
    };
  } catch (error) {
    console.error("Erro ao buscar dados da API real:", error);
    const randomIndex = Math.floor(Math.random() * simulatedDashboardStates.length);
    return {
      ...simulatedDashboardStates[randomIndex],
      lastUpdate: new Date().toISOString(),
      realApiActive: REAL_API_ACTIVE,
    };
  }
};

export const saveCollaboratorObservation = async (collaboratorId, observationText) => {
  if (!REAL_API_ACTIVE) {
    if (mockSaveFunction) {
      mockSaveFunction(collaboratorId, observationText);
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log(`[MOCK SIMULADO] Observação guardada em memória para ${collaboratorId}: ${observationText}`);
      return true;
    } else {
      console.warn("Função mock de salvamento não registrada. Observação não persistirá.");
      return false;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/collaborators/${collaboratorId}/observation`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ observation: observationText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao salvar observação: ${response.status} - ${errorData.message || response.statusText}`);
    }

    console.log(`Observação salva com sucesso para ${collaboratorId}.`);
    return true;
  } catch (error) {
    console.error("Erro na API ao salvar observação:", error);
    return false;
  }
};