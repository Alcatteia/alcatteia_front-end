import React, { createContext, useContext, useState } from 'react';

export const AuthContextKanban = createContext();

export function AuthProviderKanban({ children }) {
  // Usuário mockado (substitua pelo login real depois)
  const [user, setUser] = useState({ id: '1', name: 'Gabriel Cabral' });

  // Funções de login/logout podem ser adicionadas aqui

  return (
    <AuthContextKanban.Provider value={{ user, setUser }}>
      {children}
    </AuthContextKanban.Provider>
  );
}

// Hook para usar o contexto
export function useAuthKanban() {
  return useContext(AuthContextKanban);
}
