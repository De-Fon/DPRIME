const journey = [
  {
    number: "01",
    period: "JAN 2026",
    title: "THE BEGINNING",
    heading: "A group of students decided to learn together.",
    description:
      "DPRIME began in January 2026 with Paul Ogutu as our group leader. We were students who wanted to learn technology, but there was no manual telling us exactly what to do. We decided to figure it out together.",
    tags: ["Students", "Paul Ogutu", "January 2026"],
  },
  {
    number: "02",
    period: "EARLY 2026",
    title: "THE FIRST STEPS",
    heading: "HTML, CSS and our first portfolio.",
    description:
      "We started with the fundamentals: HTML and CSS. Our first major milestone was building a portfolio. It was simple, but it was the first time we turned what we were learning into something of our own.",
    tags: ["HTML", "CSS", "Portfolio"],
  },
  {
    number: "03",
    period: "EARLY 2026",
    title: "LEARNING TO COLLABORATE",
    heading: "Git, GitHub and learning how to work together.",
    description:
      "We learned how to use Git and GitHub, push our work, manage changes and collaborate on code. It wasn't always smooth. Sometimes even getting the right tools installed became a challenge.",
    tags: ["Git", "GitHub", "Collaboration"],
  },
  {
    number: "04",
    period: "ONGOING",
    title: "OUR LEARNING METHOD",
    heading: "Nobody taught us manually. We taught each other.",
    description:
      "We agreed on what we would learn during the week, studied independently, then met twice a week to share what we had discovered. We presented ideas, explained concepts to one another and helped each other through difficult parts.",
    tags: ["Self-learning", "Presentations", "Consistency"],
  },
  {
    number: "05",
    period: "≈ 3 MONTHS",
    title: "PYTHON",
    heading: "From learning syntax to building with Python.",
    description:
      "We spent roughly three months learning Python. The goal wasn't simply to finish tutorials. We wanted to reach the point where we could actually use Python to build things.",
    tags: ["Python", "Programming", "Problem Solving"],
  },
  {
    number: "06",
    period: "NEXT",
    title: "THE FOUNDATIONS",
    heading: "DSA, NumPy, Pandas and databases.",
    description:
      "We moved deeper into computer science and data. Data Structures and Algorithms, NumPy, Pandas and databases became part of our foundation and prepared us for backend development.",
    tags: ["DSA", "NumPy", "Pandas", "Databases"],
  },
  {
    number: "07",
    period: "BACKEND",
    title: "BUILDING SYSTEMS",
    heading: "We started understanding what happens behind the interface.",
    description:
      "We learned APIs, routing, backend architecture, Pydantic validation, database integration and the other foundations needed to build backend systems. Then we started putting those concepts into real projects.",
    tags: ["APIs", "Routing", "Pydantic", "Backend"],
  },
  {
    number: "08",
    period: "FRONTEND",
    title: "BACK TO THE INTERFACE",
    heading: "HTML and CSS again, then JavaScript.",
    description:
      "After spending time deep in backend development, we returned to the frontend. We revisited HTML and CSS, then moved into JavaScript and began connecting our knowledge into complete applications.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    number: "09",
    period: "NOW",
    title: "REACT + TYPESCRIPT",
    heading: "Building modern interfaces.",
    description:
      "We moved into React and started building frontend projects such as Movie Explorer. From there we learned TypeScript, bringing us to the technologies we are using to build DPRIME today.",
    tags: ["React", "TypeScript", "Frontend"],
  },
];

export default function JourneyTimeline() {
  return (
    <section className="border-y border-line bg-card">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="font-mono text-base md:text-lg text-muted">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[4px] h-[20px] bg-amber mr-3"
                aria-hidden
              />

              <span className="font-semibold tracking-[0.12em] uppercase">
                our journey
              </span>
            </span>
          </div>

          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
            We learned one thing,
            <span className="block text-amber">then used it to learn the next.</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            DPRIME grew through self-learning, consistency, presentations,
            projects and a lot of figuring things out along the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 md:mt-20">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] md:left-[31px] top-2 bottom-2 w-px bg-line" />

          <div className="space-y-0">
            {journey.map((step) => (
              <article
                key={step.number}
                className="relative grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr] gap-5 md:gap-8 pb-12 last:pb-0"
              >
                {/* Timeline marker */}
                <div className="relative z-10">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-paper border border-line flex items-center justify-center">
                    <span className="font-mono text-xs md:text-sm text-amber">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1 md:pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs tracking-[0.12em] text-amber">
                      {step.title}
                    </span>

                    <span className="font-mono text-[11px] text-muted/60 border border-line rounded px-2 py-1">
                      {step.period}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl md:text-3xl text-ink max-w-3xl">
                    {step.heading}
                  </h3>

                  <p className="mt-3 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
                    {step.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-muted bg-paper border border-line rounded-md px-2.5 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-20 pt-8 border-t border-line">
          <p className="font-display text-2xl md:text-3xl text-ink max-w-3xl">
            No shortcuts.
            <span className="text-muted"> No one handed us the answers.</span>
            <span className="block mt-2 text-amber">
              We kept learning until we could build.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}