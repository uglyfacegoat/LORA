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

// NOTE: In-memory Map doesn't work on serverless — each request = new instance.
// All modes are stateless: user must use /command prefix each time.

const BOT_HELP_TEXT = [
  "<b>LORA bot — команды</b>",
  "",
  "• <b>AI Chat</b> — любая задача, продажи, оффер, тексты",
  "• <b>Client Reply</b> — ответ на лид или сообщение клиента",
  "• <b>Follow-up</b> — фоллоу-ап после тишины",
  "• <b>Offer Outline</b> — структура предложения / брифа",
  "",
  "<b>Команды:</b>",
  "<code>/ai текст задачи</code>",
  "<code>/reply контекст лида</code>",
  "<code>/followup контекст</code>",
  "<code>/offer контекст проекта</code>",
  "<code>/menu</code> — главное меню",
].join("\n");

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function getModeIntro(mode) {
  switch (mode) {
    case "reply":    return "✉️ <b>Client Reply</b> — отправь контекст лида или сообщение клиента.";
    case "followup": return "🔄 <b>Follow-up</b> — отправь ситуацию, подготовлю следующий касание.";
    case "offer":    return "📋 <b>Offer Outline</b> — отправь нишу / задачу / контекст клиента.";
    default:         return "🤖 <b>AI Chat</b> — отправь любую задачу.";
  }
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

  const output = await generateOpenRouterText({ apiKey: openRouterApiKey, model: openRouterModel, mode, prompt });
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

  if (data === "mode:help") {
    await answerCallbackQuery(token, callbackId, "Help");
    await editTelegramMessage(token, chatId, messageId, BOT_HELP_TEXT, getBotMenuMarkup());
    return;
  }

  if (data === "mode:reset") {
    await answerCallbackQuery(token, callbackId, "Сброс");
    await editTelegramMessage(token, chatId, messageId, getBotMenuText(), getBotMenuMarkup());
    return;
  }

  if (data.startsWith("mode:")) {
    const mode = data.slice("mode:".length);
    const cmdName = mode === "chat" ? "ai" : mode;
    await answerCallbackQuery(token, callbackId, "Режим выбран");
    await editTelegramMessage(
      token, chatId, messageId,
      `${getModeIntro(mode)}\n\nИспользуй: <code>/${cmdName} [текст]</code>\n\n<code>/menu</code> — вернуться в меню.`,
      getBotMenuMarkup(),
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

  if (command === "/start" || command === "/menu") {
    await sendTelegramMessage(token, chatId, getBotMenuText(), { reply_markup: getBotMenuMarkup() });
    return;
  }
  if (command === "/reset") {
    await sendTelegramMessage(token, chatId, "✅ Сброс. Выбери режим:", { reply_markup: getBotMenuMarkup() });
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
      await sendTelegramMessage(token, chatId, `Напиши задачу после команды.\nПример: <code>${command} [текст]</code>`, { reply_markup: getBotMenuMarkup() });
      return;
    }
    if (!openRouterApiKey) {
      await sendTelegramMessage(token, chatId, "❌ OPENROUTER_API_KEY не настроен в переменных окружения Vercel.");
      return;
    }
    await sendAiReply(token, chatId, commandMode, prompt, openRouterApiKey, openRouterModel);
    return;
  }

  if (command) {
    await sendTelegramMessage(token, chatId, `Неизвестная команда <code>${command}</code>.`, { reply_markup: getBotMenuMarkup() });
    return;
  }

  // Plain text — prompt to use a command
  await sendTelegramMessage(token, chatId, "Используй команду или открой меню:", { reply_markup: getBotMenuMarkup() });
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

  // Respond 200 to Telegram IMMEDIATELY — prevents duplicate retries
  res.status(200).json({ ok: true });

  try {
    const update = req.body || {};
    if (update.callback_query) {
      await handleCallback(update, token, openRouterApiKey, openRouterModel);
      return;
    }
    if (update.message) {
      await handleMessage(update, token, openRouterApiKey, openRouterModel);
      return;
    }
  } catch (error) {
    console.error("telegram_handler_error:", error?.message || error);
  }
}
