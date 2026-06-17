import { useState } from "react";

export function Conversation({ data }) {
  const [isStudentView, setStudentView] = useState(null);

  function toggleView(viewId) {
    const id = String(viewId);
    setStudentView((prev) => (prev === id ? null : id));
  }

  // Hilfsfunktion für die Bubbles
  function renderMessages(studentId) {
    const studentAnswers = data.schueler_antworten.filter(a => String(a.schueler_id) === String(studentId));
    console.log("Student: " +  studentAnswers);
    const tutorAnswers = data.tutor_assessments.filter(t => String(t.schueler_id) === String(studentId));
    console.log("Tutor: " + tutorAnswers);


   return (
    <div className="flex flex-col gap-6 p-4 w-full"> 
      
      {studentAnswers.map((s) => (

        <div key={s.id} className="flex flex-col w-full">
          

          <div className="self-start max-w-[80%] mb-1">
            <div className={`p-3 rounded-2xl rounded-tl-none shadow-sm ${s.is_correct ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
              {s.student_text || "Nicht geantwortet"}
            </div>
            <span className="text-[10px] text-gray-400 ml-1">Schüler</span>
          </div>

          {tutorAnswers.map((t) => (
            s.frage_nmbr === t.frage_nmbr && (
              <div key={t.id} className="self-end ml-auto max-w-[80%] text-right mt-2">
                <div className="bg-ipn-tutor-chat text-blue-950 p-3 rounded-2xl rounded-tr-none shadow-md">
                  {t.tutor_text || "Keine Bewertung vorhanden"}
                </div>
                <span className="text-[10px] text-gray-400 mr-1">Tutor (Du)</span>
              </div>
            )
          ))}
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
          {data.schueler.map((student) => (
            <li key={student.id}>
              <button
                onClick={() => toggleView(student.id)}
                className={`w-full text-left p-4 transition-colors border-b border-gray-100 hover:bg-blue-50 ${
                  isStudentView === String(student.id) ? "bg-blue-100 border-r-4 border-r-blue-600" : ""
                }`}
              >
                <div className="font-semibold text-gray-700">{student.vorname} {student.nachname}</div>
                
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* HAUPTBEREICH: Chat-Verlauf */}
      <main className="flex-1 flex flex-col bg-white">
        {isStudentView ? (
          <>
            {/* Chat Header */}
            <header className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
              <span className="font-bold text-gray-700">
                Konversation mit {data.schueler.find(s => String(s.id) === isStudentView)?.vorname}
              </span>
            </header>

            {/* Nachrichten-Bereich */}
            <div className="flex-1 overflow-y-auto bg-[#f0f2f5]">
              {renderMessages(isStudentView)}
            </div>
          </>
        ) : (
          /* Placeholder wenn niemand ausgewählt ist */
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="text-5xl mb-4">💬</div>
            <p>Wähle einen Schüler aus der Liste aus,</p>
            <p>um die Antworten zu sehen.</p>
          </div>
        )}
      </main>
    </div>
  );
}