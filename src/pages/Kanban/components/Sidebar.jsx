import { useState } from 'react';
import { FiClipboard, FiBarChart2, FiPhone, FiUsers, FiMenu } from 'react-icons/fi';
import logoAlcatteia from '../../../assets/Kanban/image/Logo1.png';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { label: "Kanban", icon: <FiClipboard />, active: true },
    { label: "Dashboard", icon: <FiBarChart2 /> },
    { label: "Call", icon: <FiPhone /> },
    { label: "Equipe", icon: <FiUsers /> }
  ];

  return (
    <>
      {/* Botão menu visível só no mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-18 left-85 z-50 p-2 bg-[#2A1C3A] rounded-lg text-white"
      >
        <FiMenu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:relative top-0 left-0 h-full z-40 w-64 bg-[#160F23] border-[#220731] border-r-4 p-4 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        {/* Cabeçalho */}
        <div className="mb-8 flex items-center gap-3">
          <img src={logoAlcatteia} alt="Logo Alcatteia" className="w-20 h-20 object-contain" />
          <h1 className="text-2xl font-bold text-white">Alcatteia</h1>
        </div>

        {/* Navegação */}
        <nav className="space-y-2">
          {items.map(({ label, icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                active
                  ? "bg-[#433157] text-white font-semibold"
                  : "text-gray-300 hover:bg-[#2A1C3A] hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
