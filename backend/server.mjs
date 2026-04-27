import { createServer } from "node:http";
import { readFileSync, existsSync, createReadStream, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  answerCallbackQuery,
  asText,
  buildLeadActions,
  editTelegramMessage,
  formatLeadMessage,
  generateOpenRouterText,
  getBotMenuMarkup,
  getBotMenuText,
  getTelegramAdminChatIds,
  isTelegramAdmin,
  sendTelegramMessage,
  sendTelegramToAdmins,
  splitTelegramText,
  telegramApi,
} from "../lib/telegram.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

loadEnvFile(join(__dirname, ".env"));

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8787);

// ── In-memory Redis-like mode store (works fine on a real server) ─────────────
const chatModes = new Map();
function getMode(chatId) { return chatModes.get(String(chatId)) || null; }
function setMode(chatId, mode) { chatModes.set(String(chatId), mode); }
function clearMode(chatId) { chatModes.delete(String(chatId)); }
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

function getModeIntro(mode) {
  switch (mode) {
    case "reply":    return "✉️ <b>Ответ клиенту</b> — давай контекст лида или сообщение клиента.";
    case "followup": return "🔄 <b>Фоллоу-ап</b> — опиши ситуацию, подготовлю следующее касание.";
    case "offer":    return "📋 <b>Оффер</b> — дай нишу, задачу или контекст клиента.";
    default:         return "🧠 <b>AI Чат</b> — отправь любой запрос.";
  }
}

function getExitMarkup() {
  return { inline_keyboard: [[{ text: "🔙 Выйти из режима", callback_data: "mode:reset" }]] };
}

function parseCommand(text) {
  const trimmed = asText(text);
  if (!trimmed.startsWith("/")) return { command: "", prompt: "" };
  const spaceIdx = trimmed.indexOf(" ");
  if (spaceIdx === -1) return { command: trimmed.toLowerCase(), prompt: "" };
  return { command: trimmed.slice(0, spaceIdx).toLowerCase(), prompt: trimmed.slice(spaceIdx + 1).trim() };
}

async function sendAiReply(token, chatId, mode, prompt, apiKey, model) {
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, action: "typing" }),
    });
  } catch {}

  const output = await generateOpenRouterText({ apiKey, model, mode, prompt });
  const chunks = splitTelegramText(output);
  for (const chunk of chunks) {
    await sendTelegramMessage(token, chatId, chunk);
  }
}

async function handleTelegramCallback(update, token, apiKey, model) {
  const cb = update.callback_query;
  const callbackId = cb?.id;
  const chatId = cb?.message?.chat?.id;
  const messageId = cb?.message?.message_id;
  const data = asText(cb?.data);
  if (!callbackId || !chatId || !messageId) return;

  if (!isTelegramAdmin(chatId)) {
    await answerCallbackQuery(token, callbackId, "Нет доступа.", true);
    return;
  }
  if (data.startsWith("lead_email:")) {
    await answerCallbackQuery(token, callbackId, data.slice("lead_email:".length) || "—", true);
    return;
  }
  if (data.startsWith("lead_phone:")) {
    await answerCallbackQuery(token, callbackId, data.slice("lead_phone:".length) || "—", true);
    return;
  }
  if (data === "mode:reset") {
    clearMode(chatId);
    await answerCallbackQuery(token, callbackId, "Сброшен");
    await editTelegramMessage(token, chatId, messageId, getBotMenuText(), getBotMenuMarkup());
    return;
  }
  if (data.startsWith("mode:")) {
    const mode = data.slice("mode:".length);
    setMode(chatId, mode);
    await answerCallbackQuery(token, callbackId, "Режим выбран");
    await editTelegramMessage(
      token, chatId, messageId,
      `${getModeIntro(mode)}\n\nПросто пиши — я буду отвечать в этом режиме.\nСброс: <code>/reset</code> или <code>/menu</code>`,
      getExitMarkup(),
    );
    return;
  }
}

