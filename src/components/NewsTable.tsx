import { useState, useMemo } from "react"
import { newsData as initialData, categoryColors, languageColors, type NewsItem, type Category, type Language, type Relevance } from "../data/news"

const CATEGORIES: Category[] = ["Tecnología", "Política", "Economía", "Ciencia", "Deportes", "Cultura"]
const LANGUAGES: Language[] = ["ES", "EN", "FR", "PT"]
const RELEVANCES: Relevance[] = ["Alta", "Media", "Baja"]
const ALL_CATEGORIES = ["Todas", ...CATEGORIES]
const ALL_LANGUAGES = ["Todos", ...LANGUAGES]
const ALL_RELEVANCES = ["Todas", ...RELEVANCES]

const emptyForm = (): Omit<NewsItem, "id"> => ({
  title: "", category: "Tecnología", language: "ES", source: "",
  date: new Date().toISOString().slice(0, 10), relevance: "Media",
  summary: "", sentiment: "neutro",
})

const PER_PAGE = 8

export default function NewsTable() {
  const [data, setData] = useState<NewsItem[]>(initialData)
  const [nextId, setNextId] = useState(initialData.length + 1)

  // Filters
  const [search, setSearch]     = useState("")
  const [category, setCategory] = useState("Todas")
  const [language, setLanguage] = useState("Todos")
  const [relevance, setRelevance] = useState("Todas")
  const [sortKey, setSortKey]   = useState<"id" | "date" | "relevance">("date")
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("desc")
  const [page, setPage]         = useState(1)

  // Modals
  const [showForm, setShowForm]       = useState(false)
  const [editTarget, setEditTarget]   = useState<NewsItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null)
  const [confirmEdit, setConfirmEdit] = useState<{ item: NewsItem; form: Omit<NewsItem, "id"> } | null>(null)
  const [form, setForm]               = useState<Omit<NewsItem, "id">>(emptyForm())

  const relevanceOrder = { Alta: 3, Media: 2, Baja: 1 }

  const filtered = useMemo(() => {
    let d = data.filter((n) => {
      if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.source.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== "Todas" && n.category !== category) return false
      if (language !== "Todos" && n.language !== language) return false
      if (relevance !== "Todas" && n.relevance !== relevance) return false
      return true
    })
    d = [...d].sort((a, b) => {
      let diff = 0
      if (sortKey === "id")   diff = a.id - b.id
      if (sortKey === "date") diff = a.date.localeCompare(b.date)
      if (sortKey === "relevance") diff = relevanceOrder[a.relevance] - relevanceOrder[b.relevance]
      return sortDir === "asc" ? diff : -diff
    })
    return d
  }, [data, search, category, language, relevance, sortKey, sortDir])

  const pageCount = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc")
    else { setSortKey(key); setSortDir("desc") }
    setPage(1)
  }

  // Add
  const openAdd = () => { setForm(emptyForm()); setEditTarget(null); setShowForm(true) }

  // Edit — first show confirmation
  const openEdit = (item: NewsItem) => {
    setForm({ title: item.title, category: item.category, language: item.language, source: item.source, date: item.date, relevance: item.relevance, summary: item.summary, sentiment: item.sentiment })
    setEditTarget(item)
    setShowForm(true)
  }

  const handleFormSubmit = () => {
    if (!form.title.trim() || !form.source.trim() || !form.summary.trim()) return
    if (editTarget) {
      setConfirmEdit({ item: editTarget, form })
      setShowForm(false)
    } else {
      const newItem: NewsItem = { id: nextId, ...form }
      setData((d) => [newItem, ...d])
      setNextId((n) => n + 1)
      setShowForm(false)
      setPage(1)
    }
  }

  const confirmDoEdit = () => {
    if (!confirmEdit) return
    setData((d) => d.map((n) => n.id === confirmEdit.item.id ? { id: confirmEdit.item.id, ...confirmEdit.form } : n))
    setConfirmEdit(null)
    setEditTarget(null)
  }

  const confirmDoDelete = () => {
    if (!deleteTarget) return
    setData((d) => d.filter((n) => n.id !== deleteTarget.id))
    setDeleteTarget(null)
    if (paginated.length === 1 && page > 1) setPage((p) => p - 1)
  }

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
            Tabla de Noticias
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
            {data.length} registros totales · {filtered.length} mostrados
          </p>
        </div>
        <button onClick={openAdd} style={btnStyle("accent")}>
          <PlusIcon /> Agregar noticia
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 16 }}>
        {/* Search */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 180px" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.6 }}>Búsqueda</span>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}>
              <SearchIcon />
            </span>
            <input
              type="text" placeholder="Título o fuente…" value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              style={{ ...inputStyle, paddingLeft: 28, fontSize: 12 }}
            />
          </div>
        </div>

        <LabeledFilter label="Categoría" value={category} options={ALL_CATEGORIES} onChange={(v) => { setCategory(v); setPage(1) }} />
        <LabeledFilter label="Idioma"    value={language} options={ALL_LANGUAGES}   onChange={(v) => { setLanguage(v); setPage(1) }} />
        <LabeledFilter label="Relevancia" value={relevance} options={ALL_RELEVANCES} onChange={(v) => { setRelevance(v); setPage(1) }} />

        {(search || category !== "Todas" || language !== "Todos" || relevance !== "Todas") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 10, color: "transparent", userSelect: "none" }}>·</span>
            <button onClick={() => { setSearch(""); setCategory("Todas"); setLanguage("Todos"); setRelevance("Todas"); setPage(1) }} style={{ ...btnStyle("ghost"), fontSize: 12, padding: "6px 12px" }}>
              ✕ Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border-soft)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border-soft)" }}>
                <Th onClick={() => toggleSort("id")} sorted={sortKey === "id"} dir={sortDir}>#</Th>
                <Th>Título</Th>
                <Th>Categoría</Th>
                <Th>Idioma</Th>
                <Th>Fuente</Th>
                <Th onClick={() => toggleSort("date")} sorted={sortKey === "date"} dir={sortDir}>Fecha</Th>
                <Th onClick={() => toggleSort("relevance")} sorted={sortKey === "relevance"} dir={sortDir}>Relevancia</Th>
                <Th>Sent.</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} style={{ padding: "48px", textAlign: "center", color: "var(--text-dim)", fontSize: 14 }}>Sin resultados con los filtros actuales</td></tr>
              ) : paginated.map((item, i) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid var(--border-soft)",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(74,142,212,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"}
                >
                  <td style={{ padding: "11px 14px", color: "var(--text-dim)", fontFamily: "monospace", fontSize: 11 }}>{String(item.id).padStart(2, "0")}</td>
                  <td style={{ padding: "11px 14px", color: "var(--text-primary)", fontWeight: 500, maxWidth: 240 }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.title}>{item.title}</div>
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    <Tag color={categoryColors[item.category]}>{item.category}</Tag>
                  </td>
                  <td style={{ padding: "11px 14px" }}>
                    <Tag color={languageColors[item.language as Language]}>{item.language}</Tag>
                  </td>
                  <td style={{ padding: "11px 14px", color: "var(--text-muted)", fontSize: 12 }}>{item.source}</td>
                  <td style={{ padding: "11px 14px", color: "var(--text-dim)", fontSize: 12, whiteSpace: "nowrap" }}>{item.date}</td>
                  <td style={{ padding: "11px 14px" }}><RelevanceBadge value={item.relevance} /></td>
                  <td style={{ padding: "11px 14px" }}><SentimentDot value={item.sentiment} /></td>
                  <td style={{ padding: "11px 10px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <IconBtn title="Editar" color="var(--accent)" bg="var(--accent-dim)" onClick={() => openEdit(item)}>
                        <EditIcon />
                      </IconBtn>
                      <IconBtn title="Eliminar" color="var(--red)" bg="var(--red-bg)" onClick={() => setDeleteTarget(item)}>
                        <TrashIcon />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderTop: "1px solid var(--border-soft)" }}>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>
            {filtered.length === 0 ? "0" : `${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, filtered.length)}`} de {filtered.length}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <PageBtn disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</PageBtn>
            {Array.from({ length: Math.min(pageCount, 7) }, (_, i) => i + 1).map((p) => (
              <PageBtn key={p} active={p === page} onClick={() => setPage(p)}>{p}</PageBtn>
            ))}
            <PageBtn disabled={page === pageCount || pageCount === 0} onClick={() => setPage((p) => p + 1)}>›</PageBtn>
          </div>
        </div>
      </div>

      {/* ── MODAL: Add / Edit Form ── */}
      {showForm && (
        <Modal title={editTarget ? "Editar noticia" : "Agregar nueva noticia"} onClose={() => { setShowForm(false); setEditTarget(null) }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <FormField label="Título *">
              <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título del artículo" />
            </FormField>
            <FormField label="Resumen *">
              <textarea
                style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="Breve descripción del artículo…"
              />
            </FormField>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FormField label="Categoría">
                <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FormField>
              <FormField label="Idioma">
                <select style={inputStyle} value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value as Language })}>
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </FormField>
              <FormField label="Fuente *">
                <input style={inputStyle} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="Ej: El País" />
              </FormField>
              <FormField label="Fecha">
                <input type="date" style={inputStyle} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </FormField>
              <FormField label="Relevancia">
                <select style={inputStyle} value={form.relevance} onChange={(e) => setForm({ ...form, relevance: e.target.value as Relevance })}>
                  {RELEVANCES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </FormField>
              <FormField label="Sentimiento">
                <select style={inputStyle} value={form.sentiment} onChange={(e) => setForm({ ...form, sentiment: e.target.value as NewsItem["sentiment"] })}>
                  <option value="positivo">Positivo</option>
                  <option value="neutro">Neutro</option>
                  <option value="negativo">Negativo</option>
                </select>
              </FormField>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button onClick={() => { setShowForm(false); setEditTarget(null) }} style={btnStyle("ghost")}>Cancelar</button>
              <button onClick={handleFormSubmit} style={btnStyle("accent")}>
                {editTarget ? "Revisar cambios →" : "Agregar noticia"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── MODAL: Confirm Edit ── */}
      {confirmEdit && (
        <Modal title="Confirmar edición" onClose={() => { setConfirmEdit(null) }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>
            ¿Estás seguro de que quieres guardar los cambios en el artículo?
          </p>
          <div style={{ background: "var(--surface)", borderRadius: 10, padding: "14px 16px", marginBottom: 20, border: "1px solid var(--border-soft)" }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.5 }}>Registro</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{confirmEdit.form.title}</p>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => { setConfirmEdit(null); setShowForm(true) }} style={btnStyle("ghost")}>← Volver a editar</button>
            <button onClick={confirmDoEdit} style={btnStyle("accent")}>Sí, guardar cambios</button>
          </div>
        </Modal>
      )}

      {/* ── MODAL: Confirm Delete ── */}
      {deleteTarget && (
        <Modal title="Confirmar eliminación" onClose={() => setDeleteTarget(null)}>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>
            Esta acción no se puede deshacer. ¿Deseas eliminar el siguiente artículo?
          </p>
          <div style={{ background: "var(--red-bg)", borderRadius: 10, padding: "14px 16px", marginBottom: 20, border: "1px solid rgba(224,92,92,0.2)" }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "var(--red)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>A eliminar</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{deleteTarget.title}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-muted)" }}>{deleteTarget.source} · {deleteTarget.date}</p>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setDeleteTarget(null)} style={btnStyle("ghost")}>Cancelar</button>
            <button onClick={confirmDoDelete} style={btnStyle("danger")}>Sí, eliminar</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ── Sub-components ── */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
      padding: 20,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "24px 26px", width: "100%", maxWidth: 520,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        animation: "modalIn 0.18s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 20, padding: 0, lineHeight: 1, display: "flex" }}>✕</button>
        </div>
        {children}
      </div>
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(8px) } to { opacity:1; transform:none } }`}</style>
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 5 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function Th({ children, onClick, sorted, dir }: { children?: React.ReactNode; onClick?: () => void; sorted?: boolean; dir?: "asc" | "desc" }) {
  return (
    <th onClick={onClick} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: sorted ? "var(--accent-light)" : "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap", cursor: onClick ? "pointer" : "default", userSelect: "none" }}>
      {children}{sorted ? (dir === "asc" ? " ↑" : " ↓") : onClick ? <span style={{ opacity: 0.4 }}> ↕</span> : ""}
    </th>
  )
}

function LabeledFilter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: "0 0 auto" }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "6px 10px", minWidth: 100 }}>
        {options.map((o) => <option key={o} value={o} style={{ background: "var(--card)" }}>{o}</option>)}
      </select>
    </div>
  )
}

function PageBtn({ children, onClick, disabled, active }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: 30, height: 30, borderRadius: 7, background: active ? "var(--accent)" : "transparent", border: `1px solid ${active ? "var(--accent)" : "var(--border-soft)"}`, color: active ? "#fff" : disabled ? "var(--text-dim)" : "var(--text-muted)", fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </button>
  )
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ padding: "3px 8px", borderRadius: 5, fontSize: 11, fontWeight: 600, background: `${color}18`, color, whiteSpace: "nowrap" }}>
      {children}
    </span>
  )
}

function RelevanceBadge({ value }: { value: Relevance }) {
  const c = value === "Alta" ? "var(--red)" : value === "Media" ? "var(--yellow)" : "var(--text-dim)"
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 5, background: `${c}18`, color: c, fontSize: 11, fontWeight: 600 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />{value}
    </span>
  )
}

function SentimentDot({ value }: { value: "positivo" | "neutro" | "negativo" }) {
  const c = value === "positivo" ? "var(--green)" : value === "negativo" ? "var(--red)" : "var(--yellow)"
  const s = value === "positivo" ? "↑" : value === "negativo" ? "↓" : "→"
  return <span style={{ color: c, fontSize: 15, fontWeight: 700 }}>{s}</span>
}

function IconBtn({ children, title, color, bg, onClick }: { children: React.ReactNode; title: string; color: string; bg: string; onClick: () => void }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{ width: 30, height: 30, borderRadius: 7, background: bg, border: `1px solid ${color}30`, color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
    >
      {children}
    </button>
  )
}

/* ── Styles helpers ── */
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px",
  background: "var(--surface)", border: "1px solid var(--border-soft)",
  borderRadius: 9, color: "var(--text-primary)", fontSize: 13, outline: "none",
}

function btnStyle(variant: "accent" | "ghost" | "danger"): React.CSSProperties {
  if (variant === "accent") return { display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "var(--accent)", border: "none", borderRadius: 9, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }
  if (variant === "danger") return { display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "var(--red-bg)", border: "1px solid rgba(224,92,92,0.3)", borderRadius: 9, color: "var(--red)", fontSize: 13, fontWeight: 600, cursor: "pointer" }
  return { display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", background: "transparent", border: "1px solid var(--border)", borderRadius: 9, color: "var(--text-muted)", fontSize: 13, fontWeight: 500, cursor: "pointer" }
}

/* ── Icons ── */
function PlusIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> }
function SearchIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> }
function EditIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> }
function TrashIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> }
