import { telegramApi } from "../lib/telegram.js";

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || "";
  const secret = process.env.TELEGRAM_SETUP_SECRET || "";
  const receivedSecret = typeof req.query?.secret === "string" ? req.query.secret : "";

  if (!token) {
    sendJson(res, 500, { ok: false, error: "telegram_not_configured" });
    return;
  }

  if (secret && receivedSecret !== secret) {
    sendJson(res, 403, { ok: false, error: "forbidden" });
    return;
  }

  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;
    const webhookUrl = `${protocol}://${host}/api/telegram`;

    await telegramApi(token, "setWebhook", {
      url: webhookUrl,
      allowed_updates: ["message", "callback_query"],
    });

    await telegramApi(token, "setMyCommands", {
      commands: [
        { command: "menu", description: "Open main menu" },
        { command: "ai", description: "One-shot AI task" },
        { command: "reply", description: "Draft a client reply" },
        { command: "followup", description: "Draft a follow-up" },
        { command: "offer", description: "Create offer outline" },
        { command: "reset", description: "Reset current mode" },
      ],
    });

    sendJson(res, 200, { ok: true, webhookUrl });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "telegram_setup_failed",
      details: error instanceof Error ? error.message : "unknown_error",
    });
  }
}