async function handleTelegramMessage(update, token, apiKey, model) {
  const message = update.message;
  const chatId = message?.chat?.id;
  const text = asText(message?.text);
  if (!chatId || !text) return;

  if (!isTelegramAdmin(chatId)) {
    await sendTelegramMessage(token, chatId, "Этот бот закрыт для команды LORA.");
    return;
  }

  const { command, prompt } = parseCommand(text);

  if (command === "/start" || command === "/menu") {
    clearMode(chatId);
    await sendTelegramMessage(token, chatId, getBotMenuText(), { reply_markup: getBotMenuMarkup() });
    return;
  }
  if (command === "/reset") {
    clearMode(chatId);
    await sendTelegramMessage(token, chatId, "✅ Режим сброшен.", { reply_markup: getBotMenuMarkup() });
    return;
  }
  if (command === "/help") {
    await sendTelegramMessage(token, chatId, BOT_HELP_TEXT, { reply_markup: getBotMenuMarkup() });
    return;
  }

  const commandModeMap = { "/ai": "chat", "/reply": "reply", "/followup": "followup", "/offer": "offer" };
  const commandMode = commandModeMap[command];

  if (commandMode) {
    if (!prompt) {
      setMode(chatId, commandMode);
      await sendTelegramMessage(
        token, chatId,
        `${getModeIntro(commandMode)}\n\nПросто пиши — я буду отвечать в этом режиме.\nСброс: <code>/reset</code> или <code>/menu</code>`,
        { reply_markup: getExitMarkup() },
      );
      return;
    }
    if (!apiKey) {
      await sendTelegramMessage(token, chatId, "❌ <b>OPENROUTER_API_KEY</b> не настроен.");
      return;
    }
    await sendAiReply(token, chatId, commandMode, prompt, apiKey, model);
    return;
  }

  if (command) {
    await sendTelegramMessage(token, chatId, `❓ Неизвестная команда <code>${command}</code>. Напиши <code>/menu</code>.`, { reply_markup: getBotMenuMarkup() });
    return;
  }

  const currentMode = getMode(chatId);
  if (currentMode) {
    if (!apiKey) {
      await sendTelegramMessage(token, chatId, "❌ <b>OPENROUTER_API_KEY</b> не настроен.");
      return;
    }
    await sendAiReply(token, chatId, currentMode, text, apiKey, model);
    return;
  }

  await sendTelegramMessage(token, chatId, getBotMenuText(), { reply_markup: getBotMenuMarkup() });
}

