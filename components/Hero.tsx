export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div>
          <div className="font-mono text-sm text-muted mb-6">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />

              <span className="font-medium tracking-[0.05em]">
                student technology community · est. january 2026
              </span>
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] text-ink">
            We started by learning how to code.
            <span className="block text-amber mt-2">
              Now we build together.
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            DPRIME is a student-led technology community where we learn,
            experiment, build projects, share knowledge and grow together.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#journey"
              className="inline-flex items-center px-5 py-3 bg-amber text-paper rounded-md font-semibold hover:shadow-md transition"
            >
              Explore our journey →
            </a>

            <a
              href="#join"
              className="inline-flex items-center px-5 py-3 border border-line bg-white text-ink rounded-md hover:border-amber/40 transition"
            >
              Join DPRIME
            </a>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-md aspect-square bg-[#062f38] rounded-lg border border-line relative overflow-hidden">

            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative h-full flex flex-col justify-center p-10">

              <div className="font-mono text-sm text-amber mb-6">
                DPRIME / 2026
              </div>

              <div className="text-white text-4xl font-display leading-tight">
                Learn.
                <br />
                Build.
                <br />
                Share.
                <br />
                Grow.
              </div>

              <div className="mt-8 font-mono text-sm text-white/60">
                students → developers → builders
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}