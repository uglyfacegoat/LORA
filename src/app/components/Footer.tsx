import logoLargeDark from "../../assets/logo-large-dark.svg";
import logoLargeLight from "../../assets/logo-large-light.svg";
import logoSmallDark from "../../assets/logo-small-dark.svg";
import logoSmallLight from "../../assets/logo-small-light.svg";
import { useTheme } from "../theme";
import { useI18n } from "../i18n";

export function Footer() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const largeLogo = theme === "dark" ? logoLargeDark : logoLargeLight;
  const smallLogo = theme === "dark" ? logoSmallDark : logoSmallLight;

  return (
    <footer className="relative mt-16 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none" style={{ opacity: 0.015 }}>
        <img src={largeLogo} alt="" className="w-[clamp(320px,52vw,620px)] h-auto" draggable={false} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-20 relative">
        <div className="h-px" style={{ background: "var(--surface-border)" }} />

        <div className="py-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={smallLogo} alt="LORA" className="w-8 h-8 object-contain" />
                <p style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>LORA</p>
                <div className="px-2.5 py-1 rounded-md" style={{ background: "var(--surface-mid)", border: "1px solid var(--surface-border)" }}>
                  <span className="uppercase tracking-[0.15em]" style={{ fontSize: "0.45rem", fontWeight: 700, color: "var(--fg-4)" }}>EST. 2024</span>
                </div>
              </div>
              <p className="uppercase tracking-[0.2em] flex items-center gap-2" style={{ fontSize: "0.6rem", color: "var(--fg-4)" }}>
                <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6 }}>
                  <path d="M8 0C8 0 8.8 5.2 8 8C7.2 5.2 8 0 8 0ZM16 8C16 8 10.8 8.8 8 8C10.8 7.2 16 8 16 8ZM8 16C8 16 7.2 10.8 8 8C8.8 10.8 8 16 8 16ZM0 8C0 8 5.2 7.2 8 8C5.2 8.8 0 8 0 8Z" />
                </svg>
                {t("footer.tagline")}
              </p>
              <p className="mt-4 max-w-xs" style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "var(--fg-4)" }}>
                {t("footer.desc")}
              </p>
            </div>

            <div className="flex gap-16">
              <div>
                <p className="uppercase tracking-[0.25em] mb-4" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-4)" }}>{t("footer.contact")}</p>
                <a href="mailto:hello@lora.agency" className="transition-colors duration-400 block" style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>
                  hello@lora.agency
                </a>
              </div>
              <div>
                <p className="uppercase tracking-[0.25em] mb-4" style={{ fontSize: "0.55rem", fontWeight: 700, color: "var(--fg-4)" }}>{t("footer.social")}</p>
                <div className="flex flex-col gap-2">
                  {["Telegram", "LinkedIn", "X / Twitter"].map((name) => (
                    <a key={name} href="#" className="transition-colors duration-400" style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--surface-border)" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-5)" }}>
              &copy; 2026 LORA. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition-colors" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-5)" }}>{t("footer.privacy")}</a>
              <span style={{ color: "var(--fg-5)" }}>&middot;</span>
              <a href="#" className="transition-colors" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--fg-5)" }}>{t("footer.terms")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
