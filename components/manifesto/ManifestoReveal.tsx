"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const WORD_IN_STAGGER_MS = 70;
const WORD_OUT_STAGGER_MS = 30;

// Full-screen, one sentence at a time. Words rise in one by one out of a blur;
// on Next the current sentence's words lift away in sequence before the next
// sentence begins. Clicks are ignored mid-transition. Escape returns home.
export default function ManifestoReveal({
  sentences,
  discordUrl,
}: {
  sentences: string[];
  discordUrl: string;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const last = sentences.length - 1;

  const go = useCallback(
    (delta: 1 | -1) => {
      if (leaving !== null) return;
      const next = index + delta;
      if (next < 0 || next > last) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIndex(next);
      setLeaving(reduce ? null : index);
    },
    [index, last, leaving],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, router]);

  const words = (text: string) => text.split(" ");
  const leavingWords = leaving !== null ? words(sentences[leaving]) : [];
  const currentWords = words(sentences[index]);
  // The next sentence starts once the old one is mostly gone.
  const enterBase = leaving !== null ? 350 : 200;

  return (
    <main className="manifesto-stage fixed inset-0 z-50 overflow-hidden bg-ink text-paper">
      <div className="manifesto-grid absolute -inset-[28px] opacity-[0.07]" aria-hidden />

      <div className="relative h-full max-w-4xl mx-auto px-8 md:px-12">
        <div className="absolute inset-x-8 md:inset-x-12 top-1/2 -translate-y-[60%]">
          {leaving !== null && (
            <p
              key={`out-${leaving}`}
              aria-hidden
              className="absolute inset-x-0 bottom-0 font-display text-3xl md:text-6xl leading-[1.15]"
            >
              {leavingWords.map((w, i) => (
                <span key={i}>
                  <span
                    className="word word-out"
                    style={{ animationDelay: `${i * WORD_OUT_STAGGER_MS}ms` }}
                    onAnimationEnd={
                      i === leavingWords.length - 1 ? () => setLeaving(null) : undefined
                    }
                  >
                    {w}
                  </span>{" "}
                </span>
              ))}
            </p>
          )}

          <div key={`in-${index}`} aria-live="polite">
            <span className="manifesto-rule block h-[3px] w-16 bg-amber mb-8" aria-hidden />
            <p className="font-display text-3xl md:text-6xl leading-[1.15]">
              {currentWords.map((w, i) => (
                <span key={i}>
                  <span
                    className="word word-in"
                    style={{ animationDelay: `${enterBase + i * WORD_IN_STAGGER_MS}ms` }}
                  >
                    {w}
                  </span>{" "}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-8 md:inset-x-12 bottom-16 md:bottom-20 min-h-[3.5rem]">
          {index === last ? (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="manifesto-cta inline-flex items-center rounded-full bg-amber px-7 py-3 font-semibold text-paper"
              style={{ animationDelay: `${enterBase + currentWords.length * WORD_IN_STAGGER_MS + 300}ms` }}
            >
              Join our Discord
              <span className="ml-3 manifesto-arrow" aria-hidden>
                →
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => go(1)}
              autoFocus
              className="manifesto-cta manifesto-next group inline-flex items-center rounded-full border border-paper/40 px-7 py-3 font-semibold text-paper hover:border-amber hover:text-amber transition-colors"
              style={{ animationDelay: `${enterBase + currentWords.length * WORD_IN_STAGGER_MS + 200}ms` }}
            >
              Next
              <span className="ml-3 manifesto-arrow" aria-hidden>
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
