import { services } from "../data/services";

export default function ServicesGrid() {
  return (
    <section id="services" className="max-w-5xl mx-auto px-6 py-14">
      <div className="font-mono text-sm text-muted mb-6">doc / 03 — services</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.index} className="bg-card border border-line rounded-md p-6">
            <div className="flex items-center gap-3">
              <div className="font-mono text-xl text-slate">{s.index}</div>
              <h4 className="font-display text-ink">{s.title}</h4>
            </div>
            <p className="mt-3 text-serif text-body">{s.description}</p>
            <div className="mt-4 text-sm font-mono text-muted">{s.stack.join(" · ")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
