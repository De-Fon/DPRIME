// Shared TypeScript interfaces for DPRIME data files

export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "shipped" | "in progress";
  live: boolean;
  url: string;
  imageUrl?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  approach?: string;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface Service {
  index: string;
  title: string;
  description: string;
  stack: string[];
}

export interface ProcessStep {
  index: string;
  stage: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Ecosystem entities
//
// Communities, organizations, events, programs and opportunities are linked by
// slug. `sample: true` marks placeholder records so the UI can label them
// until real data replaces them.
// ---------------------------------------------------------------------------

export type Region =
  | "East Africa"
  | "West Africa"
  | "Southern Africa"
  | "North Africa"
  | "Central Africa"
  | "Pan African"
  | "Global";

export type Topic =
  | "AI"
  | "Web"
  | "Mobile"
  | "Cloud"
  | "Cybersecurity"
  | "Data"
  | "Open Source"
  | "Startups"
  | "Women in Tech"
  | "General";

export type CommunityKind =
  | "university club"
  | "developer community"
  | "open-source community"
  | "startup community"
  | "innovation hub";

export interface Community {
  imageUrl?: string; // cover image or logo, hosted in Supabase Storage
  slug: string;
  name: string;
  kind: CommunityKind;
  tagline: string;
  mission: string;
  location: string;
  region: Region;
  topics: Topic[];
  website?: string;
  channels: string[]; // where the community already lives, e.g. "WhatsApp"
  lookingFor: string[]; // collaboration interests
  memberCount?: number;
  sample?: boolean;
}

export type OrganizationKind = "company" | "institution" | "nonprofit";

export interface Organization {
  imageUrl?: string; // cover image or logo, hosted in Supabase Storage
  slug: string;
  name: string;
  kind: OrganizationKind;
  description: string;
  location: string;
  region: Region;
  topics: Topic[];
  website?: string;
  sample?: boolean;
}

export type EventKind =
  | "meetup"
  | "hackathon"
  | "conference"
  | "workshop"
  | "webinar"
  | "demo day";

export interface EcosystemEvent {
  imageUrl?: string; // cover image or logo, hosted in Supabase Storage
  slug: string;
  title: string;
  kind: EventKind;
  description: string;
  date: string; // ISO date (YYYY-MM-DD)
  location: string;
  region: Region;
  topics: Topic[];
  hostSlug: string; // community slug
  partnerSlugs: string[]; // community or organization slugs
  link?: string; // registration or event URL (optional)
  sample?: boolean;
}

export type ProgramKind =
  | "fellowship"
  | "bootcamp"
  | "incubator"
  | "mentorship"
  | "developer program";

export interface Program {
  imageUrl?: string; // cover image or logo, hosted in Supabase Storage
  slug: string;
  title: string;
  kind: ProgramKind;
  description: string;
  duration: string;
  topics: Topic[];
  runBySlug: string; // community or organization slug
  link?: string; // program or application URL (optional)
  sample?: boolean;
}

export type OpportunityKind =
  | "job"
  | "internship"
  | "freelance"
  | "project"
  | "scholarship"
  | "hackathon"
  | "fellowship"
  | "grant"
  | "speaking"
  | "collaboration";

export interface Opportunity {
  imageUrl?: string; // cover image or logo, hosted in Supabase Storage
  slug: string;
  title: string;
  kind: OpportunityKind;
  description: string;
  location: string;
  region: Region;
  topics: Topic[];
  postedBySlug: string; // community or organization slug
  deadline?: string; // ISO date
  link?: string; // application or listing URL (optional)
  sample?: boolean;
}

export type PartnershipType =
  | "partner"
  | "sponsor"
  | "collaborator"
  | "event partner"
  | "knowledge partner"
  | "technology partner"
  | "community partner"
  | "academic partner";

export interface Partnership {
  fromSlug: string;
  toSlug: string;
  type: PartnershipType;
  sample?: boolean;
}
