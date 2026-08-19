export default function StatsBar() {
  const items = [
    {
      value: "10+",
      label: "Team members",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#FF7A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" stroke="#FF7A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      value: "04+",
      label: "Projects shipped",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="7" width="18" height="13" rx="2" stroke="#FF7A2D" strokeWidth="1.5" />
          <path d="M7 3v4M17 3v4" stroke="#FF7A2D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      value: "1",
      label: "Live product (Rumia)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2l3 6 6 .5-4.5 3 1.5 6L12 14l-6 4 1.5-6L3 8.5 9 8 12 2z" stroke="#FF7A2D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      value: "100%",
      label: "Supported post-launch",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 6L9 17l-5-5" stroke="#FF7A2D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-label="DPRIME credibility" className="max-w-6xl mx-auto px-6 py-6">
      <div className="bg-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-card border border-line rounded-md overflow-hidden">
          {items.map((it, idx) => (
            <div
              key={idx}
              className={`px-5 py-6 flex flex-col items-center text-center md:text-left ${idx < items.length - 1 ? "md:border-r md:border-line" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-amber">{it.icon}</div>
                <div className="text-2xl md:text-3xl font-extrabold text-ink leading-tight">{it.value}</div>
              </div>
              <div className="mt-2 text-sm text-muted">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

