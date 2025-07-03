import React, { createContext, useContext, useEffect, useState } from 'react';
import checkService from '../services/checkService';

const CheckContext = createContext();

export function CheckProvider({ children }) {
  const [user, setUser] = useState({ name: 'Pedro', color: '#00E0FF', avatar: '/avatarPedro.png', id: 1 });
  const [messages, setMessages] = useState([]);
  const [mood, setMood] = useState(null);
  const [nextCheckin, setNextCheckin] = useState(null);

  const isBackendOnline = async () => {
    try {
      await checkService.ping();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    async function fetchInitialData() {
      const backOnline = await isBackendOnline();

      if (backOnline) {
        try {
          const userData = await checkService.getUser();
          const msgs = await checkService.getMessages();
          const moodData = await checkService.getCurrentMood();

          setUser(userData);
          setMessages(msgs);

          if (moodData?.selectedAt) {
            setMood(moodData.mood);
            setNextCheckin(new Date(new Date(moodData.selectedAt).getTime() + 12 * 60 * 60 * 1000));
          }
        } catch (error) {
          console.error('Erro ao carregar dados do back-end:', error);
        }
      } else {
        // MOCK LOCAL
        const localMsgs = JSON.parse(localStorage.getItem('mock_messages')) || [];
        const localMood = localStorage.getItem('mock_mood');
        const lastCheckin = localStorage.getItem('mock_mood_time');

        setMessages(localMsgs);
        if (localMood && lastCheckin) {
          setMood(localMood);
          setNextCheckin(new Date(new Date(lastCheckin).getTime() + 12 * 60 * 60 * 1000));
        }
      }
    }

    fetchInitialData();
  }, []);

  const sendMessage = async (text, isAnonymous) => {
    const message = {
      user: isAnonymous ? 'Anônimo' : user.name,
      avatar: isAnonymous ? null : user.avatar,
      text,
    };

    try {
      const savedMessage = await checkService.sendMessage(message);
      setMessages((prev) => [savedMessage, ...prev]);
    } catch (err) {
      // FALLBACK LOCAL
      const newMessage = {
        user: message.user,
        avatar: message.avatar,
        text: message.text,
        createdAt: new Date().toISOString()
      };

      const localMsgs = JSON.parse(localStorage.getItem('mock_messages')) || [];
      const updated = [newMessage, ...localMsgs];

      localStorage.setItem('mock_messages', JSON.stringify(updated));
      setMessages(updated);
    }
  };

  const selectMood = async (moodLabel) => {
    const now = new Date();
    const nextTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);

    try {
      await checkService.setMood(moodLabel);
    } catch (err) {
      // FALLBACK LOCAL
      localStorage.setItem('mock_mood', moodLabel);
      localStorage.setItem('mock_mood_time', now.toISOString());
    }

    setMood(moodLabel);
    setNextCheckin(nextTime);
  };

  return (
    <CheckContext.Provider
      value={{
        user,
        messages,
        mood,
        nextCheckin,
        sendMessage,
        selectMood,
      }}
    >
      {children}
    </CheckContext.Provider>
  );
}

export const useCheck = () => useContext(CheckContext);

