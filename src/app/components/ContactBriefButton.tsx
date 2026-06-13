import type { Ref } from "react";

type ContactBriefButtonProps = {
  label: string;
  value: string;
  open: boolean;
  icon: "date" | "time";
  triggerAttribute: "data-brief-date-trigger" | "data-brief-time-trigger";
  triggerRef: Ref<HTMLButtonElement>;
  onClick: () => void;
};

export function ContactBriefButton({
  label,
  value,
  open,
  icon,
  triggerAttribute,
  triggerRef,
  onClick,
}: ContactBriefButtonProps) {
  return (
    <button
      ref={triggerRef}
      type="button"
      data-brief-date-trigger={triggerAttribute === "data-brief-date-trigger" ? "true" : undefined}
      data-brief-time-trigger={triggerAttribute === "data-brief-time-trigger" ? "true" : undefined}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-4 text-left transition-all duration-300"
      style={{
        background: open ? "var(--surface-mid)" : "var(--surface-soft)",
        border: `1px solid ${open ? "var(--accent-border)" : "var(--surface-border)"}`,
      }}
    >
      <span className="shrink-0 transition-colors" style={{ color: open ? "var(--fg-2)" : "var(--fg-4)" }}>
        {icon === "date" ? <CalendarIcon /> : <ClockIcon />}
      </span>
      <span className="min-w-0 flex-1" style={{ fontSize: "0.9rem", color: value ? "var(--fg-1)" : "var(--fg-4)" }}>
        {value || label}
      </span>
      <ChevronDownIcon />
    </button>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2.5" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
      <path d="M4 1V4M10 1V4M2 5.5H12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1" />
      <path d="M7 4.5V7L8.8 8.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: "var(--fg-4)" }}>
      <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
