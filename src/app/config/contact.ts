export const SUPPORT_EMAIL = "support@loragroup.space";
export const PARTNERSHIP_EMAIL = "partners@loragroup.space";

export const CONTACT_EMAIL = SUPPORT_EMAIL;

type ContactChannels = {
  telegramUrl: string;
  instagramUrl: string;
  telegramLabel: string;
  instagramLabel: string;
  botUrl: string;
  botLabel: string;
};

type ManagerContact = {
  name: string;
  phone: string;
  telegramUrl: string;
  instagramUrl: string;
};

export const CONTACT_CHANNELS: ContactChannels = {
  telegramUrl: "",
  instagramUrl: "",
  telegramLabel: "Telegram",
  instagramLabel: "Instagram",
  botUrl: "",
  botLabel: "LORA bot",
};

export const MANAGER_CONTACT: ManagerContact = {
  name: "LORA manager",
  phone: "",
  telegramUrl: "",
  instagramUrl: "",
};
