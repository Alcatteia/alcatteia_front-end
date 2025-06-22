// src/components/LanguageSwitcher.jsx

import React from 'react';
import { FiGlobe } from 'react-icons/fi'; // Ícone de globo

const LanguageSwitcher = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-2">
      <FiGlobe className="w-5 h-5 text-gray-400" />
      <select
        className="bg-[#1a1a2e] border border-gray-700 text-white rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;