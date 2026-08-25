const buildLog = [
  {
    date: "NOW",
    status: "BUILDING",
    title: "DPRIME Website",
    description:
      "Redesigning our online home to tell the story of the community behind the code.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    date: "RECENT",
    status: "SHIPPED",
    title: "Rumia",
    description:
      "A real project built by the team as we continue turning ideas into working software.",
    tags: ["Product", "Development", "Deployment"],
  },
  {
    date: "ONGOING",
    status: "LEARNING",
    title: "Building Better Together",
    description:
      "Improving our development workflow, collaboration, code quality and understanding of production systems.",
    tags: ["Git", "Teamwork", "Engineering"],
  },
];

export default function BuildLog() {
  return (
    <section className="border-y border-line bg-card">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-mono text-sm text-muted">
              <span className="inline-flex items-center">
                <span
                  className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                  aria-hidden
                />
                <span className="font-medium tracking-[0.05em]">
                  build log
                </span>
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl md:text-5xl text-ink">
              What&apos;s happening at DPRIME?
            </h2>
          </div>

          <p className="max-w-md text-muted leading-relaxed">
            We don't want the website to only show finished work. This is what
            we're learning, building and shipping along the way.
          </p>
        </div>

        <div className="mt-12 border-t border-line">
          {buildLog.map((item) => (
            <article
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-5 md:gap-8 py-7 border-b border-line"
            >
              <div>
                <span className="font-mono text-xs text-muted">
                  {item.date}
                </span>

                <div className="mt-2 inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber" />
                  <span className="font-mono text-[11px] text-amber">
                    {item.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl text-ink">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-2xl text-sm md:text-base text-muted leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-muted border border-line rounded px-2 py-1 bg-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:block font-mono text-xs text-muted/40">
                DPRIME.LOG
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}