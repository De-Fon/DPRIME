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
import EventsSection from "../components/community/EventsSection";

import { projects } from "../data/projects";
import { team } from "../data/team";

import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Hero />

      <StatsBar />

      <ClubIntro />

      <section id="journey">
        <JourneyTimeline />
      </section>

      <FirstsWall />

      <LearningTracks />

      <CommunitySection />

      <EventsSection />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="font-mono text-sm text-muted mb-5">
          <span className="inline-flex items-center">
            <span
              className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
              aria-hidden
            />

            <span className="font-medium tracking-[0.05em]">
              what we're building
            </span>
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-ink">
              Learning by building.
            </h2>

            <p className="mt-3 text-muted max-w-xl text-lg">
              Our projects are where what we learn turns into something real.
              We experiment, make mistakes, solve problems and build together.
            </p>
          </div>

          <Link
            href="/projects"
            className="text-sm text-ink hover:text-amber transition"
          >
            Explore all projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
            />
          ))}
        </div>
      </section>

      <BuildLog />

      <ValuesSection />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-white border border-line rounded-md p-6 md:p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="flex-shrink-0">
              <div className="flex items-center -space-x-3">

                {team.slice(0, 6).map((m, i) => (
                  <div
                    key={m.initials}
                    className="w-14 h-14 rounded-full overflow-hidden border-2 border-white bg-paper"
                    style={{ zIndex: 20 - i }}
                  >
                    {m.photoUrl ? (
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate/10 text-slate font-mono">
                        {m.initials}
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>

            <div className="flex-1 text-center md:text-left">

              <div className="font-mono text-sm text-muted">
                the people behind DPRIME
              </div>

              <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">
                Students. Builders. One community.
              </h2>

              <p className="mt-3 text-muted max-w-2xl">
                DPRIME is made up of students with different interests,
                strengths and experiences, learning from one another and
                building together.
              </p>

            </div>

            <div className="flex-shrink-0">

              <Link
                href="/team"
                className="group btn-primary inline-flex items-center px-5 py-3"
              >
                <span>Meet the team</span>

                <span className="ml-3 transform transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>
      </section>

      <section id="join">
        <JoinDprime />
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="border-t border-line pt-10">

          <div className="font-mono text-sm text-muted mb-4">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />

              <span className="font-medium tracking-[0.05em]">
                beyond the community
              </span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h2 className="font-display text-3xl text-ink">
                Sometimes, we build for the real world too.
              </h2>

              <p className="mt-3 text-muted max-w-2xl">
                As our skills grow, we take on projects that challenge us to
                apply what we've learned and create useful software.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                href="/projects"
                className="inline-flex items-center px-5 py-3 border border-line rounded-md text-sm text-ink hover:border-amber/40 hover:text-amber transition"
              >
                Our projects →
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center px-5 py-3 border border-line rounded-md text-sm text-ink hover:border-amber/40 hover:text-amber transition"
              >
                What we can do →
              </Link>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}