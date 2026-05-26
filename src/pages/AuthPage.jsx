import { useState } from "react"

const FIREBASE_ERRORS = {
  "auth/email-already-in-use":   "Este email ya está registrado.",
  "auth/invalid-email":          "Email no válido.",
  "auth/weak-password":          "La contraseña debe tener al menos 6 caracteres.",
  "auth/user-not-found":         "No existe una cuenta con este email.",
  "auth/wrong-password":         "Contraseña incorrecta.",
  "auth/invalid-credential":     "Email o contraseña incorrectos.",
  "auth/too-many-requests":      "Demasiados intentos. Espera un momento.",
}

export default function AuthPage({ onSignIn, onSignUp }) {
  const [mode, setMode]       = useState("login")
  const [email, setEmail]     = useState("")
  const [password, setPass]   = useState("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg]         = useState("")
  const [err, setErr]         = useState("")

  const handle = async () => {
    if (!email || !password) { setErr("Completa todos los campos."); return }
    setLoading(true); setErr(""); setMsg("")

    if (mode === "login") {
      const { error } = await onSignIn(email, password)
      if (error) setErr(FIREBASE_ERRORS[error.code] || error.message)
    } else {
      const { error } = await onSignUp(email, password)
      if (error) setErr(FIREBASE_ERRORS[error.code] || error.message)
      else setMsg("¡Cuenta creada! Ya puedes empezar.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-bold text-lg">₿</div>
          <span className="font-bold text-2xl tracking-tight">finflow</span>
        </div>
        <div className="bg-card border border-border rounded-2xl p-7">
          <h2 className="text-base font-semibold mb-6">
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
          <div className="mb-4">
            <label className="block text-xs text-muted mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent transition-colors" />
          </div>
          <div className="mb-6">
            <label className="block text-xs text-muted mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && handle()}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent transition-colors" />
          </div>
          {err && <p className="text-expense text-xs mb-4">{err}</p>}
          {msg && <p className="text-income text-xs mb-4">{msg}</p>}
          <button onClick={handle} disabled={loading}
            className={`w-full py-2.5 rounded-lg bg-accent text-black text-sm font-bold transition-opacity mb-4 ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}>
            {loading ? "Cargando..." : mode === "login" ? "Entrar" : "Registrarse"}
          </button>
          <p className="text-center text-xs text-muted">
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(""); setMsg("") }}
              className="text-accent hover:underline">
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
