import {
  answerCallbackQuery,
  asText,
  editTelegramMessage,
  generateOpenRouterText,
  getBotMenuMarkup,
  getBotMenuText,
  getTelegramAdminChatIds,
  isTelegramAdmin,
  sendTelegramMessage,
  splitTelegramText,
} from "../lib/telegram.js";

// ── Upstash Redis (HTTP, no npm needed) ──────────────────────────────────────
async function redisCommand(commands) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
    });
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

async function getMode(chatId) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/lora:mode:${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.result || null;
  } catch {
    return null;
  }
}

async function setMode(chatId, mode) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    // TTL 7 days so mode doesn't live forever if forgotten
    await fetch(`${url}/set/lora:mode:${chatId}/${mode}/ex/604800`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {}
}

async function clearMode(chatId) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    await fetch(`${url}/del/lora:mode:${chatId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {}
}
// ─────────────────────────────────────────────────────────────────────────────

const BOT_HELP_TEXT = [
  "<b>LORA Бот — команды</b>",
  "",
  "🧠 <b>AI Чат</b> — любые задачи, тексты, идеи",
  "✉️ <b>Ответ клиенту</b> — ответ на лид или сообщение клиента",
  "🔄 <b>Фоллоу-ап</b> — повторное касание после тишины",
  "📋 <b>Оффер</b> — структура предложения или брифа",
  "",
  "<b>Команды:</b>",
  "<code>/ai задача</code> — быстрый запрос",
  "<code>/reply контекст</code> — один ответ",
  "<code>/followup контекст</code> — фоллоу-ап",
  "<code>/offer контекст</code> — оффер",
  "<code>/menu</code> — главное меню",
  "<code>/reset</code> — сброс режима",
].join("\n");

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function getModeIntro(mode) {
  switch (mode) {
    case "reply":    return "✉️ <b>Ответ клиенту</b> — давай контекст лида или сообщение клиента.";
    case "followup": return "🔄 <b>Фоллоу-ап</b> — опиши ситуацию, подготовлю следующее касание.";
    case "offer":    return "📋 <b>Оффер</b> — дай нишу, задачу или контекст клиента.";
    default:         return "🧠 <b>AI Чат</b> — отправь любой запрос.";
  }
}

function getExitMarkup() {
  return {
    inline_keyboard: [[
      { text: "🔙 Выйти из режима", callback_data: "mode:reset" },
    ]],
  };
}

function parseCommand(text) {
  const trimmed = asText(text);
  if (!trimmed.startsWith("/")) return { command: "", prompt: "" };
  const spaceIdx = trimmed.indexOf(" ");
  if (spaceIdx === -1) return { command: trimmed.toLowerCase(), prompt: "" };
  return { command: trimmed.slice(0, spaceIdx).toLowerCase(), prompt: trimmed.slice(spaceIdx + 1).trim() };
}

async function sendAiReply(token, chatId, mode, prompt, openRouterApiKey, openRouterModel) {
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, action: "typing" }),
    });
  } catch {}

  let output;
  try {
    output = await Promise.race([
      generateOpenRouterText({ apiKey: openRouterApiKey, model: openRouterModel, mode, prompt }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("ai_timeout")), 50_000)
      ),
    ]);
  } catch (err) {
    if (err.message === "ai_timeout") {
      await sendTelegramMessage(token, chatId, "⏳ ИИ думает дольше обычного. Попробуй запрос покороче или повтори позже.");
      return;
    }
    throw err;
  }

  const chunks = splitTelegramText(output);
  for (const chunk of chunks) {
    await sendTelegramMessage(token, chatId, chunk);
  }
}

async function handleCallback(update, token, openRouterApiKey, openRouterModel) {
  const callback = update.callback_query;
  const callbackId = callback?.id;
  const chatId = callback?.message?.chat?.id;
  const messageId = callback?.message?.message_id;
  const data = asText(callback?.data);

  if (!callbackId || !chatId || !messageId) return;

  if (!isTelegramAdmin(chatId)) {
    await answerCallbackQuery(token, callbackId, "Нет доступа.", true);
    return;
  }

  // Lead contact buttons — show_alert:true makes it appear as a popup
  if (data.startsWith("lead_email:")) {
    await answerCallbackQuery(token, callbackId, data.slice("lead_email:".length) || "—", true);
    return;
  }
  if (data.startsWith("lead_phone:")) {
    await answerCallbackQuery(token, callbackId, data.slice("lead_phone:".length) || "—", true);
    return;
  }

  if (data === "mode:reset") {
    await clearMode(chatId);
    await answerCallbackQuery(token, callbackId, "Сбросен");
    await editTelegramMessage(token, chatId, messageId, getBotMenuText(), getBotMenuMarkup());
    return;
  }

  if (data.startsWith("mode:")) {
    const mode = data.slice("mode:".length);
    await setMode(chatId, mode);
    const cmdName = mode === "chat" ? "ai" : mode;
    await answerCallbackQuery(token, callbackId, "Режим выбран");
    await editTelegramMessage(
      token, chatId, messageId,
      `${getModeIntro(mode)}\n\nПросто пиши — я буду отвечать в этом режиме.\nСброс: <code>/reset</code> или <code>/menu</code>`,
      getExitMarkup(),
    );
    return;
  }
}

async function handleMessage(update, token, openRouterApiKey, openRouterModel) {
  const message = update.message;
  const chatId = message?.chat?.id;
  const text = asText(message?.text);
  if (!chatId || !text) return;

  if (!isTelegramAdmin(chatId)) {
    await sendTelegramMessage(token, chatId, "Этот бот закрыт для команды LORA.");
    return;
  }

  const { command, prompt } = parseCommand(text);

  // ── Hard commands — always work regardless of mode ────────────────────────
  if (command === "/start" || command === "/menu") {
    await clearMode(chatId);
    await sendTelegramMessage(token, chatId, getBotMenuText(), { reply_markup: getBotMenuMarkup() });
    return;
  }
  if (command === "/reset") {
    await clearMode(chatId);
    await sendTelegramMessage(token, chatId, "✅ Режим сброшен.", { reply_markup: getBotMenuMarkup() });
    return;
  }
  if (command === "/help") {
    await sendTelegramMessage(token, chatId, BOT_HELP_TEXT, { reply_markup: getBotMenuMarkup() });
    return;
  }

  // ── Explicit /command ─────────────────────────────────────────────────────
  const commandModeMap = { "/ai": "chat", "/reply": "reply", "/followup": "followup", "/offer": "offer" };
  const commandMode = commandModeMap[command];

  if (commandMode) {
    if (!prompt) {
      await setMode(chatId, commandMode);
      await sendTelegramMessage(
        token, chatId,
        `${getModeIntro(commandMode)}\n\nПросто пиши — я буду отвечать в этом режиме.\nСброс: <code>/reset</code> или <code>/menu</code>`,
        { reply_markup: getExitMarkup() },
      );
      return;
    }
    // Has inline text — one-shot, не меняем сохранённый режим
    if (!openRouterApiKey) {
      await sendTelegramMessage(token, chatId, "❌ <b>OPENROUTER_API_KEY</b> не настроен. Обратись к Slavik.");
      return;
    }
    await sendAiReply(token, chatId, commandMode, prompt, openRouterApiKey, openRouterModel);
    return;
  }

  if (command) {
    await sendTelegramMessage(token, chatId, `❓ Неизвестная команда <code>${command}</code>. Напиши <code>/menu</code>.`, { reply_markup: getBotMenuMarkup() });
    return;
  }

  // ── Plain text — check saved mode from Redis ──────────────────────────────
  const currentMode = await getMode(chatId);
  if (currentMode) {
    if (!openRouterApiKey) {
      await sendTelegramMessage(token, chatId, "❌ <b>OPENROUTER_API_KEY</b> не настроен.");
      return;
    }
    await sendAiReply(token, chatId, currentMode, text, openRouterApiKey, openRouterModel);
    return;
  }

  // No mode — show menu
  await sendTelegramMessage(token, chatId, getBotMenuText(), {
    reply_markup: getBotMenuMarkup(),
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      admins: getTelegramAdminChatIds(process.env),
      botReady: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      aiReady: Boolean(process.env.OPENROUTER_API_KEY),
      model: process.env.OPENROUTER_MODEL || "(not set)",
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || "";
  const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";
  const openRouterModel = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  if (!token) {
    sendJson(res, 500, { ok: false, error: "telegram_not_configured" });
    return;
  }

  try {
    const update = req.body || {};
    if (update.callback_query) {
      await handleCallback(update, token, openRouterApiKey, openRouterModel);
    } else if (update.message) {
      await handleMessage(update, token, openRouterApiKey, openRouterModel);
    }
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("telegram_handler_error:", error?.message || error);
    if (!res.headersSent) sendJson(res, 200, { ok: true });
  }
}
