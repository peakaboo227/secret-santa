import "server-only";
import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

export function isValidPin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

/** A random 4-digit PIN, "0000" to "9999". */
export function makePin(): string {
  return String(randomInt(0, 10000)).padStart(4, "0");
}

const CODE_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/** The random part of a game link (/g/<code>): lowercase letters and digits, hard to guess. */
export function makeGameCode(length = 10): string {
  let code = "";
  for (let i = 0; i < length; i++) code += CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)];
  return code;
}

/** A random token for a device cookie or a game code. */
export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

/** Device tokens are stored only as their SHA-256 hash. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("base64url");
}

/** The owner cookie value: an HMAC of a fixed label, so the secret itself is never stored in a cookie. */
export function ownerCookieValue(secret: string): string {
  return createHmac("sha256", secret).update("secret-santa:owner:v1").digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}
