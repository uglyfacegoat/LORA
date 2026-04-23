import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { SectionLabel } from "./SectionLabel";
import { useInView } from "./useInView";

type CountryOption = {
  iso: string;
  flag: string;
  dialCode: string;
  nationalPlaceholder: string;
  label: string;
  search: string[];
};

type AlertState = {
  tone: "success" | "error";
  text: string;
} | null;

const COUNTRY_OPTIONS: CountryOption[] = [
  { iso: "AR", flag: "AR", dialCode: "+54", nationalPlaceholder: "11 2345-6789", label: "Argentina", search: ["argentina", "ar", "+54"] },
  { iso: "AU", flag: "AU", dialCode: "+61", nationalPlaceholder: "412 345 678", label: "Australia", search: ["australia", "au", "+61"] },
  { iso: "AT", flag: "AT", dialCode: "+43", nationalPlaceholder: "664 1234567", label: "Austria", search: ["austria", "at", "+43"] },
  { iso: "BE", flag: "BE", dialCode: "+32", nationalPlaceholder: "470 12 34 56", label: "Belgium", search: ["belgium", "be", "+32"] },
  { iso: "BR", flag: "BR", dialCode: "+55", nationalPlaceholder: "11 91234-5678", label: "Brazil", search: ["brazil", "br", "+55"] },
  { iso: "CA", flag: "CA", dialCode: "+1", nationalPlaceholder: "(416) 555-0123", label: "Canada", search: ["canada", "ca", "+1"] },
  { iso: "CL", flag: "CL", dialCode: "+56", nationalPlaceholder: "9 6123 4567", label: "Chile", search: ["chile", "cl", "+56"] },
  { iso: "CN", flag: "CN", dialCode: "+86", nationalPlaceholder: "138 0013 8000", label: "China", search: ["china", "cn", "+86"] },
  { iso: "CO", flag: "CO", dialCode: "+57", nationalPlaceholder: "300 1234567", label: "Colombia", search: ["colombia", "co", "+57"] },
  { iso: "CZ", flag: "CZ", dialCode: "+420", nationalPlaceholder: "601 123 456", label: "Czech Republic", search: ["czech republic", "czechia", "cz", "+420"] },
  { iso: "DK", flag: "DK", dialCode: "+45", nationalPlaceholder: "20 12 34 56", label: "Denmark", search: ["denmark", "dk", "+45"] },
  { iso: "AE", flag: "AE", dialCode: "+971", nationalPlaceholder: "50 123 4567", label: "Dubai / UAE", search: ["uae", "dubai", "ae", "+971"] },
  { iso: "FI", flag: "FI", dialCode: "+358", nationalPlaceholder: "40 1234567", label: "Finland", search: ["finland", "fi", "+358"] },
  { iso: "FR", flag: "FR", dialCode: "+33", nationalPlaceholder: "6 12 34 56 78", label: "France", search: ["france", "fr", "+33"] },
  { iso: "DE", flag: "DE", dialCode: "+49", nationalPlaceholder: "1512 3456789", label: "Germany", search: ["germany", "de", "deutschland", "+49"] },
  { iso: "GR", flag: "GR", dialCode: "+30", nationalPlaceholder: "691 234 5678", label: "Greece", search: ["greece", "gr", "+30"] },
  { iso: "HK", flag: "HK", dialCode: "+852", nationalPlaceholder: "5123 4567", label: "Hong Kong", search: ["hong kong", "hk", "+852"] },
  { iso: "IN", flag: "IN", dialCode: "+91", nationalPlaceholder: "98765 43210", label: "India", search: ["india", "in", "+91"] },
  { iso: "ID", flag: "ID", dialCode: "+62", nationalPlaceholder: "812 3456 7890", label: "Indonesia", search: ["indonesia", "id", "+62"] },
  { iso: "IE", flag: "IE", dialCode: "+353", nationalPlaceholder: "85 123 4567", label: "Ireland", search: ["ireland", "ie", "+353"] },
  { iso: "IL", flag: "IL", dialCode: "+972", nationalPlaceholder: "50-123-4567", label: "Israel", search: ["israel", "il", "+972"] },
  { iso: "IT", flag: "IT", dialCode: "+39", nationalPlaceholder: "312 345 6789", label: "Italy", search: ["italy", "it", "+39"] },
  { iso: "JP", flag: "JP", dialCode: "+81", nationalPlaceholder: "90-1234-5678", label: "Japan", search: ["japan", "jp", "+81"] },
  { iso: "KZ", flag: "KZ", dialCode: "+7", nationalPlaceholder: "700 123 4567", label: "Kazakhstan", search: ["kazakhstan", "kz", "+7"] },
  { iso: "MX", flag: "MX", dialCode: "+52", nationalPlaceholder: "55 1234 5678", label: "Mexico", search: ["mexico", "mx", "+52"] },
  { iso: "MY", flag: "MY", dialCode: "+60", nationalPlaceholder: "12-345 6789", label: "Malaysia", search: ["malaysia", "my", "+60"] },
  { iso: "NL", flag: "NL", dialCode: "+31", nationalPlaceholder: "6 12345678", label: "Netherlands", search: ["netherlands", "nl", "holland", "+31"] },
  { iso: "NZ", flag: "NZ", dialCode: "+64", nationalPlaceholder: "21 123 4567", label: "New Zealand", search: ["new zealand", "nz", "+64"] },
  { iso: "NO", flag: "NO", dialCode: "+47", nationalPlaceholder: "406 12 345", label: "Norway", search: ["norway", "no", "+47"] },
  { iso: "PK", flag: "PK", dialCode: "+92", nationalPlaceholder: "300 1234567", label: "Pakistan", search: ["pakistan", "pk", "+92"] },
  { iso: "PE", flag: "PE", dialCode: "+51", nationalPlaceholder: "912 345 678", label: "Peru", search: ["peru", "pe", "+51"] },
  { iso: "PH", flag: "PH", dialCode: "+63", nationalPlaceholder: "917 123 4567", label: "Philippines", search: ["philippines", "ph", "+63"] },
  { iso: "PL", flag: "PL", dialCode: "+48", nationalPlaceholder: "512 345 678", label: "Poland", search: ["poland", "pl", "+48"] },
  { iso: "PT", flag: "PT", dialCode: "+351", nationalPlaceholder: "912 345 678", label: "Portugal", search: ["portugal", "pt", "+351"] },
  { iso: "RO", flag: "RO", dialCode: "+40", nationalPlaceholder: "712 345 678", label: "Romania", search: ["romania", "ro", "+40"] },
  { iso: "RU", flag: "RU", dialCode: "+7", nationalPlaceholder: "999 123-45-67", label: "Russia", search: ["russia", "ru", "rossiya", "+7"] },
  { iso: "SA", flag: "SA", dialCode: "+966", nationalPlaceholder: "50 123 4567", label: "Saudi Arabia", search: ["saudi arabia", "sa", "+966"] },
  { iso: "SG", flag: "SG", dialCode: "+65", nationalPlaceholder: "8123 4567", label: "Singapore", search: ["singapore", "sg", "+65"] },
  { iso: "ZA", flag: "ZA", dialCode: "+27", nationalPlaceholder: "71 123 4567", label: "South Africa", search: ["south africa", "za", "+27"] },
  { iso: "KR", flag: "KR", dialCode: "+82", nationalPlaceholder: "10-1234-5678", label: "South Korea", search: ["south korea", "korea", "kr", "+82"] },
  { iso: "ES", flag: "ES", dialCode: "+34", nationalPlaceholder: "612 34 56 78", label: "Spain", search: ["spain", "es", "espana", "+34"] },
  { iso: "SE", flag: "SE", dialCode: "+46", nationalPlaceholder: "70-123 45 67", label: "Sweden", search: ["sweden", "se", "+46"] },
  { iso: "CH", flag: "CH", dialCode: "+41", nationalPlaceholder: "78 123 45 67", label: "Switzerland", search: ["switzerland", "ch", "+41"] },
  { iso: "TH", flag: "TH", dialCode: "+66", nationalPlaceholder: "81 234 5678", label: "Thailand", search: ["thailand", "th", "+66"] },
  { iso: "TR", flag: "TR", dialCode: "+90", nationalPlaceholder: "532 123 45 67", label: "Turkey", search: ["turkey", "tr", "+90"] },
  { iso: "UA", flag: "UA", dialCode: "+380", nationalPlaceholder: "50 123 45 67", label: "Ukraine", search: ["ukraine", "ua", "+380"] },
  { iso: "GB", flag: "GB", dialCode: "+44", nationalPlaceholder: "7400 123456", label: "United Kingdom", search: ["united kingdom", "uk", "gb", "britain", "+44"] },
  { iso: "US", flag: "US", dialCode: "+1", nationalPlaceholder: "(201) 555-0123", label: "United States", search: ["united states", "usa", "us", "+1"] },
  { iso: "VN", flag: "VN", dialCode: "+84", nationalPlaceholder: "091 234 56 78", label: "Vietnam", search: ["vietnam", "vn", "+84"] },
];

