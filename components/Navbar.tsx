"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() || "/";

  const linkClass = (path: string) =>
    `text-sm ${pathname === path || (path !== "/" && pathname.startsWith(path)) ? "text-slate font-semibold" : "text-ink hover:text-slate"}`;

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-line">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="DPRIME — home" className="flex items-center justify-between">
          <Image
            src="/images/team/logo3.png"
            alt="DPRIME"
            width={50}
            height={50}
            priority
            className="object-contain"
          />
          <span className="text-xl font-bold text-ink">DPRIME</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/projects" className={linkClass("/projects")}>
            Projects
          </Link>
          <Link href="/services" className={linkClass("/services")}>
            Services
          </Link>
          <Link href="/team" className={linkClass("/team")}>
            Team
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
          <Link href="/contact" className="ml-4 inline-block px-4 py-2 rounded bg-amber text-paper text-sm font-semibold">Start a project</Link>
        </div>

        {/* Mobile: simple anchor links; keep behavior minimal */}
        <div className="md:hidden">
          <Link href="/contact" className="inline-block px-3 py-2 rounded bg-amber text-paper text-sm font-semibold">Start</Link>
        </div>
      </nav>
    </header>
  );
}
