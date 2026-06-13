import { trackEvent } from "../analytics";
import { buildGroups, isActive, navHref } from "../data/navigation";
import { useI18n } from "../i18n";
import { localizedPath } from "../seo/site";

export function MobileNavigation({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const { lang } = useI18n();
  const groups = buildGroups(lang);
  if (!open) return null;

  return (
    <div
      className="fixed inset-x-3 top-[76px] z-[65] max-h-[calc(100dvh-92px)] overflow-y-auto rounded-2xl p-4 lg:hidden"
      style={{
        background: "var(--modal-bg)",
        border: "1px solid var(--modal-border)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="uppercase"
          style={{ fontSize: "0.55rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}
        >
          Navigation
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 uppercase"
          style={{
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            color: "var(--fg-3)",
            border: "1px solid var(--surface-border)",
          }}
        >
          Close
        </button>
      </div>
      <div className="grid gap-3">
        {groups.map((group) => (
          <section
            key={group.label}
            className="rounded-2xl p-3"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <a
              href={
                group.path
                  ? navHref(group.path, lang)
                  : group.items
                    ? navHref(group.items[0].path, lang)
                    : localizedPath("/", lang)
              }
              onClick={onClose}
              className="mb-2 flex items-center justify-between rounded-xl px-2 py-2"
              style={{ color: isActive(pathname, group.path) ? "var(--fg-1)" : "var(--fg-2)" }}
            >
              <span className="uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 800 }}>
                {group.label}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 6H10M10 6L7 3M10 6L7 9"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            {group.items && (
              <div className="grid gap-1">
                {group.items.map((item) => (
                  <a
                    key={item.path}
                    href={navHref(item.path, lang)}
                    onClick={() => {
                      trackEvent("click_cta", { location: "mobile_nav", target: item.path });
                      onClose();
                    }}
                    className="rounded-xl px-3 py-2"
                    style={{
                      color: isActive(pathname, item.path) ? "var(--fg-1)" : "var(--fg-3)",
                      background: isActive(pathname, item.path) ? "var(--surface-mid)" : "transparent",
                      fontSize: "0.86rem",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
