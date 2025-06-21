// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContextKanban } from '../contexts/AuthContextKanban';

export function useAuthKanban() {
  const context = useContext(AuthContextKanban);
  if (!context) {
    throw new Error('useAuthKanban must be used within an AuthProviderKanban');
  }
  return context;
}