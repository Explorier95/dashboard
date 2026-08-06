import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../api/client';

// 1. Array mit den Texten definieren, die nacheinander angezeigt werden sollen
const loadingSteps = [
  "Nachricht wird verarbeitet...",
  "Aufgabenkontext wird analysiert...",
  "Logic Unit bewertet die Antwort...",
  "Scaffolding-Stufe wird ermittelt...",
  "Tutor formuliert das Feedback...",
  "Fast fertig..."
];

export default function QuizChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Neuer State für den aktuellen Index der Lade-Nachrichten
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  useEffect(() => {
    apiFetch('/api/chat/history')
      .then((history) => {
        setMessages(
          history.map((entry) => ({
            sender: entry.sender === 'STUDENT' ? 'student' : 'agent',
            text: entry.text,
          }))
        );
      })
      .catch((error) => console.error('Chatverlauf konnte nicht geladen werden:', error));
  }, []);

  // 3. Der Timer-Effekt: Läuft los, sobald isLoading auf "true" gesetzt wird
  useEffect(() => {
    let intervalId;

    if (isLoading) {
      // Setze den Text zu Beginn immer auf den ersten Eintrag zurück
      setLoadingStepIndex(0); 
      
      // Wechsle alle 3000ms (3 Sekunden) zum nächsten Text
      intervalId = setInterval(() => {
        setLoadingStepIndex((prevIndex) => {
          // Stoppe beim letzten Eintrag im Array, damit es nicht "out of bounds" geht
          if (prevIndex < loadingSteps.length - 1) {
            return prevIndex + 1;
          }
          return prevIndex;
        });
      }, 3000); 
    }

    // WICHTIG: Cleanup-Funktion. Beendet den Timer, sobald isLoading wieder false wird 
    // oder die Komponente unmounted wird (verhindert Memory Leaks).
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = { sender: 'student', text: inputValue };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const data = await apiFetch('/api/chat/send', {
        method: 'POST',
        body: JSON.stringify({ message: newUserMessage.text }),
      });

      const agentResponse = {
        sender: 'agent',
        text: data.reply || 'Der Tutor hat keine Antwort geliefert.',
      };
      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error);
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: `Fehler: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg flex flex-col h-[600px] bg-white">
      <div className="bg-ipn-primary text-white px-4 py-2 rounded hover:bg-blue-700">
        <h1 className="text-white text-xl font-bold">Quiz-Chat</h1>
        <p className="text-sm opacity-90">Schreibe eine Nachricht, um zu beginnen.</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            Noch keine Nachrichten. Starte das Quiz!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] p-3 rounded-lg ${
                msg.sender === 'student'
                  ? 'bg-blue-500 text-white self-end rounded-br-none'
                  : 'bg-gray-200 text-gray-800 self-start rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        
        {/* 4. Hier wird nun der dynamische Text aus dem Array gerendert */}
        {isLoading && (
          <div className="text-gray-500 text-sm italic self-start bg-gray-100 p-2 rounded-lg flex items-center gap-2">
            <span className="animate-pulse">⌛</span> 
            {loadingSteps[loadingStepIndex]}
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-2 rounded-b-lg">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Starte hier das Quiz..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          Senden
        </button>
      </form>
    </div>
  );
}