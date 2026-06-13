import { buildGroups, getMenuLabel, isActive, navHref } from "../data/navigation";
import { useI18n } from "../i18n";
import { useEffect, useState } from "react";

export function DesktopNavigation({ pathname }: { pathname: string }) {
  const { lang } = useI18n();
  const groups = buildGroups(lang);
  const nestedGroups = groups.filter((group) => group.items);
  const initialGroup =
    nestedGroups.find(
      (group) => isActive(pathname, group.path) || group.items?.some((item) => isActive(pathname, item.path)),
    ) ?? nestedGroups[0];
  const [openGroupLabel, setOpenGroupLabel] = useState(initialGroup?.label);
  const openGroup = nestedGroups.find((group) => group.label === openGroupLabel) ?? initialGroup;
  const active = groups.some(
    (group) => isActive(pathname, group.path) || group.items?.some((item) => isActive(pathname, item.path)),
  );
  const menuLabel = getMenuLabel(lang);

  useEffect(() => {
    setOpenGroupLabel(initialGroup?.label);
  }, [initialGroup?.label]);

  return (
    <div className="hidden items-center gap-1 lg:flex">
      <div className="group relative">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-2 uppercase transition-all duration-300"
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.16em",
            fontWeight: 800,
            color: active ? "var(--fg-1)" : "var(--fg-4)",
            background: active ? "var(--surface-soft)" : "transparent",
            border: active ? "1px solid var(--surface-border)" : "1px solid transparent",
          }}
          aria-haspopup="true"
        >
          {menuLabel}
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M2 4L5 7L8 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="invisible absolute left-1/2 top-full z-[60] w-[min(900px,calc(100vw-3rem))] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          <div
            className="grid overflow-hidden rounded-2xl p-3 md:grid-cols-[240px_1fr]"
            style={{
              background: "linear-gradient(145deg, var(--modal-bg), var(--surface-soft))",
              border: "1px solid var(--modal-border)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              boxShadow: "0 28px 90px rgba(0,0,0,0.28), inset 0 1px 0 var(--surface-border)",
            }}
          >
            <div className="border-r pr-3" style={{ borderColor: "var(--surface-border)" }}>
              <div className="mb-2 flex items-center justify-between px-2">
                <span
                  className="uppercase"
                  style={{ fontSize: "0.5rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}
                >
                  {menuLabel}
                </span>
                <span style={{ fontSize: "0.5rem", letterSpacing: "0.18em", color: "var(--fg-5)" }}>
                  {groups.length} links
                </span>
              </div>
              <div className="grid gap-1">
                {groups.map((group) => {
                  const groupActive =
                    isActive(pathname, group.path) || group.items?.some((item) => isActive(pathname, item.path));
                  if (!group.items) {
                    return (
                      <a
                        key={group.label}
                        href={navHref(group.path!, lang)}
                        className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors duration-200"
                        style={{
                          background: groupActive ? "var(--surface-mid)" : "transparent",
                          color: groupActive ? "var(--fg-1)" : "var(--fg-3)",
                        }}
                      >
                        <span
                          className="uppercase"
                          style={{ fontSize: "0.64rem", letterSpacing: "0.16em", fontWeight: 800 }}
                        >
                          {group.label}
                        </span>
                        <svg
                          className="shrink-0 opacity-50"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6H10M10 6L7 3M10 6L7 9"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    );
                  }

                  const selected = openGroup?.label === group.label;
                  return (
                    <a
                      key={group.label}
                      href={navHref(group.path!, lang)}
                      onMouseEnter={() => setOpenGroupLabel(group.label)}
                      onFocus={() => setOpenGroupLabel(group.label)}
                      className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors duration-200"
                      style={{
                        background: selected || groupActive ? "var(--surface-mid)" : "transparent",
                        color: selected || groupActive ? "var(--fg-1)" : "var(--fg-3)",
                      }}
                    >
                      <span className="min-w-0">
                        <span
                          className="block uppercase"
                          style={{ fontSize: "0.64rem", letterSpacing: "0.16em", fontWeight: 800 }}
                        >
                          {group.label}
                        </span>
                        <span
                          className="mt-1 block uppercase"
                          style={{
                            fontSize: "0.46rem",
                            letterSpacing: "0.18em",
                            color: "var(--fg-5)",
                            fontWeight: 800,
                          }}
                        >
                          {group.items.length} links
                        </span>
                      </span>
                      <svg
                        className="shrink-0 opacity-50"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 2L8 6L4 10"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>

            {openGroup?.items && (
              <div className="pl-3">
                <div className="mb-2 flex items-center justify-between px-2">
                  <span
                    className="uppercase"
                    style={{ fontSize: "0.5rem", letterSpacing: "0.24em", fontWeight: 800, color: "var(--fg-4)" }}
                  >
                    {openGroup.label}
                  </span>
                  <a
                    href={navHref(openGroup.path!, lang)}
                    className="rounded-lg px-2 py-1 uppercase"
                    style={{
                      fontSize: "0.48rem",
                      letterSpacing: "0.16em",
                      color: "var(--fg-4)",
                      border: "1px solid var(--surface-border)",
                    }}
                  >
                    {lang === "ru" ? "Все" : lang === "es" ? "Todo" : lang === "zh" ? "全部" : "All"}
                  </a>
                </div>
                <div className="grid gap-1 md:grid-cols-2">
                  {openGroup.items.map((item) => (
                    <a
                      key={item.path}
                      href={navHref(item.path, lang)}
                      className="group/link flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors duration-200"
                      style={{
                        background: isActive(pathname, item.path) ? "var(--surface-mid)" : "transparent",
                        color: isActive(pathname, item.path) ? "var(--fg-1)" : "var(--fg-3)",
                      }}
                    >
                      <span className="min-w-0">
                        <span className="block truncate" style={{ fontSize: "0.84rem", fontWeight: 750 }}>
                          {item.label}
                        </span>
                        {item.note && (
                          <span
                            className="mt-1 block uppercase"
                            style={{
                              fontSize: "0.48rem",
                              letterSpacing: "0.18em",
                              color: "var(--fg-5)",
                              fontWeight: 800,
                            }}
                          >
                            {item.note}
                          </span>
                        )}
                      </span>
                      <svg
                        className="shrink-0 opacity-50 transition-transform group-hover/link:translate-x-1"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6H10M10 6L7 3M10 6L7 9"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
