"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const WORD_IN_STAGGER_MS = 70;
const WORD_OUT_STAGGER_MS = 30;
// The closing paragraph is longer than a sentence, so its words animate faster.
const FULL_IN_STAGGER_MS = 40;
const FULL_OUT_STAGGER_MS = 14;
const AUDIO_VOLUME = 0.5;
const AUDIO_FADE_MS = 800;

// Full-screen, one sentence at a time, then a closing paragraph and the join
// links. Words rise in one by one out of a blur;
// on Next the current sentence's words lift away in sequence before the next
// sentence begins. Clicks are ignored mid-transition. Escape returns home.
export default function ManifestoReveal({
  title,
  sentences,
  closing,
  discordUrl,
  whatsappUrl,
  audioSrc,
}: {
  title: string;
  sentences: string[];
  closing: string;
  discordUrl: string;
  whatsappUrl: string;
  audioSrc: string;
}) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  // Slides: the title, one per sentence, then the closing paragraph.
  const last = sentences.length + 1;

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

  // Browsers block autoplay until the user interacts with the page, so try
  // immediately and fall back to the first click or key press. The track
  // fades in rather than starting at full volume.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    // The load can fail before React attaches onError (server-rendered tag).
    if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setAudioAvailable(false);
    }
    let fade: ReturnType<typeof setInterval> | undefined;

    const onPlaying = () => {
      const step = AUDIO_VOLUME / (AUDIO_FADE_MS / 100);
      clearInterval(fade);
      fade = setInterval(() => {
        audio.volume = Math.min(AUDIO_VOLUME, audio.volume + step);
        if (audio.volume >= AUDIO_VOLUME) clearInterval(fade);
      }, 100);
    };
    const tryPlay = () => {
      if (audio.paused) audio.play().catch(() => {});
    };
    const onInteract = () => {
      tryPlay();
      if (!audio.paused) removeListeners();
    };
    const removeListeners = () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };

    audio.addEventListener("playing", onPlaying, { once: true });
    window.addEventListener("pointerdown", onInteract);
    window.addEventListener("keydown", onInteract);
    tryPlay();

    return () => {
      clearInterval(fade);
      removeListeners();
      audio.pause();
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const words = (text: string) => text.split(" ");
  const textFor = (i: number) =>
    i === 0 ? title : i === last ? closing : sentences[i - 1];
  const leavingWords = leaving !== null ? words(textFor(leaving)) : [];
  const currentWords = words(textFor(index));
  const isFinal = index === last;
  const inStagger = isFinal ? FULL_IN_STAGGER_MS : WORD_IN_STAGGER_MS;
  const outStagger = leaving === last ? FULL_OUT_STAGGER_MS : WORD_OUT_STAGGER_MS;
  // The next slide starts once the old one is mostly gone.
  const enterBase = leaving !== null ? 350 : 200;
  const afterWords = enterBase + currentWords.length * inStagger;

  const linkBase =
    "inline-flex cursor-pointer items-center rounded-full px-7 py-3 font-semibold transition-all hover:-translate-y-0.5";

  return (
    <main className="manifesto-stage fixed inset-0 z-50 overflow-hidden bg-ink text-paper">
      <div className="manifesto-grid absolute -inset-[28px] opacity-[0.07]" aria-hidden />

      <audio ref={audioRef} src={audioSrc} loop preload="auto" onError={() => setAudioAvailable(false)} />
      {audioAvailable && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          aria-pressed={muted}
          className="manifesto-cta absolute right-6 top-6 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-amber hover:text-amber"
          style={{ animationDelay: "1200ms" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            {muted ? (
              <path d="m16 9 5 6m0-6-5 6" />
            ) : (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 6a9 9 0 0 1 0 12" />
              </>
            )}
          </svg>
        </button>
      )}

      <div className="relative h-full max-w-4xl mx-auto px-8 md:px-12">
        {leaving !== null && (
          <p
            key={`out-${leaving}`}
            aria-hidden
            className={`absolute inset-x-8 md:inset-x-12 font-display ${
              leaving === last
                ? "top-1/2 -translate-y-1/2 text-xl md:text-3xl leading-snug"
                : "top-1/2 -translate-y-[60%] text-3xl md:text-6xl leading-[1.15]"
            }`}
          >
            {leavingWords.map((w, i) => (
              <span key={i}>
                <span
                  className="word word-out"
                  style={{ animationDelay: `${i * outStagger}ms` }}
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

        {isFinal ? (
          <div key="final" className="absolute inset-0 overflow-y-auto">
            <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center px-8 py-14 md:px-12">
              <span className="manifesto-rule block h-[3px] w-16 bg-amber mb-6" aria-hidden />
              <h1
                className="manifesto-cta font-mono text-sm tracking-[0.05em] mb-5 text-amber"
                style={{ animationDelay: `${enterBase}ms` }}
              >
                {title}
              </h1>
              <p aria-live="polite" className="font-display text-xl md:text-3xl leading-snug">
                {currentWords.map((w, i) => (
                  <span key={i}>
                    <span
                      className="word word-in"
                      style={{ animationDelay: `${enterBase + i * inStagger}ms` }}
                    >
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </p>
              <div
                className="manifesto-cta mt-10 flex flex-wrap items-center gap-4"
                style={{ animationDelay: `${afterWords + 200}ms` }}
              >
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkBase} bg-amber text-paper`}
                >
                  Join our Discord
                  <span className="ml-3 manifesto-arrow" aria-hidden>
                    →
                  </span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkBase} border border-paper/50 text-paper hover:border-amber hover:text-amber`}
                >
                  Join our WhatsApp group
                  <span className="ml-3 manifesto-arrow" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-x-8 md:inset-x-12 top-1/2 -translate-y-[60%]">
              <div key={`in-${index}`} aria-live="polite">
                <span className="manifesto-rule block h-[3px] w-16 bg-amber mb-8" aria-hidden />
                <p className="font-display text-3xl md:text-6xl leading-[1.15]">
                  {currentWords.map((w, i) => (
                    <span key={i}>
                      <span
                        className="word word-in"
                        style={{ animationDelay: `${enterBase + i * inStagger}ms` }}
                      >
                        {w}
                      </span>{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="absolute inset-x-8 md:inset-x-12 bottom-16 md:bottom-20 min-h-[3.5rem]">
              <button
                type="button"
                onClick={() => go(1)}
                autoFocus
                className="manifesto-cta manifesto-next group inline-flex cursor-pointer items-center rounded-full border border-paper/40 px-7 py-3 font-semibold text-paper hover:border-amber hover:text-amber transition-colors"
                style={{ animationDelay: `${afterWords + 200}ms` }}
              >
                Next
                <span className="ml-3 manifesto-arrow" aria-hidden>
                  →
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
