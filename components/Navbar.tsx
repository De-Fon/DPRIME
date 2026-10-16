"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

const navItems = [
  { label: "Discover", href: "/discover" },
  { label: "Communities", href: "/communities" },
  { label: "Events", href: "/events" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Programs", href: "/programs" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "About", href: "/about" },
];

  const isActive = (path: string) =>
    pathname === path ||
    (path !== "/" && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-6">

        {/* Brand */}
        <Link
          href="/"
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

            <span className="truncate text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              DPRIME
            </span>
          </div>
        </Link>

        <form action="/discover" method="get" role="search" aria-label="Search DPRIME" className="hidden min-w-0 flex-1 sm:flex sm:max-w-[260px] xl:ml-auto xl:mr-2">
          <label className="relative block w-full">
            <span className="sr-only">Search communities, events and opportunities</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#626873]">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="m12.5 12.5 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input name="q" type="search" placeholder="Search DPRIME…" aria-label="Search DPRIME" className="min-h-11 w-full rounded-full border border-line bg-white py-2 pl-9 pr-4 text-sm text-ink placeholder:text-[#747A84] outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/15" />
          </label>
        </form>

        {/* Desktop navigation */}
        <div className="hidden items-center space-x-5 xl:flex">

          <div className="flex items-center space-x-5">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative min-h-11 py-2"
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
                  className={`absolute left-0 bottom-1 h-0.5 bg-amber rounded transition-all duration-150 ${
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
            href="/communities"
            className="group ml-4 inline-flex items-center btn-primary"
          >
            <span>Explore communities</span>

            <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

        {/* Mobile menu */}
        <div className="lg:hidden relative">

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

              <form action="/discover" method="get" role="search" className="mb-2 border-b border-line pb-3">
                <label className="block">
                  <span className="mb-1 block px-3 text-xs font-medium text-[#555D68]">Search DPRIME</span>
                  <input name="q" type="search" placeholder="Communities, events, topics…" className="min-h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-[#747A84] outline-none focus:border-amber focus:ring-2 focus:ring-amber/15" />
                </label>
              </form>

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
                    href="/communities"
                    className="group w-full inline-flex items-center justify-center btn-primary"
                    onClick={() => setOpen(false)}
                  >
                    <span>Explore communities</span>

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