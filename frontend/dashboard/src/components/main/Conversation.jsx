import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";

export function Conversation() {
  const [students, setStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/api/users?role=STUDENT")
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoadingStudents(false));
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    setIsLoadingMessages(true);
    apiFetch(`/api/chat/history?studentId=${selectedId}`)
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoadingMessages(false));
  }, [selectedId]);

  function toggleView(studentId) {
    const id = String(studentId);
    setSelectedId((prev) => (prev === id ? null : id));
  }

  const selectedStudent = students.find((s) => String(s.id) === selectedId);

  function renderMessages() {
    if (isLoadingMessages) {
      return <div className="p-4 text-sm text-gray-400">Lade Chatverlauf...</div>;
    }
    if (messages.length === 0) {
      return <div className="p-4 text-sm text-gray-400">Noch keine Nachrichten vorhanden.</div>;
    }

    return (
      <div className="flex flex-col gap-3 p-4 w-full">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col w-full ${m.sender === "AGENT" ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow-sm whitespace-pre-wrap ${m.sender === "AGENT"
                  ? "bg-ipn-tutor-chat text-blue-950 rounded-tr-none"
                  : "bg-gray-100 text-gray-900 rounded-tl-none"
                }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-gray-400 mx-1">
              {m.sender === "AGENT" ? "Tutor" : "Schüler"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-[600px] w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">

      {/* SIDEBAR: Schülerliste */}
      <aside className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-800">Schülerliste</h2>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {isLoadingStudents ? (
            <li className="p-4 text-sm text-gray-400">Lade Schüler...</li>
          ) : students.length === 0 ? (
            <li className="p-4 text-sm text-gray-400 italic">Noch keine Schüler registriert.</li>
          ) : (
            students.map((student) => (
              <li key={student.id}>
                <button
                  onClick={() => toggleView(student.id)}
                  className={`w-full text-left p-4 transition-colors border-b border-gray-100 hover:bg-blue-50 ${selectedId === String(student.id) ? "bg-blue-100 border-r-4 border-r-blue-600" : ""
                    }`}
                >
                  <div className="font-semibold text-gray-700">
                    {student.displayName || student.username}
                  </div>
                  {student.schoolClass && (
                    <div className="text-xs text-gray-400">Klasse {student.schoolClass}</div>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* HAUPTBEREICH: Chat-Verlauf */}
      <main className="flex-1 flex flex-col bg-white">
        {error && <div className="p-4 text-sm text-red-600">Fehler: {error}</div>}

        {selectedId ? (
          <>
            <header className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
              <span className="font-bold text-gray-700">
                Konversation mit {selectedStudent?.displayName || selectedStudent?.username}
              </span>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#f0f2f5]">
              {renderMessages()}
            </div>
          </>
        ) : (
          /* Placeholder wenn niemand ausgewählt ist */
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="text-5xl mb-4">💬</div>
            <p>Wähle einen Schüler aus der Liste aus,</p>
            <p>um die Konversation zu sehen.</p>
          </div>
        )}
      </main>
    </div>
  );
}
