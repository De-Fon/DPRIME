import Link from "next/link";
import type { Project } from "../lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  const statusIsShipped = project.status === "shipped";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-card border border-line rounded-md overflow-hidden transition-colors"
    >
      <div className="flex items-start">
        <div className="hidden sm:flex items-center justify-center px-6 py-8 text-line font-mono text-6xl select-none">
          {project.index}
        </div>

        <div className="flex-1 p-6 border-l-2 border-slate group-hover:border-amber transition-colors">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl text-ink">{project.name}</h3>
            {project.live && (
              <span className="text-xs bg-amber text-paper px-2 py-1 rounded">live</span>
            )}

            <div className="ml-auto font-mono text-sm flex items-center gap-2 text-muted">
              <span className={statusIsShipped ? "text-slate" : "text-amber"}>
                {statusIsShipped ? "■" : "□"}
              </span>
              <span className="text-muted">{project.status}</span>
            </div>
          </div>

          <p className="mt-2 font-serif text-body">{project.tagline}</p>

          <div className="mt-4 text-sm font-mono text-muted">{project.stack.join(" · ")}</div>
        </div>
      </div>
    </Link>
  );
}
