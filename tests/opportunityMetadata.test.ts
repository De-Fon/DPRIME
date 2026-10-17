import test from "node:test";
import assert from "node:assert/strict";
import { CANONICAL_SITE_URL, getSiteUrl } from "../lib/site";
import {
  FALLBACK_OG_IMAGE,
  SITE_NAME,
  buildOpportunityMetadata,
  resolveOpportunityOgImage,
} from "../lib/opportunityMetadata";
import type { Opportunity } from "../lib/types";
import type { EntityRef } from "../lib/ecosystem";

const env = process.env as Record<string, string | undefined>;

test("getSiteUrl: returns canonical production URL by default in production", () => {
  const origNodeEnv = env.NODE_ENV;
  const origNextPublic = env.NEXT_PUBLIC_SITE_URL;
  const origSiteUrl = env.SITE_URL;
  const origVercelUrl = env.VERCEL_URL;

  try {
    delete env.NEXT_PUBLIC_SITE_URL;
    delete env.SITE_URL;
    env.VERCEL_URL = "dprime-git-main-example.vercel.app";
    env.NODE_ENV = "production";

    assert.strictEqual(getSiteUrl(), "https://dprime.co.ke");
    assert.strictEqual(CANONICAL_SITE_URL, "https://dprime.co.ke");
  } finally {
    env.NODE_ENV = origNodeEnv;
    if (origNextPublic) env.NEXT_PUBLIC_SITE_URL = origNextPublic;
    else delete env.NEXT_PUBLIC_SITE_URL;
    if (origSiteUrl) env.SITE_URL = origSiteUrl;
    else delete env.SITE_URL;
    if (origVercelUrl) env.VERCEL_URL = origVercelUrl;
    else delete env.VERCEL_URL;
  }
});

test("getSiteUrl: prefers NEXT_PUBLIC_SITE_URL or SITE_URL when set", () => {
  const origNextPublic = env.NEXT_PUBLIC_SITE_URL;
  const origSiteUrl = env.SITE_URL;

  try {
    env.NEXT_PUBLIC_SITE_URL = "https://preview.dprime.co.ke/";
    assert.strictEqual(getSiteUrl(), "https://preview.dprime.co.ke");

    delete env.NEXT_PUBLIC_SITE_URL;
    env.SITE_URL = "https://staging.dprime.co.ke///";
    assert.strictEqual(getSiteUrl(), "https://staging.dprime.co.ke");
  } finally {
    if (origNextPublic) env.NEXT_PUBLIC_SITE_URL = origNextPublic;
    else delete env.NEXT_PUBLIC_SITE_URL;
    if (origSiteUrl) env.SITE_URL = origSiteUrl;
    else delete env.SITE_URL;
  }
});

test("getSiteUrl: falls back to localhost:3000 in development", () => {
  const origNodeEnv = env.NODE_ENV;
  const origNextPublic = env.NEXT_PUBLIC_SITE_URL;
  const origSiteUrl = env.SITE_URL;

  try {
    delete env.NEXT_PUBLIC_SITE_URL;
    delete env.SITE_URL;
    env.NODE_ENV = "development";

    assert.strictEqual(getSiteUrl(), "http://localhost:3000");
  } finally {
    env.NODE_ENV = origNodeEnv;
    if (origNextPublic) env.NEXT_PUBLIC_SITE_URL = origNextPublic;
    if (origSiteUrl) env.SITE_URL = origSiteUrl;
  }
});

test("resolveOpportunityOgImage: uses opportunity.imageUrl when explicitly provided", () => {
  const opportunity = {
    imageUrl: "https://example.com/custom-cover.jpg",
  };
  const poster: EntityRef = {
    slug: "ai-kenya",
    name: "AI Kenya",
    href: "/communities/ai-kenya",
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/poster.png",
    sample: false,
  };

  const image = resolveOpportunityOgImage(opportunity, poster);
  assert.strictEqual(image, "https://example.com/custom-cover.jpg");
});

