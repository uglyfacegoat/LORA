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
      if (target.closest?.('[aria-label="Change language"]')) return;
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
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-[70] right-4 md:right-10 top-[64px] w-[260px] rounded-2xl p-2"
          style={{
            background: "var(--modal-bg)",
            border: "1px solid var(--modal-border)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div className="px-3 pt-2 pb-1 flex items-center justify-between">
            <span className="uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-4)" }}>
              {t("nav.language")}
            </span>
            <span style={{ fontSize: "0.5rem", color: "var(--fg-4)", letterSpacing: "0.15em" }}>ESC</span>
          </div>

          <div className="flex flex-col gap-0.5 mt-1">
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); onClose(); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer text-left"
                  style={{ background: active ? "var(--accent-soft)" : "transparent" }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-soft)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{
                      background: active ? "var(--accent-strong)" : "var(--surface-mid)",
                      border: `1px solid ${active ? "var(--accent-border)" : "var(--surface-border)"}`,
                      fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.05em",
                      color: active ? "var(--fg-1)" : "var(--fg-3)",
                    }}
                  >
                    {l.flag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.78rem", fontWeight: 600, color: active ? "var(--fg-1)" : "var(--fg-2)", lineHeight: 1.15 }}>
                      {l.native}
                    </p>
                    <p className="uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.18em", color: "var(--fg-4)", fontWeight: 600, marginTop: 2 }}>
                      {l.label}
                    </p>
                  </div>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ color: "var(--fg-1)" }}>
                      <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
