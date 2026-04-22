import { useEffect, useState } from "react";
import { motion } from "motion/react";

const SECTIONS = [
  { id: "manifesto", word: "MANIFESTO" },
  { id: "diagnosis", word: "DIAGNOSIS" },
  { id: "advantage", word: "ADVANTAGE" },
  { id: "solution", word: "SOLUTION" },
  { id: "terminal", word: "TERMINAL" },
  { id: "process", word: "PROCESS" },
  { id: "contrast", word: "CONTRAST" },
  { id: "results", word: "RESULTS" },
  { id: "choice", word: "CHOICE" },
  { id: "connect", word: "CONNECT" },
];

/**
 * Minimalist circular scroll progress HUD — bottom-right.
 * Shows scroll percentage as arc stroke + current section word cycling through.
 */
export function ScrollHUD() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? h.scrollTop / total : 0;
      setProgress(p);
      setVisible(h.scrollTop > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 22;
  const C = 2 * Math.PI * R;
  const idx = Math.min(SECTIONS.length - 1, Math.floor(progress * SECTIONS.length));
  const current = SECTIONS[idx];
  const pct = Math.round(progress * 100);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pointer-events-none"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="flex flex-col items-end gap-0.5">
        <span className="uppercase text-white/70" style={{ fontSize: "0.55rem", letterSpacing: "0.35em", fontWeight: 700 }}>
          {current.word}
        </span>
        <span className="uppercase text-white/30" style={{ fontSize: "0.5rem", letterSpacing: "0.3em", fontWeight: 600 }}>
          {String(idx + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative w-14 h-14">
        <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
          <circle cx="28" cy="28" r={R} stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
          <motion.circle
            cx="28" cy="28" r={R}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.25"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white" style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {pct}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
