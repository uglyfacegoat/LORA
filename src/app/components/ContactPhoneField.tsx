import type { Ref } from "react";
import type { CountryOption } from "../data/phoneCountries";

type ContactPhoneFieldProps = {
  value: string;
  placeholder: string;
  selectedCountry: CountryOption;
  focused: boolean;
  triggerRef: Ref<HTMLButtonElement>;
  onOpenCountryPicker: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export function ContactPhoneField({
  value,
  placeholder,
  selectedCountry,
  focused,
  triggerRef,
  onOpenCountryPicker,
  onChange,
  onFocus,
  onBlur,
}: ContactPhoneFieldProps) {
  return (
    <div
      className="relative rounded-xl transition-all duration-300"
      style={{
        background: focused ? "var(--surface-mid)" : "var(--surface-soft)",
        border: `1px solid ${focused ? "var(--accent-border)" : "var(--surface-border)"}`,
      }}
    >
      <div className="flex items-center gap-2 pl-2 pr-4">
        <button
          ref={triggerRef}
          type="button"
          data-phone-country-trigger="true"
          onClick={onOpenCountryPicker}
          className="flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 transition-colors"
          style={{ background: focused ? "var(--surface-soft)" : "transparent", color: "var(--fg-2)" }}
        >
          <span
            className="flex h-7 items-center justify-center rounded-md px-2"
            style={{
              background: "transparent",
              border: "1px solid var(--surface-border)",
              fontSize: "0.52rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "var(--fg-3)",
              minWidth: "2.2rem",
            }}
          >
            {selectedCountry.flag}
          </span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{selectedCountry.dialCode}</span>
          <ChevronDownIcon />
        </button>

        <div className="h-6 w-px shrink-0" style={{ background: "var(--surface-border)" }} />

        <input
          type="tel"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-transparent px-0 py-4 outline-none"
          style={{ fontSize: "0.9rem", color: "var(--fg-1)", border: "none" }}
        />
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
