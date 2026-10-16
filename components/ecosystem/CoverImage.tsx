import Image from "next/image";

export default function CoverImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-paper ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 100vw"
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-semibold tracking-tight text-ink/15">
            {alt.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase()}
          </span>
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
            DPRIME · ECOSYSTEM
          </span>
        </div>
      )}
    </div>
  );
}
