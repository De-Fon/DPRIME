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
