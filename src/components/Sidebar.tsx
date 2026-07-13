type Tab = "resumen" | "noticias" | "configuracion"

interface Props {
  collapsed: boolean
  activeTab: Tab
  onTabChange: (t: Tab) => void
  onLogout: () => void
}

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "resumen",       label: "Resumen Diario", icon: <DashIcon /> },
  { id: "noticias",      label: "Noticias",        icon: <NewsIcon /> },
  { id: "configuracion", label: "Configuración",   icon: <GearIcon /> },
]

export default function Sidebar({ collapsed, activeTab, onTabChange, onLogout }: Props) {
  const w = collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-w)"

  return (
    <aside style={{
      position: "fixed",
      top: "var(--navbar-h)",
      left: 0,
      bottom: 0,
      width: w,
      background: "var(--surface)",
      borderRight: "1px solid var(--border-soft)",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden",
      zIndex: 40,
    }}>
      {/* Nav items */}
      <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
        {!collapsed && (
          <p style={{
            fontSize: 10, fontWeight: 600, color: "var(--text-dim)",
            textTransform: "uppercase", letterSpacing: 1.1,
            margin: "0 0 10px 8px",
          }}>
            Menú
          </p>
        )}

        {navItems.map(({ id, label, icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              title={collapsed ? label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "var(--accent-dim)" : "transparent",
                border: active
                  ? "1px solid rgba(74,142,212,0.25)"
                  : "1px solid transparent",
                borderRadius: 10,
                color: active ? "var(--accent-light)" : "var(--text-muted)",
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.color = "var(--text-primary)"
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "var(--text-muted)"
                }
              }}
            >
              {active && !collapsed && (
                <span style={{
                  position: "absolute", left: 0, top: "50%",
                  transform: "translateY(-50%)",
                  width: 3, height: 18,
                  background: "var(--accent-light)",
                  borderRadius: "0 2px 2px 0",
                }} />
              )}
              <span style={{ flexShrink: 0, color: "inherit" }}>{icon}</span>
              {!collapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border-soft)", margin: "0 10px" }} />

      {/* Logout */}
      <div style={{ padding: "12px 10px 20px" }}>
        <button
          onClick={onLogout}
          title={collapsed ? "Cerrar sesión" : undefined}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            background: "transparent",
            border: "1px solid transparent",
            borderRadius: 10,
            color: "var(--text-muted)",
            fontSize: 14, fontWeight: 400,
            cursor: "pointer", width: "100%",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--red-bg)"
            e.currentTarget.style.color = "var(--red)"
            e.currentTarget.style.borderColor = "rgba(224,92,92,0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = "var(--text-muted)"
            e.currentTarget.style.borderColor = "transparent"
          }}
        >
          <span style={{ flexShrink: 0 }}><LogoutIcon /></span>
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}

/* ---- Icons ---- */
function DashIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
      <rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
    </svg>
  )
}
function NewsIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
    </svg>
  )
}
function GearIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
