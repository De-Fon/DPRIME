import test from "node:test";
import assert from "node:assert/strict";
import {
  FALLBACK_OG_IMAGE,
  SITE_NAME,
  buildEventMetadata,
  resolveEventOgImage,
} from "../lib/eventMetadata";
import type { EcosystemEvent } from "../lib/types";
import type { EntityRef } from "../lib/ecosystem";

test("resolveEventOgImage: uses event.imageUrl when explicitly provided", () => {
  const event: Pick<EcosystemEvent, "imageUrl"> = {
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/events/2d2470fa-1f1d-4657-9f54-9e5bccc47fb0.png",
  };
  const host: EntityRef = {
    slug: "claude-community",
    name: "Claude Community",
    href: "/communities/claude-community",
    imageUrl: "https://example.com/host-logo.png",
    sample: false,
  };

  const image = resolveEventOgImage(event, host);
  assert.strictEqual(
    image,
    "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/events/2d2470fa-1f1d-4657-9f54-9e5bccc47fb0.png",
  );
});

test("resolveEventOgImage: falls back to host.imageUrl when event.imageUrl is omitted", () => {
  const event: Pick<EcosystemEvent, "imageUrl"> = {
    imageUrl: undefined,
  };
  const host: EntityRef = {
    slug: "nairobi-devs",
    name: "Nairobi Devs",
    href: "/communities/nairobi-devs",
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/host.png",
    sample: false,
  };

  const image = resolveEventOgImage(event, host);
  assert.strictEqual(
    image,
    "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/host.png",
  );
});

test("resolveEventOgImage: falls back to FALLBACK_OG_IMAGE when neither event nor host has image", () => {
  const event: Pick<EcosystemEvent, "imageUrl"> = {
    imageUrl: undefined,
  };
  const host: EntityRef = {
    slug: "tech-meetup",
    name: "Tech Meetup",
    href: "/communities/tech-meetup",
    imageUrl: undefined,
    sample: false,
  };

  assert.strictEqual(resolveEventOgImage(event, host), FALLBACK_OG_IMAGE);
  assert.strictEqual(resolveEventOgImage(event, null), FALLBACK_OG_IMAGE);
});

test("buildEventMetadata: produces complete Open Graph and Twitter metadata matching build-with-claude", () => {
  const event: EcosystemEvent = {
    slug: "build-with-claude",
    title: "Nairobi | Build with Claude Code",
    kind: "workshop",
    description: "Join developers in Nairobi to build real-world applications using Claude Code and Anthropic tooling.",
    date: "2026-11-15",
    location: "Nairobi, Kenya",
    region: "East Africa",
    topics: ["AI", "Open Source"],
    hostSlug: "claude-builders",
    partnerSlugs: [],
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/events/2d2470fa-1f1d-4657-9f54-9e5bccc47fb0.png",
  };

  const host: EntityRef = {
    slug: "claude-builders",
    name: "Claude Builders",
    href: "/communities/claude-builders",
    imageUrl: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/communities/host-logo.png",
    sample: false,
  };

  const meta = buildEventMetadata({ event, host });

  assert.strictEqual(meta.title, `Nairobi | Build with Claude Code | ${SITE_NAME}`);
  assert.strictEqual(meta.description, event.description);

  // Open Graph
  const og = meta.openGraph as Record<string, unknown>;
  assert.ok(og);
  assert.strictEqual(og.title, `Nairobi | Build with Claude Code | ${SITE_NAME}`);
  assert.strictEqual(og.description, event.description);
  assert.strictEqual(og.url, "/events/build-with-claude");
  assert.strictEqual(og.siteName, SITE_NAME);
  assert.strictEqual(og.type, "article");
  assert.deepStrictEqual(og.images, [
    { url: "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/events/2d2470fa-1f1d-4657-9f54-9e5bccc47fb0.png" },
  ]);

  // Twitter
  const twitter = meta.twitter as Record<string, unknown>;
  assert.ok(twitter);
  assert.strictEqual(twitter.card, "summary_large_image");
  assert.strictEqual(twitter.title, `Nairobi | Build with Claude Code | ${SITE_NAME}`);
  assert.strictEqual(twitter.description, event.description);
  assert.deepStrictEqual(twitter.images, [
    "https://fnigmzsogrneaegeoadz.supabase.co/storage/v1/object/public/images/events/2d2470fa-1f1d-4657-9f54-9e5bccc47fb0.png",
  ]);

  // Alternates
  const alternates = meta.alternates as Record<string, unknown>;
  assert.ok(alternates);
  assert.strictEqual(alternates.canonical, "/events/build-with-claude");
});

test("buildEventMetadata: truncates long event descriptions to 200 characters with ellipsis", () => {
  const longDescription = "Event description ".repeat(20);
  const event: EcosystemEvent = {
    slug: "huge-conference",
    title: "Africa Tech Summit",
    kind: "conference",
    description: longDescription,
    date: "2026-12-01",
    location: "Kigali, Rwanda",
    region: "East Africa",
    topics: ["Startups"],
    hostSlug: "tech-africa",
    partnerSlugs: [],
  };

  const meta = buildEventMetadata({ event, host: null });
  assert.strictEqual(meta.description?.length, 198); // 197 chars + 1 ellipsis char
  assert.ok(meta.description?.endsWith("…"));
});
