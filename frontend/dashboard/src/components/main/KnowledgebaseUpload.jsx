// KnowledgebaseUpload.jsx
import { useRef, useState } from "react";
import { textStyles } from "../styling/stylingVariants.jsx";
import { API_BASE_URL } from "../../api/client";

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // muss zu spring.servlet.multipart.max-file-size passen

export default function KnowledgebaseUpload({
  uploadUrl = `${API_BASE_URL}/api/knowledgebase/upload`,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [thema, setThema] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "duplicate" | "error", message: string }
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  function validateAndSetFile(file) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus({ type: "error", message: "Bitte nur PDF-Dateien auswählen." });
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setStatus({ type: "error", message: "Die Datei ist größer als 25 MB." });
      return;
    }

    setSelectedFile(file);
    setStatus(null);
  }

  function handleFileChange(e) {
    validateAndSetFile(e.target.files?.[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  }

  const trimmedThema = thema.trim();
  const canUpload = !!selectedFile && trimmedThema.length > 0 && !isUploading;

  async function handleUpload() {
    if (!canUpload) return;

    setIsUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("thema", trimmedThema);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();

        // 409 = n8n-Workflow hat das Duplikat erkannt und abgelehnt (kein technischer Fehler).
        if (response.status === 409) {
          setStatus({
            type: "duplicate",
            message: errorText || "Diese Datei wurde bereits hochgeladen.",
          });
          return;
        }

        throw new Error(errorText || `Serverfehler (${response.status})`);
      }

      setStatus({ type: "success", message: "PDF wurde erfolgreich an den Workflow übergeben." });
      setSelectedFile(null);
      setThema("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setStatus({ type: "error", message: `Upload fehlgeschlagen: ${error.message}` });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="bg-stone-100 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <h2 className={`${textStyles.headlineElements} text-center`}>
        PDF an Wissensdatenbank senden
      </h2>

      <div className="mt-3">
        <label htmlFor="knowledgebase-thema" className="block text-sm font-medium text-slate-700 mb-1">
          Thema
        </label>
        <input
          id="knowledgebase-thema"
          type="text"
          value={thema}
          onChange={(e) => setThema(e.target.value)}
          placeholder="z.B. Kohlenstoffkreislauf"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-ipn-primary"
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={[
          "mt-3 rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors bg-white",
          isDragActive ? "border-ipn-primary bg-ipn-primary/5" : "border-slate-300 hover:border-slate-400",
        ].join(" ")}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {selectedFile ? (
          <p className="text-sm text-slate-700 font-medium">{selectedFile.name}</p>
        ) : (
          <p className="text-sm text-slate-500">
            PDF hier ablegen oder klicken, um eine Datei auszuwählen
          </p>
        )}
      </div>

      {status && (
        <p
          className={`mt-2 text-sm ${
            status.type === "success"
              ? "text-green-600"
              : status.type === "duplicate"
              ? "text-amber-600"
              : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!canUpload}
          className={[
            textStyles.buttonPrimary,
            !canUpload ? "opacity-60 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {isUploading ? "Wird gesendet..." : "An n8n-Workflow senden"}
        </button>
      </div>
    </div>
  );
}
