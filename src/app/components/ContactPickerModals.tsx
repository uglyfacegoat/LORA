import { useEffect, useMemo, useState } from "react";
import { COUNTRY_OPTIONS, type CountryOption } from "../data/phoneCountries";
import type { BriefOption, ContactFormCopy } from "../data/contactForm";
import { ContactPickerPopover } from "./ContactPickerPopover";

export function CountryPickerModal({
  open,
  onClose,
  selectedIso,
  onSelect,
  copy,
  anchorRect,
}: {
  open: boolean;
  onClose: () => void;
  selectedIso: string;
  onSelect: (country: CountryOption) => void;
  copy: ContactFormCopy;
  anchorRect: DOMRect | null;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    return undefined;
  }, [open]);

  const countries = useMemo(() => {
    const sorted = [...COUNTRY_OPTIONS].sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return sorted;
    return sorted.filter(
      (country) =>
        country.label.toLowerCase().includes(normalizedQuery) ||
        country.dialCode.includes(normalizedQuery) ||
        country.iso.toLowerCase().includes(normalizedQuery) ||
        country.search.some((entry) => entry.includes(normalizedQuery)),
    );
  }, [query]);

  return (
    <ContactPickerPopover
      open={open}
      anchorRect={anchorRect}
      width={420}
      maxHeight={440}
      triggerSelector='[data-phone-country-trigger="true"]'
      onClose={onClose}
    >
      <div className="flex items-center justify-between px-3 pb-2 pt-2">
        <span
          className="uppercase"
          style={{ fontSize: "0.5rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-4)" }}
        >
          {copy.countrySelect}
        </span>
        <span style={{ fontSize: "0.5rem", color: "var(--fg-4)", letterSpacing: "0.15em" }}>ESC</span>
      </div>

      <div className="px-2 pb-2 pt-1">
        <div
          className="rounded-2xl px-4"
          style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="w-full bg-transparent py-3 outline-none"
            style={{ fontSize: "0.86rem", color: "var(--fg-1)" }}
          />
        </div>
      </div>

      <div className="mt-1 flex max-h-[360px] flex-col gap-1 overflow-y-auto px-1 pb-1 pr-2">
        {countries.length === 0 ? (
          <div
            className="rounded-2xl px-4 py-8 text-center"
            style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}
          >
            <p style={{ fontSize: "0.82rem", color: "var(--fg-3)" }}>{copy.noResults}</p>
          </div>
        ) : (
          countries.map((country) => {
            const active = selectedIso === country.iso;
            return (
              <button
                key={country.iso}
                type="button"
                onClick={() => {
                  onSelect(country);
                  onClose();
                }}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors duration-200"
                style={{ background: active ? "var(--accent-soft)" : "transparent" }}
              >
                <span
                  className="flex h-8 shrink-0 items-center justify-center rounded-md px-2"
                  style={{
                    background: "transparent",
                    border: `1px solid ${active ? "var(--accent-border)" : "var(--surface-border)"}`,
                    fontSize: "0.56rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: active ? "var(--fg-2)" : "var(--fg-4)",
                    minWidth: "2.35rem",
                  }}
                >
                  {country.flag}
                </span>

                <div className="min-w-0 flex-1">
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: active ? "var(--fg-1)" : "var(--fg-2)",
                      lineHeight: 1.15,
                    }}
                  >
                    {country.label}
                  </p>
                  <p
                    className="uppercase"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      color: "var(--fg-4)",
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {country.dialCode}
                  </p>
                </div>

                {active && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--fg-1)" }}>
                    <path
                      d="M2 7L6 11L12 3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>
    </ContactPickerPopover>
  );
}

export function BriefSelectModal({
  open,
  onClose,
  title,
  selectedValue,
  onSelect,
  anchorRect,
  options,
  triggerAttribute,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  selectedValue: string;
  onSelect: (value: string) => void;
  anchorRect: DOMRect | null;
  options: BriefOption[];
  triggerAttribute: string;
}) {
  return (
    <ContactPickerPopover
      open={open}
      anchorRect={anchorRect}
      width={360}
      maxHeight={420}
      triggerSelector={`[${triggerAttribute}="true"]`}
      onClose={onClose}
    >
      <div className="flex items-center justify-between px-3 pb-2 pt-2">
        <span
          className="uppercase"
          style={{ fontSize: "0.5rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-4)" }}
        >
          {title}
        </span>
        <span style={{ fontSize: "0.5rem", color: "var(--fg-4)", letterSpacing: "0.15em" }}>ESC</span>
      </div>

      <div className="mt-1 flex max-h-[320px] flex-col gap-1 overflow-y-auto px-1 pb-1 pr-2">
        {options.map((option) => {
          const active = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 text-left transition-colors duration-200"
              style={{ background: active ? "var(--accent-soft)" : "transparent" }}
            >
              <div className="min-w-0">
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: active ? "var(--fg-1)" : "var(--fg-2)",
                    lineHeight: 1.15,
                  }}
                >
                  {option.label}
                </p>
                {option.meta ? (
                  <p
                    className="uppercase"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      color: "var(--fg-4)",
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {option.meta}
                  </p>
                ) : null}
              </div>

              {active && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--fg-1)" }}>
                  <path
                    d="M2 7L6 11L12 3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </ContactPickerPopover>
  );
}
