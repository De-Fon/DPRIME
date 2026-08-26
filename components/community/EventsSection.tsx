const events = [
  {
    title: "Nyeri Hills Adventure",
    type: "Adventure",
    description:
      "A day away from the screens. We explored Nyeri Hills, spent time together, and strengthened the friendships behind DPRIME.",
    date: "2026",
  },
  {
    title: "DPRIME Fun Day",
    type: "Community",
    description:
      "A chance to relax, connect, laugh, and spend time together outside our usual learning sessions.",
    date: "2026",
  },
  {
    title: "Learning Sessions",
    type: "Learning",
    description:
      "Regular sessions where we share what we have learned, present ideas, solve problems together, and help each other improve.",
    date: "Ongoing",
  },
];

export default function EventsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Section heading */}
      <div className="font-mono text-sm text-muted mb-4">
        <span className="inline-flex items-center">
          <span
            className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
            aria-hidden
          />
          <span className="font-medium tracking-[0.05em]">
            life at dprime
          </span>
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-ink">
            We learn together.
            <br />
            <span className="text-amber">We live together.</span>
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted max-w-2xl">
            DPRIME is more than code and projects. We make time to step away
            from our screens, explore, have fun, and build the friendships
            that make the community what it is.
          </p>
        </div>

        <div className="font-mono text-xs text-muted">
          events / community / 2026
        </div>
      </div>

      {/* Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {events.map((event, index) => (
          <article
            key={event.title}
            className="group border border-line bg-white rounded-md p-6 transition duration-200 hover:-translate-y-1 hover:border-amber/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-amber">
                0{index + 1}
              </span>

              <span className="font-mono text-xs text-muted border border-line rounded-full px-2.5 py-1">
                {event.type}
              </span>
            </div>

            <h3 className="font-display text-xl text-ink">
              {event.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted">
              {event.description}
            </p>

            <div className="mt-6 pt-4 border-t border-line flex justify-between items-center">
              <span className="font-mono text-xs text-muted">
                {event.date}
              </span>

              <span className="text-sm text-amber transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Future events */}
      <div className="mt-8 border border-line rounded-md bg-paper p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-amber mb-2">
            WHAT'S NEXT
          </div>

          <h3 className="font-display text-xl text-ink">
            More adventures are coming.
          </h3>

          <p className="mt-1 text-sm text-muted">
            From learning sessions to walks, trips and community activities.
          </p>
        </div>

        <span className="font-mono text-xs text-muted">
          DPRIME / COMMUNITY
        </span>
      </div>
    </section>
  );
}