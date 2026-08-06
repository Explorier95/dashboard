import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../api/client";

export function StudentFocus() {
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [aufgaben, setAufgaben] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/users?role=STUDENT"),
      apiFetch("/api/evaluations"),
      apiFetch("/api/aufgabenpool"),
    ])
      .then(([studentsData, evaluationsData, aufgabenData]) => {
        setStudents(studentsData);
        setEvaluations(evaluationsData);
        setAufgaben(aufgabenData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Schülerfokus-Daten:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const aufgabeById = useMemo(() => {
    const map = new Map();
    aufgaben.forEach((a) => map.set(String(a.id), a));
    return map;
  }, [aufgaben]);

  const selectedStudent = useMemo(() => {
    if (!selectedId) return null;
    return students.find((s) => String(s.id) === String(selectedId)) || null;
  }, [students, selectedId]);

  const studentAnswers = useMemo(() => {
    if (!selectedId) return [];
    return evaluations.filter((e) => String(e.studentId) === String(selectedId));
  }, [evaluations, selectedId]);

  // ---------- KPIs ----------
  // bewertungen speichert eine rohe Punktzahl statt eines richtig/falsch-Flags -
  // wir zeigen daher den Durchschnitt statt einer erfundenen Genauigkeits-Metrik.
  const kpis = useMemo(() => {
    const total = studentAnswers.length;
    const scores = studentAnswers.map((a) => Number(a.score) || 0);
    const averageScore = total > 0 ? scores.reduce((sum, s) => sum + s, 0) / total : 0;
    const withHint = studentAnswers.filter((a) => a.usedHint === true).length;
    return { total, averageScore, withHint };
  }, [studentAnswers]);

  // ---------- Themen: Durchschnittspunktzahl pro Thema (aus aufgabenpool.thema) ----------
  const conceptRows = useMemo(() => {
    const buckets = new Map();
    studentAnswers.forEach((a) => {
      const aufgabe = aufgabeById.get(String(a.aufgabeId));
      const concept = aufgabe?.thema || "Ohne Thema";
      if (!buckets.has(concept)) buckets.set(concept, { total: 0, sum: 0 });
      const b = buckets.get(concept);
      b.total += 1;
      b.sum += Number(a.score) || 0;
    });

    const rows = Array.from(buckets.entries()).map(([concept, b]) => ({
      concept,
      averageScore: b.total > 0 ? b.sum / b.total : 0,
      count: b.total,
    }));

    const maxAvg = Math.max(1, ...rows.map((r) => r.averageScore));
    return rows
      .map((r) => ({ ...r, relativeMastery: Math.round((r.averageScore / maxAvg) * 100) }))
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, 9);
  }, [studentAnswers, aufgabeById]);

  // ---------- Zusammenfassung: über- vs. unterdurchschnittliche Themen ----------
  const conceptSummary = useMemo(() => {
    if (conceptRows.length === 0) return { good: [], needs: [] };
    const avgOfAvg = conceptRows.reduce((sum, r) => sum + r.averageScore, 0) / conceptRows.length;
    return {
      good: conceptRows.filter((r) => r.averageScore >= avgOfAvg).map((r) => r.concept),
      needs: conceptRows.filter((r) => r.averageScore < avgOfAvg).map((r) => r.concept),
    };
  }, [conceptRows]);

  // ---------- Antwortverlauf ----------
  const questionRows = useMemo(() => {
    return [...studentAnswers].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [studentAnswers]);

  const maxObservedScore = useMemo(
    () => Math.max(1, ...questionRows.map((q) => Number(q.score) || 0)),
    [questionRows]
  );

  // ---------- Sprachstil-Auswertung (exemplarisch, wie zuvor) ----------
  const languageReport = useMemo(() => {
    const spellingErrors = Math.max(
      0,
      Math.round(questionRows.reduce((acc, q) => acc + ((q.antwort || "").length > 40 ? 1 : 0), 0) / 3)
    );
    return { grammar: "gut", spelling: "gut", spellingErrors };
  }, [questionRows]);

  // ---------- Tutor-Empfehlung ----------
  const tutorRecommendation = useMemo(() => {
    const mainNeed = conceptSummary.needs[0];
    if (!mainNeed) {
      return "Als nächster Schritt eignet sich eine kurze Diagnosefrage ohne Unterstützung, um Stabilität zu prüfen.";
    }
    return `Als nächster Schritt: ${mainNeed} mit einer kurzen, gezielten Wiederholungsaufgabe festigen und anschließend eine Diagnosefrage stellen.`;
  }, [conceptSummary]);

  function toggleStudent(id) {
    const str = String(id);
    setSelectedId((prev) => (prev === str ? null : str));
  }

  function splitName(user) {
    const full = (user.displayName || user.username || "").trim();
    const [vorname, ...rest] = full.split(" ");
    return { vorname: vorname || full, nachname: rest.join(" ") };
  }

  if (isLoading) {
    return <div className="p-6 text-gray-500">Lade Schülerdaten...</div>;
  }

  return (
    <div className="flex h-[820px] w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Sidebar */}
      <aside className="w-[340px] bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b bg-white">
          <h2 className="text-lg font-bold text-gray-800">Schülerfokus</h2>
          <p className="text-xs text-gray-500 mt-1">
            Auswahl links, Diagnose und Details rechts.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 p-4">Fehler beim Laden: {error}</p>
        )}

        <ul className="flex-1 overflow-y-auto">
          {students.length === 0 ? (
            <li className="p-4 text-sm text-gray-400 italic">Noch keine Schüler registriert.</li>
          ) : (
            students.map((s) => {
              const active = selectedId === String(s.id);
              const { vorname, nachname } = splitName(s);
              return (
                <li key={s.id}>
                  <button
                    onClick={() => toggleStudent(s.id)}
                    className={`w-full text-left px-5 py-4 transition-colors border-b border-gray-100 hover:bg-blue-50 ${active ? "bg-blue-100 border-r-4 border-r-blue-600" : ""
                      }`}
                  >
                    <div className="font-semibold text-gray-800">
                      {vorname} {nachname}
                    </div>
                    <div className="text-xs text-gray-500">
                      {s.schoolClass ? `Klasse ${s.schoolClass} · ` : ""}ID: {s.id}
                    </div>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-white">
        {!selectedStudent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="text-4xl mb-3">Schüler auswählen</div>
            <p className="text-sm">Dann siehst du den Antwortverlauf und eine kompakte Auswertung.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="p-6 border-b bg-white flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gray-500">Schülerprofil</div>
                <div className="text-2xl font-extrabold text-gray-900">
                  {selectedStudent.displayName || selectedStudent.username}
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#f7f8fb] p-6">
              <div className="grid grid-cols-12 gap-4">
                <Card title="Überdurchschnittlich" className="col-span-12 lg:col-span-6">
                  {conceptSummary.good.length === 0 ? (
                    <div className="text-sm text-gray-500">Noch keine Daten vorhanden.</div>
                  ) : (
                    <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                      {conceptSummary.good.slice(0, 5).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                </Card>

                <Card title="Unterdurchschnittlich" className="col-span-12 lg:col-span-6">
                  {conceptSummary.needs.length === 0 ? (
                    <div className="text-sm text-gray-500">Aktuell keine auffälligen Themen.</div>
                  ) : (
                    <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                      {conceptSummary.needs.slice(0, 5).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                </Card>

                {/* Antwortverlauf – zentral */}
                <Card title="Antwortverlauf" className="col-span-12">
                  {questionRows.length === 0 ? (
                    <EmptyLine text="Noch keine Bewertungen vorhanden." />
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {questionRows.slice(0, 48).map((q) => {
                          const aufgabe = aufgabeById.get(String(q.aufgabeId));
                          const score = Number(q.score) || 0;
                          const ratio = maxObservedScore > 0 ? score / maxObservedScore : 0;
                          const bg = ratio >= 0.7 ? "bg-green-500" : ratio >= 0.4 ? "bg-yellow-300" : "bg-red-500";
                          const label = aufgabe?.thema || `Aufgabe ${q.aufgabeId ?? "?"}`;

                          return (
                            <div key={q.id} className="group relative" title={label}>
                              <div className={`w-8 h-8 rounded-md ${bg} opacity-95 relative`}>
                                {q.usedHint && (
                                  <span
                                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border border-white"
                                    title="Hilfe genutzt"
                                  />
                                )}
                              </div>
                              <div className="hidden group-hover:block absolute z-10 top-10 left-0 w-80 p-3 rounded-xl shadow-xl bg-white border border-gray-200">
                                <div className="text-xs text-gray-500 mb-1">
                                  {label} · {score} Punkte
                                </div>
                                <div className="text-sm text-gray-900">
                                  {q.antwort?.trim() ? q.antwort : "Keine Antwort hinterlegt"}
                                </div>
                                {q.feedback && (
                                  <div className="text-xs text-gray-500 mt-1 italic">{q.feedback}</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <KpiCard
                        title="Durchschnittliche Punktzahl"
                        value={kpis.averageScore.toFixed(1)}
                        subtitle={`${kpis.total} Bewertungen`}
                        className="col-span-12 md:col-span-4"
                      />
                      <div className="mt-3 text-xs text-gray-500 flex items-center gap-4 flex-wrap">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-green-500" /> hohe Punktzahl
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-yellow-300" /> mittlere Punktzahl
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-red-500" /> niedrige Punktzahl
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-blue-500" /> Hilfe genutzt
                        </span>
                      </div>
                    </>
                  )}
                </Card>

                {/* Themen & Durchschnittspunktzahl */}
                <Card title="Themen & Durchschnittspunktzahl" className="col-span-12 lg:col-span-8">
                  {conceptRows.length === 0 ? (
                    <EmptyLine text="Noch keine Themendaten vorhanden." />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-xs text-gray-500 border-b">
                            <th className="text-left py-2 pr-3 font-semibold">Thema</th>
                            <th className="text-left py-2 pr-3 font-semibold">Ø Punktzahl</th>
                            <th className="text-left py-2 font-semibold">Erklärung</th>
                          </tr>
                        </thead>
                        <tbody>
                          {conceptRows.map((r) => (
                            <tr key={r.concept} className="border-b last:border-b-0">
                              <td className="py-3 pr-3 font-medium text-gray-900 whitespace-nowrap">
                                {r.concept}
                              </td>
                              <td className="py-3 pr-3">
                                <div className="flex items-center gap-3">
                                  <MasteryCell value={r.relativeMastery} />
                                  <span className="font-semibold text-gray-800 w-16">
                                    {r.averageScore.toFixed(1)} Pkt.
                                  </span>
                                </div>
                              </td>
                              <td className="py-2">
                                <input
                                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                  placeholder="Woran liegt es? (Notiz / Hypothese)"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>

                {/* Sprachstil-Auswertung */}
                <Card title="Sprachstil-Auswertung" className="col-span-12 lg:col-span-4">
                  <div className="space-y-3">
                    <MiniLine label="Grammatik" value={languageReport.grammar} />
                    <MiniLine label="Rechtschreibung" value={languageReport.spelling} />
                    <MiniLine label="Rechtschreibfehler" value={`${languageReport.spellingErrors}`} />
                    <div className="pt-2 border-t border-gray-200 text-xs text-gray-500">
                      Hinweis: Diese Auswertung ist exemplarisch. Später kann hier eine regelbasierte
                      oder modellgestützte Analyse integriert werden.
                    </div>
                  </div>
                </Card>

                {/* Tutor-Empfehlung */}
                <Card title="Tutor-Empfehlung" className="col-span-12">
                  <div className="text-sm text-gray-800">{tutorRecommendation}</div>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ----------------- UI Helpers ----------------- */

function Card({ title, className = "", children }) {
  return (
    <section className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-extrabold text-gray-900">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function KpiCard({ title, value, subtitle, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 ${className}`}>
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-3xl font-extrabold text-gray-900 mt-1">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
  );
}

function EmptyLine({ text }) {
  return (
    <div className="text-sm text-gray-500 bg-white/60 border border-dashed border-gray-300 rounded-xl p-4">
      {text}
    </div>
  );
}

function MasteryCell({ value }) {
  const bg =
    value >= 75 ? "bg-green-600" :
      value >= 55 ? "bg-green-400" :
        value >= 40 ? "bg-yellow-300" :
          value >= 25 ? "bg-yellow-200" :
            "bg-red-700";

  return <div className={`w-10 h-6 rounded-md ${bg} opacity-90`} />;
}

function MiniLine({ label, value }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}
