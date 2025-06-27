import { useState, useEffect } from 'react';
// import axios from 'axios'; // Se estiver usando axios

const useReportData = (teamId, shouldFetch) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch || !teamId) {
      setReportData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      setReportData(null);

      try {
        // --- Substitua por sua chamada real à API ---
        // Exemplo com Axios:
        // const response = await axios.get(`/api/report/team-performance/${teamId}`);
        // setReportData(response.data);

        // Simulando a chamada da API para desenvolvimento
        await new Promise(resolve => setTimeout(resolve, 800)); // Simula atraso
        // Aqui você pode retornar dados mockados para teste, se preferir
        // const mockData = { /* Seus dados mockados aqui, como no componente Teste */ };
        // setReportData(mockData);

        // Se a API não retornar dados ou retornar erro, trate:
        setReportData(null); // Para simular "Nenhum dado disponível" se não tiver API real

      } catch (err) {
        console.error("Erro ao carregar dados do relatório:", err);
        setError("Não foi possível carregar o relatório. Verifique sua conexão ou tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [teamId, shouldFetch]); // Dependências do hook: teamId e shouldFetch

  return { reportData, loading, error };
};

export default useReportData;