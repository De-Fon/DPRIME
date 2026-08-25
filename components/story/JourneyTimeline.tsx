const journey = [
  {
    number: "01",
    title: "THE BEGINNING",
    heading: "We decided to learn.",
    description:
      "We started as students with curiosity, ideas, and a lot more questions than answers.",
  },
  {
    number: "02",
    title: "THE LEARNING",
    heading: "We figured things out together.",
    description:
      "Programming concepts, frameworks, Git, databases, APIs and everything in between became part of the journey.",
  },
  {
    number: "03",
    title: "THE BUILDING",
    heading: "Learning became projects.",
    description:
      "Instead of stopping at tutorials, we started turning what we learned into things we could actually use.",
  },
  {
    number: "04",
    title: "THE TEAM",
    heading: "We learned to build together.",
    description:
      "Different people began taking different roles, reviewing each other's work and solving problems as a team.",
  },
  {
    number: "05",
    title: "THE SHIPPING",
    heading: "Ideas became software.",
    description:
      "Projects moved from our laptops into the real world. That changed the way we looked at development.",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="border-y border-line bg-card">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="font-mono text-sm text-muted">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />
              <span className="font-medium tracking-[0.05em]">
                our journey
              </span>
            </span>
          </div>

          <h2 className="mt-5 font-display text-4xl md:text-5xl text-ink">
            From knowing almost nothing to building real software.
          </h2>

          <p className="mt-5 text-lg text-muted leading-relaxed">
            DPRIME didn&apos;t appear overnight. It grew through small wins,
            frustrating bugs, late-night learning and one project after
            another.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          {journey.map((step, index) => (
            <div
              key={step.number}
              className="relative grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr] gap-5 md:gap-8 pb-12 last:pb-0"
            >
              {/* Line */}
              {index !== journey.length - 1 && (
                <div className="absolute left-[24px] md:left-[39px] top-12 bottom-0 w-px bg-line" />
              )}

              {/* Number */}
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-paper border border-line flex items-center justify-center font-mono text-sm text-amber">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="pt-1 md:pt-3">
                <span className="font-mono text-xs tracking-[0.12em] text-amber">
                  {step.title}
                </span>

                <h3 className="mt-2 font-display text-2xl md:text-3xl text-ink">
                  {step.heading}
                </h3>

                <p className="mt-3 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}