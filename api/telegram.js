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

const chatModes = new Map();
const BOT_HELP_TEXT = [
  "<b>LORA bot modes</b>",
  "",
  "• <b>AI Chat</b> — any agency task, sales thinking, offer structure, text polishing",
  "• <b>Client Reply</b> — response to an inbound lead or client message",
  "• <b>Follow-up</b> — short follow-up after silence",
  "• <b>Offer Outline</b> — scope / proposal structure",
  "",
  "Direct commands:",
  "<code>/ai your task</code>",
  "<code>/reply lead context</code>",
  "<code>/followup context</code>",
  "<code>/offer project context</code>",
  "<code>/menu</code>",
  "<code>/reset</code>",
].join("\n");

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function getModeIntro(mode) {
  switch (mode) {
    case "reply":
      return "Client Reply mode enabled. Send the lead context or the client's message.";
    case "followup":
      return "Follow-up mode enabled. Send the situation and I will draft the next touch.";
    case "offer":
      return "Offer Outline mode enabled. Send the niche / task / client context.";
    case "chat":
    default:
      return "AI Chat mode enabled. Send any task.";
  }
}

function parseCommand(text) {
  const trimmed = asText(text);
  if (!trimmed.startsWith("/")) return { command: "", prompt: "" };
  const [command, ...rest] = trimmed.split(" ");
  return {
    command: command.toLowerCase(),
    prompt: rest.join(" ").trim(),
  };
}

async function sendAiReply(token, chatId, mode, prompt, openRouterApiKey, openRouterModel) {
  const output = await generateOpenRouterText({
    apiKey: openRouterApiKey,
    model: openRouterModel,
    mode,
    prompt,
  });

  const chunks = splitTelegramText(output);
  for (const chunk of chunks) {
    await sendTelegramMessage(token, chatId, chunk);
  }
}

async function handleCallback(update, token) {
  const callback = update.callback_query;
  const callbackId = callback?.id;
  const chatId = callback?.message?.chat?.id;
  const messageId = callback?.message?.message_id;
  const data = asText(callback?.data);

  if (!callbackId || !chatId || !messageId) return;

  if (!isTelegramAdmin(chatId)) {
    await answerCallbackQuery(token, callbackId, "Not authorized.");
    return;
  }

  if (data === "mode:help") {
    await answerCallbackQuery(token, callbackId, "Help");
    await editTelegramMessage(token, chatId, messageId, BOT_HELP_TEXT, getBotMenuMarkup());
    return;
  }

  if (data === "mode:reset") {
    chatModes.delete(String(chatId));
    await answerCallbackQuery(token, callbackId, "Reset");
    await editTelegramMessage(token, chatId, messageId, getBotMenuText(), getBotMenuMarkup());
    return;
  }

  if (data.startsWith("mode:")) {
    const mode = data.slice("mode:".length);
    chatModes.set(String(chatId), mode);
    await answerCallbackQuery(token, callbackId, "Mode updated");
    await editTelegramMessage(
      token,
      chatId,
      messageId,
      `<b>${getModeIntro(mode)}</b>\n\nUse <code>/reset</code> to exit this mode.`,
      getBotMenuMarkup(),
    );
  }
}

async function handleMessage(update, token, openRouterApiKey, openRouterModel) {
  const message = update.message;
  const chatId = message?.chat?.id;
  const text = asText(message?.text);
  if (!chatId || !text) return;

  if (!isTelegramAdmin(chatId)) {
    await sendTelegramMessage(token, chatId, "This bot is restricted to the LORA team.");
    return;
  }

  const { command, prompt } = parseCommand(text);

  if (command === "/start" || command === "/menu") {
    chatModes.delete(String(chatId));
    await sendTelegramMessage(token, chatId, getBotMenuText(), {
      reply_markup: getBotMenuMarkup(),
    });
    return;
  }

  if (command === "/reset") {
    chatModes.delete(String(chatId));
    await sendTelegramMessage(token, chatId, "Mode cleared.", {
      reply_markup: getBotMenuMarkup(),
    });
    return;
  }

  if (command === "/help") {
    await sendTelegramMessage(token, chatId, BOT_HELP_TEXT, {
      reply_markup: getBotMenuMarkup(),
    });
    return;
  }

  const commandModeMap = {
    "/ai": "chat",
    "/reply": "reply",
    "/followup": "followup",
    "/offer": "offer",
  };

  const commandMode = commandModeMap[command];
  if (commandMode) {
    if (!prompt) {
      await sendTelegramMessage(token, chatId, `Send some context after ${command}.`);
      return;
    }
    await sendAiReply(token, chatId, commandMode, prompt, openRouterApiKey, openRouterModel);
    return;
  }

  const currentMode = chatModes.get(String(chatId));
  if (currentMode) {
    await sendAiReply(token, chatId, currentMode, text, openRouterApiKey, openRouterModel);
    return;
  }

  await sendTelegramMessage(token, chatId, "Open the menu and choose a mode.", {
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
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || "";
  const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";
  const openRouterModel = process.env.OPENROUTER_MODEL || "openai/gpt-oss-120b:free";

  if (!token) {
    sendJson(res, 500, { ok: false, error: "telegram_not_configured" });
    return;
  }

  if (!openRouterApiKey) {
    sendJson(res, 500, { ok: false, error: "openrouter_not_configured" });
    return;
  }

  try {
    const update = req.body || {};

    if (update.callback_query) {
      await handleCallback(update, token);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (update.message) {
      await handleMessage(update, token, openRouterApiKey, openRouterModel);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 200, { ok: true, ignored: true });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "telegram_handler_failed",
      details: error instanceof Error ? error.message : "unknown_error",
    });
  }
}
