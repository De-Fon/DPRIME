const firsts = [
  {
    number: "01",
    title: "FIRST LINE OF CODE",
    text: "The moment coding stopped being something we heard about and became something we could actually do.",
  },
  {
    number: "02",
    title: "FIRST TEAM PROJECT",
    text: "The first time several people had to turn separate pieces of work into one working product.",
  },
  {
    number: "03",
    title: "FIRST DEPLOYMENT",
    text: "The moment something we built left our laptops and became accessible to the outside world.",
  },
  {
    number: "04",
    title: "FIRST REAL BUG",
    text: "Because nothing teaches developers quite like something suddenly breaking.",
  },
  {
    number: "05",
    title: "FIRST REAL USER",
    text: "The point where building became more than an exercise. Someone else actually depended on what we made.",
  },
  {
    number: "06",
    title: "FIRST BIG LESSON",
    text: "Realising that becoming good at technology isn't about knowing everything. It's about being willing to keep learning.",
  },
];

export default function FirstsWall() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="font-mono text-sm text-muted">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />
              <span className="font-medium tracking-[0.05em]">
                the firsts
              </span>
            </span>
          </div>

          <h2 className="mt-5 font-display text-4xl md:text-5xl text-ink">
            Every builder has a first.
          </h2>
        </div>

        <p className="max-w-md text-muted leading-relaxed">
          Before the polished projects came the small moments that made
          everything else possible.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden">
        {firsts.map((item) => (
          <article
            key={item.number}
            className="bg-paper p-7 md:p-8 hover:bg-card transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber">
                {item.number}
              </span>

              <span className="font-mono text-xs text-muted/50">
                DPRIME
              </span>
            </div>

            <h3 className="mt-8 font-display text-xl text-ink">
              {item.title}
            </h3>

            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}