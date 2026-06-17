import { useMemo, useState } from "react";

export function StudentFocus({ data }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedStudent = useMemo(() => {
    if (!selectedId) return null;
    return data.schueler.find((s) => String(s.id) === String(selectedId)) || null;
  }, [data, selectedId]);

  const studentAnswers = useMemo(() => {
    if (!selectedId) return [];
    return data.schueler_antworten.filter(
      (a) => String(a.schueler_id) === String(selectedId)
    );
  }, [data, selectedId]);

  // ---------- KPIs ----------
  const kpis = useMemo(() => {
    const total = studentAnswers.length || 0;

    // WICHTIG: "nach Hilfe korrekt" -> passe ggf. Feldnamen an
    const correctDirect = studentAnswers.filter(
      (a) =>
        a.is_correct === true &&
        !(a.used_hint === true || a.hint_level > 0)
    ).length;

    const correctAfterHelp = studentAnswers.filter(
      (a) =>
        a.is_correct === true &&
        (a.used_hint === true || a.hint_level > 0)
    ).length;

    const incorrect = studentAnswers.filter((a) => a.is_correct === false).length;

    const accuracy = total > 0 ? Math.round(((correctDirect + correctAfterHelp) / total) * 100) : 0;

    return { total, correctDirect, correctAfterHelp, incorrect, accuracy };
  }, [studentAnswers]);

  // ---------- Konzepte: reduzierte Tabelle (Konzept | Mastery | Erklärung) ----------
  const conceptRows = useMemo(() => {
    // 1) Frage -> Konzept/KC, falls vorhanden
    const questionToConcept = new Map();
    (data.fragen || []).forEach((q) => {
      const key = String(q.frage_nmbr ?? q.id ?? "");
      const concept = q.kc || q.concept || q.knowledge_component || null;
      if (key && concept) questionToConcept.set(key, concept);
    });

    // 2) Exemplarischer Fallback (damit UI nicht leer ist)
    const fallbackConcepts = [
      "Kohlenstoff in Umweltbereichen",
      "Rolle des Kohlenstoffdioxids",
      "Anorganischer Kohlenstoffkreislauf",
      "Biologischer Kohlenstoffkreislauf",
      "Fotosynthese",
      "Nahrungsketten",
      "Zellatmung",
      "Zersetzung",
      "Menschlicher Einfluss auf den Kreislauf",
    ];

    const hasRealConcepts = questionToConcept.size > 0;

    const buckets = new Map();

    studentAnswers.forEach((a, idx) => {
      const qKey = String(a.frage_nmbr ?? "");
      const concept = hasRealConcepts
        ? (questionToConcept.get(qKey) || "Gesamt")
        : fallbackConcepts[idx % fallbackConcepts.length];

      if (!buckets.has(concept)) buckets.set(concept, { total: 0, correct: 0 });
      const b = buckets.get(concept);
      b.total += 1;
      if (a.is_correct === true) b.correct += 1;
    });

    const rows = Array.from(buckets.entries()).map(([concept, b]) => {
      const mastery = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0;
      return { concept, mastery };
    });

    rows.sort((a, b) => a.mastery - b.mastery);
    return rows.slice(0, 9);
  }, [data, studentAnswers]);

  // ---------- Zusammenfassung: gut vs. noch nicht gut verstanden ----------
  const conceptSummary = useMemo(() => {
    const good = conceptRows.filter(r => r.mastery >= 70).map(r => r.concept);
    const needs = conceptRows.filter(r => r.mastery < 70).map(r => r.concept);

    return { good, needs };
  }, [conceptRows]);

  // ---------- Fragenverlauf ----------
  const questionRows = useMemo(() => {
    return [...studentAnswers].sort(
      (a, b) => (a.frage_nmbr ?? 0) - (b.frage_nmbr ?? 0)
    );
  }, [studentAnswers]);

  // ---------- Sprachstil-Auswertung (exemplarisch) ----------
  const languageReport = useMemo(() => {
    // Hier später echte NLP/Spellcheck rein.
    // Exemplarisch / placeholder:
    const spellingErrors = Math.max(
      0,
      Math.round(questionRows.reduce((acc, q) => acc + ((q.student_text || "").length > 40 ? 1 : 0), 0) / 3)
    );

    return {
      grammar: "gut",
      spelling: "gut",
      spellingErrors,
    };
  }, [questionRows]);

  // ---------- Tutor-Empfehlung (dezenter) ----------
  const tutorRecommendation = useMemo(() => {
    const mainNeed = conceptSummary.needs[0];
    if (!mainNeed) {
      return "Als nächster Schritt eignet sich eine kurze Diagnosefrage ohne Unterstützung, um Stabilität zu prüfen.";
    }
    return `Als nächster Schritt: ${mainNeed} mit einer kurzen, gezielten Wiederholungsaufgabe festigen und anschließend eine Diagnosefrage ohne Hilfe stellen.`;
  }, [conceptSummary]);

  function toggleStudent(id) {
    const str = String(id);
    setSelectedId((prev) => (prev === str ? null : str));
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

        <div className="p-4">
          <div className="relative">
            <input
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Suche Schüler…"
            />
            <span className="absolute right-3 top-2.5 text-gray-400 text-sm">⌕</span>
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {data.schueler.map((s) => {
            const active = selectedId === String(s.id);
            return (
              <li key={s.id}>
                <button
                  onClick={() => toggleStudent(s.id)}
                  className={`w-full text-left px-5 py-4 transition-colors border-b border-gray-100 hover:bg-blue-50 ${active ? "bg-blue-100 border-r-4 border-r-blue-600" : ""
                    }`}
                >
                  <div className="font-semibold text-gray-800">
                    {s.vorname} {s.nachname}
                  </div>
                  <div className="text-xs text-gray-500">ID: {s.id}</div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-white">
        {!selectedStudent ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="text-4xl mb-3">Schüler auswählen</div>
            <p className="text-sm">Dann siehst du Fragenverlauf und eine kompakte Auswertung.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="p-6 border-b bg-white flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gray-500">Schülerprofil</div>
                <div className="text-2xl font-extrabold text-gray-900">
                  {selectedStudent.vorname} {selectedStudent.nachname}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50">
                  Export
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#f7f8fb] p-6">
              <div className="grid grid-cols-12 gap-4">
                {/* Obere Zusammenfassungsfelder (gut / noch nicht gut) */}
                <Card title="Gut verstanden" className="col-span-12 lg:col-span-6">
                  {conceptSummary.good.length === 0 ? (
                    <div className="text-sm text-gray-500">Noch keine sicheren Konzepte identifiziert.</div>
                  ) : (
                    <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                      {conceptSummary.good.slice(0, 5).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                </Card>

                <Card title="Noch nicht sicher" className="col-span-12 lg:col-span-6">
                  {conceptSummary.needs.length === 0 ? (
                    <div className="text-sm text-gray-500">Aktuell keine auffälligen Schwächen.</div>
                  ) : (
                    <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                      {conceptSummary.needs.slice(0, 5).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                </Card>



                {/* Fragenverlauf – zentral */}
                <Card title="Fragenverlauf" className="col-span-12">
                  {questionRows.length === 0 ? (
                    <EmptyLine text="Noch keine Antworten vorhanden." />
                  ) : (
                    <>
                      <div className="">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {questionRows.slice(0, 48).map((q) => {
                            const helped = (q.used_hint === true || q.hint_level > 0); // ggf. anpassen
                            const ok = q.is_correct === true;

                            const bg = ok
                              ? (helped ? "bg-yellow-300" : "bg-green-500")
                              : "bg-red-500";

                            const label = `Frage ${q.frage_nmbr ?? "?"}`;

                            return (

                              <div key={q.id} className="group relative" title={label}>
                                <div className={`w-8 h-8 rounded-md ${bg} opacity-95`} />
                                <div className="hidden group-hover:block absolute z-10 top-10 left-0 w-80 p-3 rounded-xl shadow-xl bg-white border border-gray-200">
                                  <div className="text-xs text-gray-500 mb-1">{label}</div>
                                  <div className="text-sm text-gray-900">
                                    {q.student_text?.trim() ? q.student_text : "Nicht geantwortet"}
                                  </div>
                                </div>

                              </div>


                            );

                          })}
                        </div>
                        <KpiCard
                          title="Genauigkeit gesamt"
                          value={`${kpis.accuracy}%`}
                          subtitle={`${kpis.total} Antworten`}
                          className="col-span-12 md:col-span-4"
                        />
                      </div>
                      <div className="mt-3 text-xs text-gray-500 flex items-center gap-4">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-green-500" /> korrekt (direkt)
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-yellow-300" /> korrekt (nach Hilfe)
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-red-500" /> inkorrekt
                        </span>
                      </div>
                    </>
                  )}
                </Card>

                {/* Mastery – weniger Detail, Erklärung als Interaktionsfeld */}
                <Card title="Konzepte & Mastery" className="col-span-12 lg:col-span-8">
                  {conceptRows.length === 0 ? (
                    <EmptyLine text="Noch keine Konzeptdaten vorhanden." />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-xs text-gray-500 border-b">
                            <th className="text-left py-2 pr-3 font-semibold">Konzept</th>
                            <th className="text-left py-2 pr-3 font-semibold">Mastery</th>
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
                                  <MasteryCell value={r.mastery} />
                                  <span className="font-semibold text-gray-800 w-12">
                                    {r.mastery}%
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

                {/* Sprachstil-Auswertung – ersetzt ein Fenster */}
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

                {/* Dezente Tutor-Empfehlung */}
                <Card title="Tutor-Empfehlung" className="col-span-12">
                  <div className="text-sm text-gray-800">
                    {tutorRecommendation}
                  </div>
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
