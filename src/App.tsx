import { useState } from "react"
import LoginPage from "./components/LoginPage"
import ResumenDiario from "./components/ResumenDiario"
import NewsTable from "./components/NewsTable"
import Sidebar from "./components/Sidebar"

type Tab = "resumen" | "noticias" | "configuracion"

const TAB_META: Record<Tab, { title: string; subtitle: string }> = {
  resumen:       { title: "Resumen Diario",     subtitle: "Tu resumen de inteligencia personalizado para hoy" },
  noticias:      { title: "Noticias",            subtitle: "Descubre las noticias más relevantes de tu sector" },
  configuracion: { title: "Configuración",       subtitle: "Personaliza tu experiencia en Daily Intelligence Bot" },
}

const MOCK_USER = {
  name: "Ana García",
  role: "Analista Senior",
  avatar: "https://images.unsplash.com/photo-1759873821395-c29de82a5b99?w=80&h=80&fit=crop&auto=format",
}

export default function App() {
  const [loggedIn, setLoggedIn]     = useState(false)
  const [activeTab, setActiveTab]   = useState<Tab>("resumen")
  const [collapsed, setCollapsed]   = useState(false)

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />

  const { title, subtitle } = TAB_META[activeTab]
  const sideW = collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-w)"

  const handleTabChange = (t: Tab) => setActiveTab(t)
  const handleLogout    = () => { setLoggedIn(false); setActiveTab("resumen") }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Navbar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "var(--navbar-h)",
        background: "rgba(13,17,23,0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-soft)",
        display: "flex", alignItems: "center",
        paddingRight: 24,
        gap: 0,
      }}>
        {/* Hamburger toggle — aligned with sidebar width */}
        <div style={{
          width: sideW, flexShrink: 0,
          display: "flex", alignItems: "center",
          padding: "0 16px",
          gap: 12,
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Colapsar menú"
            style={{
              width: 34, height: 34, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--surface)",
              border: "1px solid var(--border-soft)",
              borderRadius: 9,
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border)" }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border-soft)" }}
          >
            <MenuBoxIcon />
          </button>

          {/* Brand — only show when expanded */}
          {!collapsed && (
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
              color: "var(--text-primary)", whiteSpace: "nowrap", letterSpacing: -0.2,
            }}>
              Daily<span style={{ color: "var(--accent-light)" }}>Intel</span>
            </span>
          )}
        </div>

        {/* Section title */}
        <div style={{ flex: 1, minWidth: 0, paddingLeft: 4 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {title}
          </h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {subtitle}
          </p>
        </div>

        {/* Right: user chip + salir */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "5px 12px 5px 5px",
            background: "var(--surface)", border: "1px solid var(--border-soft)",
            borderRadius: 999,
          }}>
            <img
              src={MOCK_USER.avatar} alt={MOCK_USER.name}
              style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", display: "block", flexShrink: 0 }}
            />
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{MOCK_USER.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{MOCK_USER.role}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "7px 14px",
              background: "var(--red-bg)", border: "1px solid rgba(224,92,92,0.2)",
              borderRadius: 8, color: "var(--red)", fontSize: 12, fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(224,92,92,0.18)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "var(--red-bg)"}
          >
            Salir
          </button>
        </div>
      </header>

      {/* ── Sidebar izquierdo ── */}
      <Sidebar
        collapsed={collapsed}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />

      {/* ── Main content — empuja según el ancho del sidebar ── */}
      <main style={{
        paddingTop: "var(--navbar-h)",
        marginLeft: sideW,
        transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
        minHeight: "100vh",
      }}>
        {activeTab === "resumen"       && <ResumenDiario />}
        {activeTab === "noticias"      && <NewsTable />}
        {activeTab === "configuracion" && <ConfigPage />}
      </main>
    </div>
  )
}

/* ── Hamburger icon: square with 3 lines ── */
function MenuBoxIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <line x1="7" y1="9"  x2="17" y2="9"/>
      <line x1="7" y1="13" x2="17" y2="13"/>
      <line x1="7" y1="17" x2="17" y2="17"/>
    </svg>
  )
}

function ConfigPage() {
  return (
    <div style={{ padding: "36px 32px", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--border-soft)", borderRadius: 16, padding: "28px 28px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 22px" }}>
          Preferencias
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Idioma preferido",              value: "Español" },
            { label: "Categorías de interés",         value: "Tecnología, Economía, Ciencia" },
            { label: "Frecuencia de actualizaciones", value: "Cada hora" },
            { label: "Notificaciones de alertas",     value: "Activadas" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 15px", background: "var(--surface)", borderRadius: 10, border: "1px solid var(--border-soft)" }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{value}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 20, textAlign: "center" }}>
          Funcionalidad completa disponible en la versión Pro
        </p>
      </div>
    </div>
  )
}
