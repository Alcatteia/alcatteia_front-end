// src/pages/Dashboard/components/LeaderConfirmationActionModal.jsx
// Sem comentários

import React from 'react';
import Modal from './Modal';
import { FiMusic, FiClipboard } from 'react-icons/fi';
import { translations } from '../../../locales/translations';
import { MODAL_ID, REDIRECT_PATH, ACTION_TYPE } from '../../../hooks/useDashboardData';

export default function LeaderConfirmationActionModal({ isOpen, onClose, actionData, onConfirm }) {
  const t = (key) => translations['pt'][key] || key;

  if (!isOpen || !actionData) return null;

  const title = actionData.type === ACTION_TYPE.MODAL && actionData.data === MODAL_ID.KARAOKE
    ? t("confirmKaraokeTitle")
    : actionData.type === ACTION_TYPE.REDIRECT && actionData.data === REDIRECT_PATH.KANBAN
    ? t("confirmKanbanTitle")
    : t("confirmActionTitle");

  const confirmationMessageContent = (
    <>
      <span className="font-bold">{actionData.attributeKey ? t(actionData.attributeKey) + ": " : ""}</span>
      {t(actionData.textKey)}{" "}
      {actionData.contextTextKey && (
        <span className="text-gray-400 italic">({t(actionData.contextTextKey)})</span>
      )}
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={<span className="text-white">{title}</span>}>
      <div className="text-center py-4 text-gray-200">
        <p className="mb-4 text-lg">{confirmationMessageContent}</p>
        <div className="flex gap-2 justify-center mt-4">
          {actionData.type === ACTION_TYPE.MODAL && actionData.data === MODAL_ID.KARAOKE && (
            <>
              <button
                onClick={() => {
                  onConfirm(ACTION_TYPE.REDIRECT, "https://link-para-sua-call-de-karaoke.com");
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex-1 flex items-center justify-center cursor-pointer"
              >
                <FiMusic className="w-5 h-5 mr-2" /> {t("reunirTeamButton")}
              </button>
              <button
                onClick={() => {
                  console.log("Retornando à tela do Karaokê simulado.");
                  alert("Você voltou para a tela de Karaokê (simulado)!");
                  onClose();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex-1 flex items-center justify-center cursor-pointer"
              >
                <FiMusic className="w-5 h-5 mr-2" /> {t("returnToKaraokeButton")}
              </button>
            </>
          )}
          {actionData.type === ACTION_TYPE.REDIRECT && actionData.data === REDIRECT_PATH.KANBAN && (
            <button
              onClick={() => {
                onConfirm(ACTION_TYPE.REDIRECT, REDIRECT_PATH.KANBAN);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex-1 flex items-center justify-center cursor-pointer"
            >
              <FiClipboard className="w-5 h-5 mr-2" /> {t("viewKanbanButton")}
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex-1 cursor-pointer"
          >
            {t("refuseButton")}
          </button>
        </div>
      </div>
    </Modal>
  );
}