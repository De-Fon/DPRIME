import Image from "next/image";

type CoverVariant = "community" | "event" | "opportunity" | "organization" | "program";

const VARIANT_LABEL: Record<CoverVariant, string> = {
  community: "Community network",
  event: "Gather · Learn · Build",
  opportunity: "Room to grow",
  organization: "Ecosystem partner",
  program: "Learning in motion",
};

export default function CoverImage({
  src,
  alt,
  priority = false,
  className = "",
  variant = "community",
}: {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  variant?: CoverVariant;
}) {
  return (
    <div className={`relative isolate aspect-[16/9] w-full overflow-hidden border-b border-line bg-paper ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      ) : (
        <div
          aria-label={`Illustrated placeholder for ${alt}`}
          role="img"
          className={`absolute inset-0 overflow-hidden ${variant === "event" ? "bg-[#e8e8e2]" : variant === "opportunity" ? "bg-[#eee5d9]" : variant === "program" ? "bg-[#e3e9e6]" : variant === "organization" ? "bg-[#e4e7ed]" : "bg-[#e6e9ee]"}`}
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(23,26,33,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(23,26,33,.09) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div aria-hidden="true" className={`absolute -right-8 -top-14 h-48 w-48 rounded-full border-[28px] ${variant === "opportunity" ? "border-[#c97a3d]/25" : variant === "event" ? "border-[#657a76]/25" : "border-[#35465d]/20"}`} />
          <div aria-hidden="true" className="absolute -bottom-16 left-[22%] h-44 w-44 rotate-45 border border-ink/20" />
          <div aria-hidden="true" className="absolute bottom-5 left-5 right-5 top-5 border border-ink/15" />
          <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">DPRIME / FIELD NOTES</span>
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 text-lg text-ink/70">↗</span>
            </div>
            <div className="relative max-w-[80%]">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">{VARIANT_LABEL[variant]}</span>
              <span className="block font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">{alt}</span>
              <span className="mt-3 block h-1 w-12 bg-amber" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
