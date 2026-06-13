import type { CSSProperties } from "react";
import { trackEvent } from "../analytics";
import type { ContactItem } from "../data/contactPage";

export function ContactBoardLine({ item, index }: { item: ContactItem; index: number }) {
  return (
    <div
      className="grid min-w-0 gap-4 py-6 md:grid-cols-[2.4rem_0.52fr_minmax(0,1fr)] md:items-baseline"
      style={{ borderTop: index === 0 ? "none" : "1px solid var(--surface-border)" }}
    >
      <span
        className="uppercase"
        style={{ fontSize: "0.58rem", letterSpacing: "0.24em", fontWeight: 900, color: "var(--fg-5)" }}
      >
        {item.meta}
      </span>
      <span
        className="uppercase"
        style={{ fontSize: "0.6rem", letterSpacing: "0.24em", fontWeight: 900, color: "var(--fg-4)" }}
      >
        {item.label}
      </span>
      <ContactValue item={item} locationPrefix="contacts" />
    </div>
  );
}

export function SocialPoint({ item }: { item: ContactItem }) {
  const content = (
    <>
      <span
        className="uppercase"
        style={{ fontSize: "0.54rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-4)" }}
      >
        {item.label}
      </span>
      <span
        className="mt-3 block"
        style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.45rem)", lineHeight: 1.05, fontWeight: 900, color: "var(--fg-2)" }}
      >
        {item.value}
      </span>
      <span
        className="mt-4 block uppercase"
        style={{ fontSize: "0.5rem", letterSpacing: "0.18em", fontWeight: 850, color: "var(--fg-5)" }}
      >
        {item.meta}
      </span>
    </>
  );

  if (!item.href) {
    return <div>{content}</div>;
  }

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      onClick={() => item.event && trackEvent(item.event, { location: `contacts_social_${item.label}` })}
      className="transition-opacity duration-300 hover:opacity-75"
    >
      {content}
    </a>
  );
}

export function ManagerContactLine({ item, index }: { item: ContactItem; index: number }) {
  const valueStyle: CSSProperties = {
    fontSize: "clamp(0.95rem, 1.35vw, 1.3rem)",
    lineHeight: 1.12,
    fontWeight: 900,
    color: item.href ? "var(--fg-1)" : "var(--fg-4)",
    overflowWrap: "anywhere",
  };

  return (
    <div
      className="grid gap-3 py-4 sm:grid-cols-[0.45fr_minmax(0,1fr)] sm:items-baseline"
      style={{ borderTop: index === 0 ? "none" : "1px solid var(--surface-border)" }}
    >
      <span
        className="uppercase"
        style={{ fontSize: "0.54rem", letterSpacing: "0.22em", fontWeight: 850, color: "var(--fg-4)" }}
      >
        {item.label}
      </span>
      {item.href ? (
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          onClick={() => item.event && trackEvent(item.event, { location: `contacts_manager_${item.label}` })}
          className="w-fit transition-opacity duration-300 hover:opacity-75"
          style={valueStyle}
        >
          {item.value}
        </a>
      ) : (
        <span style={valueStyle}>{item.value}</span>
      )}
    </div>
  );
}

function ContactValue({ item, locationPrefix }: { item: ContactItem; locationPrefix: string }) {
  const valueStyle: CSSProperties = {
    fontSize: "clamp(1rem, 1.45vw, 1.45rem)",
    lineHeight: 1.1,
    fontWeight: 900,
    color: item.href ? "var(--fg-1)" : "var(--fg-2)",
    overflowWrap: "anywhere",
  };

  if (!item.href) {
    return (
      <span className="break-words" style={valueStyle}>
        {item.value}
      </span>
    );
  }

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      onClick={() => item.event && trackEvent(item.event, { location: `${locationPrefix}_${item.label}` })}
      className="w-fit break-words transition-opacity duration-300 hover:opacity-70"
      style={valueStyle}
    >
      {item.value}
    </a>
  );
}
