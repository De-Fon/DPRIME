export default function ClubIntro() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      
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
          You don't have to figure it all out alone.
        </h2>

        <p className="mt-5 text-muted text-lg leading-relaxed max-w-2xl">
          DPRIME brings students together around technology, curiosity and
          the willingness to keep learning. It's a space to ask questions,
          exchange ideas, work on things that interest you and meet people
          who are on a similar journey.
        </p>
      </div>

      {/* Why join */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">

        {/* Card 01 */}
        <article className="bg-white border border-line rounded-md p-6 md:p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-amber">01</span>
            <span className="text-muted">→</span>
          </div>

          <h3 className="mt-10 font-display text-2xl text-ink">
            Learn with people.
          </h3>

          <p className="mt-4 text-muted leading-relaxed">
            Explore technology with other students, exchange what you
            discover and get help when something doesn't make sense.
          </p>
        </article>

        {/* Card 02 */}
        <article className="bg-white border border-line rounded-md p-6 md:p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-amber">02</span>
            <span className="text-muted">→</span>
          </div>

          <h3 className="mt-10 font-display text-2xl text-ink">
            Turn ideas into projects.
          </h3>

          <p className="mt-4 text-muted leading-relaxed">
            Take what interests you beyond theory. Work on projects,
            experiment with different technologies and learn by actually
            making things.
          </p>
        </article>

        {/* Card 03 */}
        <article className="bg-white border border-line rounded-md p-6 md:p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-amber">03</span>
            <span className="text-muted">→</span>
          </div>

          <h3 className="mt-10 font-display text-2xl text-ink">
            Find your community.
          </h3>

          <p className="mt-4 text-muted leading-relaxed">
            Meet students with different interests and strengths, share
            knowledge, collaborate and grow alongside people who want to
            build something too.
          </p>
        </article>

      </div>

      {/* Bottom statement */}
      <div className="mt-8 pt-6 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <span className="font-mono text-sm text-muted">
          students → learners → developers → builders
        </span>

        <span className="font-serif text-body text-muted">
          You don't need to know everything before you join.
        </span>
      </div>

    </section>
  );
}