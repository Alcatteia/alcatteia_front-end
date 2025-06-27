// src/pages/Dashboard/components/LeaderSingleSuggestionDetailModal.jsx

import React from 'react';
import Modal from './Modal';
import { MdLightbulb } from 'react-icons/md';
import { FiMusic, FiClipboard } from 'react-icons/fi';
import { MODAL_ID, REDIRECT_PATH, ACTION_TYPE } from '../../../hooks/useDashboardData';


export default function LeaderSingleSuggestionDetailModal({ isOpen, onClose, suggestion, onConfirmAction, t }) {
  if (!isOpen || !suggestion) return null;

  const modalTitleText = suggestion.attributeKey
    ? `${t('suggestionToImprove')} ${t(suggestion.attributeKey)}`
    : t('recommendationDetails'); 

  const messageContent = (
    <>
      <p className="text-gray-200 text-lg mb-2">
        {t(suggestion.textKey)}
      </p>
      {suggestion.contextTextKey && (
        <p className="text-gray-400 italic text-base">
          {t('reasonForSuggestion')}: {t(suggestion.contextTextKey)}.
        </p>
      )}
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={<span className="text-white">{modalTitleText}</span>}>
      <div className="flex flex-col items-center py-4 px-2">
        <MdLightbulb className="w-10 h-10 text-yellow-400 mb-4" />
        
        <div className="text-center mb-6">
          {messageContent}
        </div>

        {/* Botões de Ação Dinâmicos */}
        {(suggestion.type === ACTION_TYPE.MODAL && suggestion.data === MODAL_ID.KARAOKE) && (
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={() => onConfirmAction(ACTION_TYPE.REDIRECT, "https://link-para-sua-call-de-karaoke.com")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 flex-1 min-w-[150px]"
            >
              <FiMusic className="w-5 h-5 mr-2" /> {t("reunirTeamButton")}
            </button>
            <button
              onClick={() => { console.log(t("returnToKaraokeSimulationLog")); alert(t("returnToKaraokeSimulation")); onClose(); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 flex-1 min-w-[150px]"
            >
              <FiMusic className="w-5 h-5 mr-2" /> {t("returnToKaraokeButton")}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 px-6 rounded-lg flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200 min-w-[150px]"
            >
              {t("refuseButton")}
            </button>
          </div>
        )}

        {(suggestion.type === ACTION_TYPE.REDIRECT && suggestion.data === REDIRECT_PATH.KANBAN) && (
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={() => onConfirmAction(ACTION_TYPE.REDIRECT, REDIRECT_PATH.KANBAN)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 flex-1 min-w-[150px]"
            >
              <FiClipboard className="w-5 h-5 mr-2" /> {t("viewKanbanButton")}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 px-6 rounded-lg flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200 min-w-[150px]"
            >
              {t("refuseButton")}
            </button>
          </div>
        )}

        {suggestion.type === ACTION_TYPE.TEXT && (
            <button
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 px-6 rounded-lg flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200 min-w-[150px]"
            >
                {t("closeButton")}
            </button>
        )}
      </div>
    </Modal>
  );
}