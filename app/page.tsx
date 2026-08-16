import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { services } from "../data/services";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      {/* Projects teaser */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="font-mono text-sm text-muted mb-6">
          <span className="inline-flex items-center">
            <span className="inline-block w-[3px] h-[14px] bg-slate mr-2.5" aria-hidden />
            <span className="font-medium tracking-[0.05em]">recent work</span>
          </span>
        </div>

        <div className="space-y-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-6">
          <Link href="/projects" className="inline-block text-sm text-ink hover:text-slate">View all projects →</Link>
        </div>
      </section>

      {/* Services teaser */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="font-mono text-sm text-muted mb-6">
          <span className="inline-flex items-center">
            <span className="inline-block w-[3px] h-[14px] bg-slate mr-2.5" aria-hidden />
            <span className="font-medium tracking-[0.05em]">services</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.slice(0, 2).map((s) => (
            <div key={s.index} className="bg-card border border-line rounded-md p-6">
              <div className="flex items-center gap-3">
                <div className="font-mono text-xl text-slate">{s.index}</div>
                <h4 className="font-display text-ink">{s.title}</h4>
              </div>
              <p className="mt-3 font-serif text-body">{s.description}</p>
              <div className="mt-4 text-sm font-mono text-muted">{s.stack.join(" · ")}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/services" className="inline-block text-sm text-ink hover:text-slate">View all services →</Link>
        </div>
      </section>

        {/* Meet the Team CTA */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-card border border-line rounded-md p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="font-mono text-sm text-slate">meet the people behind the work</div>
                <h3 className="mt-3 font-display text-2xl text-ink">10 developers. One team.</h3>
                <p className="mt-2 font-serif text-body text-muted">Meet the people building, shipping, and supporting DPRIME projects.</p>
              </div>

              <div className="shrink-0">
                <Link href="/team" className="group inline-flex items-center px-5 py-3 bg-amber text-paper rounded font-semibold transition-colors">
                  <span>Meet the team</span>
                  <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="bg-card border border-line rounded-md p-6 flex items-center justify-between">
          <div>
            <div className="font-display text-2xl text-ink">Ready to start?</div>
            <div className="mt-2 font-serif text-body text-muted">Tell us about your project and we'll get back to you.</div>
          </div>

          <div>
            <Link href="/contact" className="inline-block px-5 py-3 bg-amber text-paper rounded font-semibold">Start a project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
