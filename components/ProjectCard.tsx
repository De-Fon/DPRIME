import Link from "next/link";
import type { Project } from "../lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  const statusIsShipped = project.status === "shipped";

  return (
    <div
      className="project-card group relative block bg-card border border-line rounded-md overflow-hidden shadow-sm transition-transform transition-shadow duration-150 ease-out hover:-translate-y-1 hover:shadow-md hover:border-amber min-w-0"
    >
      <Link 
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 rounded-md"
        aria-label={`View ${project.name} details`}
      />

      <div className="flex items-stretch">
        <div className="hidden md:flex items-center justify-center px-6 py-8 text-line font-mono text-8xl select-none opacity-10" aria-hidden>
          {project.index}
        </div>

        <div className="flex-1 p-6 border-l-2 border-line group-hover:border-amber transition-colors min-w-0">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h3 className="font-display text-xl text-ink break-words">{project.name}</h3>
                {project.live && (
                  <span className="text-xs bg-amber text-paper px-2 py-1 rounded">live</span>
                )}
              </div>

              <p className="mt-2 font-serif text-body text-muted break-words">{project.tagline}</p>

              <div className="mt-4 text-sm font-mono text-muted">{project.stack.join(" · ")}</div>
            </div>

            <div className="ml-4 self-end hidden sm:flex items-center text-sm font-mono text-amber">
              <span className={statusIsShipped ? "text-amber" : "text-amber"}>{statusIsShipped ? "■" : "□"}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted font-mono">{project.index}</div>

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 text-sm text-amber font-semibold flex items-center gap-2 opacity-90 group-hover:underline transition-transform duration-150 group-hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber/40 rounded-sm"
              >
                <span>View project</span>
                <span className="transform transition-transform duration-150 group-hover:translate-x-1">→</span>
              </a>
            ) : (
              <div className="text-sm text-amber font-semibold flex items-center gap-2 opacity-90 group-hover:underline transition-transform duration-150 group-hover:scale-105">
                <span>View project</span>
                <span className="transform transition-transform duration-150 group-hover:translate-x-1">→</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
