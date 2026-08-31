export default function ClubIntro() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* LEFT: Story */}
        <div>
          <div className="font-mono text-sm text-muted mb-5">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />
              who we are
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight">
            We didn't start
            <br />
            as developers.
          </h2>

          <div className="mt-8 text-muted text-lg leading-relaxed max-w-xl">
            <p>
              DPRIME started in January 2026 as a group of students who wanted
              to learn how to code.
            </p>

            <p className="mt-5">
              We chose what to learn, studied independently, struggled through
              problems and came together to share what we discovered.
            </p>

            <p className="mt-5">
              Over time, those learning sessions became projects. The projects
              became systems. And the people who started out learning together
              became a community of builders.
            </p>

            <p className="mt-5 text-ink font-medium">
              DPRIME is still learning. We're just building while we do it.
            </p>
          </div>
        </div>

        {/* RIGHT: DPRIME journey card */}
        <div className="relative">
          <div className="bg-[#00363d] rounded-lg overflow-hidden border border-[#0b4b52]">

            {/* Card header */}
            <div className="px-7 py-6 border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.08em] text-white/60">
                DPRIME / OUR BEGINNING
              </span>

              <span className="font-mono text-xs text-amber">
                2026
              </span>
            </div>

            {/* Main content */}
            <div className="p-7 md:p-8">

              <div className="font-mono text-xs text-amber mb-3">
                JANUARY 2026
              </div>

              <h3 className="font-display text-3xl md:text-4xl text-white leading-tight">
                One group.
                <br />
                One learning journey.
              </h3>

              {/* Journey */}
              <div className="mt-8 space-y-0">

                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-amber flex-shrink-0" />
                  <div className="font-mono text-sm text-white">
                    HTML / CSS
                  </div>
                </div>

                <div className="ml-[5px] h-7 border-l border-white/20" />

                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full border border-white/40 bg-[#00363d] flex-shrink-0" />
                  <div className="font-mono text-sm text-white/80">
                    Python
                  </div>
                </div>

                <div className="ml-[5px] h-7 border-l border-white/20" />

                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full border border-white/40 bg-[#00363d] flex-shrink-0" />
                  <div className="font-mono text-sm text-white/80">
                    Data & Backend
                  </div>
                </div>

                <div className="ml-[5px] h-7 border-l border-white/20" />

                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full border border-white/40 bg-[#00363d] flex-shrink-0" />
                  <div className="font-mono text-sm text-white/80">
                    React / TypeScript
                  </div>
                </div>

                <div className="ml-[5px] h-7 border-l border-white/20" />

                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full border border-amber bg-amber flex-shrink-0" />
                  <div className="font-mono text-sm text-amber">
                    Building together
                  </div>
                </div>

              </div>

              {/* Bottom statement */}
              <div className="mt-9 pt-6 border-t border-white/10">
                <p className="font-mono text-sm text-white/50">
                  students → developers → builders
                </p>
              </div>

            </div>
          </div>

          {/* Small decorative label */}
          <div className="absolute -bottom-4 -right-3 md:-right-5 bg-paper border border-line px-4 py-2 rounded-md">
            <span className="font-mono text-xs text-muted">
              still learning
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}