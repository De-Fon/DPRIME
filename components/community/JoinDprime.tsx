import Link from "next/link";

export default function JoinDprime() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
      <div className="relative overflow-hidden rounded-lg border border-line bg-ink text-paper">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="font-mono text-sm text-paper/60">
              <span className="inline-flex items-center">
                <span
                  className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                  aria-hidden
                />
                <span className="font-medium tracking-[0.05em]">
                  join dprime
                </span>
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              Don&apos;t just learn technology.
              <span className="block text-amber">Build with us.</span>
            </h2>

            <p className="mt-6 text-lg text-paper/70 leading-relaxed max-w-2xl">
              DPRIME is still growing. If you're a student interested in
              technology, development, design or building things with other
              curious people, there's a place for you here.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-3 bg-amber text-paper rounded-md font-semibold hover:shadow-md transition"
              >
                Join the community
                <span className="ml-3">→</span>
              </Link>

              <Link
                href="/team"
                className="inline-flex items-center px-5 py-3 border border-paper/20 rounded-md text-paper hover:bg-paper/10 transition"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}