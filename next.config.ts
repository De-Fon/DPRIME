import type { NextConfig } from "next";

// Images uploaded through the admin live in Supabase Storage. Allow next/image
// to optimise exactly that project's public bucket and nothing else.
function supabaseImagePattern() {
  const raw = process.env.SUPABASE_URL;
  if (!raw) return [];
  try {
    const u = new URL(raw);
    return [
      {
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        port: u.port,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: { remotePatterns: supabaseImagePattern() },
  experimental: {
    // Image uploads travel in the server action body. Vercel rejects request
    // bodies over 4.5 MB, so cap just below that (see lib/storage.ts).
    serverActions: { bodySizeLimit: "4.5mb" },
  },
};

export default nextConfig;
