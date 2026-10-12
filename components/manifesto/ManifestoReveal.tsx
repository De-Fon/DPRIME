"use client";

import { useCallback, useEffect, useState } from "react";

// One sentence per screen. Next fades the current sentence up and out while
// the following one rises in. Clicks are ignored while a transition runs so
// the motion never stacks or jumps. The last sentence also shows the link.
export default function ManifestoReveal({
  sentences,
  discordUrl,
}: {
  sentences: string[];
  discordUrl: string;
}) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  const last = sentences.length - 1;

  const go = useCallback(
    (delta: 1 | -1) => {
      if (leaving !== null) return;
      const next = index + delta;
      if (next < 0 || next > last) return;
      setDir(delta);
      setIndex(next);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setLeaving(reduce ? null : index);
    },
    [index, last, leaving],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const style = { "--dy": `${dir * 28}px` } as React.CSSProperties;

  return (
    <div>
      <div className="relative h-[55vh] min-h-[20rem]" style={style}>
        {leaving !== null && (
          <p
            key={`out-${leaving}`}
            aria-hidden
            onAnimationEnd={() => setLeaving(null)}
            className="slide slide-out flex items-center font-display text-3xl md:text-5xl leading-tight text-ink"
          >
            {sentences[leaving]}
          </p>
        )}
        <div
          key={`in-${index}`}
          aria-live="polite"
          className="slide slide-in flex flex-col items-start justify-center gap-10"
        >
          <p className="font-display text-3xl md:text-5xl leading-tight text-ink">
            {sentences[index]}
          </p>
          {index === last && (
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary slide-late inline-flex items-center"
            >
              Join our Discord
              <span className="ml-3" aria-hidden>
                →
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="btn-secondary disabled:opacity-30"
          aria-label="Previous sentence"
        >
          ←
        </button>
        {index < last && (
          <button
            type="button"
            onClick={() => go(1)}
            autoFocus
            className="btn-primary inline-flex items-center"
          >
            Next
            <span className="ml-3" aria-hidden>
              →
            </span>
          </button>
        )}
        <div className="flex items-center gap-1.5" aria-hidden>
          {sentences.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-amber" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-muted" aria-hidden>
          {index + 1} / {sentences.length}
        </span>
      </div>
    </div>
  );
}
