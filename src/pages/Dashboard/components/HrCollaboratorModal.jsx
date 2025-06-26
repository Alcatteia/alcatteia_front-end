import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiX,
  FiInfo,
  FiFileText,
  FiCalendar,
  FiClipboard,
} from "react-icons/fi";

const ReportModal = ({ isOpen, onClose, reportId }) => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setReportData(null);
      setIsLoading(true);
      setError(null);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const fetchReport = async () => {
      try {
        const response = await axios.get(`/api/reports/${reportId}`);
        setReportData(response.data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        setError("Não foi possível carregar os dados do relatório. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    } else {
      setError("ID do relatório não fornecido.");
      setIsLoading(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reportId]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-[#1a1a2e] rounded-xl shadow-2xl max-w-3xl w-full border border-purple-800 flex flex-col max-h-[90vh]">
        
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Relatório: {reportData?.title || "Carregando..."}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Fechar Relatório"
          >
            <FiX className="w-7 h-7" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-300 overflow-y-auto custom-scrollbar flex-grow">
          {isLoading ? (
            <div className="text-center text-gray-400 py-8">Carregando relatório...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : reportData ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-lg">
                  <span className="font-semibold text-white">Data de Geração:</span>{" "}
                  {reportData.date ? new Date(reportData.date).toLocaleDateString("pt-BR") : "Não informada"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 bg-gray-800/50 p-3 rounded-md border border-gray-700">
                <span className="font-semibold text-white text-lg mr-2 flex-shrink-0">
                  ID do Relatório:
                </span>
                <span className="text-gray-300 text-md truncate flex-grow">
                  {reportData.id || "Não informado"}
                </span>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1 rounded-md flex items-center gap-1 transition shadow-sm text-sm whitespace-nowrap"
                  onClick={() => navigator.clipboard.writeText(reportData.id)}
                  title="Copiar ID"
                >
                  <FiClipboard className="w-4 h-4" /> Copiar
                </button>
              </div>

              {reportData.summary && (
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                    <FiInfo className="text-blue-400" /> Resumo Geral:
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {reportData.summary}
                  </p>
                </div>
              )}

              {reportData.sections && reportData.sections.length > 0 && (
                <div className="mt-6 space-y-4">
                  <hr />
                  {reportData.sections.map((section, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                      <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2">
                        {section.icon === 'FiFileText' && <FiFileText className="text-green-400" />}
                        {section.icon === 'FiCalendar' && <FiCalendar className="text-orange-400" />}
                        {!section.icon && <FiClipboard className="text-gray-400" />}
                        {section.title}:
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">Nenhum relatório para exibir.</div>
          )}
        </div>

        {reportData?.dateGenerated && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-700 text-right">
            <p className="text-gray-500 text-sm">
              Gerado em:{" "}
              {new Date(reportData.dateGenerated).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal;