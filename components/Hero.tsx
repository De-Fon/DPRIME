import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 items-center gap-12"
    >
      {/* LEFT: copy */}
      <div>
        <div className="font-mono text-xs text-muted mb-4 tracking-widest">
          <span className="inline-flex items-center gap-3">
            <span className="inline-block w-1.5 h-3 bg-amber rounded" aria-hidden />
            <span className="font-medium">SCOPE → BUILD → SHIP → SUPPORT</span>
          </span>
        </div>

        <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-ink break-words whitespace-normal">
          Need <span className="inline-block"> <span className="underline decoration-amber/40 decoration-4 underline-offset-4">working software</span></span>
          <span className="block md:inline"> but <span className="font-black">no in-house dev team?</span></span>
        </h1>

        <p className="mt-5 text-lg text-muted max-w-prose">
          We build and ship production-ready products — from Rumia (a live hostel discovery product) to campus systems like booking and laundry.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
          <Link href="/contact" className="group btn-primary inline-flex items-center justify-center px-6 py-3">
            <span>Start a project</span>
            <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>

          <Link href="/#process" className="group inline-flex items-center justify-center px-6 py-3 rounded-md border border-line bg-card text-ink hover:text-amber">
            See how we work
            <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* RIGHT: product/technical illustration (SVG) */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-full max-w-[520px]">
          {/* subtle orange background shape */}
          <div className="hidden sm:block absolute sm:-left-6 sm:-top-6 w-48 h-36 rounded-3xl bg-amber/8 blur-2xl" aria-hidden />

          {/* illustration */}
          <svg viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Illustration of a laptop with product UI and code accents">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* laptop base */}
            <rect x="40" y="220" width="480" height="18" rx="6" fill="#222" opacity="0.9" />

            {/* laptop body */}
            <rect x="28" y="40" width="504" height="180" rx="12" fill="#0f1720" stroke="#2b2f33" />

            {/* screen inner */}
            <rect x="46" y="58" width="468" height="148" rx="8" fill="#0b0c0d" />

            {/* product UI panel */}
            <g transform="translate(66,78)">
              <rect width="220" height="108" rx="6" fill="#0e1112" stroke="#26282a" />
              <rect x="10" y="10" width="80" height="12" rx="3" fill="#2b2f32" />
              <rect x="10" y="30" width="190" height="8" rx="3" fill="#1f2224" />
              <rect x="10" y="46" width="90" height="8" rx="3" fill="#1f2224" />
              <rect x="10" y="64" width="140" height="8" rx="3" fill="#1f2224" />
            </g>

            {/* code editor panel with orange accents */}
            <g transform="translate(306,78)">
              <rect width="180" height="108" rx="6" fill="#0e1112" stroke="#26282a" />
              {/* code lines */}
              <rect x="10" y="10" width="150" height="8" rx="3" fill="#1f2224" />
              <rect x="10" y="26" width="120" height="8" rx="3" fill="#1f2224" />
              <rect x="10" y="42" width="160" height="8" rx="3" fill="#1f2224" />
              {/* orange highlights */}
              <rect x="10" y="58" width="110" height="8" rx="3" fill="#FF7A2D" />
              <rect x="10" y="74" width="80" height="8" rx="3" fill="#FF9B6A" opacity="0.9" />
            </g>

            {/* subtle reflection */}
            <rect x="46" y="58" width="468" height="8" rx="4" fill="url(#g1)" opacity="0.6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
