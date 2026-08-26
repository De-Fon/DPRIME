import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import ProjectCard from "../components/ProjectCard";

import ClubIntro from "../components/story/ClubIntro";
import JourneyTimeline from "../components/story/JourneyTimeline";
import FirstsWall from "../components/story/FirstsWall";
import ValuesSection from "../components/story/ValuesSection";

import CommunitySection from "../components/community/CommunitySection";
import LearningTracks from "../components/community/LearningTracks";
import BuildLog from "../components/community/BuildLog";
import JoinDprime from "../components/community/JoinDprime";

import { projects } from "../data/projects";
import { services } from "../data/services";
import { team } from "../data/team";

import Link from "next/link";
import Image from "next/image";
import ScrollUnveil from "../components/ScrollUnveil";

export default function Home() {
  return (
    <>
      <ClubIntro />
      <StatsBar />

      <JourneyTimeline />

      <FirstsWall />

      {/* Projects teaser */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="font-mono text-sm text-muted mb-6">
          <span className="inline-flex items-center">
            <span className="inline-block w-[3px] h-[14px] bg-amber mr-2.5" aria-hidden />
            <span className="font-medium tracking-[0.05em]">recent work</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/projects" className="inline-block text-sm text-ink hover:text-amber">View all projects →</Link>
        </div>
      </section>
      <CommunitySection />

      <LearningTracks />


      {/* Services teaser */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-10">
        <div className="font-mono text-sm text-muted mb-6">
          <span className="inline-flex items-center">
            <span className="inline-block w-[3px] h-[14px] bg-amber mr-2.5" aria-hidden />
            <span className="font-medium tracking-[0.05em]">services</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.slice(0, 2).map((s) => (
            <article
              key={s.index}
              className="service-card group bg-card border border-line rounded-md p-6 md:p-8 transition transform duration-150 ease-out hover:-translate-y-1 hover:shadow-md hover:border-amber/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-paper border border-line text-slate group-hover:text-amber transition-colors transition-transform duration-150 transform group-hover:scale-105">
                    {/* icon uses currentColor to pick up neutral / amber on hover */}
                    {s.index === "01" ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M3 6h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M7 3v4M17 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-amber/90">{s.index}</span>
                    <h3 className="font-display text-lg text-ink">{s.title}</h3>
                  </div>

                  <p className="mt-3 text-base text-muted max-w-prose">{s.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.stack.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-2 text-sm text-muted bg-paper px-2 py-1 rounded-md border border-line">
                        <span className="w-2 h-2 rounded-full bg-amber/90 inline-block" aria-hidden />
                        <span className="font-mono">{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/services" className="inline-block text-sm text-ink hover:text-amber">View all services →</Link>
        </div>
      </section>
      <BuildLog />

      <ValuesSection />


        {/* Meet the Team feature */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white border border-line rounded-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              {/* avatar stack */}
              <div className="flex items-center -space-x-3">
                {/** render first 6 members from data/team */}
                {team.slice(0, 6).map((m, i) => (
                  <div key={m.initials} className={`w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-paper ${i === 0 ? "ml-0" : ""}`} style={{ zIndex: 20 - i }}>
                    {m.photoUrl ? (
                      <Image src={m.photoUrl} alt={m.name} width={48} height={48} className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate/10 text-slate font-mono">{m.initials}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="font-mono text-sm text-muted">meet the people behind the work</div>
              <h3 className="mt-2 font-display text-2xl text-ink">10 developers. One team.</h3>
              <p className="mt-2 font-serif text-body text-muted max-w-prose">Meet the people building, shipping, and supporting DPRIME projects.</p>
            </div>

            <div className="flex-shrink-0">
              <Link href="/team" className="group btn-primary inline-flex items-center px-5 py-3">
                <span>Meet the team</span>
                <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
        <JoinDprime />

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="bg-[#fff8f2] border border-amber/20 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-2xl text-ink">Have an idea? Let's build it.</h2>
            <p className="mt-2 text-base text-muted max-w-prose">Tell us about your project and we'll get back to you with ideas and a plan.</p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-5 py-3 bg-amber text-paper rounded-lg font-semibold shadow-sm hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40"
            >
              {/* Rocket icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="-ml-0.5">
                <path d="M5 20c0-2 2-6 7-11s9-7 11-7c0 2-2 6-7 11S5 20 5 20z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 13l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Start a project →</span>
            </Link>
          </div>
        </div>
      </section>

      <ScrollUnveil>
        <Hero />
      </ScrollUnveil>
    </>
  );
}
