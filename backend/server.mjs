import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildLeadActions, formatLeadMessage, getTelegramAdminChatIds, telegramApi, asText } from "../lib/telegram.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

loadEnvFile(join(__dirname, ".env"));

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8787);
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_ADMIN_CHAT_IDS = getTelegramAdminChatIds(process.env);

const server = createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    json(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && req.url === "/api/leads") {
    try {
      if (!TELEGRAM_BOT_TOKEN) {
        json(res, 500, { ok: false, error: "telegram_not_configured" });
        return;
      }

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
      const results = await Promise.allSettled(
        TELEGRAM_ADMIN_CHAT_IDS.map((chatId) =>
          telegramApi(TELEGRAM_BOT_TOKEN, "sendMessage", {
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
            reply_markup: replyMarkup,
          }),
        ),
      );

      if (results.every((item) => item.status === "rejected")) {
        json(res, 502, {
          ok: false,
          error: "telegram_failed",
          details: results.map((item) => item.status === "rejected" ? item.reason?.message || "telegram_send_failed" : "").join("; "),
        });
        return;
      }

      json(res, 200, { ok: true });
      return;
    } catch (error) {
      json(res, 500, {
        ok: false,
        error: "server_error",
        details: error instanceof Error ? error.message : "unknown_error",
      });
      return;
    }
  }

  json(res, 404, { ok: false, error: "not_found" });
});

server.listen(PORT, HOST, () => {
  console.log(`LORA backend listening on http://${HOST}:${PORT}`);
});

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
