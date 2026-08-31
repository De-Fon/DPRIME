export default function ClubIntro() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">

      {/* Section heading */}
      <div className="max-w-3xl">
        <div className="font-mono text-sm text-muted mb-5">
          <span className="inline-flex items-center">
            <span
              className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
              aria-hidden
            />
            why DPRIME
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
          A place to learn, build
          <br className="hidden md:block" />
          and grow together.
        </h2>

        <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
          DPRIME is a student-led technology community where we learn,
          experiment, build projects, share knowledge and grow together.
        </p>
      </div>

      {/* Community values */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Learn */}
        <article className="group border border-line bg-card rounded-md p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-amber">
              01
            </span>

            <span className="text-muted group-hover:text-amber transition-colors">
              →
            </span>
          </div>

          <h3 className="mt-8 font-display text-2xl text-ink">
            Learn together.
          </h3>

          <p className="mt-3 text-muted leading-relaxed">
            Explore new technologies, study difficult concepts and learn
            from people who are figuring things out alongside you.
          </p>
        </article>

        {/* Build */}
        <article className="group border border-line bg-card rounded-md p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-amber">
              02
            </span>

            <span className="text-muted group-hover:text-amber transition-colors">
              →
            </span>
          </div>

          <h3 className="mt-8 font-display text-2xl text-ink">
            Build real things.
          </h3>

          <p className="mt-3 text-muted leading-relaxed">
            Turn what you learn into projects, experiments and systems
            that give you experience beyond the classroom.
          </p>
        </article>

        {/* Community */}
        <article className="group border border-line bg-card rounded-md p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-amber">
              03
            </span>

            <span className="text-muted group-hover:text-amber transition-colors">
              →
            </span>
          </div>

          <h3 className="mt-8 font-display text-2xl text-ink">
            Find your people.
          </h3>

          <p className="mt-3 text-muted leading-relaxed">
            Meet other students interested in technology, share what you
            know, ask questions and grow alongside a community.
          </p>
        </article>

      </div>

      {/* Community statement */}
      <div className="mt-10 border-t border-line pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <p className="font-mono text-sm text-muted">
          students → learners → developers → builders
        </p>

        <p className="text-sm text-ink">
          You don't have to know everything before you join.
        </p>
      </div>

    </section>
  );
}