import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { ApiError } from "../../api/client";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const { login, register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [teacherCode, setTeacherCode] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register({ username, email, password, role, teacherCode, displayName });
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Etwas ist schiefgelaufen. Bitte erneut versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleMode() {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError(null);
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 text-center">
          {mode === "login" ? "Anmelden" : "Registrieren"}
        </h1>
        <p className="mt-1 text-sm text-slate-500 text-center">CBA-Dashboard</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="auth-username" className="block text-sm font-medium text-slate-700 mb-1">
              Benutzername
            </label>
            <input
              id="auth-username"
              type="text"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ipn-primary"
            />
          </div>

          {mode === "register" && (
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-slate-700 mb-1">
                E-Mail
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ipn-primary"
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-password" className="block text-sm font-medium text-slate-700 mb-1">
              Passwort
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ipn-primary"
            />
          </div>

          {mode === "register" && (
            <>
              <div>
                <label htmlFor="auth-display-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Anzeigename (optional)
                </label>
                <input
                  id="auth-display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ipn-primary"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-700 mb-1">Ich bin...</span>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="role"
                      value="STUDENT"
                      checked={role === "STUDENT"}
                      onChange={() => setRole("STUDENT")}
                    />
                    Schüler:in
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="role"
                      value="TEACHER"
                      checked={role === "TEACHER"}
                      onChange={() => setRole("TEACHER")}
                    />
                    Lehrer:in
                  </label>
                </div>
              </div>

              {role === "TEACHER" && (
                <div>
                  <label htmlFor="auth-teacher-code" className="block text-sm font-medium text-slate-700 mb-1">
                    Lehrer-Registrierungscode
                  </label>
                  <input
                    id="auth-teacher-code"
                    type="password"
                    required
                    value={teacherCode}
                    onChange={(e) => setTeacherCode(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ipn-primary"
                  />
                </div>
              )}
            </>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-2xl px-5 py-3 bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-60"
          >
            {isSubmitting ? "Bitte warten..." : mode === "login" ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <button
          type="button"
          onClick={toggleMode}
          className="mt-4 w-full text-sm text-slate-600 hover:text-slate-900 transition"
        >
          {mode === "login" ? "Noch keinen Account? Jetzt registrieren" : "Bereits registriert? Zum Login"}
        </button>
      </div>
    </section>
  );
}
