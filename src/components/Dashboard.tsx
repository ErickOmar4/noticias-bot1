import { newsData, categoryColors, languageColors } from "../data/news"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts"

const total = newsData.length
const byCategory = Object.entries(
  newsData.reduce((acc, n) => { acc[n.category] = (acc[n.category] || 0) + 1; return acc }, {} as Record<string, number>)
).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

const byLanguage = Object.entries(
  newsData.reduce((acc, n) => { acc[n.language] = (acc[n.language] || 0) + 1; return acc }, {} as Record<string, number>)
).map(([name, value]) => ({ name, value }))

const byRelevance = {
  Alta: newsData.filter((n) => n.relevance === "Alta").length,
  Media: newsData.filter((n) => n.relevance === "Media").length,
  Baja: newsData.filter((n) => n.relevance === "Baja").length,
}

const bySentiment = {
  positivo: newsData.filter((n) => n.sentiment === "positivo").length,
  neutro: newsData.filter((n) => n.sentiment === "neutro").length,
  negativo: newsData.filter((n) => n.sentiment === "negativo").length,
}

// Fake timeline data for last 7 days
const timeline = [
  { day: "05 Jul", noticias: 3 },
  { day: "06 Jul", noticias: 5 },
  { day: "07 Jul", noticias: 4 },
  { day: "08 Jul", noticias: 6 },
  { day: "09 Jul", noticias: 4 },
  { day: "10 Jul", noticias: 5 },
  { day: "11 Jul", noticias: 6 },
]

const recentHigh = newsData.filter((n) => n.relevance === "Alta").slice(0, 4)

export default function Dashboard() {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>
          Dashboard Noticias
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
          Resumen de inteligencia · Actualizado hoy, 11 Jul 2026
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Noticias" value={total} sub="Últimos 7 días" color="#8b5cf6" icon="📰" />
        <StatCard label="Alta Relevancia" value={byRelevance.Alta} sub={`${Math.round(byRelevance.Alta / total * 100)}% del total`} color="#ef4444" icon="🔥" />
        <StatCard label="Idiomas" value={byLanguage.length} sub="ES · EN · FR · PT" color="#3b82f6" icon="🌍" />
        <StatCard label="Categorías" value={byCategory.length} sub="Temas cubiertos" color="#10b981" icon="🏷️" />
        <StatCard label="Sentimiento +" value={bySentiment.positivo} sub={`${Math.round(bySentiment.positivo / total * 100)}% positivo`} color="#10b981" icon="📈" />
        <StatCard label="Sentimiento −" value={bySentiment.negativo} sub={`${Math.round(bySentiment.negativo / total * 100)}% negativo`} color="#ef4444" icon="📉" />
      </div>

      {/* Charts row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Timeline */}
        <ChartCard title="Noticias por día" subtitle="Últimos 7 días">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={timeline} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#8b8aad", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8b8aad", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#14142e", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, color: "#f1f0ff", fontSize: 12 }} />
              <Area type="monotone" dataKey="noticias" stroke="#8b5cf6" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Language pie */}
        <ChartCard title="Por Idioma" subtitle="">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={byLanguage} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {byLanguage.map((entry) => (
                  <Cell key={entry.name} fill={languageColors[entry.name as keyof typeof languageColors] || "#6b7280"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#14142e", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, color: "#f1f0ff", fontSize: 12 }} />
              <Legend formatter={(value) => <span style={{ color: "#8b8aad", fontSize: 12 }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {/* Category bar */}
        <ChartCard title="Por Categoría" subtitle="Número de artículos">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={byCategory} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 8 }}>
              <XAxis type="number" tick={{ fill: "#8b8aad", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#8b8aad", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: "#14142e", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 8, color: "#f1f0ff", fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {byCategory.map((entry) => (
                  <Cell key={entry.name} fill={categoryColors[entry.name as keyof typeof categoryColors] || "#6b7280"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sentiment */}
        <ChartCard title="Análisis de Sentimiento" subtitle="Distribución general">
          <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "8px 0" }}>
            <SentimentBar label="Positivo" value={bySentiment.positivo} total={total} color="#10b981" />
            <SentimentBar label="Neutro" value={bySentiment.neutro} total={total} color="#f59e0b" />
            <SentimentBar label="Negativo" value={bySentiment.negativo} total={total} color="#ef4444" />
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, justifyContent: "center" }}>
            {[
              { label: "Positivo", value: bySentiment.positivo, color: "#10b981" },
              { label: "Neutro", value: bySentiment.neutro, color: "#f59e0b" },
              { label: "Negativo", value: bySentiment.negativo, color: "#ef4444" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: "var(--font-display)" }}>{value}</div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Recent high-relevance */}
      <ChartCard title="Noticias de Alta Relevancia" subtitle="Últimas destacadas">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 8 }}>
          {recentHigh.map((item) => (
            <div key={item.id} style={{
              padding: "14px 16px",
              background: "var(--surface)",
              border: "1px solid var(--border-soft)",
              borderRadius: 12,
              borderLeft: `3px solid ${categoryColors[item.category]}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: categoryColors[item.category], textTransform: "uppercase", letterSpacing: 0.5 }}>{item.category}</span>
                <span style={{ fontSize: 10, color: "var(--text-dim)", padding: "2px 6px", background: "var(--card)", borderRadius: 4 }}>{item.language}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 6px", lineHeight: 1.4 }}>{item.title}</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.4 }}>{item.summary}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{item.source}</span>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}

function StatCard({ label, value, sub, color, icon }: { label: string; value: number; sub: string; color: string; icon: string }) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border-soft)",
      borderRadius: 16,
      padding: "20px",
      borderTop: `2px solid ${color}`,
      transition: "transform 0.15s, box-shadow 0.15s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3)` }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginTop: 6 }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border-soft)",
      borderRadius: 16,
      padding: "20px 20px 16px",
    }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 12, color: "var(--text-dim)", margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function SentimentBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = Math.round(value / total * 100)
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: "var(--surface)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 999, transition: "width 0.8s ease" }} />
      </div>
    </div>
  )
}
