import { useI18n } from "../../i18n";
import { CONTACT_CHANNELS, CONTACT_EMAIL, MANAGER_CONTACT } from "../../config/contact";
import { getContactsPageModel } from "../../data/contactPage";
import type { SeoRoute } from "../../seo/routes";
import { trackEvent } from "../../analytics";
import { ContactBoardLine, ManagerContactLine, SocialPoint } from "../ContactPageLines";
import { SeoShell } from "../SeoShell";

export function ContactsPage({ route }: { route: SeoRoute }) {
  const { lang } = useI18n();
  const { copy, mainEmailHref, workContacts, socials, managerContacts } = getContactsPageModel(lang);

  return (
    <SeoShell route={route}>
      <div className="mx-auto max-w-6xl">
        <section className="pt-4">
          <p
            className="uppercase"
            style={{ fontSize: "0.58rem", letterSpacing: "0.3em", fontWeight: 850, color: "var(--fg-4)" }}
          >
            LORA · {copy.eyebrow}
          </p>
          <h1
            className="mt-8 max-w-5xl"
            style={{
              fontSize: "clamp(3.4rem, 8.2vw, 8.4rem)",
              lineHeight: 0.92,
              fontWeight: 900,
              color: "var(--fg-1)",
            }}
          >
            {copy.title}
          </h1>
        </section>

        <section className="mt-16 border-y py-8 md:mt-24 md:py-10" style={{ borderColor: "var(--surface-border)" }}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] lg:gap-14">
            <div className="flex min-h-[22rem] min-w-0 flex-col justify-between">
              <p
                className="uppercase"
                style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {copy.mainPoint}
              </p>
              <a
                href={mainEmailHref}
                onClick={() => trackEvent("click_email", { location: "contacts_board_main" })}
                className="mt-12 block break-words transition-opacity duration-300 hover:opacity-75"
                style={{
                  fontSize: "clamp(2rem, 4.2vw, 4.6rem)",
                  lineHeight: 0.94,
                  fontWeight: 900,
                  color: "var(--fg-1)",
                  overflowWrap: "anywhere",
                }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div
              className="grid min-w-0 content-between gap-8 lg:border-l lg:pl-10"
              style={{ borderColor: "var(--surface-border)" }}
            >
              <div className="grid gap-0">
                {workContacts.map((item, index) => (
                  <ContactBoardLine key={item.label} item={item} index={index} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-0 border-t pt-7" style={{ borderColor: "var(--surface-border)" }}>
                {socials.map((item) => (
                  <SocialPoint key={item.label} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 border-b pb-12 md:mt-16 md:pb-16" style={{ borderColor: "var(--surface-border)" }}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:gap-14">
            <div className="border-t pt-7" style={{ borderColor: "var(--surface-border)" }}>
              <p
                className="uppercase"
                style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 850, color: "var(--fg-4)" }}
              >
                {copy.botLabel}
              </p>
              {CONTACT_CHANNELS.botUrl ? (
                <a
                  href={CONTACT_CHANNELS.botUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("click_telegram", { location: "contacts_bot" })}
                  className="mt-7 block w-fit transition-opacity duration-300 hover:opacity-75"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 3.6rem)",
                    lineHeight: 0.96,
                    fontWeight: 900,
                    color: "var(--fg-1)",
                  }}
                >
                  {CONTACT_CHANNELS.botLabel}
                </a>
              ) : (
                <p
                  className="mt-7"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 3.6rem)",
                    lineHeight: 0.96,
                    fontWeight: 900,
                    color: "var(--fg-2)",
                  }}
                >
                  {CONTACT_CHANNELS.botLabel}
                </p>
              )}
              <p
                className="mt-5 uppercase"
                style={{ fontSize: "0.5rem", letterSpacing: "0.18em", fontWeight: 850, color: "var(--fg-5)" }}
              >
                {CONTACT_CHANNELS.botUrl ? "telegram" : copy.emptyLink}
              </p>
            </div>

            <div className="border-t pt-7" style={{ borderColor: "var(--surface-border)" }}>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
                <div>
                  <p
                    className="uppercase"
                    style={{ fontSize: "0.58rem", letterSpacing: "0.28em", fontWeight: 850, color: "var(--fg-4)" }}
                  >
                    {copy.managerLabel}
                  </p>
                  <p
                    className="mt-7"
                    style={{
                      fontSize: "clamp(1.55rem, 2.8vw, 2.9rem)",
                      lineHeight: 1,
                      fontWeight: 900,
                      color: "var(--fg-1)",
                    }}
                  >
                    {MANAGER_CONTACT.name}
                  </p>
                </div>
                <div className="grid gap-0">
                  {managerContacts.map((item, index) => (
                    <ManagerContactLine key={item.label} item={item} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
