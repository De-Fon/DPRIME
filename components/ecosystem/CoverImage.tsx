import Image from "next/image";

// Cover or logo image for a card. Renders nothing when there is no image, so
// records without one keep their current layout.
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
  if (!src) return null;
  return (
    <div className={`relative aspect-[16/9] w-full overflow-hidden bg-paper ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
