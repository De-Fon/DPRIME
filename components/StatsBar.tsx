export default function StatsBar() {
  const stats = [
    {
      value: "01",
      label: "Founded",
      detail: "January 2026",
    },
    {
      value: "10+",
      label: "Members",
      detail: "Learning & building",
    },
    {
      value: "10+",
      label: "Technologies",
      detail: "Across our journey",
    },
    {
      value: "∞",
      label: "Still learning",
      detail: "Always improving",
    },
  ];

  return (
    <section className="border-y border-line bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-8 border-r border-line last:border-r-0"
            >
              <div className="font-mono text-2xl text-amber">
                {stat.value}
              </div>

              <div className="mt-2 font-display text-lg text-ink">
                {stat.label}
              </div>

              <div className="mt-1 text-sm text-muted">
                {stat.detail}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}