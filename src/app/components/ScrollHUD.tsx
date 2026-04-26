import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "../i18n";

export function ScrollHUD() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  const sections = [
    t("label.manifesto"),
    t("label.diagnosis"),
    t("label.advantage"),
    t("label.terminal"),
    t("label.process"),
    t("label.contrast"),
    t("label.results"),
    t("label.choice"),
    t("label.connect"),
  ];

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

  const r = 22;
  const c = 2 * Math.PI * r;
  const idx = Math.min(sections.length - 1, Math.floor(progress * sections.length));
  const current = sections[idx];
  const pct = Math.round(progress * 100);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-3 pointer-events-none"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="flex flex-col items-end gap-0.5">
        <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.35em", fontWeight: 700, color: "var(--fg-2)" }}>
          {current}
        </span>
        <span className="uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.3em", fontWeight: 600, color: "var(--fg-4)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative w-14 h-14">
        <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
          <circle cx="28" cy="28" r={r} stroke="var(--surface-border)" strokeWidth="1" fill="none" />
          <motion.circle
            cx="28"
            cy="28"
            r={r}
            stroke="var(--fg-1)"
            strokeWidth="1.25"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>
            {pct}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
