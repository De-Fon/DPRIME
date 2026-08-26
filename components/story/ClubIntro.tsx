export default function ClubIntro() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        <div>
          <div className="font-mono text-sm text-muted mb-5">
            <span className="inline-flex items-center">
              <span
                className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                aria-hidden
              />
              who we are
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            We didn't start as developers.
          </h2>
        </div>

        <div className="text-muted text-lg leading-relaxed">
          <p>
            DPRIME started in January 2026 as a group of students who wanted
            to learn how to code.
          </p>

          <p className="mt-5">
            We did not have someone sitting in front of us teaching us
            everything. We chose what to learn, studied independently,
            struggled through problems and came together to share what we
            discovered.
          </p>

          <p className="mt-5">
            Over time, those learning sessions became projects. The projects
            became systems. And the people who started out learning together
            became a community of builders.
          </p>

          <p className="mt-5 text-ink font-medium">
            DPRIME is still learning. We're just building while we do it.
          </p>
        </div>

      </div>

    </section>
  );
}