import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Single-password admin auth. The session is a signed, expiring token in an
// httpOnly cookie. Both ADMIN_PASSWORD and SESSION_SECRET must be set; if
// either is missing the portal fails closed.

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const MIN_SECRET_LENGTH = 32;

export function authConfigured(): boolean {
  return (
    !!process.env.ADMIN_PASSWORD &&
    (process.env.SESSION_SECRET?.length ?? 0) >= MIN_SECRET_LENGTH
  );
}

function sign(payload: string): string {
  return createHmac("sha256", process.env.SESSION_SECRET ?? "")
    .update(payload)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so inputs of different length compare in constant time.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(candidate: string): boolean {
  if (!authConfigured()) return false;
  return safeEqual(candidate, process.env.ADMIN_PASSWORD!);
}

export function createSessionToken(now = Date.now()): string {
  const expires = String(now + SESSION_TTL_SECONDS * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || !authConfigured()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires))) return false;
  return Number(expires) > now;
}

export async function setSessionCookie(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
}

// Call at the top of every admin page and server action. The proxy only does
// a cheap cookie-presence redirect; this is the real check.
export async function requireAdmin(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/admin/login");
}
