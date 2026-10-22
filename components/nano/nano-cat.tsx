"use client";
import { CSSProperties, useEffect, useId, useRef } from "react";
import styles from "./nano-cat.module.css";

export type NanoSkin = {
  id: string;
  fur: string;
  furLight: string;
  eye: string;
  nose: string;
  aura: string;
  accessory: "lua" | "oculos" | "capacete" | "chapeu-mago" | "fone" | null;
};

// Mirrors project-nano/apps/desktop/skins/catalog.json.
export const SKINS: NanoSkin[] = [
  { id: "classico", fur: "#17161c", furLight: "#3a3846", eye: "#c6f25b", nose: "#ff8fb1", aura: "#c86bff", accessory: null },
  { id: "noturno", fur: "#0d0f1a", furLight: "#2b3157", eye: "#7fd8ff", nose: "#ff9ec4", aura: "#6d28d9", accessory: "lua" },
  { id: "estudante", fur: "#17161c", furLight: "#3a3846", eye: "#ffd25b", nose: "#ff8fb1", aura: "#22c55e", accessory: "oculos" },
  { id: "astronauta", fur: "#141420", furLight: "#3c3f5c", eye: "#9cf6ff", nose: "#ffb3c7", aura: "#0ea5e9", accessory: "capacete" },
  { id: "mago", fur: "#120f1c", furLight: "#3b2f5a", eye: "#f5b7ff", nose: "#ff8fb1", aura: "#f472b6", accessory: "chapeu-mago" },
  { id: "neon", fur: "#0a0a0f", furLight: "#272741", eye: "#00ffd0", nose: "#ff3d9a", aura: "#00e5ff", accessory: "fone" },
];

// The Founder skin stays hidden until it is revealed to founders.
export const MYSTERY_SKIN: NanoSkin = {
  id: "mystery",
  fur: "#050409",
  furLight: "#1b1530",
  eye: "#b388ff",
  nose: "#3b2a5c",
  aura: "#8447ff",
  accessory: null,
};

type Props = { className?: string; skin?: NanoSkin; mystery?: boolean };

