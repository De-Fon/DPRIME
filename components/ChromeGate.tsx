"use client";

import { usePathname } from "next/navigation";

// Hides site chrome (navbar, footer) on immersive pages.
const IMMERSIVE_PREFIXES = ["/manifesto"];

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  if (IMMERSIVE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
