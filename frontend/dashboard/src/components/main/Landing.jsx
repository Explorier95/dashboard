import React from "react";

export default function LandingMinimal({
  onSelectView,
  teacherName,
  classLabel = "10a",
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          Hallo Lehrkraft {teacherName}!
        </h1>

        <p className="mt-2 text-slate-600">
          Ihre Übersicht zu Klasse <span className="font-medium text-slate-900">{classLabel}</span>
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => onSelectView("overview")}
            className="rounded-2xl px-5 py-3 bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            Klassenübersicht
          </button>

          <button
            type="button"
            onClick={() => onSelectView("focus")}
            className="rounded-2xl px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 transition"
          >
            Schülerfokus
          </button>

          <button
            type="button"
            onClick={() => onSelectView("conversation")}
            className="rounded-2xl px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 transition"
          >
            Konversationen
          </button>
        </div>
      </div>
    </section>
  );
}
