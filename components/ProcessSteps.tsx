import { process } from "../data/process";

export default function ProcessSteps() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <div className="font-mono text-sm text-muted mb-6">doc / 04 — how we work</div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {process.map((step) => (
          <div key={step.index} className="border-t-4 border-slate bg-card rounded-md p-6">
            <div className="font-mono text-xl text-slate">{step.index}</div>
            <h5 className="mt-2 font-display text-ink">{step.stage}</h5>
            <p className="mt-2 text-serif text-body">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
