import { useState } from "react"

interface Props {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) { setError("Completa todos los campos"); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1200)
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            margin: "0 auto 14px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <NewspaperIcon />
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
            color: "var(--text-primary)", margin: "0 0 5px", letterSpacing: -0.3,
          }}>
            Daily Intelligence Bot
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
            Tu dashboard de noticias con IA
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--card)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "28px 28px 24px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600,
            color: "var(--text-primary)", margin: "0 0 22px",
          }}>
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{
                display: "block", fontSize: 11, fontWeight: 600,
                color: "var(--text-dim)", marginBottom: 5,
                letterSpacing: 0.6, textTransform: "uppercase",
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@empresa.com"
                style={{
                  width: "100%", padding: "10px 13px",
                  background: "var(--surface)", border: "1px solid var(--border-soft)",
                  borderRadius: 9, color: "var(--text-primary)", fontSize: 14,
                  outline: "none", fontFamily: "var(--font-body)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--border)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border-soft)"}
              />
            </div>

            <div>
              <label style={{
                display: "block", fontSize: 11, fontWeight: 600,
                color: "var(--text-dim)", marginBottom: 5,
                letterSpacing: 0.6, textTransform: "uppercase",
              }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%", padding: "10px 13px",
                  background: "var(--surface)", border: "1px solid var(--border-soft)",
                  borderRadius: 9, color: "var(--text-primary)", fontSize: 14,
                  outline: "none", fontFamily: "var(--font-body)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--border)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border-soft)"}
              />
            </div>

            {error && (
              <p style={{
                color: "var(--red)", fontSize: 13, margin: 0,
                padding: "8px 12px", background: "var(--red-bg)",
                borderRadius: 8, border: "1px solid rgba(224,92,92,0.2)",
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "11px",
                background: loading ? "var(--surface)" : "var(--accent)",
                border: `1px solid ${loading ? "var(--border-soft)" : "transparent"}`,
                borderRadius: 9,
                color: loading ? "var(--text-muted)" : "#fff",
                fontSize: 14, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-display)",
                marginTop: 4,
                transition: "background 0.2s, opacity 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.88" }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 14, height: 14,
                    border: "2px solid var(--border)",
                    borderTopColor: "var(--text-muted)",
                    borderRadius: "50%", display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Autenticando…
                </>
              ) : "Entrar →"}
            </button>
          </form>

          <div style={{
            marginTop: 18, padding: "10px 12px",
            background: "var(--surface)", borderRadius: 8,
            border: "1px solid var(--border-soft)",
          }}>
            <p style={{ color: "var(--text-dim)", fontSize: 12, margin: 0, textAlign: "center" }}>
              Demo: usa cualquier email y contraseña
            </p>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: 12, marginTop: 18 }}>
          © 2026 Daily Intelligence Bot · v2.1.0
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--text-dim); }
      `}</style>
    </div>
  )
}

function NewspaperIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
      <path d="M18 14h-8"/>
      <path d="M15 18h-5"/>
      <path d="M10 6h8v4h-8z"/>
    </svg>
  )
}
