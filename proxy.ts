import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Optimistic gate: send visitors without a session cookie to the login page.
// The cookie is NOT verified here; every admin page and server action calls
// requireAdmin() (lib/auth.ts) for the real check.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (!request.cookies.has("admin_session")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
