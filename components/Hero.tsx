export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 bg-blueprint bg-paper" aria-labelledby="hero-heading">
      <div className="font-mono text-sm text-muted mb-3">scope → build → ship → support</div>
      <div className="font-mono text-sm text-muted mb-6">doc / 01 — overview</div>

      <h1 id="hero-heading" className="font-serif text-3xl text-ink">Need working software but no in-house dev team?</h1>

      <p className="mt-4 text-serif text-body">
        We build and ship production-ready products — from Rumia (a live hostel discovery product) to mobile-first crowdfunding (EduPesa) and campus systems like booking and laundry.
      </p>

      <div className="mt-6">
        <a href="#contact" className="inline-block px-5 py-3 bg-amber text-paper rounded font-semibold">Start a project</a>
      </div>
    </section>
  );
}
