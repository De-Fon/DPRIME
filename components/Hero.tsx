import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center border-b border-line">
      <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">

        <div className="max-w-4xl">

          {/* Small label */}
          <div className="font-mono text-sm text-muted mb-6">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />
              student technology community · est. january 2026
            </span>
          </div>

          {/* Main welcome */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink leading-[0.95] tracking-tight">
            Welcome to
            <br />
            <span className="text-amber">DPRIME.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted leading-relaxed">
            DPRIME is a student-led technology community where we learn,
            experiment, build projects, share knowledge and grow together.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">

            <Link
              href="/#join"
              className="inline-flex items-center px-6 py-3 bg-amber text-paper rounded-md font-semibold shadow-sm hover:shadow-md transition"
            >
              <span>Join DPRIME</span>
              <span className="ml-3">→</span>
            </Link>

            <Link
              href="/#journey"
              className="inline-flex items-center px-6 py-3 border border-line bg-card text-ink rounded-md font-medium hover:border-amber/40 hover:text-amber transition"
            >
              <span>Explore our journey</span>
              <span className="ml-3">↓</span>
            </Link>

          </div>

        </div>

        {/* Bottom statement */}
        <div className="mt-20 pt-6 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-sm text-muted">
            students → learners → developers → builders
          </p>

          <p className="font-serif text-sm text-muted">
            You don't have to know everything before you join.
          </p>
        </div>

      </div>
    </section>
  );
}