const server = createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // ── Health ───────────────────────────────────────────────────────────────
  if (req.method === "GET" && path === "/api/health") {
    json(res, 200, {
      ok: true,
      botReady: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      aiReady: Boolean(process.env.OPENROUTER_API_KEY),
      model: process.env.OPENROUTER_MODEL || "(not set)",
    });
    return;
  }

  // ── Leads ────────────────────────────────────────────────────────────────
  if (req.method === "POST" && path === "/api/leads") {
    const token = process.env.TELEGRAM_BOT_TOKEN || "";
    if (!token) { json(res, 500, { ok: false, error: "telegram_not_configured" }); return; }
    try {
      const body = await readJson(req);
      const name = asText(body.name);
      const email = asText(body.email);
      const phone = asText(body.phone);
      const company = asText(body.company);
      const briefDate = asText(body.briefDate);
      const briefTime = asText(body.briefTime);
      const dialCode = asText(body.dialCode);
      const countryIso = asText(body.countryIso);
      const countryLabel = asText(body.countryLabel);

      if (!name || !email || !phone || !briefDate || !briefTime) {
        json(res, 400, { ok: false, error: "missing_fields" });
        return;
      }

      const text = formatLeadMessage({ name, email, phone, company, briefDate, briefTime, dialCode, countryIso, countryLabel });
      const replyMarkup = buildLeadActions({ email, dialCode, phone });
      await sendTelegramToAdmins(token, getTelegramAdminChatIds(process.env), text, { reply_markup: replyMarkup });
      json(res, 200, { ok: true });
    } catch (error) {
      json(res, 500, { ok: false, error: "server_error", details: error?.message || "unknown" });
    }
    return;
  }

  // ── Telegram webhook ─────────────────────────────────────────────────────
  if (req.method === "POST" && path === "/api/telegram") {
    const token = process.env.TELEGRAM_BOT_TOKEN || "";
    const apiKey = process.env.OPENROUTER_API_KEY || "";
    const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
    if (!token) { json(res, 500, { ok: false, error: "telegram_not_configured" }); return; }
    try {
      const update = await readJson(req);
      json(res, 200, { ok: true }); // ACK Telegram immediately
      if (update.callback_query) {
        await handleTelegramCallback(update, token, apiKey, model);
      } else if (update.message) {
        await handleTelegramMessage(update, token, apiKey, model);
      }
    } catch (error) {
      console.error("telegram_error:", error?.message || error);
      if (!res.writableEnded) json(res, 200, { ok: true });
    }
    return;
  }

  // ── Telegram setup (register webhook) ───────────────────────────────────
  if (req.method === "GET" && path === "/api/telegram-setup") {
    const token = process.env.TELEGRAM_BOT_TOKEN || "";
    const secret = process.env.TELEGRAM_SETUP_SECRET || "";
    const receivedSecret = url.searchParams.get("secret") || "";
    if (!token) { json(res, 500, { ok: false, error: "telegram_not_configured" }); return; }
    if (secret && receivedSecret !== secret) { json(res, 403, { ok: false, error: "forbidden" }); return; }
    try {
      const webhookUrl = `${process.env.WEBHOOK_BASE_URL || `http://localhost:${PORT}`}/api/telegram`;
      await telegramApi(token, "setWebhook", {
        url: webhookUrl,
        allowed_updates: ["message", "callback_query"],
      });
      await telegramApi(token, "setMyCommands", {
        commands: [
          { command: "menu",      description: "Главное меню" },
          { command: "ai",        description: "AI запрос" },
          { command: "reply",     description: "Ответ клиенту" },
          { command: "followup",  description: "Фоллоу-ап" },
          { command: "offer",     description: "Оффер" },
          { command: "reset",     description: "Сброс режима" },
        ],
      });
      json(res, 200, { ok: true, webhookUrl });
    } catch (error) {
      json(res, 500, { ok: false, error: "setup_failed", details: error?.message || "unknown" });
    }
    return;
  }

  // ── Static frontend ────────────────────────────────────────────────────
  const distDir = join(__dirname, "../dist");
  if (existsSync(distDir)) {
    // Strip query string, decode URI
    let filePath = decodeURIComponent(path);
    // Never serve dotfiles or escape dist
    if (filePath.includes("..") || filePath.startsWith("/..")) {
      res.writeHead(403); res.end(); return;
    }
    let candidate = join(distDir, filePath);
    // Directory → index.html
    if (!existsSync(candidate) || !statSync(candidate).isFile()) {
      candidate = join(distDir, "index.html");
    }
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      const ext = candidate.split(".").pop();
      const mime = {
        html: "text/html; charset=utf-8",
        js:   "application/javascript",
        css:  "text/css",
        svg:  "image/svg+xml",
        png:  "image/png",
        jpg:  "image/jpeg",
        ico:  "image/x-icon",
        woff2:"font/woff2",
        woff: "font/woff",
        ttf:  "font/ttf",
        json: "application/json",
        webp: "image/webp",
      }[ext] || "application/octet-stream";
      const isAsset = filePath.startsWith("/assets/");
      res.writeHead(200, {
        "Content-Type": mime,
        ...(isAsset ? { "Cache-Control": "public, max-age=31536000, immutable" } : {}),
      });
      createReadStream(candidate).pipe(res);
      return;
    }
  }

  json(res, 404, { ok: false, error: "not_found" });
});

server.listen(PORT, HOST, () => {
  console.log(`LORA backend listening on http://${HOST}:${PORT}`);
  startPolling();
});

// ── Telegram long-polling (no webhook / no HTTPS required) ────────────────────
async function startPolling() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const apiKey = process.env.OPENROUTER_API_KEY || "";
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  if (!token) { console.warn("polling: TELEGRAM_BOT_TOKEN not set, skipping"); return; }

  // Delete any existing webhook so Telegram switches to getUpdates
  try {
    await telegramApi(token, "deleteWebhook", { drop_pending_updates: false });
    console.log("polling: webhook removed, starting long-poll loop");
  } catch (e) {
    console.warn("polling: could not delete webhook:", e.message);
  }

  let offset = 0;
  while (true) {
    try {
      const data = await telegramApi(token, "getUpdates", { timeout: 30, offset, allowed_updates: ["message", "callback_query"] });
      const updates = data?.result ?? [];
      for (const update of updates) {
        offset = update.update_id + 1;
        try {
          if (update.callback_query) {
            await handleTelegramCallback({ callback_query: update.callback_query }, token, apiKey, model);
          } else if (update.message) {
            await handleTelegramMessage({ message: update.message }, token, apiKey, model);
          }
        } catch (e) {
          console.error("polling: update error:", e.message);
        }
      }
    } catch (e) {
      console.error("polling: getUpdates error:", e.message);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function json(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("payload_too_large"));
      }
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });

    req.on("error", reject);
  });
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
