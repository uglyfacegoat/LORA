import type { ReactNode } from "react";
export type ContactTextFieldName = "name" | "email" | "company";

export type ContactTextFieldConfig = {
  name: ContactTextFieldName;
  placeholder: string;
  type: "text" | "email";
  optional?: boolean;
  icon: ReactNode;
};

type ContactTextFieldProps = {
  field: ContactTextFieldConfig;
  value: string;
  focused: boolean;
  onChange: (name: ContactTextFieldName, value: string) => void;
  onFocus: (name: ContactTextFieldName) => void;
  onBlur: () => void;
};

export function ContactTextField({ field, value, focused, onChange, onFocus, onBlur }: ContactTextFieldProps) {
  return (
    <div
      className="relative rounded-xl transition-all duration-300"
      style={{
        background: focused ? "var(--surface-mid)" : "var(--surface-soft)",
        border: `1px solid ${focused ? "var(--accent-border)" : "var(--surface-border)"}`,
      }}
    >
      <div className="flex items-center gap-3 px-4">
        <span className="shrink-0 transition-colors" style={{ color: focused ? "var(--fg-2)" : "var(--fg-4)" }}>
          {field.icon}
        </span>
        <input
          type={field.type}
          placeholder={field.placeholder}
          required={!field.optional}
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
          onFocus={() => onFocus(field.name)}
          onBlur={onBlur}
          className="w-full bg-transparent px-0 py-4 outline-none"
          style={{ fontSize: "0.9rem", color: "var(--fg-1)", border: "none" }}
        />
      </div>
    </div>
  );
}

export function ContactUserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="4" r="3" stroke="currentColor" strokeWidth="1" />
      <path d="M1 13C1 10 3.5 8 7 8C10.5 8 13 10 13 13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ContactEmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M1 3L7 8L13 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ContactCompanyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1" />
      <path d="M5 7H9M5 10H9M5 3V1H9V3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
