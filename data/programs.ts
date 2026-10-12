import type { Program } from "../lib/types";

export const programs: Program[] = [
  {
    slug: "sample-mentorship-cohort",
    title: "Sample Mentorship Cohort",
    kind: "mentorship",
    description: "Twelve weeks pairing students with working engineers.",
    duration: "12 weeks",
    topics: ["General", "Women in Tech"],
    runBySlug: "sample-women-in-tech",
    sample: true,
  },
  {
    slug: "sample-builder-fellowship",
    title: "Sample Builder Fellowship",
    kind: "fellowship",
    description: "Stipend and mentorship for student teams shipping a product.",
    duration: "6 months",
    topics: ["Startups"],
    runBySlug: "sample-innovation-fund",
    sample: true,
  },
];
