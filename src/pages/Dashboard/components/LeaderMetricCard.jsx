// src/pages/Dashboard/components/MetricCard.jsx

import React from "react";

/**
 * @fileoverview Componente de card reutilizável para exibir uma métrica.
 * Inclui título, ícone, porcentagem, barra de progresso e tendências.
 * As cores de fundo e borda são definidas via propriedades.
 */

/**
 * Componente funcional MetricCard.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.card - Objeto contendo dados do card (title, percent, barColor, borderColor, etc.).
 * @param {function} [props.onClick] - Callback para evento de clique.
 * @param {React.ElementType} props.icon - Componente de ícone a ser renderizado.
 * @param {boolean} [props.isLoading] - Indica se os dados estão sendo carregados (implementação futura).
 * @returns {JSX.Element} Um card de métrica.
 */
export default function MetricCard({ card = {}, onClick, icon: IconComponent /*, isLoading */ }) {
  // Define um valor padrão de objeto vazio para 'card' para evitar erro de desestruturação se 'card' for undefined.
  const { borderColor, title, trend, trendColor, percent, barColor } = card;
  const desiredBackgroundColor = "#1e293b";

  /* // Implementação futura: Exibir placeholder enquanto os dados estão sendo carregados.
  // if (isLoading || percent === null || percent === undefined) {
  //   return (
  //     <div
  //       className={`card flex-1 min-w-[200px] rounded-xl p-[14px] shadow max-h-[200px]
  //                    transition-transform duration-200 animate-pulse
  //                    bg-[#1e293b] border border-gray-700`}
  //       style={{ backgroundColor: desiredBackgroundColor }}
  //     >
  //       <div className="flex items-center justify-between mb-4">
  //         <h3 className="font-semibold text-gray-500 flex items-center gap-2 text-xl">
  //           <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
  //           <div className="w-24 h-6 bg-gray-600 rounded-md"></div>
  //         </h3>
  //         <div className="w-16 h-6 bg-gray-600 rounded-full"></div>
  //       </div>
  //       <div className="w-1/2 h-8 bg-gray-600 rounded-md mb-2"></div>
  //       <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
  //         <div className="h-2.5 w-1/3 bg-gray-600 rounded-full"></div>
  //       </div>
  //     </div>
  //   );
  // }
  */

  return (
    <div
      className={`card flex-1 min-w-[200px] rounded-xl p-[14px] shadow max-h-[200px]
                   transition-transform duration-200 hover:scale-102
                   ${borderColor || "border-gray-700"} border`} // Aplica borda dinâmica ou padrão.
      style={{ backgroundColor: desiredBackgroundColor }}
      onClick={onClick}
    >
      {/* Cabeçalho do card com título, ícone e tendência */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-300 flex items-center gap-2 text-xl">
          {IconComponent && ( // Renderiza o componente de ícone se ele foi fornecido.
            <IconComponent className="w-6 h-6 text-gray-400" />
          )}
          {title} {/* Exibe o título da métrica. */}
        </h3>
        {trend && ( // Renderiza o indicador de tendência se existir.
          <div className={`${trendColor} rounded-full px-3 py-1 text-sm`}>
            {trend} {/* Exibe o texto da tendência. */}
          </div>
        )}
      </div>
      {/* Seção de valor percentual e barra de progresso */}
      {percent !== undefined && ( // Renderiza a porcentagem e a barra de progresso se a porcentagem estiver definida.
        <>
          <div className="text-4xl font-bold text-gray-100 mb-2">{percent}%</div> {/* Exibe o valor percentual. */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className={`${barColor} h-2.5 rounded-full`} // Aplica a cor da barra de progresso.
              style={{ width: `${percent}%` }} // Define a largura da barra com base na porcentagem.
            ></div>
          </div>
        </>
      )}
    </div>
  );
}