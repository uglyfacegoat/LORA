import { asText, buildLeadActions, formatLeadMessage, getTelegramAdminChatIds, sendTelegramToAdmins } from "../lib/telegram.js";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramAdminChatIds = getTelegramAdminChatIds(process.env);

  if (!telegramBotToken) {
    sendJson(res, 500, { ok: false, error: "telegram_not_configured" });
    return;
  }

  try {
    const name = asText(req.body?.name);
    const email = asText(req.body?.email);
    const phone = asText(req.body?.phone);
    const company = asText(req.body?.company);
    const briefDate = asText(req.body?.briefDate);
    const briefTime = asText(req.body?.briefTime);
    const dialCode = asText(req.body?.dialCode);
    const countryIso = asText(req.body?.countryIso);
    const countryLabel = asText(req.body?.countryLabel);

    if (!name || !email || !phone || !briefDate || !briefTime) {
      sendJson(res, 400, { ok: false, error: "missing_fields" });
      return;
    }

    const text = formatLeadMessage({ name, email, phone, company, briefDate, briefTime, dialCode, countryIso, countryLabel });
    const replyMarkup = buildLeadActions({ email, dialCode, phone });

    await sendTelegramToAdmins(telegramBotToken, telegramAdminChatIds, text, {
      reply_markup: replyMarkup,
    });

    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : "unknown_error",
    });
  }
}
