import { AnimatePresence, motion } from "motion/react";
import type { AlertState } from "../data/contactForm";

export function ContactAlertToast({ alert }: { alert: AlertState }) {
  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 top-6 z-[90] w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl px-4 py-3"
          style={{
            background: "var(--app-bg)",
            border: `1px solid ${alert.tone === "error" ? "rgba(220,38,38,0.28)" : "var(--accent-border)"}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{
                background: alert.tone === "error" ? "rgba(220,38,38,0.12)" : "rgba(16,185,129,0.12)",
                color: alert.tone === "error" ? "rgb(185,28,28)" : "rgb(4,120,87)",
              }}
            >
              {alert.tone === "error" ? "!" : "OK"}
            </span>
            <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "var(--fg-2)" }}>{alert.text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
