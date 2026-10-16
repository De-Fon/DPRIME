import Link from "next/link";
import { DISCORD_URL, STRATNOVO_URL, WHATSAPP_URL } from "../data/links";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="min-w-0">
            <Link href="/" aria-label="DPRIME home" className="inline-block">
              <span className="font-display text-2xl font-semibold tracking-tight text-ink">DPRIME<span className="text-amber">.</span></span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#555D68]">A community connecting communities. We help Africa’s technology clubs, meetups and builders find one another, create together and share opportunities.</p>
          </div>

          <div className="min-w-0">
            <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/discover" className="text-[#555D68] transition-colors hover:text-amber nav-link">Discover</Link></li>
              <li><Link href="/communities" className="text-muted hover:text-amber nav-link">Communities</Link></li>
              <li><Link href="/events" className="text-muted hover:text-amber nav-link">Events</Link></li>
              <li><Link href="/opportunities" className="text-muted hover:text-amber nav-link">Opportunities</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="font-mono text-sm text-ink mb-3">About DPRIME</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/manifesto" className="text-muted hover:text-amber nav-link">Our manifesto</Link></li>
              <li><Link href="/about" className="text-muted hover:text-amber nav-link">Our story</Link></li>
              <li><Link href="/team" className="text-muted hover:text-amber nav-link">The team</Link></li>
              <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-amber nav-link">Get in touch</a></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="font-mono text-sm text-ink mb-3">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-3 text-[#555D68] transition-colors hover:text-amber break-words social-link focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 focus-visible:text-amber rounded-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.1-3.1A8.5 8.5 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="M9 8.5c.2-.5.5-.5.8-.5h.4c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .7.5.8 1.1 1.4 1.9 1.9.3.2.5.2.7 0l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .3-.2 1-.6 1.3-.4.4-1 .6-1.7.5-1-.1-2.1-.6-3.3-1.6-1-.8-1.8-1.9-2.1-2.8-.3-.9-.1-1.7.3-2.3Z" fill="currentColor" />
                  </svg>
                  WhatsApp group
                </a>
              </li>
              <li>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-muted hover:text-amber break-words social-link focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 focus-visible:text-amber rounded-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.7 5.3a18.7 18.7 0 0 0-4.6-1.4l-.6 1.2a17.2 17.2 0 0 0-5 0l-.6-1.2a18.7 18.7 0 0 0-4.6 1.4C1.4 9.6.6 13.8 1 18a18.9 18.9 0 0 0 5.7 2.9l1.2-2a12 12 0 0 1-1.9-.9l.5-.4a13.4 13.4 0 0 0 11 0l.5.4a12 12 0 0 1-1.9.9l1.2 2A18.9 18.9 0 0 0 23 18c.5-4.9-.8-9-3.3-12.7ZM8.6 15.1c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
                  </svg>
                  Discord
                </a>
              </li>
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

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-left sm:flex-row sm:items-center">
          <div className="text-xs leading-5 text-[#626873]">© 2026 DPRIME, a product of <a href={STRATNOVO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber underline-offset-2 hover:underline">Stratnovo</a>. All rights reserved.</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#626873]">Built for communities across Africa</div>
        </div>
      </div>
    </footer>
  );
}
