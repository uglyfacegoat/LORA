const DEFAULT_ADMIN_CHAT_IDS = ["989807462", "704281358"];
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function getTelegramAdminChatIds(env = process.env) {
  const explicit = asText(env.TELEGRAM_ADMIN_CHAT_IDS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (explicit.length > 0) return [...new Set(explicit)];

  const single = asText(env.TELEGRAM_ADMIN_CHAT_ID || "");
  return [...new Set([single, ...DEFAULT_ADMIN_CHAT_IDS].filter(Boolean))];
}

export function isTelegramAdmin(chatId, env = process.env) {
  return getTelegramAdminChatIds(env).includes(String(chatId));
}

export function formatBriefSlot(briefDate, briefTime) {
  const date = asText(briefDate);
  const time = asText(briefTime);
  if (!date && !time) return "-";
  if (!date) return time;
  if (!time) return date;

  const parsed = new Date(`${date}T${time}`);
  if (Number.isNaN(parsed.getTime())) return `${date} ${time}`;

  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);

  return `${formattedDate}, ${time}`;
}

export function formatLeadMessage({ name, email, phone, company, dialCode, countryIso, countryLabel, briefDate, briefTime }) {
  const submittedAt = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const country = countryLabel ? `${countryLabel}${countryIso ? ` (${countryIso})` : ""}` : "-";
  const briefSlot = formatBriefSlot(briefDate, briefTime);

  return [
    "<b>LORA brief request</b>",
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Phone:</b> ${escapeHtml(`${dialCode} ${phone}`.trim())}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Company:</b> ${escapeHtml(company || "-")}`,
    `<b>Country:</b> ${escapeHtml(country)}`,
    `<b>Preferred brief slot:</b> ${escapeHtml(briefSlot)}`,
    "",
    `<b>Submitted:</b> ${escapeHtml(submittedAt)} MSK`,
  ].join("\n");
}

export function buildLeadActions({ email, dialCode, phone }) {
  const buttons = [];
  const safeEmail = asText(email);
  const safePhone = `${asText(dialCode)} ${asText(phone)}`.trim();

  if (safeEmail) {
    buttons.push({ text: "Email", callback_data: `lead_email:${safeEmail}`.slice(0, 64) });
  }
  if (safePhone) {
    buttons.push({ text: "Phone", callback_data: `lead_phone:${safePhone}`.slice(0, 64) });
  }

  return buttons.length > 0 ? { inline_keyboard: [buttons] } : undefined;
}

export async function telegramApi(token, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { ok: response.ok, raw: text };
  }

  if (!response.ok || parsed?.ok === false) {
    throw new Error(typeof parsed?.description === "string" ? parsed.description : text || "telegram_api_failed");
  }

  return parsed;
}

export async function sendTelegramMessage(token, chatId, text, extra = {}) {
  return telegramApi(token, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...extra,
  });
}

export async function sendTelegramToAdmins(token, chatIds, text, extra = {}) {
  const results = await Promise.allSettled(
    chatIds.map((chatId) => sendTelegramMessage(token, chatId, text, extra)),
  );

  const rejected = results.filter((result) => result.status === "rejected");
  if (rejected.length === results.length) {
    throw new Error(rejected.map((item) => item.reason?.message || "telegram_send_failed").join("; "));
  }

  return results;
}

export async function answerCallbackQuery(token, callbackQueryId, text, showAlert = false) {
  return telegramApi(token, "answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: showAlert,
  });
}

export async function editTelegramMessage(token, chatId, messageId, text, replyMarkup) {
  return telegramApi(token, "editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: replyMarkup,
  });
}

export function getBotMenuText() {
  return [
    "<b>LORA Бот</b>",
    "",
    "Выбери режим и просто пиши — бот будет работать в нём, пока не сбросишь.",
    "",
    "🧠 <b>AI Чат</b> — любые задачи, тексты, идеи",
    "✉️ <b>Ответ клиенту</b> — ответ на лид или сообщение",
    "🔄 <b>Фоллоу-ап</b> — повторное касание после тишины",
    "📋 <b>Оффер</b> — структура предложения или брифа",
  ].join("\n");
}

export function getBotMenuMarkup() {
  return {
    inline_keyboard: [
      [
        { text: "🧠 AI Чат", callback_data: "mode:chat" },
        { text: "✉️ Ответ клиенту", callback_data: "mode:reply" },
      ],
      [
        { text: "🔄 Фоллоу-ап", callback_data: "mode:followup" },
        { text: "📋 Оффер", callback_data: "mode:offer" },
      ],
      [
        { text: "🔙 Сброс режима", callback_data: "mode:reset" },
      ],
    ],
  };
}

export function getModePrompt(mode) {
  switch (mode) {
    case "reply":
      return "You are an elite sales assistant for LORA, a premium conversion systems agency. Write concise, confident, tasteful client replies. No hype. Optimize for trust, clarity, and next-step movement.";
    case "followup":
      return "You write short, sharp follow-up messages for a premium agency. Be warm, direct, and commercially smart. Keep messages practical and easy to send in Telegram, email, or WhatsApp.";
    case "offer":
      return "You help LORA structure premium agency offers, briefs, and project outlines. Output practical structure, scope, and messaging. Be concrete, strategic, and concise.";
    default:
      return "You are LORA's internal AI assistant for a premium conversion systems agency. Help with operations, sales, offer thinking, client communication, and strategic wording. Be concise, sharp, and commercially useful.";
  }
}

export async function generateOpenRouterText({ apiKey, model, mode, prompt }) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: getModePrompt(mode) },
        { role: "user", content: prompt },
      ],
      temperature: mode === "chat" ? 0.7 : 0.55,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error?.message || "openrouter_failed");
  }

  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("empty_ai_response");
  }

  return content.trim();
}

export function splitTelegramText(text, limit = 3500) {
  if (text.length <= limit) return [text];
  const chunks = [];
  let rest = text;
  while (rest.length > limit) {
    let cut = rest.lastIndexOf("\n", limit);
    if (cut < 800) cut = limit;
    chunks.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }
  if (rest) chunks.push(rest);
  return chunks;
}
