function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatLeadMessage({ name, email, phone, company, dialCode, countryIso, countryLabel }) {
  const submittedAt = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const country = countryLabel ? `${countryLabel}${countryIso ? ` (${countryIso})` : ""}` : "-";

  return [
    "<b>LORA brief request</b>",
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Phone:</b> ${escapeHtml(`${dialCode} ${phone}`.trim())}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Company:</b> ${escapeHtml(company || "-")}`,
    `<b>Country:</b> ${escapeHtml(country)}`,
    "",
    `<b>Submitted:</b> ${escapeHtml(submittedAt)} MSK`,
  ].join("\n");
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
  const telegramAdminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "989807462";

  if (!telegramBotToken) {
    sendJson(res, 500, { ok: false, error: "telegram_not_configured" });
    return;
  }

  try {
    const name = asText(req.body?.name);
    const email = asText(req.body?.email);
    const phone = asText(req.body?.phone);
    const company = asText(req.body?.company);
    const dialCode = asText(req.body?.dialCode);
    const countryIso = asText(req.body?.countryIso);
    const countryLabel = asText(req.body?.countryLabel);

    if (!name || !email || !phone) {
      sendJson(res, 400, { ok: false, error: "missing_fields" });
      return;
    }

    const text = formatLeadMessage({ name, email, phone, company, dialCode, countryIso, countryLabel });

    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramAdminChatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      sendJson(res, 502, { ok: false, error: "telegram_failed", details });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "server_error",
      details: error instanceof Error ? error.message : "unknown_error",
    });
  }
}
