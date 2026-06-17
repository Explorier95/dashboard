// AskAI.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { textStyles } from "../styling/stylingVariants.jsx";

export default function AskAI({
  placeholder = "Frage etwas zu deiner Klasse!",
  maxChars = 600,
  disabled = false,
  isGenerating = false,
  onSend = (message) => console.log("send:", message),
  onStop = () => console.log("stop"),
}) {
  const [value, setValue] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const trimmed = useMemo(() => value.trim(), [value]);
  const remaining = maxChars - value.length;
  const canSend = !disabled && !isGenerating && trimmed.length > 0 && remaining >= 0;

  // Kompaktes Autosize
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  function handleSend() {
    if (!canSend) return;
    onSend(trimmed);
    setValue("");
    setIsFocused(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const prompts = [
    "Wer braucht Unterstützung?",
    "Auffällige Fehlerarten?",
    "Nächster Übungsschritt?",
    "Kurze Zusammenfassung",
  ];

  return (
    <div className="bg-stone-100 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      {/* Titel zentriert */}
      <h2 className={`${textStyles.headlineElements} text-center`}>
        Frag den Tutor
      </h2>

      <div className="mt-3 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-3">
        <div
          className={[
            "rounded-xl border bg-slate-50 transition-colors",
            disabled
              ? "border-slate-200 opacity-70"
              : isFocused
              ? "border-slate-300 bg-white"
              : "border-slate-200 hover:border-slate-300",
          ].join(" ")}
        >
          <div className="flex items-end gap-2 px-3 py-2">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              placeholder={placeholder}
              rows={isFocused ? 3 : 1}
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none leading-5"
            />

            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                className="text-sm font-semibold px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className={[
                  "text-sm font-semibold px-3 py-2 rounded-lg",
                  "bg-ipn-primary text-white",
                  canSend
                    ? "opacity-100 hover:opacity-95"
                    : "opacity-70 cursor-not-allowed",
                ].join(" ")}
              >
                Senden
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-3 pb-2">
            <button
              type="button"
              className="text-xs text-slate-500 hover:text-slate-700"
              onClick={() => setShowPrompts((s) => !s)}
              disabled={disabled || isGenerating}
            >
              {showPrompts ? "Vorschläge ausblenden" : "Vorschläge"}
            </button>

            <span className="text-xs text-slate-500">
              {remaining < 0 ? (
                <span className="text-red-600 font-medium">
                  Zu lang ({-remaining})
                </span>
              ) : (
                remaining
              )}
            </span>
          </div>
        </div>

        {showPrompts && (
          <div className="mt-2 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setValue((prev) => (prev ? prev + " " + p : p))}
                className="text-xs px-3 py-1.5 rounded-full border bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
