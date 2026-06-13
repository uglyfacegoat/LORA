import { CONTACT_CHANNELS, CONTACT_EMAIL, MANAGER_CONTACT, PARTNERSHIP_EMAIL } from "../config/contact";
import type { Lang } from "../seo/site";

export type ContactClickEvent = "click_email" | "click_telegram";

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
  meta: string;
  event?: ContactClickEvent;
};

export type ContactsPageCopy = {
  eyebrow: string;
  title: string;
  project: string;
  partnership: string;
  support: string;
  soon: string;
  emptyLink: string;
  emptyPhone: string;
  mainPoint: string;
  botLabel: string;
  managerLabel: string;
  phone: string;
  projectSubject: string;
  partnershipSubject: string;
  supportSubject: string;
};

export type ContactsPageModel = {
  copy: ContactsPageCopy;
  mainEmailHref: string;
  workContacts: ContactItem[];
  socials: ContactItem[];
  managerContacts: ContactItem[];
};

export const contactsCopy: Record<Lang, ContactsPageCopy> = {
  en: {
    eyebrow: "CONTACTS",
    title: "All contact points",
    project: "Projects",
    partnership: "Partnership",
    support: "Support",
    soon: "Soon",
    emptyLink: "link later",
    emptyPhone: "phone later",
    mainPoint: "Main point",
    botLabel: "Contact bot",
    managerLabel: "Manager",
    phone: "Phone",
    projectSubject: "Project request",
    partnershipSubject: "Partnership request",
    supportSubject: "Support request",
  },
  es: {
    eyebrow: "CONTACTOS",
    title: "Todos los contactos",
    project: "Proyectos",
    partnership: "Alianza",
    support: "Soporte",
    soon: "Pronto",
    emptyLink: "link despues",
    emptyPhone: "telefono despues",
    mainPoint: "Principal",
    botLabel: "Bot de contacto",
    managerLabel: "Manager",
    phone: "Telefono",
    projectSubject: "Solicitud de proyecto",
    partnershipSubject: "Solicitud de alianza",
    supportSubject: "Solicitud de soporte",
  },
  ru: {
    eyebrow: "КОНТАКТЫ",
    title: "Все точки контакта",
    project: "Проекты",
    partnership: "Партнерство",
    support: "Поддержка",
    soon: "Скоро",
    emptyLink: "ссылка позже",
    emptyPhone: "номер позже",
    mainPoint: "Главная точка",
    botLabel: "Бот для связи",
    managerLabel: "Менеджер",
    phone: "Телефон",
    projectSubject: "Заявка на проект",
    partnershipSubject: "Предложение партнерства",
    supportSubject: "Запрос в поддержку",
  },
  zh: {
    eyebrow: "联系",
    title: "全部联系方式",
    project: "项目",
    partnership: "伙伴关系",
    support: "支持",
    soon: "即将开放",
    emptyLink: "稍后添加",
    emptyPhone: "稍后添加",
    mainPoint: "主入口",
    botLabel: "联系机器人",
    managerLabel: "经理",
    phone: "电话",
    projectSubject: "Project request",
    partnershipSubject: "Partnership request",
    supportSubject: "Support request",
  },
};

export function getContactsPageModel(lang: Lang): ContactsPageModel {
  const copy = contactsCopy[lang];

  return {
    copy,
    mainEmailHref: buildMailto(CONTACT_EMAIL, copy.projectSubject),
    workContacts: [
      {
        label: copy.project,
        value: CONTACT_EMAIL,
        href: buildMailto(CONTACT_EMAIL, copy.projectSubject),
        meta: "01",
        event: "click_email",
      },
      {
        label: copy.partnership,
        value: PARTNERSHIP_EMAIL,
        href: buildMailto(PARTNERSHIP_EMAIL, copy.partnershipSubject),
        meta: "02",
        event: "click_email",
      },
      {
        label: copy.support,
        value: CONTACT_EMAIL,
        href: buildMailto(CONTACT_EMAIL, copy.supportSubject),
        meta: "03",
        event: "click_email",
      },
    ],
    socials: [
      {
        label: "Telegram",
        value: CONTACT_CHANNELS.telegramLabel,
        href: CONTACT_CHANNELS.telegramUrl,
        meta: copy.emptyLink,
        event: "click_telegram",
      },
      {
        label: "Instagram",
        value: CONTACT_CHANNELS.instagramLabel,
        href: CONTACT_CHANNELS.instagramUrl,
        meta: copy.emptyLink,
      },
    ],
    managerContacts: [
      {
        label: copy.phone,
        value: MANAGER_CONTACT.phone || copy.emptyPhone,
        href: MANAGER_CONTACT.phone ? `tel:${MANAGER_CONTACT.phone.replace(/[^\d+]/g, "")}` : undefined,
        meta: "phone",
      },
      {
        label: "Telegram",
        value: MANAGER_CONTACT.telegramUrl ? "Telegram" : copy.emptyLink,
        href: MANAGER_CONTACT.telegramUrl,
        meta: "social",
        event: "click_telegram",
      },
      {
        label: "Instagram",
        value: MANAGER_CONTACT.instagramUrl ? "Instagram" : copy.emptyLink,
        href: MANAGER_CONTACT.instagramUrl,
        meta: "social",
      },
    ],
  };
}

function buildMailto(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
