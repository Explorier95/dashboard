import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api/client';

export default function Dashboard() {
  const [aufgaben, setAufgaben] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch('/api/aufgabenpool')
      .then(data => {
        setAufgaben(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fehler beim Laden der Aufgabenpool-Daten:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="p-6 text-gray-500">Lade Aufgabenpool...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Aufgabenpool</h1>

      {error && (
        <p className="text-red-600 italic p-4 bg-red-50 rounded border border-red-100 mb-4">
          Fehler beim Laden: {error}
        </p>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Thema</th>
              <th className="px-4 py-3">Schwierigkeit</th>
              <th className="px-4 py-3">Frage</th>
              <th className="px-4 py-3">Lösung</th>
              <th className="px-4 py-3">Quelle</th>
              <th className="px-4 py-3">Erstellt am</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {aufgaben.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 align-top">
                <td className="px-4 py-3 text-gray-400">{item.id}</td>
                <td className="px-4 py-3 font-semibold text-blue-600">{item.thema || '-'}</td>
                <td className="px-4 py-3">{item.schwierigkeit || '-'}</td>
                <td className="px-4 py-3 max-w-xs whitespace-pre-wrap">{item.frage || '-'}</td>
                <td className="px-4 py-3 max-w-xs whitespace-pre-wrap">{item.loesung || '-'}</td>
                <td className="px-4 py-3">{item.quelle || '-'}</td>
                <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                  {item.erstelltAm ? new Date(item.erstelltAm).toLocaleString('de-DE') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {aufgaben.length === 0 && (
          <p className="text-gray-500 italic p-4">
            Keine Aufgaben im Aufgabenpool gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
