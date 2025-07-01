import axios from 'axios';

const REAL_API_ACTIVE = false;
const API_BASE_URL = 'http://localhost:3001/api';

let nextFeedbackId = 1000;
const getNextFeedbackId = () => nextFeedbackId++;

let mockFeedbacksData = [
    {
        id: 1,
        from: "Líder Direto",
        subject: "Excelente Iniciativa no Projeto X",
        message: "Sua proatividade no projeto X foi fundamental para o sucesso. Continue assim!",
        read: false,
        date: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
    },
    {
        id: 2,
        from: "Colega de Equipe",
        subject: "Ótima Colaboração",
        message: "Agradeço sua ajuda na tarefa de refatoração. Sua visão foi muito útil.",
        read: false,
        date: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(),
    },
    {
        id: 3,
        from: "RH",
        subject: "Convite: Workshop de Resiliência",
        message: "Convidamos você para nosso workshop sobre resiliência. Sua participação é importante!",
        read: true,
        date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    },
    {
        id: 4,
        from: "Líder Direto",
        subject: "Feedback Mensal de Desempenho",
        message: "Olá, segue o resumo do seu desempenho mensal. Por favor, leia e agende um bate-papo.",
        read: false,
        date: new Date().toISOString(),
    },
];

export const addFeedback = async (newFeedback) => {
    if (REAL_API_ACTIVE) {
        try {
            const response = await axios.post(`${API_BASE_URL}/feedbacks`, newFeedback);
            return response.data;
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                console.warn("Serviço de Feedback: API real inacessível ao adicionar. Simulando sucesso.");
                console.log("Aguardando dados da API para o Dashboard do Líder - Adicionar Feedback.");
                const newId = getNextFeedbackId();
                const feedbackToAdd = { ...newFeedback, id: newId, date: new Date().toISOString(), read: false };
                mockFeedbacksData.push(feedbackToAdd);
                return new Promise(resolve => setTimeout(() => resolve(feedbackToAdd), 500));
            }
            console.error("Erro inesperado ao adicionar feedback da API real:", error);
            throw error;
        }
    } else {
        console.warn("Serviço de Feedback: REAL_API_ACTIVE é false. Simulando sucesso ao adicionar feedback.");
        console.log("Aguardando dados da API para o Dashboard do Líder - Adicionar Feedback.");
        const newId = getNextFeedbackId();
        const feedbackToAdd = { ...newFeedback, id: newId, date: new Date().toISOString(), read: false };
        mockFeedbacksData.push(feedbackToAdd);
        return new Promise(resolve => setTimeout(() => resolve(feedbackToAdd), 500));
    }
};

export const getFeedbacksForMember = async (memberId) => {
    if (REAL_API_ACTIVE) {
        try {
            const response = await axios.get(`${API_BASE_URL}/members/${memberId}/feedbacks`);
            return response.data;
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                console.warn(`Serviço de Feedback: API real inacessível ao buscar feedbacks para ${memberId}. Retornando dados mockados.`);
                console.log("Aguardando dados da API para o dashboard do membro/líder - Feedbacks Recebidos.");
                return mockFeedbacksData;
            }
            console.error(`Erro inesperado ao buscar feedbacks para o membro ${memberId} da API real:`, error);
            throw error;
        }
    } else {
        console.warn(`Serviço de Feedback: REAL_API_ACTIVE é false. Retornando dados mockados para o membro ${memberId}.`);
        console.log("Aguardando dados da API para o dashboard do membro/líder - Feedbacks Recebidos.");
        return new Promise(resolve => setTimeout(() => resolve(mockFeedbacksData), 500));
    }
};

export const markFeedbackAsRead = async (feedbackId) => {
    if (REAL_API_ACTIVE) {
        try {
            await axios.patch(`${API_BASE_URL}/feedbacks/${feedbackId}/read`);
            return true;
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                console.warn(`Serviço de Feedback: API real inacessível ao marcar feedback ${feedbackId} como lido. Simulando sucesso.`);
                const feedback = mockFeedbacksData.find(f => f.id === feedbackId);
                if (feedback) {
                    feedback.read = true;
                }
                return true;
            }
            console.error(`Erro inesperado ao marcar feedback ${feedbackId} como lido da API real:`, error);
            throw error;
        }
    } else {
        console.warn(`Serviço de Feedback: REAL_API_ACTIVE é false. Simulando sucesso ao marcar feedback ${feedbackId} como lido.`);
        const feedback = mockFeedbacksData.find(f => f.id === feedbackId);
        if (feedback) {
            feedback.read = true;
        }
        return new Promise(resolve => setTimeout(() => resolve(true), 200));
    }
};