test("resolveOpportunityOgImage: falls back to poster.imageUrl when opportunity.imageUrl is omitted", () => {
  const opportunity: Pick<Opportunity, "imageUrl"> = {
    imageUrl: undefined,
  };
  const poster: EntityRef = {
    slug: "ai-kenya",
    name: "AI Kenya",
    href: "/communities/ai-kenya",
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/d14aaab0-27d1-4b53-86f0-f1d2b63190a7.png",
    sample: false,
  };

  const image = resolveOpportunityOgImage(opportunity, poster);
  assert.strictEqual(
    image,
    "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/d14aaab0-27d1-4b53-86f0-f1d2b63190a7.png",
  );
});

test("resolveOpportunityOgImage: falls back to FALLBACK_OG_IMAGE when neither opportunity nor poster has image", () => {
  const opportunity: Pick<Opportunity, "imageUrl"> = {
    imageUrl: undefined,
  };
  const poster: EntityRef = {
    slug: "some-club",
    name: "Some Club",
    href: "/communities/some-club",
    imageUrl: undefined,
    sample: false,
  };

  assert.strictEqual(resolveOpportunityOgImage(opportunity, poster), FALLBACK_OG_IMAGE);
  assert.strictEqual(resolveOpportunityOgImage(opportunity, null), FALLBACK_OG_IMAGE);
});

test("buildOpportunityMetadata: produces complete Open Graph and Twitter metadata matching opportunity", () => {
  const opportunity: Opportunity = {
    slug: "ai-engineer",
    title: "AI Engineer-CloudPlexo",
    kind: "job",
    description:
      "CloudPlexo, a global cloud technology company and advanced AWS Partner, is seeking a talented AI Engineer to drive innovation in cloud-based artificial intelligence solutions. This hybrid role focuses on developing and implementing cutting-edge AI.",
    location: "Nairobi, Kenya",
    region: "East Africa",
    topics: ["AI", "Cloud"],
    postedBySlug: "ai-kenya",
  };

  const poster: EntityRef = {
    slug: "ai-kenya",
    name: "AI Kenya",
    href: "/communities/ai-kenya",
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/d14aaab0-27d1-4b53-86f0-f1d2b63190a7.png",
    sample: false,
  };

  const meta = buildOpportunityMetadata({ opportunity, poster });

  const expectedDesc =
    "CloudPlexo, a global cloud technology company and advanced AWS Partner, is seeking a talented AI Engineer to drive innovation in cloud-based artificial intelligence solutions. This hybrid role focu…";

  assert.strictEqual(meta.title, `AI Engineer-CloudPlexo | ${SITE_NAME}`);
  assert.strictEqual(meta.description, expectedDesc);

  // Open Graph
  const og = meta.openGraph as Record<string, unknown>;
  assert.ok(og);
  assert.strictEqual(og.title, `AI Engineer-CloudPlexo | ${SITE_NAME}`);
  assert.strictEqual(og.description, expectedDesc);
  assert.strictEqual(og.url, "/opportunities/ai-engineer");
  assert.strictEqual(og.siteName, SITE_NAME);
  assert.strictEqual(og.type, "article");
  assert.deepStrictEqual(og.images, [
    { url: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/d14aaab0-27d1-4b53-86f0-f1d2b63190a7.png" },
  ]);

  // Twitter
  const twitter = meta.twitter as Record<string, unknown>;
  assert.ok(twitter);
  assert.strictEqual(twitter.card, "summary_large_image");
  assert.strictEqual(twitter.title, `AI Engineer-CloudPlexo | ${SITE_NAME}`);
  assert.strictEqual(twitter.description, expectedDesc);
  assert.deepStrictEqual(twitter.images, [
    "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/d14aaab0-27d1-4b53-86f0-f1d2b63190a7.png",
  ]);

  // Alternates
  const alternates = meta.alternates as Record<string, unknown>;
  assert.ok(alternates);
  assert.strictEqual(alternates.canonical, "/opportunities/ai-engineer");
});

test("buildOpportunityMetadata: truncates long descriptions to 200 characters with ellipsis", () => {
  const longDescription = "A".repeat(250);
  const opportunity: Opportunity = {
    slug: "long-desc-opp",
    title: "Big Opportunity",
    kind: "grant",
    description: longDescription,
    location: "Remote",
    region: "Pan African",
    topics: ["Open Source"],
    postedBySlug: "open-africa",
  };

  const meta = buildOpportunityMetadata({ opportunity, poster: null });
  assert.strictEqual(meta.description?.length, 198); // 197 chars + 1 ellipsis char
  assert.ok(meta.description?.endsWith("…"));
});
