"use client";

import { useState } from "react";

// Reveals one sentence per click. Earlier sentences stay on screen but fade
// back, so the paragraph builds up. After the last sentence the Next button is
// replaced by the Discord link.
export default function ManifestoReveal({
  sentences,
  discordUrl,
}: {
  sentences: string[];
  discordUrl: string;
}) {
  const [shown, setShown] = useState(1);
  const done = shown >= sentences.length;

  return (
    <div>
      <p
        aria-live="polite"
        className="font-display text-2xl md:text-4xl leading-snug text-ink min-h-[16rem]"
      >
        {sentences.slice(0, shown).map((s, i) => {
          const latest = i === shown - 1;
          return (
            <span
              key={i}
              className={`reveal-in transition-colors duration-500 ${
                latest || done ? "text-ink" : "text-muted"
              }`}
            >
              {s}{" "}
            </span>
          );
        })}
      </p>

      <div className="mt-10 flex items-center gap-6 min-h-[3rem]">
        {done ? (
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary reveal-in inline-flex items-center"
          >
            Join our Discord
            <span className="ml-3" aria-hidden>
              →
            </span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setShown((n) => Math.min(n + 1, sentences.length))}
            autoFocus
            className="btn-primary inline-flex items-center"
          >
            Next
            <span className="ml-3" aria-hidden>
              →
            </span>
          </button>
        )}
        <span className="font-mono text-xs text-muted" aria-hidden>
          {shown} / {sentences.length}
        </span>
      </div>
    </div>
  );
}