const TIMEZONE_COUNTRY_MAP: Record<string, string> = {
  "Europe/Moscow": "RU",
  "Europe/Madrid": "ES",
  "Europe/London": "GB",
  "Europe/Berlin": "DE",
  "Europe/Paris": "FR",
  "Europe/Rome": "IT",
  "Europe/Istanbul": "TR",
  "Europe/Kyiv": "UA",
  "Asia/Dubai": "AE",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Kolkata": "IN",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Singapore": "SG",
  "America/Sao_Paulo": "BR",
  "America/Mexico_City": "MX",
  "America/Toronto": "CA",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
};

function detectCountryIso() {
  if (typeof window === "undefined") return "US";

  const localeValues = [navigator.language, ...navigator.languages].filter(Boolean).map((value) => value.toUpperCase());
  for (const value of localeValues) {
    const match = value.match(/[-_]([A-Z]{2})$/);
    if (!match) continue;
    const iso = match[1];
    if (COUNTRY_OPTIONS.some((country) => country.iso === iso)) return iso;
  }

  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TIMEZONE_COUNTRY_MAP[zone] ?? "US";
}

function getCopy(lang: string) {
  if (lang === "ru") {
    return {
      countrySelect: "Регион телефона",
      searchPlaceholder: "Поиск страны или кода",
      noResults: "Ничего не найдено",
      missingFields: "Заполни имя, телефон и email.",
      invalidEmail: "Проверь email.",
      success: "Заявка отправлена.",
    };
  }
  if (lang === "es") {
    return {
      countrySelect: "Region del telefono",
      searchPlaceholder: "Busca un pais o codigo",
      noResults: "No se encontro nada",
      missingFields: "Completa nombre, telefono y email.",
      invalidEmail: "Revisa el email.",
      success: "Solicitud enviada.",
    };
  }
  if (lang === "zh") {
    return {
      countrySelect: "Phone Region",
      searchPlaceholder: "Search country or code",
      noResults: "No matches found",
      missingFields: "Fill in name, phone and email.",
      invalidEmail: "Check the email.",
      success: "Request sent.",
    };
  }
  return {
    countrySelect: "Phone Region",
    searchPlaceholder: "Search country or code",
    noResults: "No matches found",
    missingFields: "Fill in name, phone and email.",
    invalidEmail: "Check the email.",
    success: "Request sent.",
  };
}

