import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [avsData, setAvsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nur noch ein einziger Fetch auf den AVS-Endpunkt
    fetch('http://localhost:8080/api/avs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json();
      })
      .then(data => {
        setAvsData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fehler beim Laden der AVS-Daten:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="p-6 text-gray-500">Lade Dialog-Daten...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Chatbot Analyse-Schnittstelle (AVS)</h1>
      
      <div className="grid gap-4">
        {avsData.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col gap-2">
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-blue-600">
                Sprecher: {item.speakerName || 'Unbekannt'}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.status === 'aktiv' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {item.status || 'Kein Status'}
              </span>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Dialog-Text</p>
              <p className="text-gray-800 bg-gray-50 p-3 rounded mt-1 font-serif">
                "{item.text}"
              </p>
            </div>

            {item.dialogstepEvaluation && (
              <div className="mt-2 bg-blue-50 p-3 rounded border border-blue-100">
                <p className="text-sm text-blue-800 font-semibold mb-1">KI-Evaluation des Schritts:</p>
                <p className="text-sm text-gray-700">{item.dialogstepEvaluation}</p>
              </div>
            )}
            
            <div className="text-xs text-gray-400 mt-2 text-right">
              VPID (ID): {item.id}
            </div>
          </div>
        ))}

        {avsData.length === 0 && (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded border">
            Keine AVS-Daten in der Datenbank gefunden.
          </p>
        )}
      </div>
    </div>
  );
}