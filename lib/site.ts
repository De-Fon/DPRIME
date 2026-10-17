export const CANONICAL_SITE_URL = "https://dprime.co.ke";

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return CANONICAL_SITE_URL;
  }
  return "http://localhost:3000";
}
