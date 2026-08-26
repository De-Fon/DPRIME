"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

const navItems = [
  { label: "Our Story", href: "/#journey" },
  { label: "Learning", href: "/#learning" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/#events" },
  { label: "People", href: "/team" },
];

  const isActive = (path: string) =>
    pathname === path ||
    (path !== "/" && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/#"
          aria-label="DPRIME — home"
          className="flex items-center gap-3 min-w-0"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/images/brand/logo3.png"
              alt="DPRIME"
              width={56}
              height={56}
              priority
              className="object-contain w-auto h-auto"
            />

            <span className="text-2xl font-extrabold text-ink tracking-tight truncate">
              DPRIME
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">

          <div className="flex items-center space-x-6">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group"
              >
                <span
                  className={`nav-link text-sm font-medium duration-150 ease-out ${
                    isActive(item.href)
                      ? "text-amber"
                      : "text-ink hover:text-amber"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-amber rounded transition-all duration-150 ${
                    isActive(item.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden
                />
              </Link>
            ))}

          </div>

          {/* Main community CTA */}
          <Link
            href="/#join"
            className="group ml-4 inline-flex items-center btn-primary"
          >
            <span>Join DPRIME</span>

            <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* Mobile menu */}
        <div className="md:hidden relative">

          <button
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center p-2 rounded-md border border-line bg-card"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="#171A21"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-[260px] max-w-[calc(100vw-3rem)] bg-card border border-line rounded-md shadow-xl p-3 z-50">

              <nav className="flex flex-col gap-1">

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm px-3 py-3 rounded ${
                      isActive(item.href)
                        ? "text-amber font-medium bg-paper"
                        : "text-ink hover:text-amber hover:bg-paper"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-2 pt-2 border-t border-line">

                  <Link
                    href="/join"
                    className="group w-full inline-flex items-center justify-center btn-primary"
                    onClick={() => setOpen(false)}
                  >
                    <span>Join DPRIME</span>

                    <span className="ml-3">
                      →
                    </span>
                  </Link>

                </div>

              </nav>

            </div>
          )}

        </div>

      </nav>
    </header>
  );
}