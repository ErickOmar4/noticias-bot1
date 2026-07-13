import { newsData, categoryColors, languageColors, type Language } from "../data/news"

const total = newsData.length
const categoriesCount = new Set(newsData.map((n) => n.category)).size
const oportunidades = newsData.filter((n) => n.sentiment === "positivo" && n.relevance === "Alta").length
const alertas = newsData.filter((n) => n.sentiment === "negativo").length

const highlightNews = newsData.filter((n) => n.relevance === "Alta").slice(0, 6)

export default function ResumenDiario() {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Stat cards — solo 4 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        <StatCard
          label="Noticias"
          value={total}
          sub="Artículos hoy"
          color="#8b5cf6"
          icon={<NewsIcon />}
        />
        <StatCard
          label="Categorías"
          value={categoriesCount}
          sub="Temas cubiertos"
          color="#3b82f6"
          icon={<GridIcon />}
        />
        <StatCard
          label="Oportunidades"
          value={oportunidades}
          sub="Alta relevancia positiva"
          color="#10b981"
          icon={<TrendUpIcon />}
        />
        <StatCard
          label="Alertas"
          value={alertas}
          sub="Noticias negativas"
          color="#ef4444"
          icon={<BellIcon />}
        />
      </div>

      {/* Noticias destacadas — mismo estilo que la imagen */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
              Noticias Destacadas
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
              Artículos de alta relevancia de hoy
            </p>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: "var(--accent-light)",
            padding: "4px 12px", background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.2)", borderRadius: 999,
          }}>
            {highlightNews.length} artículos
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {highlightNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function NewsCard({ item }: { item: typeof newsData[0] }) {
  const catColor = categoryColors[item.category]
  const langColor = languageColors[item.language as Language]
  const sentimentColor = item.sentiment === "positivo" ? "#10b981" : item.sentiment === "negativo" ? "#ef4444" : "#f59e0b"
  const sentimentLabel = item.sentiment === "positivo" ? "↑ Positivo" : item.sentiment === "negativo" ? "↓ Negativo" : "→ Neutro"

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-soft)",
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex", flexDirection: "column", gap: 10,
        transition: "transform 0.15s, box-shadow 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: catColor,
          textTransform: "uppercase", letterSpacing: 0.5,
          padding: "3px 8px", background: `${catColor}18`, borderRadius: 6,
        }}>
          {item.category}
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: langColor,
            padding: "3px 7px", background: `${langColor}18`, borderRadius: 6,
          }}>
            {item.language}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 700, color: sentimentColor,
            padding: "3px 7px", background: `${sentimentColor}18`, borderRadius: 6,
          }}>
            {sentimentLabel}
          </span>
        </div>
      </div>

      {/* Title */}
      <p style={{
        fontSize: 14, fontWeight: 700, color: "var(--text-primary)",
        margin: 0, lineHeight: 1.45,
        fontFamily: "var(--font-display)",
      }}>
        {item.title}
      </p>

      {/* Summary */}
      <p style={{
        fontSize: 13, color: "var(--text-muted)",
        margin: 0, lineHeight: 1.55, flex: 1,
      }}>
        {item.summary}
      </p>

      {/* Footer */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 10, borderTop: "1px solid var(--border-soft)",
      }}>
        <span style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 600 }}>{item.source}</span>
        <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{item.date}</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color, icon }: {
  label: string; value: number; sub: string; color: string; icon: React.ReactNode
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-soft)",
        borderRadius: 16,
        padding: "22px 20px",
        transition: "transform 0.15s, box-shadow 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.35)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center",
          color,
        }}>
          {icon}
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, marginTop: 4 }} />
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 800, color, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 6 }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function NewsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function TrendUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}
