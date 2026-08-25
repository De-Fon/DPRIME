export default function ClubIntro() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start">
        {/* Label */}
        <div>
          <div className="font-mono text-base md:text-lg text-muted">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[4px] h-[20px] bg-amber mr-3"
                aria-hidden
              />
              <span className="font-semibold tracking-[0.12em] uppercase">
                who we are
              </span>
            </span>
          </div>

          <p className="mt-5 font-mono text-xs text-muted/70 uppercase tracking-[0.12em]">
            DPRIME / 2026
          </p>
        </div>

        {/* Main story */}
        <div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
            We didn&apos;t start as developers.
          </h2>

          <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed text-muted max-w-2xl">
            <p>
              DPRIME started as a group of students who wanted to understand
              technology by actually building with it.
            </p>

            <p>
              We learned together, made mistakes together, helped each other
              through problems, and slowly turned what we were learning into
              real software.
            </p>

            <p className="text-ink font-medium">
              We&apos;re still learning. We&apos;re still building. And
              we&apos;re just getting started.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["LEARN", "BUILD", "SHIP", "GROW"].map((item, index) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 px-3 py-2 border border-line rounded-md bg-card font-mono text-xs text-muted"
              >
                <span className="text-amber">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}