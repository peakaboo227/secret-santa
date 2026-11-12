import "server-only";
import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const SCRYPT_KEYLEN = 32;

function scryptAsync(secret: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(secret, salt, SCRYPT_KEYLEN, { N: 16384, r: 8, p: 1 }, (err, key) => (err ? reject(err) : resolve(key))),
  );
}

export function isValidPin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

/** Hash a 4-digit PIN as "scrypt$<salt>$<hash>" (base64url). */
export async function hashPin(pin: string): Promise<string> {
  if (!isValidPin(pin)) throw new Error("pin must be 4 digits");
  const salt = randomBytes(16);
  const key = await scryptAsync(pin, salt);
  return `scrypt$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

export async function verifyPin(pin: string, stored: string): Promise<boolean> {
  const [algo, saltB64, keyB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !keyB64 || !isValidPin(pin)) return false;
  const expected = Buffer.from(keyB64, "base64url");
  const actual = await scryptAsync(pin, Buffer.from(saltB64, "base64url"));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
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
