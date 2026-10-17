import type { Metadata } from "next";
import type { EntityRef } from "./ecosystem";
import type { EcosystemEvent } from "./types";

export const FALLBACK_OG_IMAGE = "/images/brand/logo3.png";
export const SITE_NAME = "DPRIME";

/**
 * Resolves the cover image URL for an event.
 * Prioritizes the event's own cover image, then falls back to the host community's image,
 * and finally to the default brand logo.
 */
export function resolveEventOgImage(
  event: Pick<EcosystemEvent, "imageUrl">,
  host?: Pick<EntityRef, "imageUrl"> | null,
): string {
  return event.imageUrl || host?.imageUrl || FALLBACK_OG_IMAGE;
}

/**
 * Builds Open Graph and Twitter metadata for an individual event page.
 */
export function buildEventMetadata({
  event,
  host,
}: {
  event: EcosystemEvent;
  host?: EntityRef | null;
}): Metadata {
  const title = `${event.title} | ${SITE_NAME}`;
  const description =
    event.description.length > 200
      ? event.description.slice(0, 197) + "…"
      : event.description;

  const ogImage = resolveEventOgImage(event, host);
  const relativeUrl = `/events/${event.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: relativeUrl,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: relativeUrl,
    },
  };
}
