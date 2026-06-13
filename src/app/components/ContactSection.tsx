import { motion } from "motion/react";
import { useI18n } from "../i18n";

import { ContactAlertToast } from "./ContactAlertToast";
import { ContactBriefButton } from "./ContactBriefButton";
import { ContactPhoneField } from "./ContactPhoneField";
import { BriefSelectModal, CountryPickerModal } from "./ContactPickerModals";
import {
  ContactCompanyIcon,
  ContactEmailIcon,
  ContactTextField,
  ContactUserIcon,
  type ContactTextFieldConfig,
} from "./ContactTextField";
import { useContactFormController } from "./useContactFormController";
import { useInView } from "./useInView";

export function ContactSection() {
  const [ref, inView] = useInView(0.1);
  const { t, lang } = useI18n();
  const {
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
  } = useContactFormController(lang);

  const fields: ContactTextFieldConfig[] = [
    {
      name: "name",
      placeholder: t("contact.name"),
      type: "text",
      icon: <ContactUserIcon />,
    },
    {
      name: "email",
      placeholder: t("contact.email"),
      type: "email",
      icon: <ContactEmailIcon />,
    },
    {
      name: "company",
      placeholder: t("contact.company"),
      type: "text",
      optional: true,
      icon: <ContactCompanyIcon />,
    },
  ];

  const fieldBox = (field: ContactTextFieldConfig) => {
    return (
      <ContactTextField
        key={field.name}
        field={field}
        value={values[field.name]}
        focused={focused === field.name}
        onChange={handleTextFieldChange}
        onFocus={setFocused}
        onBlur={() => setFocused(null)}
      />
    );
  };

  const phoneFocused = focused === "phone";

  return (
    <section ref={ref} id="contact" className="relative px-6 py-32 md:px-20 md:py-44">
      <ContactAlertToast alert={alert} />

      <CountryPickerModal
        open={countryOpen}
        onClose={() => setCountryOpen(false)}
        selectedIso={selectedCountry.iso}
        onSelect={setSelectedCountry}
        copy={copy}
        anchorRect={countryAnchorRect}
      />
      <BriefSelectModal
        open={briefDateOpen}
        onClose={() => setBriefDateOpen(false)}
        title={briefDateLabel}
        selectedValue={values.briefDate}
        onSelect={(value) => setValues((prev) => ({ ...prev, briefDate: value }))}
        anchorRect={briefDateAnchorRect}
        options={briefDateOptions}
        triggerAttribute="data-brief-date-trigger"
      />
      <BriefSelectModal
        open={briefTimeOpen}
        onClose={() => setBriefTimeOpen(false)}
        title={briefTimeLabel}
        selectedValue={values.briefTime}
        onSelect={(value) => setValues((prev) => ({ ...prev, briefTime: value }))}
        anchorRect={briefTimeAnchorRect}
        options={briefTimeOptions}
        triggerAttribute="data-brief-time-trigger"
      />

      <div id="contact-form" className="relative mx-auto max-w-3xl" style={{ scrollMarginTop: "80px" }}>
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2"
          style={{ background: "radial-gradient(circle, var(--surface-mid), transparent 55%)" }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="relative mb-6 flex items-center gap-4"
        >
          <div className="h-px w-8" style={{ background: "var(--line-soft)" }} />
          <span
            className="uppercase tracking-[0.35em]"
            style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--fg-3)" }}
          >
            {t("contact.eyebrow")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "var(--fg-1)",
          }}
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
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className="uppercase tracking-[0.3em]"
                style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--fg-1)" }}
              >
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
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--fg-2), transparent)" }}
            />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inset-0 animate-ping rounded-full"
                    style={{ background: "#10b981", opacity: 0.5 }}
                  />
                  <span className="relative h-2 w-2 rounded-full" style={{ background: "#10b981" }} />
                </span>
                <span
                  className="uppercase"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.25em", fontWeight: 700, color: "var(--fg-2)" }}
                >
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

                <ContactPhoneField
                  value={values.phone}
                  placeholder={phonePlaceholder}
                  selectedCountry={selectedCountry}
                  focused={phoneFocused}
                  triggerRef={countryTriggerRef}
                  onOpenCountryPicker={handleOpenCountryPicker}
                  onChange={(phone) => setValues((prev) => ({ ...prev, phone }))}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <ContactBriefButton
                    label={briefDateLabel}
                    value={briefDateDisplay}
                    open={briefDateOpen}
                    icon="date"
                    triggerAttribute="data-brief-date-trigger"
                    triggerRef={briefDateTriggerRef}
                    onClick={handleOpenBriefDatePicker}
                  />

                  <ContactBriefButton
                    label={briefTimeLabel}
                    value={values.briefTime}
                    open={briefTimeOpen}
                    icon="time"
                    triggerAttribute="data-brief-time-trigger"
                    triggerRef={briefTimeTriggerRef}
                    onClick={handleOpenBriefTimePicker}
                  />
                </div>

                {fieldBox(fields[1])}
                {fieldBox(fields[2])}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="relative mt-5 w-full cursor-pointer overflow-hidden rounded-xl py-5 uppercase tracking-[0.3em] transition-all duration-500 hover:scale-[1.005] active:scale-[0.995]"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  background: "var(--fg-1)",
                  color: "var(--app-bg)",
                  boxShadow: "0 20px 60px -20px var(--surface-strong)",
                  opacity: submitting ? 0.72 : 1,
                  pointerEvents: submitting ? "none" : "auto",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t("contact.submit")}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 6H11M11 6L7 2M11 6L7 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