function AlertToast({ alert }: { alert: AlertState }) {
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

function CountryPickerModal({
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
  copy: ReturnType<typeof getCopy>;
  anchorRect: DOMRect | null;
}) {
  const popRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (!popRef.current) return;
      const target = e.target as HTMLElement;
      if (popRef.current.contains(target)) return;
      if (target.closest?.('[data-phone-country-trigger="true"]')) return;
      onClose();
    };
    const onScroll = () => onClose();

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, onClose]);

  const countries = useMemo(() => {
    const sorted = [...COUNTRY_OPTIONS].sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return sorted;
    return sorted.filter((country) =>
      country.label.toLowerCase().includes(normalizedQuery) ||
      country.dialCode.includes(normalizedQuery) ||
      country.iso.toLowerCase().includes(normalizedQuery) ||
      country.search.some((entry) => entry.includes(normalizedQuery)),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && anchorRect && (
        <motion.div
          ref={popRef}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.99 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-[70] rounded-3xl p-3"
          style={{
            top: Math.min(anchorRect.bottom + 8, window.innerHeight - 440),
            left: Math.max(16, Math.min(anchorRect.left, window.innerWidth - Math.min(420, window.innerWidth - 32) - 16)),
            width: Math.min(420, window.innerWidth - 32),
            background: "var(--app-bg)",
            border: "1px solid var(--modal-border)",
            boxShadow: "0 24px 90px rgba(0,0,0,0.16)",
          }}
        >
            <div className="flex items-center justify-between px-3 pb-2 pt-2">
              <span className="uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-4)" }}>
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
                <div className="rounded-2xl px-4 py-8 text-center" style={{ background: "var(--surface-soft)", border: "1px solid var(--surface-border)" }}>
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
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: active ? "var(--fg-1)" : "var(--fg-2)", lineHeight: 1.15 }}>
                          {country.label}
                        </p>
                        <p className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.18em", color: "var(--fg-4)", fontWeight: 600, marginTop: 4 }}>
                          {country.dialCode}
                        </p>
                      </div>

                      {active && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--fg-1)" }}>
                          <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ContactSection() {
  const [ref, inView] = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryAnchorRect, setCountryAnchorRect] = useState<DOMRect | null>(null);
  const [alert, setAlert] = useState<AlertState>(null);
  const { t, lang } = useI18n();
  const copy = getCopy(lang);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRY_OPTIONS.find((country) => country.iso === "US")!);
  const countryTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const iso = detectCountryIso();
    const nextCountry = COUNTRY_OPTIONS.find((country) => country.iso === iso) ?? COUNTRY_OPTIONS.find((country) => country.iso === "US")!;
    setSelectedCountry(nextCountry);
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timeout = window.setTimeout(() => setAlert(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [alert]);

  const phonePlaceholder = useMemo(
    () => selectedCountry.nationalPlaceholder,
    [selectedCountry],
  );

  const fields = [
    {
      name: "name" as const,
      placeholder: t("contact.name"),
      type: "text",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="4" r="3" stroke="currentColor" strokeWidth="1" />
          <path d="M1 13C1 10 3.5 8 7 8C10.5 8 13 10 13 13" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      name: "email" as const,
      placeholder: t("contact.email"),
      type: "email",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
          <path d="M1 3L7 8L13 3" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      name: "company" as const,
      placeholder: t("contact.company"),
      type: "text",
      optional: true,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1" />
          <path d="M5 7H9M5 10H9M5 3V1H9V3" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
  ];

  const fieldBox = (field: (typeof fields)[number]) => {
    const isFocused = focused === field.name;
    return (
      <div
        key={field.name}
        className="relative rounded-xl transition-all duration-300"
        style={{
          background: isFocused ? "var(--surface-mid)" : "var(--surface-soft)",
          border: `1px solid ${isFocused ? "var(--accent-border)" : "var(--surface-border)"}`,
        }}
      >
        <div className="flex items-center gap-3 px-4">
          <span className="shrink-0 transition-colors" style={{ color: isFocused ? "var(--fg-2)" : "var(--fg-4)" }}>
            {field.icon}
          </span>
          <input
            type={field.type}
            placeholder={field.placeholder}
            required={!field.optional}
            value={values[field.name]}
            onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
            onFocus={() => setFocused(field.name)}
            onBlur={() => setFocused(null)}
            className="w-full bg-transparent px-0 py-4 outline-none"
            style={{ fontSize: "0.9rem", color: "var(--fg-1)", border: "none" }}
          />
        </div>
      </div>
    );
  };

  const phoneFocused = focused === "phone";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.name.trim() || !values.phone.trim() || !values.email.trim()) {
      setAlert({ tone: "error", text: copy.missingFields });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setAlert({ tone: "error", text: copy.invalidEmail });
      return;
    }

    setAlert({ tone: "success", text: copy.success });
    setSubmitted(true);
  };

  const handleOpenCountryPicker = () => {
    if (countryTriggerRef.current) {
      setCountryAnchorRect(countryTriggerRef.current.getBoundingClientRect());
    }
    setCountryOpen(true);
  };

  return (
    <section ref={ref} id="contact" className="relative px-6 py-32 md:px-20 md:py-44">
      <SectionLabel word={t("label.connect")} />

      <AlertToast alert={alert} />

      <CountryPickerModal
        open={countryOpen}
        onClose={() => setCountryOpen(false)}
        selectedIso={selectedCountry.iso}
        onSelect={setSelectedCountry}
        copy={copy}
        anchorRect={countryAnchorRect}
      />

      <div className="relative mx-auto max-w-3xl">
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2"
          style={{ background: "radial-gradient(circle, var(--surface-mid), transparent 55%)" }}
        />

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="relative mb-6 flex items-center gap-4">
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <span className="uppercase tracking-[0.35em]" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}>
            {t("contact.eyebrow")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "var(--fg-1)" }}
        >
          {t("contact.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative mb-12 max-w-md"
          style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--fg-3)" }}
        >
          {t("contact.sub")}
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl py-20 text-center"
            style={{ border: "1px solid var(--surface-border)", background: "var(--surface-soft)" }}
          >
            <div className="relative">
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "var(--fg-1)", color: "var(--app-bg)" }}
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="uppercase tracking-[0.3em]" style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--fg-1)" }}>
                {t("contact.ok.t")}
              </p>
              <p className="mt-3" style={{ fontSize: "0.9rem", color: "var(--fg-3)" }}>
                {t("contact.ok.s")}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl p-6 md:p-10"
            style={{
              background: "var(--surface-soft)",
              border: "1px solid var(--surface-border)",
              boxShadow: "0 40px 120px -40px var(--surface-strong)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--fg-2), transparent)" }} />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "#10b981", opacity: 0.5 }} />
                  <span className="relative h-2 w-2 rounded-full" style={{ background: "#10b981" }} />
                </span>
                <span className="uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-2)" }}>
                  {t("contact.slot")}
                </span>
              </div>
              <span
                className="rounded-lg px-3 py-1.5 uppercase"
                style={{
                  fontSize: "0.52rem",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  background: "var(--surface-mid)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--fg-3)",
                }}
              >
                {t("contact.spots")}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 grid gap-3 md:grid-cols-2">
                {fieldBox(fields[0])}

                <div
                  className="relative rounded-xl transition-all duration-300"
                  style={{
                    background: phoneFocused ? "var(--surface-mid)" : "var(--surface-soft)",
                    border: `1px solid ${phoneFocused ? "var(--accent-border)" : "var(--surface-border)"}`,
                  }}
                >
                  <div className="flex items-center gap-2 pl-2 pr-4">
                    <button
                      ref={countryTriggerRef}
                      type="button"
                      data-phone-country-trigger="true"
                      onClick={handleOpenCountryPicker}
                      className="flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 transition-colors"
                      style={{ background: phoneFocused ? "var(--surface-soft)" : "transparent", color: "var(--fg-2)" }}
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
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className="h-6 w-px shrink-0" style={{ background: "var(--surface-border)" }} />

                    <input
                      type="tel"
                      placeholder={phonePlaceholder}
                      value={values.phone}
                      onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent px-0 py-4 outline-none"
                      style={{ fontSize: "0.9rem", color: "var(--fg-1)", border: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {fieldBox(fields[1])}
                {fieldBox(fields[2])}
              </div>

              <button
                type="submit"
                className="relative mt-5 w-full cursor-pointer overflow-hidden rounded-xl py-5 uppercase tracking-[0.3em] transition-all duration-500 hover:scale-[1.005] active:scale-[0.995]"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  background: "var(--fg-1)",
                  color: "var(--app-bg)",
                  boxShadow: "0 20px 60px -20px var(--surface-strong)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t("contact.submit")}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
