const values = [
  {
    number: "01",
    title: "CURIOSITY",
    text: "We ask questions, experiment and stay willing to learn something we don't understand yet.",
  },
  {
    number: "02",
    title: "CONSISTENCY",
    text: "Progress comes from showing up repeatedly, especially when the code doesn't work.",
  },
  {
    number: "03",
    title: "COLLABORATION",
    text: "We believe people learn faster when they share knowledge and solve problems together.",
  },
  {
    number: "04",
    title: "OWNERSHIP",
    text: "If we build it, we care about what happens after it leaves our laptops.",
  },
];

export default function ValuesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20">
        <div>
          <div className="font-mono text-sm text-muted">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />
              <span className="font-medium tracking-[0.05em]">
                what we believe
              </span>
            </span>
          </div>

          <h2 className="mt-5 font-display text-4xl md:text-5xl text-ink">
            The way we build matters.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
          {values.map((value) => (
            <article key={value.number} className="bg-paper p-7 md:p-8">
              <span className="font-mono text-xs text-amber">
                {value.number}
              </span>

              <h3 className="mt-8 font-display text-xl text-ink">
                {value.title}
              </h3>

              <p className="mt-3 text-sm text-muted leading-relaxed">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}