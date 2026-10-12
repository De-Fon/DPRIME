import type { Community } from "../lib/types";

// DPRIME is the only real record here. Entries marked `sample` are
// placeholders used to demonstrate discovery and should be replaced with
// real communities as they onboard.
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
  {
    slug: "sample-ai-club",
    name: "Sample University AI Club",
    kind: "university club",
    tagline: "Applied machine learning for students.",
    mission:
      "Weekly study groups and project sprints around machine learning and data.",
    location: "Nairobi, Kenya",
    region: "East Africa",
    topics: ["AI", "Data"],
    channels: ["WhatsApp", "GitHub"],
    lookingFor: ["Speakers", "Hackathon partners"],
    sample: true,
  },
  {
    slug: "sample-cloud-community",
    name: "Sample Cloud Community",
    kind: "developer community",
    tagline: "Monthly meetups on cloud and DevOps.",
    mission:
      "A regional community sharing practical cloud engineering knowledge.",
    location: "Lagos, Nigeria",
    region: "West Africa",
    topics: ["Cloud"],
    channels: ["Discord", "Slack"],
    lookingFor: ["Sponsors", "Venues"],
    sample: true,
  },
  {
    slug: "sample-oss-collective",
    name: "Sample Open Source Collective",
    kind: "open-source community",
    tagline: "Helping first-time contributors ship their first pull request.",
    mission:
      "Mentored contribution sprints for African developers new to open source.",
    location: "Remote, Africa",
    region: "Global",
    topics: ["Open Source", "Web"],
    channels: ["GitHub", "Telegram"],
    lookingFor: ["Mentors", "Project maintainers"],
    sample: true,
  },
  {
    slug: "sample-women-in-tech",
    name: "Sample Women in Tech Hub",
    kind: "innovation hub",
    tagline: "Mentorship and visibility for women in technology.",
    mission:
      "Connecting women technologists with mentors, speaking slots and jobs.",
    location: "Cape Town, South Africa",
    region: "Southern Africa",
    topics: ["Women in Tech", "Startups"],
    channels: ["LinkedIn", "WhatsApp"],
    lookingFor: ["Speakers", "Employers"],
    sample: true,
  },
  {
    slug: "sample-security-guild",
    name: "Sample Cybersecurity Guild",
    kind: "developer community",
    tagline: "CTF practice and security reading groups.",
    mission: "Hands-on security learning through capture-the-flag events.",
    location: "Cairo, Egypt",
    region: "North Africa",
    topics: ["Cybersecurity"],
    channels: ["Discord"],
    lookingFor: ["Event partners", "Technology partners"],
    sample: true,
  },
];
