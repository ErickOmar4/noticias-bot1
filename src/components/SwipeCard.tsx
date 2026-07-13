import { useRef, useState, useCallback } from "react"
import type { Profile } from "../data/profiles"

interface Props {
  profile: Profile
  isTop: boolean
  stackIndex: number
  onSwipe: (direction: "left" | "right") => void
}

const SWIPE_THRESHOLD = 90
const ROTATION_FACTOR = 0.12

export default function SwipeCard({ profile, isTop, stackIndex, onSwipe }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false })
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!isTop) return
    startPos.current = { x: e.clientX, y: e.clientY }
    setDrag({ x: 0, y: 0, active: true })
    cardRef.current?.setPointerCapture(e.pointerId)
  }, [isTop])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.active || !isTop) return
    setDrag({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
      active: true,
    })
  }, [drag.active, isTop])

  const handlePointerUp = useCallback(() => {
    if (!drag.active) return
    const { x } = drag

    if (Math.abs(x) >= SWIPE_THRESHOLD) {
      const dir = x > 0 ? "right" : "left"
      setLeaving(dir)
      setTimeout(() => onSwipe(dir), 350)
    } else {
      setDrag({ x: 0, y: 0, active: false })
    }
  }, [drag, onSwipe])

  const rotation = leaving
    ? leaving === "right" ? 25 : -25
    : drag.x * ROTATION_FACTOR

  const translateX = leaving
    ? leaving === "right" ? "120vw" : "-120vw"
    : `${drag.x}px`

  const translateY = leaving ? `${drag.y}px` : `${drag.y * 0.4}px`

  const likeOpacity = Math.min(Math.max(drag.x / SWIPE_THRESHOLD, 0), 1)
  const nopeOpacity = Math.min(Math.max(-drag.x / SWIPE_THRESHOLD, 0), 1)

  // Stack peek transforms for cards behind
  const stackScale = 1 - stackIndex * 0.05
  const stackTranslateY = -stackIndex * 14

  if (leaving) {
    return (
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${translateX}) translateY(${translateY}) rotate(${rotation}deg)`,
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex: 10 - stackIndex,
          borderRadius: 24,
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
          touchAction: "none",
        }}
        className="card-shadow-deep"
      >
        <CardContent profile={profile} likeOpacity={likeOpacity} nopeOpacity={nopeOpacity} />
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "absolute",
        inset: 0,
        transform: isTop
          ? `translateX(${translateX}) translateY(${translateY}) rotate(${rotation}deg)`
          : `scale(${stackScale}) translateY(${stackTranslateY}px)`,
        transition: drag.active && isTop
          ? "none"
          : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 10 - stackIndex,
        borderRadius: 24,
        overflow: "hidden",
        cursor: isTop ? (drag.active ? "grabbing" : "grab") : "default",
        userSelect: "none",
        touchAction: "none",
      }}
      className={stackIndex === 0 ? "card-shadow-deep" : "card-shadow"}
    >
      <CardContent
        profile={profile}
        likeOpacity={isTop ? likeOpacity : 0}
        nopeOpacity={isTop ? nopeOpacity : 0}
      />
    </div>
  )
}

function CardContent({
  profile,
  likeOpacity,
  nopeOpacity,
}: {
  profile: Profile
  likeOpacity: number
  nopeOpacity: number
}) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#1a1a2e" }}>
      {/* Photo */}
      <img
        src={profile.image}
        alt={`Foto de ${profile.name}`}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
          pointerEvents: "none",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
        }}
      />

      {/* LIKE badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 28,
          border: "4px solid #22c55e",
          borderRadius: 10,
          padding: "6px 16px",
          opacity: likeOpacity,
          transform: `rotate(-12deg)`,
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "#22c55e", fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>LIKE</span>
      </div>

      {/* NOPE badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 28,
          border: "4px solid #ef4444",
          borderRadius: 10,
          padding: "6px 16px",
          opacity: nopeOpacity,
          transform: `rotate(12deg)`,
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "#ef4444", fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>NOPE</span>
      </div>

      {/* Profile info */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
          <span style={{ color: "#fff", fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{profile.name}</span>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 24, fontWeight: 600 }}>{profile.age}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600 }}>{profile.location}</span>
        </div>

        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 400, lineHeight: 1.5, margin: "0 0 14px" }}>
          {profile.bio}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {profile.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 999,
                padding: "4px 12px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.3,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
