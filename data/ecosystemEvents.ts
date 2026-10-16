import type { EcosystemEvent } from "../lib/types";

// Real upcoming event listings sourced from KOMM Africa on 16 October 2026.
// These are imported as sample records for DPRIME UI testing, not as DPRIME-hosted
// events. The source listings expose event details, but direct event-image URLs
// could not be verified here; leaving imageUrl unset intentionally exercises the
// host-image / DPRIME branded fallback chain rather than inventing image URLs.
export const ecosystemEvents: EcosystemEvent[] = [
  {
    slug: "komm-the-table-african-edition-2026",
    title: "The Table (African Edition)",
    kind: "meetup",
    description:
      "An in-person food and community gathering listed by KOMM Africa. The listing shows a KES 6,000 ticket and Kingori’s Home in Gikambura as the venue.",
    date: "2026-10-25",
    location: "Kingori’s Home, Gikambura, Kenya",
    region: "East Africa",
    topics: ["General"],
    hostSlug: "sample-ai-club",
    partnerSlugs: [],
    sample: true,
  },
  {
    slug: "komm-cowork-connect-lunch-2026",
    title: "Cowork, Connect & Lunch",
    kind: "meetup",
    description:
      "An in-person coworking and networking event listed by KOMM Africa at iHub Innovation Hub. The listing gives the date as 22 October 2026.",
    date: "2026-10-22",
    location: "iHub Innovation Hub, Jahazi, Lavington, Nairobi, Kenya",
    region: "East Africa",
    topics: ["Startups", "General"],
    hostSlug: "sample-cloud-community",
    partnerSlugs: [],
    sample: true,
  },
  {
    slug: "komm-impact-ink-summit-2026",
    title: "The Impact Ink Summit 2026",
    kind: "conference",
    description:
      "An in-person summit listed by KOMM Africa for 31 October 2026 in Nairobi. The public listing categorizes it under social clubs and meetups.",
    date: "2026-10-31",
    location: "Nairobi, Kenya",
    region: "East Africa",
    topics: ["Startups", "General"],
    hostSlug: "sample-oss-collective",
    partnerSlugs: [],
    sample: true,
  },
];
