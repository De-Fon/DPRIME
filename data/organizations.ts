import type { Organization } from "../lib/types";

// All entries are placeholders; see data/communities.ts.
export const organizations: Organization[] = [
  {
    slug: "sample-cloud-co",
    name: "Sample Cloud Co.",
    kind: "company",
    description: "Cloud infrastructure company that sponsors developer events.",
    location: "Nairobi, Kenya",
    region: "East Africa",
    topics: ["Cloud"],
    sample: true,
  },
  {
    slug: "sample-tech-university",
    name: "Sample Technical University",
    kind: "institution",
    description: "University with active computing and engineering programs.",
    location: "Nyeri, Kenya",
    region: "East Africa",
    topics: ["General", "AI"],
    sample: true,
  },
  {
    slug: "sample-innovation-fund",
    name: "Sample Innovation Fund",
    kind: "nonprofit",
    description: "Grants and fellowships for early-stage technology builders.",
    location: "Accra, Ghana",
    region: "West Africa",
    topics: ["Startups"],
    sample: true,
  },
];
