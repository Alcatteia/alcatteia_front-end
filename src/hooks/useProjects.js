// hooks/useProjects.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (name) => {
    try {
      const response = await api.post('/projects', { name });
      setProjects(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, isLoading, createProject };
}