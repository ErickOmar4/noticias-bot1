export interface Profile {
  id: number
  name: string
  age: number
  location: string
  bio: string
  tags: string[]
  image: string
}

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Sofía",
    age: 26,
    location: "Barcelona",
    bio: "Fotógrafa de viajes. Siempre buscando la próxima aventura y la mejor taza de café.",
    tags: ["Fotografía", "Café", "Montañismo"],
    image: "https://images.unsplash.com/photo-1759873821395-c29de82a5b99?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Marco",
    age: 29,
    location: "Madrid",
    bio: "Arquitecto de día, cocinero aficionado de noche. Busco a alguien con quien explorar mercados locales.",
    tags: ["Arquitectura", "Cocina", "Jazz"],
    image: "https://images.unsplash.com/photo-1724118135606-b4ff6b631cd3?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Valentina",
    age: 24,
    location: "Valencia",
    bio: "Bióloga marina y amante del surf. Si no estoy en el laboratorio, estoy en el agua.",
    tags: ["Surf", "Biología", "Yoga"],
    image: "https://images.unsplash.com/photo-1778109303764-8e0ae0f816ab?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Alejandro",
    age: 31,
    location: "Sevilla",
    bio: "Músico y productor. Paso mis días entre estudios y conciertos. La música lo es todo.",
    tags: ["Música", "Guitarra", "Viajes"],
    image: "https://images.unsplash.com/photo-1780362702844-523e0dae81b0?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Lucía",
    age: 27,
    location: "Bilbao",
    bio: "Diseñadora gráfica con obsesión por los libros antiguos. Colecciono cosas raras y buenas historias.",
    tags: ["Diseño", "Literatura", "Senderismo"],
    image: "https://images.unsplash.com/photo-1772989665252-7cb41ae759cc?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Carlos",
    age: 28,
    location: "Granada",
    bio: "Ingeniero de software. Me apasiona la escalada y los videojuegos indie. Soy bastante tranquilo.",
    tags: ["Escalada", "Tech", "Gaming"],
    image: "https://images.unsplash.com/photo-1618436879587-0550e07c8edd?w=600&h=800&fit=crop&auto=format",
  },
]
