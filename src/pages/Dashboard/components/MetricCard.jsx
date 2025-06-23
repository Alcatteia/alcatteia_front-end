import React from "react";

/**
 * @fileoverview Componente de card reutilizável para exibir uma métrica.
 * Inclui título, ícone, porcentagem, barra de progresso e tendências.
 * As cores de fundo e borda são definidas via propriedades.
 */

/**
 * Componente funcional MetricCard.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.card - Objeto contendo dados do card (title, percent, barColor, bgColor, borderColor, etc.).
 * @param {function} [props.onClick] - Callback para evento de clique.
 * @param {React.ElementType} props.icon - Componente de ícone a ser renderizado.
 * @returns {JSX.Element} Um card de métrica.
 */
export default function MetricCard({ card, onClick, icon: IconComponent }) {
  // Desestrutura as propriedades de cor de fundo e borda do objeto 'card'.
  const { bgColor, borderColor } = card;

  return (
    <div
      // Classes CSS do Tailwind para estilo, incluindo cores dinâmicas de fundo e borda.
      // Usa 'bgColor' e 'borderColor' diretamente ou valores padrão de fallback.
      className={`card flex-1 min-w-[200px] rounded-xl p-[14px] shadow max-h-[200px]
                  transition-transform duration-200 hover:scale-102
                  ${bgColor || "bg-gray-800"} ${borderColor || "border-gray-700"} border`}
      onClick={onClick}
    >
      {/* Cabeçalho do card com título, ícone e tendência */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-300 flex items-center gap-2"> 
          {IconComponent && (
            <IconComponent className="w-5 h-5 text-gray-400" />
          )}
          {card.title}
        </h3>
        {card.trend && (
          <div className={`${card.trendColor} rounded-full px-3 py-1 text-sm`}>
            {card.trend}
          </div>
        )}
      </div>
      {/* Seção de valor percentual e barra de progresso */}
      {card.percent !== undefined && (
        <>
          <div className="text-3xl font-bold text-gray-100 mb-2">{card.percent}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className={`${card.barColor} h-2.5 rounded-full`}
              style={{ width: `${card.percent}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}