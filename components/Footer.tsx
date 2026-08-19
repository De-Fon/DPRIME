import Link from "next/link";
import { services } from "../data/services";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="min-w-0">
            <Link href="/" aria-label="DPRIME home" className="inline-block">
              <span className="font-display text-lg text-ink">DPRIME</span>
            </Link>
            <p className="mt-3 text-sm text-muted max-w-xs">Small, capable student dev team building production-ready web apps and backend systems.</p>
          </div>

          <div className="min-w-0">
            <h4 className="font-mono text-sm text-ink mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted hover:text-amber nav-link">Home</Link></li>
              <li><Link href="/projects" className="text-muted hover:text-amber nav-link">Projects</Link></li>
              <li><Link href="/services" className="text-muted hover:text-amber nav-link">Services</Link></li>
              <li><Link href="/team" className="text-muted hover:text-amber nav-link">Team</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-amber nav-link">Contact</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="font-mono text-sm text-ink mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.index} className="text-muted">{s.title}</li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="font-mono text-sm text-ink mb-3">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://www.tiktok.com/@dekutprime" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-muted hover:text-amber break-words social-link focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 focus-visible:text-amber rounded-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M17 6v6.5a3.5 3.5 0 11-3.5-3.5V7a6 6 0 006 6V6h.5z" fill="currentColor" />
                  </svg>
                  TikTok (@dekutprime)
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/dekut_prime" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-muted hover:text-amber break-words social-link focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 focus-visible:text-amber rounded-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Instagram (@dekut_prime)
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/dekut-prime-1a6884408" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-muted hover:text-amber break-words social-link focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 focus-visible:text-amber rounded-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v14H0zM7 8h4.8v2h.1c.7-1.2 2.4-2.5 4.9-2.5C22 7.5 24 10.2 24 14.5V22h-5v-6.5c0-1.6-.1-3.7-2.3-3.7-2.3 0-2.7 1.8-2.7 3.6V22H7V8z" fill="currentColor" />
                  </svg>
                  LinkedIn (DEKUT PRIME)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted">© 2026 DPRIME. All rights reserved.</div>
          <div className="text-xs text-muted">Small, capable student dev team building production-ready web apps and ongoing support.</div>
        </div>
      </div>
    </footer>
  );
}
