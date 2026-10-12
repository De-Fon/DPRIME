import Reveal from "@/components/about/Reveal";
import SectionLabel from "@/components/ecosystem/SectionLabel";
import { STRATNOVO_URL, WHATSAPP_URL } from "@/data/links";

export const metadata = { title: "About | DPRIME" };

const STORY = [
  "Learning to build software can be lonely. The late nights. The error you cannot explain. The quiet feeling that everyone else already understands. Every one of us has sat with that feeling.",
  "So we sat together instead. We shared what we found, helped each other when nothing made sense, and built things just to see if we could. Some of it worked. A lot of it did not. All of it taught us something.",
  "Somewhere between the code and the long conversations, something changed. We stopped being people who happened to study the same thing and became friends. We made time to laugh together and to step away from the screens, and we learned that the people behind the code matter as much as the code.",
  "Then we looked up and realised we were not the only ones. Across the continent there are other clubs, other groups, other small rooms full of people doing exactly this. Most of them have never met.",
];

const BELIEFS = [
  {
    title: "Learn together",
    body: "Nobody should have to carry a hard problem alone. Asking for help is how we all got here.",
  },
  {
    title: "Build slowly, build honestly",
    body: "We would rather understand one thing deeply than rush through ten. Depth is worth the time.",
  },
  {
    title: "Make room for the next person",
    body: "Someone is sitting alone with a problem they cannot solve yet. We want to be the door they find.",
  },
];

export default function About() {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-36">
          <SectionLabel>our story</SectionLabel>
          <h1 className="font-display text-4xl md:text-7xl text-ink leading-[1.05]">
            No one should have to <span className="text-amber">learn alone.</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-muted max-w-2xl leading-relaxed">
            DPRIME began the way most good things do: a small group of
            students, a lot of questions, and a quiet agreement to figure
            things out together.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-20 md:py-28 space-y-10">
        {STORY.map((paragraph, i) => (
          <Reveal key={i}>
            <p className="text-lg md:text-xl leading-9 text-body">{paragraph}</p>
          </Reveal>
        ))}
      </section>

      <section className="border-y border-line bg-card">
        <Reveal className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <span className="block h-[3px] w-16 bg-amber mb-8" aria-hidden />
          <p className="font-display text-3xl md:text-5xl text-ink leading-tight">
            That is why DPRIME exists.
          </p>
          <p className="mt-6 text-lg md:text-xl leading-9 text-muted max-w-2xl">
            We want every one of those rooms to have a door. A way for
            communities to find each other, share what they know, and make
            space for the next person who is just getting started.
          </p>
          <p className="mt-8 font-display text-xl md:text-2xl text-amber">
            A quiet room before the lights come on.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <SectionLabel>what we believe</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl text-ink max-w-2xl">
            The things we will not trade away.
          </h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {BELIEFS.map((belief, i) => (
            <li key={belief.title}>
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full bg-card border border-line rounded-md p-7 border-l-2 hover:border-l-amber transition-colors">
                  <h3 className="font-display text-xl text-ink">{belief.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{belief.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-paper">
        <Reveal className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <p className="font-mono text-sm tracking-[0.05em] text-amber">
            a product of
          </p>
          <p className="mt-4 font-display text-5xl md:text-7xl">Stratnovo</p>
          <p className="mt-6 text-lg md:text-xl text-paper/70 max-w-xl mx-auto leading-relaxed">
            DPRIME is a product of Stratnovo, grown in the open, one community
            at a time.
          </p>
          <a
            href={STRATNOVO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full border border-paper/40 px-7 py-3 font-semibold text-paper transition-colors hover:border-amber hover:text-amber"
          >
            Visit Stratnovo
            <span className="ml-3" aria-hidden>
              ↗
            </span>
          </a>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <Reveal>
          <p className="font-display text-2xl md:text-4xl text-ink leading-snug">
            We are only at the beginning.
          </p>
          <p className="mt-5 text-lg md:text-xl leading-9 text-muted">
            Every community that joins makes the next one easier to find. If
            you have ever wished there was somewhere to start, this is us
            building it, with you.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <Reveal className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-tight">
            Come and sit with us.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Whether you run a community, are looking for one, or just have a
            question you cannot answer yet, there is a seat for you here.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-7 py-3"
            >
              Join our WhatsApp group
            </a>
            <a
              href="/manifesto"
              target="_blank"
              rel="opener"
              className="btn-secondary px-7 py-3"
            >
              Read our Manifesto
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
