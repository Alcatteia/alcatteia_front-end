import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiPhone, FiX } from 'react-icons/fi';
import logoAlcatteia from '../assets/logo.png';

/**
 * Componente Sidebar.
 * Exibe a navegação lateral da aplicação.
 * Controla a visibilidade e comportamento responsivo (slide-in/out em mobile).
 * Destaca visualmente o item de navegação ativo.
 */
export default function Sidebar({ isMobile, isSidebarOpen, toggleSidebar }) {
  // Lista de itens de navegação.
  const navItems = [
    { name: 'Kanban', icon: FiClipboard, path: '/kanban' },
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'Chamada', icon: FiPhone, path: '/call' },
    { name: 'Área da Equipe', icon: FiUsers, path: '/dashboard/equipe' },
  ];

  return (
    <>
      {/* Overlay para mobile quando a sidebar está aberta. */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30  lg:hidden"
          onClick={toggleSidebar} // Fecha a sidebar ao clicar no overlay.
        ></div>
      )}

      {/* Sidebar principal. */}
      <aside
        className={`
          flex-shrink-0 bg-[#160F23] text-gray-200 h-full overflow-y-auto custom-scrollbar
          transform transition-transform duration-300 ease-in-out
          ${isMobile
            ? 
              `fixed inset-y-0 left-0 w-64 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 
              'static w-64'
          }
          lg:static lg:translate-x-0 lg:w-64 // Garante visibilidade e largura em desktop.
        `}
      >
        {/* Cabeçalho da Sidebar (Logo e botão de fechar em mobile). */}
        <div className="mb-8 flex items-center gap-3 text-center">
          <img src={logoAlcatteia} alt="Logo Alcatteia" className="ml-4  mt-4 w-15 h-15 object-contain rounded-full" />
          <h1 className="text-3xl mt-4 font-bold text-white">Alcatteia</h1>
        </div>

        {/* Navegação principal da Sidebar. */}
        <nav className="mt-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.path} 
                  // Classes aplicadas dinamicamente para destacar o item ativo.
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 transition-colors duration-200
                     ${isActive
                       ? "bg-purple-700 text-white font-semibold border-l-4 border-purple-500" // Estilo para item ativo.
                       : "hover:bg-[#2A1C3A] text-gray-300" // Estilo para item inativo.
                     }`
                  }
                  onClick={isMobile ? toggleSidebar : undefined} // Fecha a sidebar ao clicar em um item (em mobile).
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}