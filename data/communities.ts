import type { Community } from "../lib/types";

// Keep only DPRIME's real community profile. Add other communities when their
// details have been confirmed with the community owner.
export const communities: Community[] = [
  {
    slug: "dprime",
    name: "DPRIME",
    kind: "university club",
    tagline: "Student developers learning by building together.",
    mission:
      "A student developer community that learns, builds and ships real software, and connects with other communities doing the same.",
    location: "Nyeri, Kenya",
    region: "East Africa",
    topics: ["Web", "General"],
    website: "https://github.com/De-Fon/DPRIME",
    channels: ["Instagram", "TikTok", "LinkedIn", "GitHub"],
    lookingFor: ["Event partners", "Mentors", "Project collaborators"],
    memberCount: 10,
  },
];
