import type { Metadata } from "next";
import type { EntityRef } from "./ecosystem";
import type { Opportunity } from "./types";

export const FALLBACK_OG_IMAGE = "/images/brand/logo3.png";
export const SITE_NAME = "DPRIME";

/**
 * Resolves the cover image URL for an opportunity.
 * Prioritizes the opportunity's own image, then falls back to the poster's image
 * (e.g. Supabase image from hosting community/org), and finally to the default brand logo.
 */
export function resolveOpportunityOgImage(
  opportunity: Pick<Opportunity, "imageUrl">,
  poster?: Pick<EntityRef, "imageUrl"> | null,
): string {
  return opportunity.imageUrl || poster?.imageUrl || FALLBACK_OG_IMAGE;
}

/**
 * Builds Open Graph and Twitter metadata for an individual opportunity page.
 */
export function buildOpportunityMetadata({
  opportunity,
  poster,
}: {
  opportunity: Opportunity;
  poster?: EntityRef | null;
}): Metadata {
  const title = `${opportunity.title} | ${SITE_NAME}`;
  const description =
    opportunity.description.length > 200
      ? opportunity.description.slice(0, 197) + "…"
      : opportunity.description;

  const ogImage = resolveOpportunityOgImage(opportunity, poster);
  const relativeUrl = `/opportunities/${opportunity.slug}`;

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
