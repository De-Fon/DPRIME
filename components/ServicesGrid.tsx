import { services } from "../data/services";

export default function ServicesGrid() {
  return (
    <section id="services" className="max-w-5xl mx-auto px-6 py-14">
      <div className="font-mono text-sm text-muted mb-6">
        <span className="inline-flex items-center">
          <span className="inline-block w-[3px] h-[14px] bg-amber mr-2.5" aria-hidden />
          <span className="font-medium tracking-[0.05em]">services</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.index} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="font-mono text-xl text-slate">{s.index}</div>
              <h4 className="font-display text-ink">{s.title}</h4>
            </div>
            <p className="mt-3 font-serif text-body">{s.description}</p>
            <div className="mt-4 text-sm font-mono text-muted">{s.stack.join(" · ")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
