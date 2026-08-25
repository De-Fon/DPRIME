const tracks = [
  {
    number: "01",
    title: "FRONTEND",
    description: "Interfaces, interaction and experiences people actually use.",
    tools: "React · Next.js · TypeScript",
  },
  {
    number: "02",
    title: "BACKEND",
    description: "APIs, business logic and the systems behind the interface.",
    tools: "Python · FastAPI · Node.js",
  },
  {
    number: "03",
    title: "DATA",
    description: "Learning how information is stored, connected and managed.",
    tools: "SQL · PostgreSQL · Databases",
  },
  {
    number: "04",
    title: "DEVOPS",
    description: "Understanding what happens between writing code and shipping it.",
    tools: "Git · Deployment · Infrastructure",
  },
  {
    number: "05",
    title: "AI",
    description: "Exploring how intelligent systems can solve practical problems.",
    tools: "AI · APIs · Automation",
  },
  {
    number: "06",
    title: "PRODUCT",
    description: "Learning to think beyond code and understand the people using it.",
    tools: "Research · Design · Problem solving",
  },
];

export default function LearningTracks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
      <div className="max-w-2xl">
        <div className="font-mono text-sm text-muted">
          <span className="inline-flex items-center">
            <span
              className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
              aria-hidden
            />
            <span className="font-medium tracking-[0.05em]">
              what we&apos;re learning
            </span>
          </span>
        </div>

        <h2 className="mt-5 font-display text-4xl md:text-5xl text-ink">
          Everyone is learning something.
        </h2>

        <p className="mt-5 text-lg text-muted leading-relaxed">
          DPRIME isn't built around everyone knowing the same thing. Different
          members explore different areas, then bring what they learn back to
          the team.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <article
            key={track.number}
            className="group border border-line rounded-md bg-card p-6 hover:-translate-y-1 hover:border-amber/40 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber">
                {track.number}
              </span>

              <span className="font-mono text-xs text-muted/50">
                LEARNING
              </span>
            </div>

            <h3 className="mt-8 font-display text-2xl text-ink group-hover:text-amber transition-colors">
              {track.title}
            </h3>

            <p className="mt-3 text-sm text-muted leading-relaxed">
              {track.description}
            </p>

            <div className="mt-6 pt-4 border-t border-line font-mono text-xs text-muted">
              {track.tools}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}