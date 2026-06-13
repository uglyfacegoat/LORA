import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { trackEvent } from "../analytics";
import {
  buildBriefDateOptions,
  detectCountryIso,
  formatBriefDateValue,
  getContactFormCopy,
  isValidEmail,
  submitLead,
  type AlertState,
  type BriefOption,
  type ContactFormValues,
} from "../data/contactForm";
import { COUNTRY_OPTIONS, type CountryOption } from "../data/phoneCountries";
import type { ContactTextFieldName } from "./ContactTextField";

export function useContactFormController(lang: string) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [briefDateOpen, setBriefDateOpen] = useState(false);
  const [briefTimeOpen, setBriefTimeOpen] = useState(false);
  const [countryAnchorRect, setCountryAnchorRect] = useState<DOMRect | null>(null);
  const [briefDateAnchorRect, setBriefDateAnchorRect] = useState<DOMRect | null>(null);
  const [briefTimeAnchorRect, setBriefTimeAnchorRect] = useState<DOMRect | null>(null);
  const [alert, setAlert] = useState<AlertState>(null);
  const copy = getContactFormCopy(lang);

  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    phone: "",
    email: "",
    company: "",
    briefDate: "",
    briefTime: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    COUNTRY_OPTIONS.find((country) => country.iso === "US")!,
  );
  const countryTriggerRef = useRef<HTMLButtonElement>(null);
  const briefDateTriggerRef = useRef<HTMLButtonElement>(null);
  const briefTimeTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const iso = detectCountryIso();
    const nextCountry =
      COUNTRY_OPTIONS.find((country) => country.iso === iso) ??
      COUNTRY_OPTIONS.find((country) => country.iso === "US")!;
    setSelectedCountry(nextCountry);
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timeout = window.setTimeout(() => setAlert(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [alert]);

  const briefDateLabel = lang === "ru" ? "Дата брифа" : lang === "es" ? "Fecha del briefing" : "Brief date";
  const briefTimeLabel = lang === "ru" ? "Время брифа" : lang === "es" ? "Hora del briefing" : "Brief time";
  const missingScheduleText =
    lang === "ru"
      ? "Выбери удобные дату и время брифа."
      : lang === "es"
        ? "Elige una fecha y hora convenientes para el briefing."
        : "Choose a suitable brief date and time.";
  const phonePlaceholder = useMemo(() => selectedCountry.nationalPlaceholder, [selectedCountry]);
  const briefDateOptions = useMemo(() => buildBriefDateOptions(lang), [lang]);
  const briefTimeOptions = useMemo<BriefOption[]>(
    () =>
      ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map(
        (time) => ({ value: time, label: time, meta: "MSK" }),
      ),
    [],
  );
  const briefDateDisplay = useMemo(() => formatBriefDateValue(values.briefDate, lang), [values.briefDate, lang]);

  const handleTextFieldChange = (name: ContactTextFieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) return;

    if (!values.name.trim() || !values.phone.trim() || !values.email.trim()) {
      setAlert({ tone: "error", text: copy.missingFields });
      return;
    }

    if (!values.briefDate.trim() || !values.briefTime.trim()) {
      setAlert({ tone: "error", text: missingScheduleText });
      return;
    }

    if (!isValidEmail(values.email)) {
      setAlert({ tone: "error", text: copy.invalidEmail });
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitLead(values, selectedCountry);

      if (!response.ok) {
        setAlert({ tone: "error", text: "Could not send the request." });
        return;
      }

      setAlert({ tone: "success", text: copy.success });
      trackEvent("submit_lead_form", {
        countryIso: selectedCountry.iso,
        hasCompany: Boolean(values.company.trim()),
        briefDate: values.briefDate.trim(),
        briefTime: values.briefTime.trim(),
      });
      setSubmitted(true);
    } catch {
      setAlert({ tone: "error", text: "Could not send the request." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenCountryPicker = () => {
    if (countryTriggerRef.current) {
      setCountryAnchorRect(countryTriggerRef.current.getBoundingClientRect());
    }
    setCountryOpen(true);
  };

  const handleOpenBriefDatePicker = () => {
    trackEvent("open_brief", { field: "date" });
    if (briefDateTriggerRef.current) {
      setBriefDateAnchorRect(briefDateTriggerRef.current.getBoundingClientRect());
    }
    setBriefTimeOpen(false);
    setBriefDateOpen(true);
  };

  const handleOpenBriefTimePicker = () => {
    trackEvent("open_brief", { field: "time" });
    if (briefTimeTriggerRef.current) {
      setBriefTimeAnchorRect(briefTimeTriggerRef.current.getBoundingClientRect());
    }
    setBriefDateOpen(false);
    setBriefTimeOpen(true);
  };

  return {
    alert,
    briefDateAnchorRect,
    briefDateDisplay,
    briefDateLabel,
    briefDateOpen,
    briefDateOptions,
    briefDateTriggerRef,
    briefTimeAnchorRect,
    briefTimeLabel,
    briefTimeOpen,
    briefTimeOptions,
    briefTimeTriggerRef,
    copy,
    countryAnchorRect,
    countryOpen,
    countryTriggerRef,
    focused,
    handleOpenBriefDatePicker,
    handleOpenBriefTimePicker,
    handleOpenCountryPicker,
    handleSubmit,
    handleTextFieldChange,
    phonePlaceholder,
    selectedCountry,
    setBriefDateOpen,
    setBriefTimeOpen,
    setCountryOpen,
    setFocused,
    setSelectedCountry,
    setValues,
    submitted,
    submitting,
    values,
  };
}