// Same cat as the desktop app (project-nano/apps/desktop/renderer), with pupils that
// follow the cursor.
export default function NanoCat({ className = "", skin = SKINS[0], mystery = false }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  // Unique gradient ids so several cats can share a page.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = mystery ? MYSTERY_SKIN : skin;
  const vars = {
    "--fur": s.fur,
    "--furLight": s.furLight,
    "--eye": s.eye,
    "--nose": s.nose,
    "--aura": s.aura,
  } as CSSProperties;

  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pupils = svg.querySelectorAll<SVGGElement>("[data-pupil]");
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = svg.getBoundingClientRect();
        const dx = (e.clientX - (box.left + box.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (box.top + box.height * 0.45)) / window.innerHeight;
        const x = Math.max(-1, Math.min(1, dx * 2.2)) * 8;
        const y = Math.max(-1, Math.min(1, dy * 2.2)) * 7;
        pupils.forEach((p) => p.setAttribute("transform", `translate(${x} ${y})`));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const acc = (name: NanoSkin["accessory"]) => `${styles.acc} ${s.accessory === name ? styles.accOn : ""}`;

  return (
    <svg
      ref={ref}
      className={`${styles.cat} ${mystery ? styles.mystery : ""} ${className}`}
      style={vars}
      viewBox="0 0 300 300"
      role="img"
      aria-label={mystery ? "A hidden Founder skin" : "Nano, a black cat"}
    >
      <defs>
        <radialGradient id={`${uid}-fur`} cx="38%" cy="30%" r="75%">
          <stop offset="0" className={styles.stopLight} />
          <stop offset="0.55" className={styles.stopFur} />
        </radialGradient>
        <radialGradient id={`${uid}-body`} cx="40%" cy="25%" r="80%">
          <stop offset="0" className={styles.stopLight} />
          <stop offset="0.6" className={styles.stopFur} />
        </radialGradient>
        <radialGradient id={`${uid}-eye`} cx="50%" cy="65%" r="65%">
          <stop offset="0" className={styles.stopEye} />
          <stop offset="0.7" className={styles.stopEye} stopOpacity="0.85" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={`${uid}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-ear`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.stopNose} stopOpacity="0.9" />
          <stop offset="1" className={styles.stopNose} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="286" rx="80" ry="10" fill={`url(#${uid}-shadow)`} />
      <g className={styles.tail}>
        <path d="M200 255 C 255 250, 268 200, 248 168 C 238 152, 222 160, 232 176 C 246 200, 236 232, 196 238 Z" fill={`url(#${uid}-body)`} />
      </g>
      <g className={styles.body}>
        <ellipse cx="150" cy="232" rx="64" ry="54" fill={`url(#${uid}-body)`} />
        <ellipse className={styles.fur} cx="124" cy="280" rx="20" ry="11" />
        <ellipse className={styles.fur} cx="176" cy="280" rx="20" ry="11" />
        {mystery && (
          <text className={styles.question} x="150" y="262" textAnchor="middle">
            ?
          </text>
        )}
      </g>
      <g className={styles.head}>
        <path d="M72 108 C 62 66, 70 40, 82 32 C 96 40, 118 62, 128 80 Z" fill={`url(#${uid}-fur)`} />
        <path d="M82 92 C 78 70, 82 54, 86 48 C 96 56, 108 70, 114 82 Z" fill={`url(#${uid}-ear)`} />
        <path d="M228 108 C 238 66, 230 40, 218 32 C 204 40, 182 62, 172 80 Z" fill={`url(#${uid}-fur)`} />
        <path d="M218 92 C 222 70, 218 54, 214 48 C 204 56, 192 70, 186 82 Z" fill={`url(#${uid}-ear)`} />
        <ellipse cx="150" cy="140" rx="92" ry="78" fill={`url(#${uid}-fur)`} />
        <ellipse cx="118" cy="96" rx="34" ry="14" fill="#fff" opacity="0.07" transform="rotate(-18 118 96)" />

        <g className={styles.eyes}>
          {[112, 188].map((cx) => (
            <g key={cx}>
              <ellipse cx={cx} cy="144" rx="23" ry="27" fill={`url(#${uid}-eye)`} />
              <g data-pupil className={styles.pupil}>
                <ellipse cx={cx} cy="146" rx="9" ry="18" fill="#07060a" />
                <circle cx={cx - 8} cy="133" r="7" fill="#fff" />
                <circle cx={cx + 8} cy="156" r="3" fill="#fff" opacity="0.8" />
              </g>
            </g>
          ))}
        </g>

        <ellipse className={styles.blush} cx="84" cy="176" rx="14" ry="8" />
        <ellipse className={styles.blush} cx="216" cy="176" rx="14" ry="8" />
        <path className={styles.nose} d="M143 168 Q 150 164 157 168 Q 152 176 150 176 Q 148 176 143 168 Z" />
        <path d="M138 180 Q 144 187 150 180 Q 156 187 162 180" fill="none" stroke="#c9c6d6" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 168 L 30 160 M70 178 L 28 182 M230 168 L 270 160 M230 178 L 272 182" stroke="#c9c6d6" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />

        {/* Accessories, same shapes as the desktop skins */}
        <g className={acc("oculos")} fill="none" stroke="#f8d26a" strokeWidth="5">
          <circle cx="112" cy="144" r="30" />
          <circle cx="188" cy="144" r="30" />
          <path d="M142 142 Q 150 136 158 142" />
        </g>
        <g className={acc("lua")}>
          <path d="M216 36 a 18 18 0 1 0 22 22 a 14 14 0 1 1 -22 -22 Z" fill="#ffe98a" />
          <circle cx="250" cy="34" r="2.5" fill="#fff" />
          <circle cx="262" cy="56" r="1.8" fill="#fff" />
        </g>
        <g className={acc("chapeu-mago")}>
          <path d="M150 -4 L 104 74 Q 150 88 196 74 Z" fill="#4c1d95" />
          <ellipse cx="150" cy="76" rx="70" ry="12" fill="#5b21b6" />
          <circle cx="146" cy="40" r="4" fill="#fde68a" />
          <circle cx="162" cy="58" r="3" fill="#fde68a" />
        </g>
        <g className={acc("fone")}>
          <path d="M60 140 Q 60 40 150 40 Q 240 40 240 140" fill="none" stroke="#ff3d9a" strokeWidth="9" strokeLinecap="round" />
          <rect x="44" y="124" width="26" height="40" rx="12" fill="#00e5ff" />
          <rect x="230" y="124" width="26" height="40" rx="12" fill="#00e5ff" />
        </g>
        <g className={acc("capacete")}>
          <ellipse cx="150" cy="130" rx="122" ry="112" fill="#bfe9ff" opacity="0.16" stroke="#e6f6ff" strokeWidth="5" />
          <path d="M72 64 Q 110 30 160 34" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}
