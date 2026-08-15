import { team } from "../data/team";

export default function TeamGrid() {
  return (
    <section id="team" className="max-w-5xl mx-auto px-6 py-14">
      <div className="font-mono text-sm text-muted mb-6">
        <span className="inline-flex items-center">
          <span className="inline-block w-[3px] h-[14px] bg-slate mr-2.5" aria-hidden />
          <span className="font-medium tracking-[0.05em]">team</span>
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {team.map((m) => (
          <div key={m.initials} className="flex flex-col items-center text-center p-4 bg-card border border-line rounded-md">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate/10 border border-line text-slate font-mono text-lg">{m.initials}</div>
            <div className="mt-3 font-display text-ink">{m.name}</div>
            <div className="mt-1 font-mono text-sm text-muted">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
