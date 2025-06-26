// src/services/feedbackService.js

let feedbacks = [
  // Exemplo de feedbacks para Talita Vitória (o mesmo email no MemberDashboard.jsx)
  {
    id: 1,
    from: "Débora Paixão",
    to: "Talita Vitória",
    toEmail: "talita.vitoria@proa.com",
    subject: "Excelente trabalho no módulo de autenticação!",
    message: "Talita, seu empenho no desenvolvimento do módulo de autenticação foi excepcional. A clareza do código e a robustez da solução são admiráveis. Continue assim!",
    date: "15/06/2025, 10:30:00",
    read: false, // Inicialmente não lido
  },
  {
    id: 2,
    from: "Seu Nome (Líder)", // Exemplo de um feedback do líder
    to: "Talita Vitória",
    toEmail: "talita.vitoria@proa.com",
    subject: "Feedback Geral - Junho",
    message: "Parabéns pela proatividade e colaboração no último sprint. Sua capacidade de resolver problemas complexos é um grande ativo para a equipe.",
    date: "10/06/2025, 14:00:00",
    read: false, // Inicialmente não lido
  },
  {
    id: 3,
    from: "Gabriel Cabral", // Exemplo de um feedback de um colega
    to: "Talita Vitória",
    toEmail: "talita.vitoria@proa.com",
    subject: "Apoio no deploy",
    message: "Obrigado pela sua ajuda no deploy da última feature. Sua experiência foi crucial para o sucesso da operação.",
    date: "05/06/2025, 09:15:00",
    read: true, // Este já veio lido
  },
  // Adicione outros feedbacks para diferentes membros, se desejar testar
  {
    id: 4,
    from: "Seu Nome (Líder)",
    to: "Gabriel Cabral",
    toEmail: "gabriel.cabral@proa.com",
    subject: "Design do Dashboard",
    message: "Gabriel, o novo design do dashboard ficou incrível, muito limpo e intuitivo! Parabéns pelo trabalho.",
    date: "17/06/2025, 11:00:00",
    read: false,
  },
];

export const addFeedback = (newFeedback) => {
  feedbacks.push(newFeedback);
  console.log("Feedback adicionado (simulado):", newFeedback);
  console.log("Todos os feedbacks atuais:", feedbacks);
};

export const getFeedbacksForMember = (memberEmail) => {
  // Retorna feedbacks onde o 'toEmail' corresponde ao email do membro logado
  return feedbacks.filter(feedback => feedback.toEmail === memberEmail);
};

export const markFeedbackAsRead = (feedbackId) => {
  const index = feedbacks.findIndex(f => f.id === feedbackId);
  if (index !== -1) {
    feedbacks[index].read = true;
    console.log(`Feedback ${feedbackId} marcado como lido.`);
  }
};

// Você pode adicionar mais funções aqui, como getSentFeedbacks, deleteFeedback, etc.