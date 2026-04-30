import { AnimatePresence, motion } from "motion/react";
import { LANGS, useI18n } from "../i18n";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LanguageModal({ open, onClose }: Props) {
  const { lang, setLang, t } = useI18n();
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const onClick = (e: MouseEvent) => {
      if (!popRef.current) return;
      const target = e.target as HTMLElement;
      if (popRef.current.contains(target)) return;
      if (target.closest?.('[data-lang-trigger="true"]')) return;
      onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={popRef}
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-[70] left-4 right-4 sm:left-auto sm:right-4 md:right-10 top-[70px] sm:w-[292px] rounded-2xl p-3 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, var(--modal-bg), var(--surface-soft))",
            border: "1px solid var(--modal-border)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 22px 70px rgba(0,0,0,0.34), inset 0 1px 0 var(--surface-border)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full"
            style={{ background: "radial-gradient(circle, var(--glow-mid), transparent 68%)", filter: "blur(10px)" }}
          />
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--line-soft), transparent)" }}
          />

          <div className="relative px-2 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)", color: "var(--fg-3)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
                  <path d="M1 7H13M7 1C9 3.5 9 10.5 7 13M7 1C5 3.5 5 10.5 7 13" stroke="currentColor" strokeWidth="1" />
                </svg>
              </span>
              <span className="uppercase" style={{ fontSize: "0.54rem", letterSpacing: "0.28em", fontWeight: 800, color: "var(--fg-3)" }}>
                {t("nav.language")}
              </span>
            </div>
            <span className="uppercase rounded-full px-2.5 py-1" style={{ fontSize: "0.48rem", color: "var(--fg-4)", letterSpacing: "0.18em", border: "1px solid var(--surface-border)", background: "var(--surface-soft)" }}>ESC</span>
          </div>

          <div className="relative flex flex-col gap-1">
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); onClose(); }}
                  className="group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 cursor-pointer text-left overflow-hidden"
                  style={{
                    background: active ? "var(--surface-mid)" : "transparent",
                    border: `1px solid ${active ? "var(--surface-border)" : "transparent"}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--surface-soft)";
                      e.currentTarget.style.borderColor = "var(--surface-border)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  <span
                    className="h-7 w-[3px] shrink-0 rounded-full transition-all duration-300"
                    style={{
                      background: active ? "var(--fg-2)" : "var(--surface-border)",
                      opacity: active ? 1 : 0.45,
                    }}
                  />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: active ? "var(--fg-1)" : "var(--fg-2)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                      {l.native}
                    </p>
                    <span className="uppercase" style={{ fontSize: "0.52rem", letterSpacing: "0.2em", color: active ? "var(--fg-3)" : "var(--fg-4)", fontWeight: 800 }}>
                      {l.flag}
                    </span>
                  </div>
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-6 w-6 items-center justify-center"
                      style={{ color: "var(--fg-1)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.6 10.5L12 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
