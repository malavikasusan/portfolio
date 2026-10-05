/**
 * Auth helpers for the case study password gate.
 *
 * - HMAC-SHA256 cookie signing / verification
 * - Rate limiting (in-memory, per-IP)
 * - Cookie read helper
 */

import { createHmac, timingSafeEqual } from "crypto";

// ── Constants ────────────────────────────────────────────────────────────────

const COOKIE_NAME = "cs_access";
const FIXED_STRING = "cs_access_v1";
const COOKIE_MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days in seconds
const COOKIE_MAX_AGE_MS = COOKIE_MAX_AGE_S * 1000;

// ── Rate limiter ─────────────────────────────────────────────────────────────

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(ip: string): {
  allowed: boolean;
  delayMs: number;
} {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, delayMs: 0 };
  }

  bucket.count += 1;

  if (bucket.count > MAX_ATTEMPTS) {
    return { allowed: false, delayMs: 1500 };
  }

  return { allowed: true, delayMs: 0 };
}

export function resetRateLimit(ip: string): void {
  buckets.delete(ip);
}

// ── HMAC helpers ─────────────────────────────────────────────────────────────

function getSecret(): string {
  const secret = process.env.CASE_STUDY_COOKIE_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("CASE_STUDY_COOKIE_SECRET is not set or too short");
  }
  return secret;
}

function sign(expiryTs: number): string {
  const secret = getSecret();
  const payload = `${FIXED_STRING}:${expiryTs}`;
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function buildCookieValue(): string {
  const expiryTs = Date.now() + COOKIE_MAX_AGE_MS;
  const sig = sign(expiryTs);
  return `${expiryTs}.${sig}`;
}

export function verifyCookieValue(value: string): boolean {
  try {
    const dot = value.lastIndexOf(".");
    if (dot === -1) return false;

    const tsPart = value.slice(0, dot);
    const sigPart = value.slice(dot + 1);
    const expiryTs = Number(tsPart);

    if (!Number.isFinite(expiryTs)) return false;
    if (Date.now() > expiryTs) return false; // expired

    const expected = sign(expiryTs);

    // Constant-time comparison — both must be same length for timingSafeEqual
    const a = Buffer.from(sigPart.padEnd(64, " "), "utf8");
    const b = Buffer.from(expected.padEnd(64, " "), "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function checkPassword(candidate: string): boolean {
  const correct = process.env.CASE_STUDY_PASSWORD;
  if (!correct) return false;
  try {
    const a = Buffer.from(candidate.slice(0, 256).padEnd(256, " "), "utf8");
    const b = Buffer.from(correct.slice(0, 256).padEnd(256, " "), "utf8");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export { COOKIE_NAME, COOKIE_MAX_AGE_S };
