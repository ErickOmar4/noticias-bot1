export type Category = "Tecnología" | "Política" | "Economía" | "Ciencia" | "Deportes" | "Cultura"
export type Language = "ES" | "EN" | "FR" | "PT"
export type Relevance = "Alta" | "Media" | "Baja"

export interface NewsItem {
  id: number
  title: string
  category: Category
  language: Language
  source: string
  date: string
  relevance: Relevance
  summary: string
  sentiment: "positivo" | "neutro" | "negativo"
}

export const newsData: NewsItem[] = [
  { id: 1, title: "La IA supera a médicos en diagnóstico temprano de cáncer", category: "Tecnología", language: "ES", source: "El País", date: "2026-07-11", relevance: "Alta", summary: "Un nuevo modelo de IA desarrollado en Barcelona logra una precisión del 97% en detección temprana.", sentiment: "positivo" },
  { id: 2, title: "Congreso aprueba nueva ley de regulación de criptomonedas", category: "Política", language: "ES", source: "El Mundo", date: "2026-07-10", relevance: "Alta", summary: "La legislación establece un marco regulatorio para exchanges y wallets digitales en España.", sentiment: "neutro" },
  { id: 3, title: "Banco Central Europeo mantiene tipos al 3.5%", category: "Economía", language: "ES", source: "Expansión", date: "2026-07-09", relevance: "Alta", summary: "El BCE decide no modificar los tipos de interés ante señales mixtas de inflación.", sentiment: "neutro" },
  { id: 4, title: "NASA confirms water ice deposits on Mars south pole", category: "Ciencia", language: "EN", source: "Nature", date: "2026-07-11", relevance: "Alta", summary: "New radar data confirms liquid water pockets beneath the Martian ice cap.", sentiment: "positivo" },
  { id: 5, title: "Real Madrid gana la Champions League en prórroga", category: "Deportes", language: "ES", source: "Marca", date: "2026-07-08", relevance: "Media", summary: "El equipo blanco se impone al Bayern de Múnich en la final disputada en Wembley.", sentiment: "positivo" },
  { id: 6, title: "Festival de Cannes premia a directora española", category: "Cultura", language: "ES", source: "La Vanguardia", date: "2026-07-07", relevance: "Media", summary: "Lucía Puenzo gana la Palma de Oro con su película sobre la guerra civil.", sentiment: "positivo" },
  { id: 7, title: "OpenAI lanza GPT-6 con capacidades de razonamiento avanzado", category: "Tecnología", language: "ES", source: "Xataka", date: "2026-07-11", relevance: "Alta", summary: "El nuevo modelo supera benchmarks clave en matemáticas y lógica formal.", sentiment: "positivo" },
  { id: 8, title: "Crisis migratoria en el Mediterráneo llega a nivel récord", category: "Política", language: "ES", source: "El Confidencial", date: "2026-07-06", relevance: "Alta", summary: "Más de 12.000 personas han cruzado el Mediterráneo en lo que va de julio.", sentiment: "negativo" },
  { id: 9, title: "Inflation rises to 4.2% in the United States", category: "Economía", language: "EN", source: "Bloomberg", date: "2026-07-10", relevance: "Alta", summary: "Core inflation figures beat expectations, prompting Fed rate hike speculation.", sentiment: "negativo" },
  { id: 10, title: "Découverte d'un nouveau traitement contre Alzheimer", category: "Ciencia", language: "FR", source: "Le Monde", date: "2026-07-09", relevance: "Alta", summary: "Des chercheurs parisiens annoncent un médicament qui ralentit la progression de la maladie.", sentiment: "positivo" },
  { id: 11, title: "Tesla anuncia batería sólida con 1.200 km de autonomía", category: "Tecnología", language: "ES", source: "Motor.es", date: "2026-07-05", relevance: "Media", summary: "La nueva tecnología llegará a los vehículos de producción en 2027.", sentiment: "positivo" },
  { id: 12, title: "Bolsa española cae un 2.3% tras datos de empleo", category: "Economía", language: "ES", source: "Cinco Días", date: "2026-07-08", relevance: "Media", summary: "El IBEX 35 cierra en rojo arrastrado por el sector bancario y energético.", sentiment: "negativo" },
  { id: 13, title: "Novo vírus respiratório preocupa autoridades portuguesas", category: "Ciencia", language: "PT", source: "Público", date: "2026-07-07", relevance: "Alta", summary: "As autoridades de saúde monitorizam o aumento de casos de um novo vírus sazonal.", sentiment: "negativo" },
  { id: 14, title: "Metaverse adoption slows as VR headset sales drop", category: "Tecnología", language: "EN", source: "Wired", date: "2026-07-06", relevance: "Baja", summary: "Consumer enthusiasm for immersive VR wanes amid high costs and limited content.", sentiment: "negativo" },
  { id: 15, title: "Gobierno aprueba plan de vivienda social por 8.000 millones", category: "Política", language: "ES", source: "El Diario", date: "2026-07-04", relevance: "Alta", summary: "El plan contempla la construcción de 150.000 viviendas protegidas en cinco años.", sentiment: "positivo" },
  { id: 16, title: "Atlético de Madrid ficha a Mbappé por 200 millones", category: "Deportes", language: "ES", source: "AS", date: "2026-07-03", relevance: "Media", summary: "El delantero francés firma por 4 años con el club rojiblanco tras su salida del PSG.", sentiment: "neutro" },
  { id: 17, title: "Exposición de Dalí bate récord de visitas en el Reina Sofía", category: "Cultura", language: "ES", source: "ABC Cultural", date: "2026-07-02", relevance: "Baja", summary: "Más de 500.000 visitantes en los primeros dos meses desde su apertura.", sentiment: "positivo" },
  { id: 18, title: "European Parliament passes AI Liability Directive", category: "Política", language: "EN", source: "Reuters", date: "2026-07-11", relevance: "Alta", summary: "Companies deploying high-risk AI systems now face strict accountability requirements.", sentiment: "neutro" },
]

export const categoryColors: Record<Category, string> = {
  Tecnología: "#8b5cf6",
  Política: "#3b82f6",
  Economía: "#f59e0b",
  Ciencia: "#10b981",
  Deportes: "#ef4444",
  Cultura: "#ec4899",
}

export const languageColors: Record<Language, string> = {
  ES: "#10b981",
  EN: "#3b82f6",
  FR: "#f59e0b",
  PT: "#ec4899",
}
