import React, { useState } from 'react';

export default function QuizChat() {
  // State für alle Nachrichten im Chat
  const [messages, setMessages] = useState([]);
  // State für das aktuelle Eingabefeld
  const [inputValue, setInputValue] = useState('');
  // State um zu zeigen, ob die KI gerade "tippt"
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Nachricht des Studenten zum Chat hinzufügen
    const newUserMessage = { sender: 'student', text: inputValue };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // 2. Hier kommt deine Verbindung zum Spring Boot Backend!
    try {
      /* // Beispiel für deinen Fetch-Call zum Backend, welches dann n8n ansteuert:
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newUserMessage.text })
      });
      const data = await response.json();
      */

      // Simuliere die Antwort der KI (On-Task-Check & Begrüßung)
      setTimeout(() => {
        const agentResponse = { 
          sender: 'agent', 
          text: 'Hallo! Lass uns mit dem Quiz starten. Bist du bereit für die erste Frage?' 
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border border-gray-300 rounded-lg shadow-lg flex flex-col h-[600px] bg-white">
      
      {/* Header */}
      <div className="bg-ipn-primary text-white px-4 py-2 rounded hover:bg-blue-700">
        <h1 className="text-white text-xl font-bold">Quiz-Chat</h1>
        <p className="text-sm opacity-90">Schreibe eine Nachricht, um zu beginnen.</p>
      </div>

      {/* Chat Verlauf (Scrollable) */}
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
        {isLoading && (
          <div className="text-gray-500 text-sm italic self-start bg-gray-100 p-2 rounded-lg">
            KI-Agent tippt...
          </div>
        )}
      </div>

      {/* Eingabebereich */}
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