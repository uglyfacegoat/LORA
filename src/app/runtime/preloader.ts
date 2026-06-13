import { isBrowser } from "./browser";

const PRELOADER_SEEN_KEY = "lora:preloader-seen";
const LAST_ACTIVE_KEY = "lora:last-active-at";
const PRELOADER_STALE_AFTER_MS = 30 * 60 * 1000;

function readLastActive() {
  if (!isBrowser()) return 0;
  try {
    const value = window.localStorage.getItem(LAST_ACTIVE_KEY);
    const timestamp = value ? Number(value) : 0;
    return Number.isFinite(timestamp) ? timestamp : 0;
  } catch {
    return 0;
  }
}

export function touchLastActive() {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
  } catch {}
}

export function shouldShowPreloader() {
  if (!isBrowser()) return false;
  let seenInTab = false;
  try {
    seenInTab = window.sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";
  } catch {}
  if (!seenInTab) return true;

  const lastActive = readLastActive();
  return lastActive > 0 && Date.now() - lastActive > PRELOADER_STALE_AFTER_MS;
}

export function markPreloaderComplete() {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
  } catch {}
  touchLastActive();
}

export function hasPrerenderedRoot() {
  return isBrowser() && !!document.getElementById("root")?.hasChildNodes();
}
