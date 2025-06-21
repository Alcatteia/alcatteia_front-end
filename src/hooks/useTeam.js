import { useState, useEffect } from 'react';
import api from '../services/api';

export function useTeam() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team');
        setTeam(response.data);
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return { teamMembers: team, isLoading };
}